const mongoose = require('mongoose');

const GamesPlayer = mongoose.model("GamesPlayer",{
    _id: {
        type: String
    },
    host: {
        type:String,
        trim:true,
        maxlength:100,
        default: "Host"
    },
    player: {
        type:String,
        trim:true,
        maxlength:100,
        default: "Player 2"
    },
    player1_wins:{
        type:Number,
        default: 0
    },
    player1_losses:{
        type:Number,
        default: 0
    },
    player1_draws:{
        type:Number,
        default: 0
    },
    player2_wins:{
        type:Number,
        default: 0
    },
    player2_losses:{
        type:Number,
        default: 0
    },
    player2_draws:{
        type:Number,
        default: 0
    },
    host_move: {
        type: String
    },
    player_move: {
        type: String
    }
});

module.exports = GamesPlayer;

