const {
  Player,
  createFood,
  hasEatenFood,
  setPlayerColor,
  setPlayerPosition,
} = require("./player/playerSnakeObject");

exports.serverSocket = (io) => {
  const players = [];
  var foodObject;
  const startTime = 30;
  var time = startTime;
  let game = null;

  const broadcastFood = (players) => {
    foodObject = createFood(players);
    io.sockets.emit("send food", foodObject);
  };

  const gameTimer = (players) => {
    if (time === 0) {
      io.sockets.emit("time up", players);
      clearInterval(game);
      return;
    }
    if (time <= startTime) {
      time--;
      io.sockets.emit("countdown", time);
    }
  };

  io.on("connection", (socket) => {
    let currentPlayer = new Player();
    // receive name from client
    socket.on("join game", (name, userId) => {
      if (name || userId) {
        currentPlayer.name = name;
        currentPlayer.id = userId;
        currentPlayer.instanceId = socket.id;
        io.sockets.emit("player instance", currentPlayer);
        console.log(name + " has joined game");
      }
    });

    socket.on("enter arena", (player) => {
      players.push(currentPlayer);
      setPlayerColor(players);
      // setPlayerPosition(players);

      io.sockets.emit("update playerslist", players);

      // start game and timer after 5 seconds
      if (players.length === 2) {
        setTimeout(() => {
          broadcastFood(players);
          console.log("Game started!");
          game = setInterval(gameTimer, 1500, players);
        }, 5000);
      }
    });

    socket.on("keycode", (key) => {
      if (key === 38) {
        //up
        currentPlayer.y--;
        currentPlayer.update();
        players.map((player) => {
          if (foodObject && hasEatenFood(player, foodObject)) {
            broadcastFood(players);
          }
        });
        io.sockets.emit("move up", { currentPlayer, players });
      }
      if (key === 40) {
        //down
        currentPlayer.y++;
        currentPlayer.update();
        players.map((player) => {
          if (foodObject && hasEatenFood(player, foodObject)) {
            broadcastFood(players);
          }
        });
        io.sockets.emit("move down", { currentPlayer, players });
      }
      if (key === 37) {
        //left
        currentPlayer.x--;
        currentPlayer.update();
        players.map((player) => {
          if (foodObject && hasEatenFood(player, foodObject)) {
            broadcastFood(players);
          }
        });
        io.sockets.emit("move left", { currentPlayer, players });
      }
      if (key === 39) {
        //right
        currentPlayer.x++;
        currentPlayer.update();
        players.map((player) => {
          if (foodObject && hasEatenFood(player, foodObject)) {
            broadcastFood(players);
          }
        });
        io.sockets.emit("move right", { currentPlayer, players });
      }
    });

    socket.on("disconnect", () => {
      if (currentPlayer) {
        players.splice(players.indexOf(currentPlayer), 1);
        console.log(currentPlayer.name + " just left: ");
        io.sockets.emit("player left", players);
        io.sockets.emit("update playerslist", players);
      }
    });
  });
};
