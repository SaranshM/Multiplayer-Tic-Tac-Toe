// Checking Environment
const currUrl = window.location.href;
let baseBackend, baseFrontend;
if (currUrl.slice(0, 5) == "https") {
  baseBackend = "https://multiplayer-tac-tac-toe.onrender.com";
  baseFrontend = "https://saranshm.github.io/letsendorse_assn/public/html";
} else {
  baseBackend = "http://localhost:3000";
  baseFrontend = "file:///D:/letsendorse/public/html";
}

// Connecting client to the server socket.
const socket = io.connect(`${baseBackend}/`);

// Fetching query params
const user_data = Qs.parse(location.search, { ignoreQueryPrefix: true });

//player1 DOM elements
const player1_name = document.getElementById("player1_name");
const player1_wins = document.getElementById("player1_wins");
const player1_losses = document.getElementById("player1_losses");
const player1_draws = document.getElementById("player1_draws");

//player2 DOM elements
const player2_name = document.getElementById("player2_name");
const player2_wins = document.getElementById("player2_wins");
const player2_losses = document.getElementById("player2_losses");
const player2_draws = document.getElementById("player2_draws");

//board DOM element
const board = document.getElementsByClassName("board")[0];

let num_users;

// When users join the game.
socket.on("welcome", (data) => {
  num_users = data.num_users;
  if (
    data.num_users == 1 &&
    data.game.host == localStorage[`${user_data.game_id}_username`]
  ) {
    console.log("1");
    player1_name.innerHTML = data.game.host;
    player1_wins.innerHTML = data.game.player1_wins;
    player1_losses.innerHTML = data.game.player1_losses;
    player1_draws.innerHTML = data.game.player1_draws;
    board.style.cursor = "no-drop";
  } else if (
    data.num_users == 1 &&
    data.game.host != localStorage[`${user_data.game_id}_username`]
  ) {
    console.log("2");
    localStorage[user_data.game_id] = true;
    localStorage[`${user_data.game_id}_username`] = data.game.player;
    localStorage[`${user_data.game_id}_choice`] = data.game.player_move;
    localStorage[`${user_data.game_id}_turn`] = "no";
    localStorage[`${user_data.game_id}_host`] = "no";
    localStorage[`${user_data.game_id}_boxes_filled`] = 0;
    localStorage[`${user_data.game_id}_status`] = "ongoing";
    localStorage[`${user_data.game_id}_box1_status`] = "none";
    localStorage[`${user_data.game_id}_box2_status`] = "none";
    localStorage[`${user_data.game_id}_box3_status`] = "none";
    localStorage[`${user_data.game_id}_box4_status`] = "none";
    localStorage[`${user_data.game_id}_box5_status`] = "none";
    localStorage[`${user_data.game_id}_box6_status`] = "none";
    localStorage[`${user_data.game_id}_box7_status`] = "none";
    localStorage[`${user_data.game_id}_box8_status`] = "none";
    localStorage[`${user_data.game_id}_box9_status`] = "none";
    player2_name.innerHTML = data.game.player;
    player2_wins.innerHTML = data.game.player2_wins;
    player2_losses.innerHTML = data.game.player2_losses;
    player2_draws.innerHTML = data.game.player2_draws;
    board.style.cursor = "no-drop";
  } else if (
    data.num_users == 1 &&
    data.game.player == localStorage[`${user_data.game_id}_username`]
  ) {
    console.log("3");
    player2_name.innerHTML = data.game.player;
    player2_wins.innerHTML = data.game.player2_wins;
    player2_losses.innerHTML = data.game.player2_losses;
    player2_draws.innerHTML = data.game.player2_draws;
    board.style.cursor = "no-drop";
  } else if (data.num_users == 2) {
    console.log("4");
    board.style.cursor = "context-menu";
    player2_name.innerHTML = data.game.player;
    player2_wins.innerHTML = data.game.player2_wins;
    player2_losses.innerHTML = data.game.player2_losses;
    player2_draws.innerHTML = data.game.player2_draws;
    player1_name.innerHTML = data.game.host;
    player1_wins.innerHTML = data.game.player1_wins;
    player1_losses.innerHTML = data.game.player1_losses;
    player1_draws.innerHTML = data.game.player1_draws;
    if (
      data.game.host != localStorage[`${user_data.game_id}_username`] &&
      !localStorage[user_data.game_id]
    ) {
      localStorage[user_data.game_id] = true;
      localStorage[`${user_data.game_id}_username`] = data.game.player;
      localStorage[`${user_data.game_id}_choice`] = data.game.player_move;
      localStorage[`${user_data.game_id}_turn`] = "no";
      localStorage[`${user_data.game_id}_host`] = "no";
      localStorage[`${user_data.game_id}_boxes_filled`] = 0;
      localStorage[`${user_data.game_id}_status`] = "ongoing";
      localStorage[`${user_data.game_id}_box1_status`] = "none";
      localStorage[`${user_data.game_id}_box2_status`] = "none";
      localStorage[`${user_data.game_id}_box3_status`] = "none";
      localStorage[`${user_data.game_id}_box4_status`] = "none";
      localStorage[`${user_data.game_id}_box5_status`] = "none";
      localStorage[`${user_data.game_id}_box6_status`] = "none";
      localStorage[`${user_data.game_id}_box7_status`] = "none";
      localStorage[`${user_data.game_id}_box8_status`] = "none";
      localStorage[`${user_data.game_id}_box9_status`] = "none";
    }
    if (localStorage[`${user_data.game_id}_turn`] == "yes") {
      if (
        document.getElementById("player1_name").innerHTML ==
        localStorage[`${user_data.game_id}_username`]
      ) {
        document.getElementsByClassName("player")[0].style.border =
          "dashed 3px #3bc14a";
        document.getElementsByClassName("player")[1].style.border =
          "dashed 3px #A50104";
      }
      if (
        document.getElementById("player2_name").innerHTML ==
        localStorage[`${user_data.game_id}_username`]
      ) {
        document.getElementsByClassName("player")[1].style.border =
          "dashed 3px #3bc14a";
        document.getElementsByClassName("player")[0].style.border =
          "dashed 3px #A50104";
      }
    } else {
      if (
        document.getElementById("player1_name").innerHTML ==
        localStorage[`${user_data.game_id}_username`]
      ) {
        document.getElementsByClassName("player")[0].style.border =
          "dashed 3px #A50104";
        document.getElementsByClassName("player")[1].style.border =
          "dashed 3px #3bc14a";
      }
      if (
        document.getElementById("player2_name").innerHTML.split("<")[0] ==
        localStorage[`${user_data.game_id}_username`]
      ) {
        document.getElementsByClassName("player")[1].style.border =
          "dashed 3px #A50104";
        document.getElementsByClassName("player")[0].style.border =
          "dashed 3px #3bc14a";
      }
    }
  }
  if (localStorage[user_data.game_id]) {
    console.log("5");
    const boxes = document.getElementsByClassName("col");
    for (let i = 0; i < 9; i++) {
      const action = localStorage[`${user_data.game_id}_box${i + 1}_status`];
      if (action != "none") {
        if (action == "cross") {
          boxes[i].style.backgroundColor = "#f3f2da";
          document.getElementsByClassName("col")[i].style.backgroundImage =
            "url('../images/cross_big.png')";
          document.getElementsByClassName("col")[i].style.backgroundRepeat =
            "no-repeat";
          document.getElementsByClassName("col")[i].style.backgroundPosition =
            "center";
        } else if (action == "circle") {
          boxes[i].style.backgroundColor = "#f3f2da";
          document.getElementsByClassName("col")[i].style.backgroundImage =
            "url('../images/circle_big.png')";
          document.getElementsByClassName("col")[i].style.backgroundRepeat =
            "no-repeat";
          document.getElementsByClassName("col")[i].style.backgroundPosition =
            "center";
        }
      }
    }
  }
});

