// Fetching query params
const match_data = Qs.parse(location.search,{ ignoreQueryPrefix:true });

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

// Display move by player/computer
async function display_move_vs_computer(player_type,num) {
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
        }
    }
    if(localStorage[`${match_data.match_id}_boxes_filled`] == 9) {
        localStorage[`${match_data.match_id}_status`] = "over"
        const overlay = document.getElementsByClassName("error_wrap")[0]
        overlay.style.display = "block"
        const req_data = {
            _id: match_data.match_id,
            result: "draw"
        }
        document.getElementsByClassName("error_text")[0].innerHTML = `Thats a draw!`
        document.getElementsByClassName("error")[0].style.backgroundColor = "#4e8d7c"
        document.getElementsByClassName("error")[0].style.borderColor = "#045762"
        document.getElementsByClassName("error_text")[0].style.color = "#f3f2da"
        await axios.post("http://localhost:3000/update_score", req_data)
        return
    }
}

// Show winner modal.
async function show_winner(player_type) {
    const overlay = document.getElementsByClassName("error_wrap")[0]
    overlay.style.display = "block"
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
    if(num == 5) {
        let flag = false
        for(let i = 1; i < 9; i++) {
            if(localStorage[`${match_data.match_id}_box${i}_status`] != "none") {
                flag = true
                break
            }
        }
        if(!flag) {
            alert("First move cant be in the center.")
            return
        }
    }
    if(num == 1) {
        if(localStorage[`${match_data.match_id}_box5_status`] == action && localStorage[`${match_data.match_id}_box9_status`] == action) {
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
        if(localStorage[`${match_data.match_id}_box2_status`] == action && localStorage[`${match_data.match_id}_box3_status`] == action) {
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
        if(localStorage[`${match_data.match_id}_box4_status`] == action && localStorage[`${match_data.match_id}_box7_status`] == action) {
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
    }
    if(num == 2) {
        if(localStorage[`${match_data.match_id}_box1_status`] == action && localStorage[`${match_data.match_id}_box3_status`] == action) {
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
        if(localStorage[`${match_data.match_id}_box5_status`] == action && localStorage[`${match_data.match_id}_box8_status`] == action) {
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
    }
    if(num == 3) {
        if(localStorage[`${match_data.match_id}_box5_status`] == action && localStorage[`${match_data.match_id}_box7_status`] == action) {
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
        if(localStorage[`${match_data.match_id}_box2_status`] == action && localStorage[`${match_data.match_id}_box1_status`] == action) {
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
        if(localStorage[`${match_data.match_id}_box6_status`] == action && localStorage[`${match_data.match_id}_box9_status`] == action) {
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
    }
    if(num == 4) {
        if(localStorage[`${match_data.match_id}_box1_status`] == action && localStorage[`${match_data.match_id}_box7_status`] == action) {
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
        if(localStorage[`${match_data.match_id}_box5_status`] == action && localStorage[`${match_data.match_id}_box6_status`] == action) {
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
    }
    if(num == 5) {
        if(localStorage[`${match_data.match_id}_box2_status`] == action && localStorage[`${match_data.match_id}_box8_status`] == action) {
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
        if(localStorage[`${match_data.match_id}_box4_status`] == action && localStorage[`${match_data.match_id}_box6_status`] == action) {
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
        if(localStorage[`${match_data.match_id}_box3_status`] == action && localStorage[`${match_data.match_id}_box7_status`] == action) {
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
        if(localStorage[`${match_data.match_id}_box1_status`] == action && localStorage[`${match_data.match_id}_box9_status`] == action) {
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
    }
    if(num == 6) {
        if(localStorage[`${match_data.match_id}_box3_status`] == action && localStorage[`${match_data.match_id}_box9_status`] == action) {
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
        if(localStorage[`${match_data.match_id}_box5_status`] == action && localStorage[`${match_data.match_id}_box4_status`] == action) {
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
    }
    if(num == 7) {
        if(localStorage[`${match_data.match_id}_box5_status`] == action && localStorage[`${match_data.match_id}_box3_status`] == action) {
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
        if(localStorage[`${match_data.match_id}_box4_status`] == action && localStorage[`${match_data.match_id}_box1_status`] == action) {
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
        if(localStorage[`${match_data.match_id}_box8_status`] == action && localStorage[`${match_data.match_id}_box9_status`] == action) {
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
    }
    if(num == 8) {
        if(localStorage[`${match_data.match_id}_box5_status`] == action && localStorage[`${match_data.match_id}_box2_status`] == action) {
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
        if(localStorage[`${match_data.match_id}_box7_status`] == action && localStorage[`${match_data.match_id}_box9_status`] == action) {
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
    }
    if(num == 9) {
        if(localStorage[`${match_data.match_id}_box5_status`] == action && localStorage[`${match_data.match_id}_box1_status`] == action) {
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
        if(localStorage[`${match_data.match_id}_box8_status`] == action && localStorage[`${match_data.match_id}_box7_status`] == action) {
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
        if(localStorage[`${match_data.match_id}_box6_status`] == action && localStorage[`${match_data.match_id}_box3_status`] == action) {
            localStorage[`${match_data.match_id}_status`] = "over"
            show_winner(player_type)
            return
        }
    }
    display_move_vs_computer(player_type,num)
}

// Create a new game.
async function create_new_game() {
    location.reload()
}
