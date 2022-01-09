// Requiring mongoose models and node modules
require("../db/mongoose");
const http = require("http");
const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser");
const GamesPlayer = require("../models/games_player")

let global_memo = {}

// Setting up express server and CORS.
const post = bodyParser.urlencoded({extended:false,limit:'50mb'});
const app = express();
app.use(cors())
app.use(bodyParser.json({limit:'50mb'}));

// Setting up socket.io
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
});

// Generate a random 5 character ID
function generate_id(length) {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
   }
   return result.join('');
}

// Checking if a game exists or not.
app.post('/check_game', post, async (req,res) => {
    try {
        console.log("Request object ==> ",req.body)
        const { game_id } = req.body
        const game = await GamesPlayer.findOne({ _id: game_id })
        if(!game) {
            throw Error("Game does not exist")
        }
        return res.send({ error: false })
    }
    catch(err) {
        console.log(err)
        return res.send({ error: true, data: { err } })
    }
})

// Start a game vs player and store in db
app.post('/start_game_vs_player', post, async (req,res) => {
    try {
        console.log("Request object ==> ",req.body)
        const { username, choice, other_choice } = req.body
        const _id = generate_id(parseInt(process.env.MATCH_ID_LENGTH))
        const new_game = new GamesPlayer({
            _id,
            host: username,
            host_move: choice,
            player_move: other_choice
        })
        await new_game.save()
        return res.send({ error: false, data: { game_id: _id } })
    }
    catch(err) {
        console.log(err)
        return res.send({ error: true, data: { err } })
    }
})

// Update a score in a game vs player.
app.post("/update_score_player", async (req,res) => {
    try {
        const { game_id, host } = req.body
        const game = await GamesPlayer.findOne({ _id: game_id })
        if(host == "won") {
            game.player1_wins = game.player1_wins + 1
            game.player2_losses = game.player2_losses + 1 
        }
        else if(host == "lost") {
            game.player1_losses = game.player1_losses + 1
            game.player2_wins = game.player2_wins + 1
        }
        else if(host == "draw") {
            game.player1_draws = game.player1_draws + 1
            game.player2_draws = game.player2_draws + 1
        }
        await game.save()
        return res.send({ error: false })
    }
    catch(err) {
        console.log(err)
        return res.send({ error: true, data: { err } })
    }
})

// Socket functions (listeners and emitters)
io.on('connection', async (socket)=>{
    console.log("New connection");

    // When a user player joins the game.
    socket.on("join", async (user_data)=>{
        socket.join(user_data.game_id);
        if(!global_memo[user_data.game_id]) {
            global_memo[user_data.game_id] = 1;
        }
        else {
            global_memo[user_data.game_id]
        }
        const game = await GamesPlayer.findById(user_data.game_id)
        const num_users = io.sockets.adapter.rooms.get(user_data.game_id).size
        io.to(user_data.game_id).emit("welcome", { game, num_users });
    })
    
    // When a move is made on the board.
    socket.on("move", async (user_data) => {
        io.to(user_data.game_id).emit("display_move", user_data);
    })

    // When the game is over.
    socket.on("game_over", async (user_data) => {
        io.to(user_data.game_id).emit("end_game", user_data);
    })

    // When the game is restarted.
    socket.on("restart", async (user_data) => {
        console.log("restart")
        const game = await GamesPlayer.findById(user_data.game_id)
        io.to(user_data.game_id).emit("restart_game", { game });
    })
})

// Server listening for requests.
server.listen(process.env.PORT,()=>{
    console.log("Listening to port ",process.env.PORT);
})