// Allow/deny move to the player.
function show_option(elem, num) {
  if (
    num_users == 2 &&
    localStorage[`${user_data.game_id}_turn`] == "yes" &&
    localStorage[`${user_data.game_id}_status`] == "ongoing"
  ) {
    if (localStorage[`${user_data.game_id}_box${num}_status`] == "none") {
      elem.style.backgroundColor = "#f3f2da";
      if (localStorage[`${user_data.game_id}_choice`] == "cross") {
        document.getElementsByClassName("col")[num - 1].style.backgroundImage =
          "url('../images/cross_big.png')";
        document.getElementsByClassName("col")[num - 1].style.backgroundRepeat =
          "no-repeat";
        document.getElementsByClassName("col")[
          num - 1
        ].style.backgroundPosition = "center";
        document.getElementsByClassName("col")[num - 1].style.cursor =
          "pointer";
      } else if (localStorage[`${user_data.game_id}_choice`] == "circle") {
        document.getElementsByClassName("col")[num - 1].style.backgroundImage =
          "url('../images/circle_big.png')";
        document.getElementsByClassName("col")[num - 1].style.backgroundRepeat =
          "no-repeat";
        document.getElementsByClassName("col")[
          num - 1
        ].style.backgroundPosition = "center";
        document.getElementsByClassName("col")[num - 1].style.cursor =
          "pointer";
      }
    }
  }
}

