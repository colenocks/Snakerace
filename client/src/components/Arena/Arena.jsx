import React, { Component } from "react";
import { Link } from "react-router-dom";
import LeaderBoard from "../LeaderBoard/LeaderBoard";
import PlayerList from "../PlayerList/PlayerList";
import Countdown from "../Countdown/Countdown";
import { socket } from "../../clientSocket";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Arena.scss";

class Arena extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cvsHeight: 300,
      cvsWidth: 600,
      cellSize: 20,
      foodObject: {},
      allPlayers: [],
      playerInstance: null,
      direction: "",
      time: 30,
    };

    this.clearCanvasHandler = this.clearCanvasHandler.bind(this);
    this.startGameHandler = this.startGameHandler.bind(this);
    this.timeUpHandler = this.timeUpHandler.bind(this);
    this.drawPlayerSnake = this.drawPlayerSnake.bind(this);
    this.drawFood = this.drawFood.bind(this);
    this.setFoodPosition = this.setFoodPosition.bind(this);
    this.moveSnakeHandler = this.moveSnakeHandler.bind(this);
    this.updatePlayerInstance = this.updatePlayerInstance.bind(this);
    this.updateCanvasHandler = this.updateCanvasHandler.bind(this);
    this.displayCountDown = this.displayCountDown.bind(this);
  }

  componentDidMount() {
    if (this.canvasElem) {
      socket.on("update playerslist", (players) => {
        this.setState({ allPlayers: players });
        this.updateCanvasHandler(players);
      });

      let direction;
      this.startGameHandler(direction);
    }
  }

  componentDidUpdate() {
    // if (socket.active) {
    //   socket.on("player left", (players) => {
    //     console.log("player has left");
    //     this.updateCanvasHandler(players);
    //   });
    // }
  }

  startGameHandler(direction) {
    let game = setInterval(() => {
      this.displayCountDown();
      this.canvasElem.onkeydown = (event) => {
        event.preventDefault();
        if (event.keyCode === 38 && direction !== "down") {
          direction = "up";
        }
        if (event.keyCode === 40 && direction !== "up") {
          direction = "down";
        }
        if (event.keyCode === 37 && direction !== "right") {
          direction = "left";
        }
        if (event.keyCode === 39 && direction !== "left") {
          direction = "right";
        }
      };
      this.moveSnakeHandler(direction);
      this.timeUpHandler(game);
    }, 1000 / 3);
  }

  timeUpHandler(game) {
    socket.on("time up", (players) => {
      clearInterval(game);
      this.setState({ allPlayers: players });
    });
  }

  displayCountDown() {
    socket.on("countdown", (time) => {
      this.setState({ time });
    });
  }

  moveSnakeHandler(direction) {
    switch (direction) {
      case "up":
        socket.emit("keycode", 38);
        socket.on("move up", (data) => {
          this.updatePlayerInstance(data.currentPlayer);
          this.updateCanvasHandler(data.players);
        });
        break;
      case "down":
        socket.emit("keycode", 40);
        socket.on("move down", (data) => {
          this.updatePlayerInstance(data.currentPlayer);
          this.updateCanvasHandler(data.players);
        });
        break;
      case "left":
        socket.emit("keycode", 37);
        socket.on("move left", (data) => {
          this.updatePlayerInstance(data.currentPlayer);
          this.updateCanvasHandler(data.players);
        });
        break;
      case "right":
        socket.emit("keycode", 39);
        socket.on("move right", (data) => {
          this.updatePlayerInstance(data.currentPlayer);
          this.updateCanvasHandler(data.players);
        });
        break;
    }
  }

  drawFood({ x, y }) {
    const ctx = this.canvasElem.getContext("2d");
    const { cellSize: cell } = this.state;
    ctx.fillStyle = "#ec5a20";
    ctx.fillRect(x * cell, y * cell, cell, cell);
    ctx.fillStyle = "#000";
    ctx.strokeRect(x * cell, y * cell, cell, cell);
  }

  drawPlayerSnake(player, playerSnake) {
    const ctx = this.canvasElem.getContext("2d");
    const { cellSize: cell } = this.state;
    if (playerSnake.length >= 1) {
      playerSnake.map((snake, index) => {
        ctx.fillStyle = index === 0 ? player.color : "#fff";
        ctx.fillRect(snake.x * cell, snake.y * cell, cell, cell);
        ctx.fillStyle = "#000";
        ctx.strokeRect(snake.x * cell, snake.y * cell, cell, cell);
      });
    } else {
      ctx.fillStyle = player.color;
      ctx.fillRect(player.x * cell, player.y * cell, cell, cell);
      ctx.fillStyle = "#fff";
      ctx.strokeRect(player.x * cell, player.y * cell, cell, cell);
    }
    //call the draw food function here
    if (this.state.foodObject) {
      this.drawFood(this.state.foodObject);
    }
  }

  updatePlayerInstance(playerInstance) {
    this.setState({ playerInstance });
  }

  updateCanvasHandler(allPlayers) {
    if (allPlayers) {
      this.clearCanvasHandler();
      allPlayers.map((player) => {
        this.drawPlayerSnake(player, player.snake);
      });
      this.setFoodPosition();
    }
  }

  setFoodPosition() {
    socket.on("send food", (food) => {
      this.setState({ foodObject: food }, () => this.drawFood(food));
    });
  }

  clearCanvasHandler() {
    if (this.canvasElem) {
      const ctx = this.canvasElem.getContext("2d");
      const { cvsHeight, cvsWidth } = this.state;
      ctx.clearRect(0, 0, cvsWidth, cvsHeight);
    }
  }

  render() {
    const { user_session } = this.props;
    return user_session ? (
      <div className='arena-container'>
        <section className='row'>
          <Countdown time={this.state.time} />
        </section>
        <section className='row'>
          <div className='col-lg-9'>
            <section className='mx-auto canvas-container'>
              <article className='canvas-wrapper'>
                <canvas
                  height='300'
                  width='600'
                  tabIndex='1'
                  ref={(elem) => (this.canvasElem = elem)}>
                  Your Browser does not support the canvas element
                </canvas>
              </article>
            </section>
          </div>
          <section className='col-lg-3 w-75 mx-auto'>
            <PlayerList players={this.state.allPlayers} />
            <LeaderBoard />
          </section>
        </section>
      </div>
    ) : (
      <div className='container'>
        <h4>You are not logged in</h4>
        <Link to='/'>Go to home page</Link>
      </div>
    );
  }
}

export default Arena;
