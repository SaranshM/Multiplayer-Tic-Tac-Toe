// Fetching query params
const match_data = Qs.parse(location.search,{ ignoreQueryPrefix:true });

// Checking Environment
const currUrl = window.location.href
let baseBackend, baseFrontend
if(currUrl.slice(0,5) == "https") {
    baseBackend = "https://letsendorse-assn.herokuapp.com"
    baseFrontend = "https://saranshm.github.io/letsendorse_assn/public/html"
}
else {
    baseBackend = "http://localhost:3000"
    baseFrontend = "file:///D:/letsendorse/public/html"
}

function initialConfig() {
    // Initializing user cache
    localStorage[match_data.match_id] = true
    localStorage[`${match_data.match_id}_turn`] = "yes"
    localStorage[`${match_data.match_id}_status`] = "ongoing"
    localStorage[`${match_data.match_id}_boxes_filled`] = 0
    localStorage[`${match_data.match_id}_box1_status`] = "none"
    localStorage[`${match_data.match_id}_box2_status`] = "none"
    localStorage[`${match_data.match_id}_box3_status`] = "none"
    localStorage[`${match_data.match_id}_box4_status`] = "none"
    localStorage[`${match_data.match_id}_box5_status`] = "none"
    localStorage[`${match_data.match_id}_box6_status`] = "none"
    localStorage[`${match_data.match_id}_box7_status`] = "none"
    localStorage[`${match_data.match_id}_box8_status`] = "none"
    localStorage[`${match_data.match_id}_box9_status`] = "none"
    localStorage[`${match_data.match_id}_choice`] = "cross"

    // Initial Game Settings
    document.getElementsByClassName("player")[0].style.border = "dashed 3px #3bc14a"
    document.getElementsByClassName("player")[1].style.border = "dashed 3px #A50104"

    // Close Overlay
    const overlay = document.getElementsByClassName("error_wrap")[0]
    overlay.style.display = "none"

    // Reset Board
    const board = document.getElementsByClassName("col")
    for(let i = 0; i < board.length; i++) {
        board[i].style.background = null
    }

    // Display back button
    document.getElementsByClassName("back")[0].style.display = "block"
}

// Initial Game Settings
let playerWins = 0, playerLoss = 0
let computerWins = 0, computerLoss = 0
let draws = 0

document.getElementsByClassName("back")[0].addEventListener("click", (e) => {
    e.preventDefault()
    window.location.href = `${baseFrontend}/index.html`;
})

// Allow/deny move to the player.
async function show_option_vs_computer(elem,num) {
    if(localStorage[`${match_data.match_id}_status`] == "ongoing") {
        if(localStorage[`${match_data.match_id}_box${num}_status`] == "none"){
            elem.style.backgroundColor = "#f3f2da"
            if(localStorage[`${match_data.match_id}_choice`] == "cross") {
                document.getElementsByClassName("col")[num-1].style.backgroundImage = "url('../images/cross_big.png')"
                document.getElementsByClassName("col")[num-1].style.backgroundRepeat = "no-repeat"
                document.getElementsByClassName("col")[num-1].style.backgroundPosition = "center"
                document.getElementsByClassName("col")[num-1].style.cursor = "pointer"
            }
            else if(localStorage[`${match_data.match_id}_choice`] == "circle") {
                document.getElementsByClassName("col")[num-1].style.backgroundImage = "url('../images/circle_big.png')"
                document.getElementsByClassName("col")[num-1].style.backgroundRepeat = "no-repeat"
                document.getElementsByClassName("col")[num-1].style.backgroundPosition = "center"
                document.getElementsByClassName("col")[num-1].style.cursor = "pointer"
            }
        }
    }
}

// Remove option to play.
async function remove_option_vs_computer(elem,num) {
    if(localStorage[`${match_data.match_id}_status`] == "ongoing") {
        if(localStorage[`${match_data.match_id}_box${num}_status`] == "none"){
            elem.style.backgroundColor = "#4e8d7c"
            if(localStorage[`${match_data.match_id}_choice`] == "cross") {
                document.getElementsByClassName("col")[num-1].style.backgroundImage = "none"
            }
            else if(localStorage[`${match_data.match_id}_choice`] == "circle") {
                document.getElementsByClassName("col")[num-1].style.backgroundImage = "none"
            }
        }
    }
}