// Remove option to play.
function remove_option(elem, num) {
  if (
    num_users == 2 &&
    localStorage[`${user_data.game_id}_turn`] == "yes" &&
    localStorage[`${user_data.game_id}_status`] == "ongoing"
  ) {
    if (localStorage[`${user_data.game_id}_box${num}_status`] == "none") {
      elem.style.backgroundColor = "#4e8d7c";
      if (localStorage[`${user_data.game_id}_choice`] == "cross") {
        document.getElementsByClassName("col")[num - 1].style.backgroundImage =
          "none";
      } else if (localStorage[`${user_data.game_id}_choice`] == "circle") {
        document.getElementsByClassName("col")[num - 1].style.backgroundImage =
          "none";
      }
    }
  }
}

// Display move by player1/player2
socket.on("display_move", async (user_datax) => {
  localStorage[`${user_data.game_id}_boxes_filled`]++;
  if (
    num_users == 2 &&
    localStorage[`${user_data.game_id}_status`] == "ongoing"
  ) {
    if (user_datax.action == "cross") {
      document.getElementsByClassName("col")[
        user_datax.num - 1
      ].style.backgroundColor = "#f3f2da";
      localStorage[`${user_datax.game_id}_box${user_datax.num}_status`] =
        "cross";
      document.getElementsByClassName("col")[
        user_datax.num - 1
      ].style.backgroundImage = "url('../images/cross_big.png')";
      document.getElementsByClassName("col")[
        user_datax.num - 1
      ].style.backgroundRepeat = "no-repeat";
      document.getElementsByClassName("col")[
        user_datax.num - 1
      ].style.backgroundPosition = "center";
    } else if (user_datax.action == "circle") {
      document.getElementsByClassName("col")[
        user_datax.num - 1
      ].style.backgroundColor = "#f3f2da";
      localStorage[`${user_datax.game_id}_box${user_datax.num}_status`] =
        "circle";
      document.getElementsByClassName("col")[
        user_datax.num - 1
      ].style.backgroundImage = "url('../images/circle_big.png')";
      document.getElementsByClassName("col")[
        user_datax.num - 1
      ].style.backgroundRepeat = "no-repeat";
      document.getElementsByClassName("col")[
        user_datax.num - 1
      ].style.backgroundPosition = "center";
    }
  }
  if (user_datax.game_status == "over") {
    localStorage[`${user_data.game_id}_status`] = "over";
  }
  if (user_datax.user == localStorage[`${user_data.game_id}_turn`]) {
    localStorage[`${user_data.game_id}_turn`] = "no";
    if (
      document.getElementById("player1_name").innerHTML ==
      localStorage[`${user_data.game_id}_username`]
    ) {
      document.getElementsByClassName("player")[0].style.border =
        "dashed 3px #A50104";
      document.getElementsByClassName("player")[1].style.border =
        "dashed 3px #3bc14a";
    }
    if (
      document.getElementById("player2_name").innerHTML ==
      localStorage[`${user_data.game_id}_username`]
    ) {
      document.getElementsByClassName("player")[1].style.border =
        "dashed 3px #A50104";
      document.getElementsByClassName("player")[0].style.border =
        "dashed 3px #3bc14a";
    }
  } else {
    localStorage[`${user_data.game_id}_turn`] = "yes";
    if (
      document.getElementById("player1_name").innerHTML ==
      localStorage[`${user_data.game_id}_username`]
    ) {
      document.getElementsByClassName("player")[0].style.border =
        "dashed 3px #3bc14a";
      document.getElementsByClassName("player")[1].style.border =
        "dashed 3px #A50104";
    }
    if (
      document.getElementById("player2_name").innerHTML ==
      localStorage[`${user_data.game_id}_username`]
    ) {
      document.getElementsByClassName("player")[1].style.border =
        "dashed 3px #3bc14a";
      document.getElementsByClassName("player")[0].style.border =
        "dashed 3px #A50104";
    }
  }
  if (
    localStorage[`${user_data.game_id}_boxes_filled`] == 9 &&
    localStorage[`${user_data.game_id}_status`] == "ongoing"
  ) {
    console.log("draw" + localStorage[`${user_data.game_id}_status`]);
    num_users = 0;
    localStorage[`${user_data.game_id}_status`] = "over";
    const overlay = document.getElementsByClassName("error_wrap")[0];
    overlay.style.display = "block";
    const req_data = {
      game_id: user_data.game_id,
      host: "draw",
      player: "draw",
    };
    player1_draws.innerHTML = parseInt(player1_draws.innerHTML) + 1;
    player2_draws.innerHTML = parseInt(player2_draws.innerHTML) + 1;
    document.getElementsByClassName(
      "error_text"
    )[0].innerHTML = `Thats a draw!`;
    document.getElementsByClassName("error")[0].style.backgroundColor =
      "#4e8d7c";
    document.getElementsByClassName("error")[0].style.borderColor = "#045762";
    document.getElementsByClassName("error_text")[0].style.color = "#f3f2da";
    if (localStorage[`${user_data.game_id}_host`] == "yes") {
      await axios.post(`${baseBackend}/update_score_player`, req_data);
    }
    return;
  }
});

