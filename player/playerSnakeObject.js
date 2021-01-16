//These have to be the same as the canvas dimensions in frontend canvas(@Arena Component)
const canvasWidth = 600;
const canvasHeight = 300;
const cell = 20;

class Player {
  constructor() {
    this.id;
    this.instanceId;
    this.name;
    this.x = Math.floor(Math.random() * (canvasWidth / cell - 1));
    this.y = Math.floor(Math.random() * (canvasHeight / cell - 1));
    this.color;
    this.speed = 1;
    this.snake = [];
    this.score = 0;
    this.newLength = false;
  }
  //when snake moves
  update() {
    if (this.newLength === false) {
      this.snake.pop(); //pop only when snake eats food
    }
    //make boundary porous
    if (this.x < 0) {
      this.x = canvasWidth / cell - 1;
    } else if (this.x > canvasWidth / cell - 1) {
      this.x = 0;
    }
    if (this.y < 0) {
      this.y = canvasHeight / cell - 1;
    } else if (this.y > canvasHeight / cell - 1) {
      this.y = 0;
    }
    //set new position coordinates to the new cell
    this.snake.unshift({
      x: this.x,
      y: this.y,
    });

    //reset newLength
    this.newLength = false;
  }
}

const hasEatenFood = (player, food) => {
  if (player.x == food.x && player.y == food.y) {
    player.score = player.score + 2;
    player.newLength = true;
    return true;
  }
};

const setPlayerPosition = (players) => {
  players.map((player) => {
    switch (index) {
      case 0:
        player.x = 0;
        player.y = 0;
        break;
      case 1:
        player.x = canvasWidth / cell - 1;
        player.y = canvasHeight / cell - 1;
        break;
    }
  });
};

const colorArray = ["blue", "red", "green", "yellow"];
const setPlayerColor = (players) => {
  players.map((player, index) => {
    player.color = colorArray[index];
  });
};

const createFood = (players) => {
  let x = Math.floor(Math.random() * (canvasWidth / cell - 1));
  let y = Math.floor(Math.random() * (canvasHeight / cell - 1));
  players.map((player) => {
    //check each players snake head
    if (player.x === x && player.y === y) {
      createFood(players);
    }
  });
  return { x: x, y: y };
};

module.exports = {
  Player,
  setPlayerColor,
  setPlayerPosition,
  createFood,
  hasEatenFood,
};