// Computation time for the computer
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Display move by player/computer
async function display_move_vs_computer(player_type,num,status) {
    if(status == "over") {
        return
    }
    localStorage[`${match_data.match_id}_boxes_filled`]++
    const action = player_type == "player" ? "cross" : "circle"
    if(localStorage[`${match_data.match_id}_status`] == "ongoing" && localStorage[`${match_data.match_id}_boxes_filled`] < 9) {
        if(action == "cross") {
            document.getElementsByClassName("col")[num-1].style.backgroundColor = "#f3f2da"
            localStorage[`${match_data.match_id}_box${num}_status`] = "cross"
            document.getElementsByClassName("col")[num-1].style.backgroundImage = "url('../images/cross_big.png')"
            document.getElementsByClassName("col")[num-1].style.backgroundRepeat = "no-repeat"
            document.getElementsByClassName("col")[num-1].style.backgroundPosition = "center"
        }
        else if(action == "circle") {
            document.getElementsByClassName("col")[num-1].style.backgroundColor = "#f3f2da"
            localStorage[`${match_data.match_id}_box${num}_status`] = "circle"
            document.getElementsByClassName("col")[num-1].style.backgroundImage = "url('../images/circle_big.png')"
            document.getElementsByClassName("col")[num-1].style.backgroundRepeat = "no-repeat"
            document.getElementsByClassName("col")[num-1].style.backgroundPosition = "center"
        }
        localStorage[`${match_data.match_id}_turn`] = "no"
        if(player_type == "computer") {
            localStorage[`${match_data.match_id}_turn`] = "yes"
            return
        }
        document.getElementsByClassName("player")[1].style.border = "dashed 3px #3bc14a"
        document.getElementsByClassName("player")[0].style.border = "dashed 3px #A50104"
        await sleep(700)
        let available_boxes = []
        for(let i = 1; i <= 10 ; i++) {
            if(localStorage[`${match_data.match_id}_box${i}_status`] == "none") {
                available_boxes.push(i)
            }
        }
        var item = available_boxes[Math.floor(Math.random() * available_boxes.length)]
        let elem = document.getElementsByClassName("col")[item]
        if(player_type == "player") {
            execute_option_vs_computer(elem,item,"computer")
            document.getElementsByClassName("player")[0].style.border = "dashed 3px #3bc14a"
            document.getElementsByClassName("player")[1].style.border = "dashed 3px #A50104"
        }
    }
    if(localStorage[`${match_data.match_id}_boxes_filled`] == 9 && localStorage[`${match_data.match_id}_status`] == "ongoing") {
        if(action == "cross") {
            document.getElementsByClassName("col")[num-1].style.backgroundColor = "#f3f2da"
            localStorage[`${match_data.match_id}_box${num}_status`] = "cross"
            document.getElementsByClassName("col")[num-1].style.backgroundImage = "url('../images/cross_big.png')"
            document.getElementsByClassName("col")[num-1].style.backgroundRepeat = "no-repeat"
            document.getElementsByClassName("col")[num-1].style.backgroundPosition = "center"
        }
        else if(action == "circle") {
            document.getElementsByClassName("col")[num-1].style.backgroundColor = "#f3f2da"
            localStorage[`${match_data.match_id}_box${num}_status`] = "circle"
            document.getElementsByClassName("col")[num-1].style.backgroundImage = "url('../images/circle_big.png')"
            document.getElementsByClassName("col")[num-1].style.backgroundRepeat = "no-repeat"
            document.getElementsByClassName("col")[num-1].style.backgroundPosition = "center"
        }
        await sleep(1000)
        localStorage[`${match_data.match_id}_status`] = "over"
        const overlay = document.getElementsByClassName("error_wrap")[0]
        overlay.style.display = "block"
        const req_data = {
            _id: match_data.match_id,
            result: "draw"
        }
        draws++
        document.getElementById("player1_draws").innerHTML = draws
        document.getElementById("player2_draws").innerHTML = draws
        document.getElementsByClassName("error_text")[0].innerHTML = `Thats a draw!`
        document.getElementsByClassName("error")[0].style.backgroundColor = "#4e8d7c"
        document.getElementsByClassName("error")[0].style.borderColor = "#045762"
        document.getElementsByClassName("error_text")[0].style.color = "#f3f2da"
        await axios.post(`${baseBackend}/update_score`, req_data)
        return
    }
}

