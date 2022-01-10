// Grabbing DOM elements and listen for events.
const start_match_form = document.getElementsByClassName("start_match_form")[0]
const vs_computer = document.getElementById("vs_computer")
const vs_player = document.getElementById("vs_player")
const link = document.getElementsByClassName("link")[0]
const back = document.getElementsByClassName("back")[0]
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


function generate_id(length) {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
   }
   return result.join('');
}

// When user wants to play against computer
vs_computer.addEventListener("click", async (e) => {
    e.preventDefault()
    const game_id = generate_id(6)
    window.location.href = `${baseFrontend}/vs_computer.html?match_id=${game_id}`;
})

// When user wants to play against another player.
vs_player.addEventListener("click", async (e) => {
    e.preventDefault()
    const username = "player1"
    const choice = "cross"
    const other_choice = "circle"
    const req_data = {
        username,
        choice,
        other_choice
    }
    const { data } = await axios.post(`${baseBackend}/start_game_vs_player`, req_data)
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
    const game_link = `${baseFrontend}/vs_player.html?game_id=${data.data.game_id}`
    link.href = game_link
    link.style.display = "block"
    document.getElementById("unique_game_id").innerHTML = "Share Game Link : " + game_link
})