// Execute a move
async function execute_option(elem, num) {
  if (
    localStorage[`${user_data.game_id}_turn`] == "no" ||
    localStorage[`${user_data.game_id}_status`] != "ongoing"
  ) {
    return false;
  }
  const action = localStorage[`${user_data.game_id}_choice`];
  if (num == 5) {
    let flag = false;
    for (let i = 1; i < 9; i++) {
      if (localStorage[`${user_data.game_id}_box${i}_status`] != "none") {
        flag = true;
        break;
      }
    }
    if (!flag) {
      alert("First move cant be in the center.");
      return;
    }
  }
  if (num == 1) {
    if (
      localStorage[`${user_data.game_id}_box5_status`] == action &&
      localStorage[`${user_data.game_id}_box9_status`] == action
    ) {
      localStorage[`${user_data.game_id}_status`] = "over";
      socket.emit("move", {
        game_id: user_data.game_id,
        action,
        num,
        user: localStorage[`${user_data.game_id}_turn`],
        game_status: "over",
      });
      socket.emit("game_over", {
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      update_game_scores({
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      return;
    }
    if (
      localStorage[`${user_data.game_id}_box2_status`] == action &&
      localStorage[`${user_data.game_id}_box3_status`] == action
    ) {
      localStorage[`${user_data.game_id}_status`] = "over";
      socket.emit("move", {
        game_id: user_data.game_id,
        action,
        num,
        user: localStorage[`${user_data.game_id}_turn`],
        game_status: "over",
      });
      socket.emit("game_over", {
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      update_game_scores({
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      return;
    }
    if (
      localStorage[`${user_data.game_id}_box4_status`] == action &&
      localStorage[`${user_data.game_id}_box7_status`] == action
    ) {
      localStorage[`${user_data.game_id}_status`] = "over";
      socket.emit("move", {
        game_id: user_data.game_id,
        action,
        num,
        user: localStorage[`${user_data.game_id}_turn`],
        game_status: "over",
      });
      socket.emit("game_over", {
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      update_game_scores({
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      return;
    }
  }
  if (num == 2) {
    if (
      localStorage[`${user_data.game_id}_box1_status`] == action &&
      localStorage[`${user_data.game_id}_box3_status`] == action
    ) {
      localStorage[`${user_data.game_id}_status`] = "over";
      socket.emit("move", {
        game_id: user_data.game_id,
        action,
        num,
        user: localStorage[`${user_data.game_id}_turn`],
        game_status: "over",
      });
      socket.emit("game_over", {
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      update_game_scores({
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      return;
    }
    if (
      localStorage[`${user_data.game_id}_box5_status`] == action &&
      localStorage[`${user_data.game_id}_box8_status`] == action
    ) {
      localStorage[`${user_data.game_id}_status`] = "over";
      socket.emit("move", {
        game_id: user_data.game_id,
        action,
        num,
        user: localStorage[`${user_data.game_id}_turn`],
        game_status: "over",
      });
      socket.emit("game_over", {
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      update_game_scores({
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      return;
    }
  }
  if (num == 3) {
    if (
      localStorage[`${user_data.game_id}_box5_status`] == action &&
      localStorage[`${user_data.game_id}_box7_status`] == action
    ) {
      localStorage[`${user_data.game_id}_status`] = "over";
      socket.emit("move", {
        game_id: user_data.game_id,
        action,
        num,
        user: localStorage[`${user_data.game_id}_turn`],
        game_status: "over",
      });
      socket.emit("game_over", {
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      update_game_scores({
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      return;
    }
    if (
      localStorage[`${user_data.game_id}_box2_status`] == action &&
      localStorage[`${user_data.game_id}_box1_status`] == action
    ) {
      localStorage[`${user_data.game_id}_status`] = "over";
      socket.emit("move", {
        game_id: user_data.game_id,
        action,
        num,
        user: localStorage[`${user_data.game_id}_turn`],
        game_status: "over",
      });
      socket.emit("game_over", {
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      update_game_scores({
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      return;
    }
    if (
      localStorage[`${user_data.game_id}_box6_status`] == action &&
      localStorage[`${user_data.game_id}_box9_status`] == action
    ) {
      localStorage[`${user_data.game_id}_status`] = "over";
      socket.emit("move", {
        game_id: user_data.game_id,
        action,
        num,
        user: localStorage[`${user_data.game_id}_turn`],
        game_status: "over",
      });
      socket.emit("game_over", {
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      update_game_scores({
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      return;
    }
  }
  if (num == 4) {
    if (
      localStorage[`${user_data.game_id}_box1_status`] == action &&
      localStorage[`${user_data.game_id}_box7_status`] == action
    ) {
      localStorage[`${user_data.game_id}_status`] = "over";
      socket.emit("move", {
        game_id: user_data.game_id,
        action,
        num,
        user: localStorage[`${user_data.game_id}_turn`],
        game_status: "over",
      });
      socket.emit("game_over", {
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      update_game_scores({
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      return;
    }
    if (
      localStorage[`${user_data.game_id}_box5_status`] == action &&
      localStorage[`${user_data.game_id}_box6_status`] == action
    ) {
      localStorage[`${user_data.game_id}_status`] = "over";
      socket.emit("move", {
        game_id: user_data.game_id,
        action,
        num,
        user: localStorage[`${user_data.game_id}_turn`],
        game_status: "over",
      });
      socket.emit("game_over", {
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      update_game_scores({
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      return;
    }
  }
  if (num == 5) {
    if (
      localStorage[`${user_data.game_id}_box2_status`] == action &&
      localStorage[`${user_data.game_id}_box8_status`] == action
    ) {
      localStorage[`${user_data.game_id}_status`] = "over";
      socket.emit("move", {
        game_id: user_data.game_id,
        action,
        num,
        user: localStorage[`${user_data.game_id}_turn`],
        game_status: "over",
      });
      socket.emit("game_over", {
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      update_game_scores({
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      return;
    }
    if (
      localStorage[`${user_data.game_id}_box4_status`] == action &&
      localStorage[`${user_data.game_id}_box6_status`] == action
    ) {
      localStorage[`${user_data.game_id}_status`] = "over";
      socket.emit("move", {
        game_id: user_data.game_id,
        action,
        num,
        user: localStorage[`${user_data.game_id}_turn`],
        game_status: "over",
      });
      socket.emit("game_over", {
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      update_game_scores({
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      return;
    }
    if (
      localStorage[`${user_data.game_id}_box3_status`] == action &&
      localStorage[`${user_data.game_id}_box7_status`] == action
    ) {
      localStorage[`${user_data.game_id}_status`] = "over";
      socket.emit("move", {
        game_id: user_data.game_id,
        action,
        num,
        user: localStorage[`${user_data.game_id}_turn`],
        game_status: "over",
      });
      socket.emit("game_over", {
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      update_game_scores({
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      return;
    }
    if (
      localStorage[`${user_data.game_id}_box1_status`] == action &&
      localStorage[`${user_data.game_id}_box9_status`] == action
    ) {
      localStorage[`${user_data.game_id}_status`] = "over";
      socket.emit("move", {
        game_id: user_data.game_id,
        action,
        num,
        user: localStorage[`${user_data.game_id}_turn`],
        game_status: "over",
      });
      socket.emit("game_over", {
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      update_game_scores({
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      return;
    }
  }
  if (num == 6) {
    if (
      localStorage[`${user_data.game_id}_box3_status`] == action &&
      localStorage[`${user_data.game_id}_box9_status`] == action
    ) {
      localStorage[`${user_data.game_id}_status`] = "over";
      socket.emit("move", {
        game_id: user_data.game_id,
        action,
        num,
        user: localStorage[`${user_data.game_id}_turn`],
        game_status: "over",
      });
      socket.emit("game_over", {
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      update_game_scores({
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      return;
    }
    if (
      localStorage[`${user_data.game_id}_box5_status`] == action &&
      localStorage[`${user_data.game_id}_box4_status`] == action
    ) {
      localStorage[`${user_data.game_id}_status`] = "over";
      socket.emit("move", {
        game_id: user_data.game_id,
        action,
        num,
        user: localStorage[`${user_data.game_id}_turn`],
        game_status: "over",
      });
      socket.emit("game_over", {
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      update_game_scores({
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      return;
    }
  }
  if (num == 7) {
    if (
      localStorage[`${user_data.game_id}_box5_status`] == action &&
      localStorage[`${user_data.game_id}_box3_status`] == action
    ) {
      localStorage[`${user_data.game_id}_status`] = "over";
      socket.emit("move", {
        game_id: user_data.game_id,
        action,
        num,
        user: localStorage[`${user_data.game_id}_turn`],
        game_status: "over",
      });
      socket.emit("game_over", {
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      update_game_scores({
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      return;
    }
    if (
      localStorage[`${user_data.game_id}_box4_status`] == action &&
      localStorage[`${user_data.game_id}_box1_status`] == action
    ) {
      localStorage[`${user_data.game_id}_status`] = "over";
      socket.emit("move", {
        game_id: user_data.game_id,
        action,
        num,
        user: localStorage[`${user_data.game_id}_turn`],
        game_status: "over",
      });
      socket.emit("game_over", {
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      update_game_scores({
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      return;
    }
    if (
      localStorage[`${user_data.game_id}_box8_status`] == action &&
      localStorage[`${user_data.game_id}_box9_status`] == action
    ) {
      localStorage[`${user_data.game_id}_status`] = "over";
      socket.emit("move", {
        game_id: user_data.game_id,
        action,
        num,
        user: localStorage[`${user_data.game_id}_turn`],
        game_status: "over",
      });
      socket.emit("game_over", {
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      update_game_scores({
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      return;
    }
  }
  if (num == 8) {
    if (
      localStorage[`${user_data.game_id}_box5_status`] == action &&
      localStorage[`${user_data.game_id}_box2_status`] == action
    ) {
      localStorage[`${user_data.game_id}_status`] = "over";
      socket.emit("move", {
        game_id: user_data.game_id,
        action,
        num,
        user: localStorage[`${user_data.game_id}_turn`],
        game_status: "over",
      });
      socket.emit("game_over", {
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      update_game_scores({
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      return;
    }
    if (
      localStorage[`${user_data.game_id}_box7_status`] == action &&
      localStorage[`${user_data.game_id}_box9_status`] == action
    ) {
      localStorage[`${user_data.game_id}_status`] = "over";
      socket.emit("move", {
        game_id: user_data.game_id,
        action,
        num,
        user: localStorage[`${user_data.game_id}_turn`],
        game_status: "over",
      });
      socket.emit("game_over", {
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      update_game_scores({
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      return;
    }
  }
  if (num == 9) {
    if (
      localStorage[`${user_data.game_id}_box5_status`] == action &&
      localStorage[`${user_data.game_id}_box1_status`] == action
    ) {
      localStorage[`${user_data.game_id}_status`] = "over";
      socket.emit("move", {
        game_id: user_data.game_id,
        action,
        num,
        user: localStorage[`${user_data.game_id}_turn`],
        game_status: "over",
      });
      socket.emit("game_over", {
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      update_game_scores({
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      return;
    }
    if (
      localStorage[`${user_data.game_id}_box8_status`] == action &&
      localStorage[`${user_data.game_id}_box7_status`] == action
    ) {
      localStorage[`${user_data.game_id}_status`] = "over";
      socket.emit("move", {
        game_id: user_data.game_id,
        action,
        num,
        user: localStorage[`${user_data.game_id}_turn`],
        game_status: "over",
      });
      socket.emit("game_over", {
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      update_game_scores({
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      return;
    }
    if (
      localStorage[`${user_data.game_id}_box6_status`] == action &&
      localStorage[`${user_data.game_id}_box3_status`] == action
    ) {
      localStorage[`${user_data.game_id}_status`] = "over";
      socket.emit("move", {
        game_id: user_data.game_id,
        action,
        num,
        user: localStorage[`${user_data.game_id}_turn`],
        game_status: "over",
      });
      socket.emit("game_over", {
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      update_game_scores({
        user: localStorage[`${user_data.game_id}_username`],
        game_id: user_data.game_id,
      });
      return;
    }
  }
  socket.emit("move", {
    game_id: user_data.game_id,
    action,
    num,
    user: localStorage[`${user_data.game_id}_turn`],
    game_status: "ongoing",
  });
}

//Update game scores.
async function update_game_scores(obj) {
  const host = obj.user == player1_name.innerHTML ? "won" : "lost";
  const player = host == "won" ? "lost" : "won";
  const req_data = {
    game_id: user_data.game_id,
    host,
    player,
  };
  await axios.post(`${baseBackend}/update_score_player`, req_data);
}

// When game is over
socket.on("end_game", async (data) => {
  num_users = 0;
  localStorage[`${user_data.game_id}_status`] = "over";
  const overlay = document.getElementsByClassName("error_wrap")[0];
  overlay.style.display = "block";
  const host = data.user == player1_name.innerHTML ? "won" : "lost";
  const player = host == "won" ? "lost" : "won";
  if (host == "won") {
    player1_wins.innerHTML = parseInt(player1_wins.innerHTML) + 1;
    player2_losses.innerHTML = parseInt(player2_losses.innerHTML) + 1;
  } else if (host == "lost") {
    player1_losses.innerHTML = parseInt(player1_wins.innerHTML) + 1;
    player2_wins.innerHTML = parseInt(player2_losses.innerHTML) + 1;
  }

  document.getElementsByClassName(
    "error_text"
  )[0].innerHTML = `${data.user} won!`;
  document.getElementsByClassName("error")[0].style.backgroundColor = "#4e8d7c";
  document.getElementsByClassName("error")[0].style.borderColor = "#045762";
  document.getElementsByClassName("error_text")[0].style.color = "#f3f2da";
});

// Close modal.
function close_error_modal(elem) {
  const overlay = document.getElementsByClassName("change_name_wrap")[0];
  overlay.style.display = "none";
}

// Close modal after game.
function close_notification_player(elem) {
  const overlay = document.getElementsByClassName("error_wrap")[0];
  overlay.style.display = "none";
  window.location.href = `${baseFrontend}/index.html`;
}

// Restart game
function restart_game() {
  socket.emit("restart", { game_id: user_data.game_id });
}

socket.on("restart_game", async (data) => {
  document.getElementsByClassName("error_wrap")[0].style.display = "none";
  board.style.cursor = "context-menu";
  player2_name.innerHTML = data.game.player;
  player2_wins.innerHTML = data.game.player2_wins;
  player2_losses.innerHTML = data.game.player2_losses;
  player2_draws.innerHTML = data.game.player2_draws;
  player1_name.innerHTML = data.game.host;
  player1_wins.innerHTML = data.game.player1_wins;
  player1_losses.innerHTML = data.game.player1_losses;
  player1_draws.innerHTML = data.game.player1_draws;

  if (localStorage[`${user_data.game_id}_host`] == "no") {
    localStorage[user_data.game_id] = true;
    localStorage[`${user_data.game_id}_username`] = data.game.player;
    localStorage[`${user_data.game_id}_choice`] = data.game.player_move;
    localStorage[`${user_data.game_id}_turn`] = "no";
    localStorage[`${user_data.game_id}_host`] = "no";
    localStorage[`${user_data.game_id}_boxes_filled`] = 0;
    localStorage[`${user_data.game_id}_status`] = "ongoing";
    localStorage[`${user_data.game_id}_box1_status`] = "none";
    localStorage[`${user_data.game_id}_box2_status`] = "none";
    localStorage[`${user_data.game_id}_box3_status`] = "none";
    localStorage[`${user_data.game_id}_box4_status`] = "none";
    localStorage[`${user_data.game_id}_box5_status`] = "none";
    localStorage[`${user_data.game_id}_box6_status`] = "none";
    localStorage[`${user_data.game_id}_box7_status`] = "none";
    localStorage[`${user_data.game_id}_box8_status`] = "none";
    localStorage[`${user_data.game_id}_box9_status`] = "none";
    document.getElementsByClassName("player")[1].style.border =
      "dashed 3px #A50104";
  } else if (localStorage[`${user_data.game_id}_host`] == "yes") {
    localStorage[user_data.game_id] = true;
    localStorage[`${user_data.game_id}_turn`] = "yes";
    localStorage[`${user_data.game_id}_status`] = "ongoing";
    localStorage[`${user_data.game_id}_boxes_filled`] = 0;
    localStorage[`${user_data.game_id}_username`] = data.game.host;
    localStorage[`${user_data.game_id}_host`] = "yes";
    localStorage[`${user_data.game_id}_box1_status`] = "none";
    localStorage[`${user_data.game_id}_box2_status`] = "none";
    localStorage[`${user_data.game_id}_box3_status`] = "none";
    localStorage[`${user_data.game_id}_box4_status`] = "none";
    localStorage[`${user_data.game_id}_box5_status`] = "none";
    localStorage[`${user_data.game_id}_box6_status`] = "none";
    localStorage[`${user_data.game_id}_box7_status`] = "none";
    localStorage[`${user_data.game_id}_box8_status`] = "none";
    localStorage[`${user_data.game_id}_box9_status`] = "none";
    localStorage[`${user_data.game_id}_choice`] = data.game.host_move;
    document.getElementsByClassName("player")[0].style.border =
      "dashed 3px #3bc14a";
  }
  window.location.reload();
});

// Emit join of a user
socket.emit("join", {
  game_id: user_data.game_id,
});