// Show winner modal.
async function show_winner(player_type) {
    if(player_type == "computer") {
        computerWins++
        playerLoss++
    }
    else {
        playerWins++
        computerLoss++
    }
    if(localStorage[`${match_data.match_id}_boxes_filled`] == 9) {
        draws--
    }
    const overlay = document.getElementsByClassName("error_wrap")[0]
    overlay.style.display = "block"
    document.getElementById("player1_wins").innerHTML = playerWins
    document.getElementById("player1_losses").innerHTML = playerLoss
    document.getElementById("player2_wins").innerHTML = computerWins
    document.getElementById("player2_losses").innerHTML = computerLoss
    document.getElementById("player1_draws").innerHTML = draws
    document.getElementById("player2_draws").innerHTML = draws
    document.getElementsByClassName("error_text")[0].innerHTML = `You ${player_type == "player" ? "won" : "lost"}!`
    document.getElementsByClassName("error")[0].style.backgroundColor = "#4e8d7c"
    document.getElementsByClassName("error")[0].style.borderColor = "#045762"
    document.getElementsByClassName("error_text")[0].style.color = "#f3f2da"
}

// Close modal.
function close_notification(elem) {
    const overlay = document.getElementsByClassName("error_wrap")[0]
    overlay.style.display = "none"
    // window.location.href = `file:///D:/letsendorse_assn/public/html/index.html`;

}

