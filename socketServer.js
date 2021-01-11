const {
  Player,
  createFood,
  hasEatenFood,
  setPlayerColor,
  setPlayerPosition,
} = require("./playerSnakeObject");

exports.socketServer = (io) => {
  const players = [];
  let foodObject;

  io.on("connection", (socket) => {
    let currentPlayer = new Player();

    const setNewFoodPosition = (players) => {
      foodObject = createFood(players);
      socket.broadcast.emit("send food", foodObject);
    };

    // receive name from client
    socket.on("join game", (name, userId) => {
      if (name || userId) {
        currentPlayer.name = name;
        currentPlayer.id = userId;
        currentPlayer.instanceId = socket.id;

        socket.emit("player instance", currentPlayer);
      }
    });

    socket.on("enter arena", (playerInstance) => {
      players.push(playerInstance);
      setPlayerColor(players);
      // setPlayerPosition(players);
    });

    socket.on("start game", () => {
      socket.broadcast.emit("update playerslist", players);

      setNewFoodPosition(players);
    });

    socket.on("keycode", (key) => {
      //   console.log(playerInstance.update);
      //   return;
      if (key === 38) {
        //up
        currentPlayer.y--;
        currentPlayer.update();
        players.map((player) => {
          if (hasEatenFood(player, foodObject)) {
            setNewFoodPosition(players);
          }
        });
        socket.broadcast.emit("player moved", currentPlayer, players);
      } else if (key === 40) {
        //down
        currentPlayer.y++;
        currentPlayer.update();
        players.map((player) => {
          if (hasEatenFood(player, foodObject)) {
            setNewFoodPosition(players);
          }
        });
        socket.broadcast.emit("player moved", currentPlayer, players);
      } else if (key === 37) {
        //left
        currentPlayer.x--;
        currentPlayer.update();
        players.map((player) => {
          if (hasEatenFood(player, foodObject)) {
            setNewFoodPosition(players);
          }
        });
        socket.broadcast.emit("player moved", currentPlayer, players);
      } else if (key === 39) {
        //right
        currentPlayer.x++;
        currentPlayer.update();
        players.map((player) => {
          if (hasEatenFood(player, foodObject)) {
            setNewFoodPosition(players);
          }
        });
        socket.broadcast.emit("player moved", currentPlayer, players);
      }
    });

    socket.on("disconnect", () => {
      if (currentPlayer.name) {
        players.splice(players.indexOf(currentPlayer), 1);
        console.log(currentPlayer.name + " just left: ");
        socket.emit("player left ", players);
        socket.broadcast.emit("update playerlist", players);
      }
    });
  });
};

// socket.broadcast.emit("check player", currentPlayer, players);

// socket.on("check score", (data) => {
//   checkScoreLimit(data);
// });
