// Grabbing DOM elements and listen for events.
const start_match = document.getElementById("start_match")
const join_match = document.getElementById("join_match")
const create_form = document.getElementsByClassName("create_form")[0]
const join_match_form = document.getElementsByClassName("join_match_form")[0]
const start_match_form = document.getElementsByClassName("start_match_form")[0]
const vs_computer = document.getElementById("vs_computer")
const vs_player = document.getElementById("vs_player")
const link = document.getElementsByClassName("link")[0]

// When user wants to create a new game.
start_match.addEventListener("click", async (e) => {
    e.preventDefault()
    create_form.style.display = "none"
    join_match_form.style.display = "none"
    start_match_form.style.visibility = "visible"
    start_match_form.style.display = "block"
})

// When user wants to join a game.
join_match.addEventListener("click", async (e) => {
    e.preventDefault()
    create_form.style.display = "none"
    start_match_form.style.display = "none"
    join_match_form.style.visibility = "visible"
    join_match_form.style.display = "block"
})

// When user wants to play against computer
vs_computer.addEventListener("click", async (e) => {
    e.preventDefault()
    const req_data = {
        player2_type: "computer"
    }
    const { data } = await axios.post("https://letsendorse-assn.herokuapp.com/start_game_vs_computer", req_data)
    if(data.error) {
        alert("Error has ocurred")
        return
    }
    window.location.href = `https://saranshm.github.io/letsendorse_assn/public/html/vs_computer.html?match_id=${data.data.game_id}`;
})

// When user wants to play against another player.
vs_player.addEventListener("click", async (e) => {
    e.preventDefault()
    link.style.display = "block"
    const username = "player1"
    const choice = "cross"
    const other_choice = "circle"
    const req_data = {
        username,
        choice,
        other_choice
    }
    const { data } = await axios.post("https://letsendorse-assn.herokuapp.com/start_game_vs_player", req_data)
    localStorage[data.data.game_id] = true
    localStorage[`${data.data.game_id}_turn`] = "yes"
    localStorage[`${data.data.game_id}_status`] = "ongoing"
    localStorage[`${data.data.game_id}_boxes_filled`] = 0
    localStorage[`${data.data.game_id}_username`] = username
    localStorage[`${data.data.game_id}_host`] = "yes"
    localStorage[`${data.data.game_id}_box1_status`] = "none"
    localStorage[`${data.data.game_id}_box2_status`] = "none"
    localStorage[`${data.data.game_id}_box3_status`] = "none"
    localStorage[`${data.data.game_id}_box4_status`] = "none"
    localStorage[`${data.data.game_id}_box5_status`] = "none"
    localStorage[`${data.data.game_id}_box6_status`] = "none"
    localStorage[`${data.data.game_id}_box7_status`] = "none"
    localStorage[`${data.data.game_id}_box8_status`] = "none"
    localStorage[`${data.data.game_id}_box9_status`] = "none"
    localStorage[`${data.data.game_id}_choice`] = choice
    link.style.display = "block"
    const game_link = `https://saranshm.github.io/letsendorse_assn/public/html/vs_player.html?game_id=${data.data.game_id}`
    link.href = game_link
    document.getElementById("unique_game_id").innerHTML = "Share Game ID : " + data.data.game_id
})

// When user wants to join a game.
join_match_form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const game_id = document.getElementById("match_id").value
    if(game_id.length == 0) {
        alert("Invalid Game ID.")
        return
    }
    const req_body = {
        game_id
    }
    const { data } = await axios.post("https://letsendorse-assn.herokuapp.com/check_game", req_body)
    if(data.error) {
        alert("Invalid Game ID.")
        return
    }
    window.location.href = `https://saranshm.github.io/letsendorse_assn/public/html/vs_player.html?game_id=${game_id}`;
})