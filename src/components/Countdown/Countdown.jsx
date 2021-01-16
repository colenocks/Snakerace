import React, { Component } from "react";
import { socket } from "../../clientSocket";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Countdown.scss";

class Countdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: 10,
      disableRestartBtn: true,
      disableFinishBtn: true,
      disableStartBtn: false,
    };

    this.countdownHandler = this.countdownHandler.bind(this);
    this.startGameHandler = this.startGameHandler.bind(this);
    this.endGameHandler = this.endGameHandler.bind(this);
    this.restartGameHandler = this.restartGameHandler.bind(this);
  }

  countdownHandler() {
    let time = this.state.startTime;
    if (time === 0) {
      this.setState({
        disableStartBtn: true,
        disableRestartBtn: false,
        disableFinishBtn: false,
        startTime: "Time up", //reset
      });
      this.startGameHandler();
      socket.emit("game over");
      toast("Game over!", { type: "dark" });
      return;
    }
    if (time <= 10) {
      time--;
      this.setState({
        startTime: time,
      });
    }
  }

  startGameHandler() {
    let startTime = this.state.startTime;
    let startGame;
    localStorage.setItem("hasStartedGame", true);
    if (startTime <= 10) {
      this.setState({ disableStartBtn: true });
      socket.emit("start game");
      startGame = setInterval(this.countdownHandler, 1500);
    }
    if (startTime === 11 || startTime === 0) {
      socket.emit("time up");
      clearInterval(startGame);
    }
  }

  endGameHandler() {
    console.log("Game Ended");
    /* TODOS:
      1. reset canvas, 
      2. send score value to database
      3. update leaderboard
      4. return to entrance
    */
  }

  restartGameHandler() {
    /* TODOS:
      2. send score value to database
      3. update leaderboard
    */
    this.setState({
      disableRestartBtn: true,
      disableStartBtn: false,
      startTime: 10,
    });
  }

  render() {
    return (
      <div className='countdown-container'>
        <div className='button-container'>
          <button
            className='btn btn-info btn-xs w-10'
            onClick={this.restartGameHandler}
            disabled={this.state.disableRestartBtn}>
            Restart
          </button>
          <button
            className='btn btn-success btn-xs w-15'
            onClick={this.startGameHandler}
            disabled={this.state.disableStartBtn}>
            Start Game
          </button>
          <button
            className='btn btn-danger btn-xs w-10'
            disabled={this.state.disableFinishBtn}>
            Finish
          </button>
        </div>
        <div className='timer-container'>
          <div className='timer'>{this.state.startTime}</div>
        </div>
      </div>
    );
  }
}

export default Countdown;