// Execute a move by player/computer
async function execute_option_vs_computer(elem,num,player_type) {
    if(localStorage[`${match_data.match_id}_status`] != "ongoing") {
        return false
    }
    const action = player_type == "player" ? "cross" : "circle"
    if(num == 1) {
        if(localStorage[`${match_data.match_id}_box5_status`] == action && localStorage[`${match_data.match_id}_box9_status`] == action) {
            display_move_vs_computer(player_type,num,"over")
            await sleep(1000)
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
        if(localStorage[`${match_data.match_id}_box2_status`] == action && localStorage[`${match_data.match_id}_box3_status`] == action) {
            display_move_vs_computer(player_type,num,"over")
            await sleep(1000)
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
        if(localStorage[`${match_data.match_id}_box4_status`] == action && localStorage[`${match_data.match_id}_box7_status`] == action) {
            display_move_vs_computer(player_type,num,"over")
            await sleep(1000)
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
    }
    if(num == 2) {
        if(localStorage[`${match_data.match_id}_box1_status`] == action && localStorage[`${match_data.match_id}_box3_status`] == action) {
            display_move_vs_computer(player_type,num,"over")
            await sleep(1000)
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
        if(localStorage[`${match_data.match_id}_box5_status`] == action && localStorage[`${match_data.match_id}_box8_status`] == action) {
            display_move_vs_computer(player_type,num,"over")
            await sleep(1000)
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
    }
    if(num == 3) {
        if(localStorage[`${match_data.match_id}_box5_status`] == action && localStorage[`${match_data.match_id}_box7_status`] == action) {
            display_move_vs_computer(player_type,num,"over")
            await sleep(1000)
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
        if(localStorage[`${match_data.match_id}_box2_status`] == action && localStorage[`${match_data.match_id}_box1_status`] == action) {
            display_move_vs_computer(player_type,num,"over")
            await sleep(1000)
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
        if(localStorage[`${match_data.match_id}_box6_status`] == action && localStorage[`${match_data.match_id}_box9_status`] == action) {
            display_move_vs_computer(player_type,num,"over")
            await sleep(1000)
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
    }
    if(num == 4) {
        if(localStorage[`${match_data.match_id}_box1_status`] == action && localStorage[`${match_data.match_id}_box7_status`] == action) {
            display_move_vs_computer(player_type,num,"over")
            await sleep(1000)
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
        if(localStorage[`${match_data.match_id}_box5_status`] == action && localStorage[`${match_data.match_id}_box6_status`] == action) {
            display_move_vs_computer(player_type,num,"over")
            await sleep(1000)
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
    }
    if(num == 5) {
        if(localStorage[`${match_data.match_id}_box2_status`] == action && localStorage[`${match_data.match_id}_box8_status`] == action) {
            display_move_vs_computer(player_type,num,"over")
            await sleep(1000)
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
        if(localStorage[`${match_data.match_id}_box4_status`] == action && localStorage[`${match_data.match_id}_box6_status`] == action) {
            display_move_vs_computer(player_type,num,"over")
            await sleep(1000)
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
        if(localStorage[`${match_data.match_id}_box3_status`] == action && localStorage[`${match_data.match_id}_box7_status`] == action) {
            display_move_vs_computer(player_type,num,"over")
            await sleep(1000)
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
        if(localStorage[`${match_data.match_id}_box1_status`] == action && localStorage[`${match_data.match_id}_box9_status`] == action) {
            display_move_vs_computer(player_type,num,"over")
            await sleep(1000)
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
    }
    if(num == 6) {
        if(localStorage[`${match_data.match_id}_box3_status`] == action && localStorage[`${match_data.match_id}_box9_status`] == action) {
            display_move_vs_computer(player_type,num,"over")
            await sleep(1000)
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
        if(localStorage[`${match_data.match_id}_box5_status`] == action && localStorage[`${match_data.match_id}_box4_status`] == action) {
            display_move_vs_computer(player_type,num,"over")
            await sleep(1000)
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
    }
    if(num == 7) {
        if(localStorage[`${match_data.match_id}_box5_status`] == action && localStorage[`${match_data.match_id}_box3_status`] == action) {
            display_move_vs_computer(player_type,num,"over")
            await sleep(1000)
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
        if(localStorage[`${match_data.match_id}_box4_status`] == action && localStorage[`${match_data.match_id}_box1_status`] == action) {
            display_move_vs_computer(player_type,num,"over")
            await sleep(1000)
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
        if(localStorage[`${match_data.match_id}_box8_status`] == action && localStorage[`${match_data.match_id}_box9_status`] == action) {
            display_move_vs_computer(player_type,num,"over")
            await sleep(1000)
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
    }
    if(num == 8) {
        if(localStorage[`${match_data.match_id}_box5_status`] == action && localStorage[`${match_data.match_id}_box2_status`] == action) {
            display_move_vs_computer(player_type,num,"over")
            await sleep(1000)
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
        if(localStorage[`${match_data.match_id}_box7_status`] == action && localStorage[`${match_data.match_id}_box9_status`] == action) {
            display_move_vs_computer(player_type,num,"over")
            await sleep(1000)
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
    }
    if(num == 9) {
        if(localStorage[`${match_data.match_id}_box5_status`] == action && localStorage[`${match_data.match_id}_box1_status`] == action) {
            display_move_vs_computer(player_type,num,"over")
            await sleep(1000)
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
        if(localStorage[`${match_data.match_id}_box8_status`] == action && localStorage[`${match_data.match_id}_box7_status`] == action) {
            display_move_vs_computer(player_type,num,"over")
            await sleep(1000)
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
        if(localStorage[`${match_data.match_id}_box6_status`] == action && localStorage[`${match_data.match_id}_box3_status`] == action) {
            display_move_vs_computer(player_type,num,"over")
            await sleep(1000)
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
    }
    display_move_vs_computer(player_type,num,"ongoing")
}

// Create a new game.
async function create_new_game() {

    initialConfig()
}
