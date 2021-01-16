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
  var currentPlayer = null;

  const setNewFoodPosition = (players) => {
    foodObject = createFood(players);
    io.sockets.emit("send food", foodObject);
  };

  io.on("connection", (socket) => {
    // receive name from client
    socket.on("join game", (name, userId) => {
      currentPlayer = new Player();
      if (name || userId) {
        currentPlayer.name = name;
        currentPlayer.id = userId;
        currentPlayer.instanceId = socket.id;
        io.sockets.emit("player instance", currentPlayer);
        console.log("joined game");
      }
    });

    socket.on("enter arena", (player) => {
      players.push(currentPlayer);
      setPlayerColor(players);
      // setPlayerPosition(players);

      io.sockets.emit("update playerslist", players);
    });

    socket.on("start game", () => {
      setNewFoodPosition(players);
      console.log("started game");
    });

    socket.on("keycode", (key) => {
      if (key === 38) {
        //up
        currentPlayer.y--;
        currentPlayer.update();
        players.map((player) => {
          if (hasEatenFood(player, foodObject)) {
            setNewFoodPosition(players);
          }
        });
        io.sockets.emit("move up", { currentPlayer, players });
      }
      if (key === 40) {
        //down
        currentPlayer.y++;
        currentPlayer.update();
        players.map((player) => {
          if (hasEatenFood(player, foodObject)) {
            setNewFoodPosition(players);
          }
        });
        io.sockets.emit("move down", { currentPlayer, players });
      }
      if (key === 37) {
        //left
        currentPlayer.x--;
        currentPlayer.update();
        players.map((player) => {
          if (hasEatenFood(player, foodObject)) {
            setNewFoodPosition(players);
          }
        });
        io.sockets.emit("move left", { currentPlayer, players });
      }
      if (key === 39) {
        //right
        currentPlayer.x++;
        currentPlayer.update();
        players.map((player) => {
          if (hasEatenFood(player, foodObject)) {
            setNewFoodPosition(players);
          }
        });
        io.sockets.emit("move right", { currentPlayer, players });
      }
    });

    socket.on("game over", () => {
      io.sockets.emit("time up", players);
    });

    socket.on("disconnect", () => {
      if (currentPlayer) {
        players.splice(players.indexOf(currentPlayer), 1);
        console.log(currentPlayer.name + " just left: ");
        socket.emit("player left", players);
        socket.broadcast.emit("update playerlist", players);
      }
    });
  });
};
