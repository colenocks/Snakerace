import React, { Component } from "react";
import "./Countdown.scss";

class Countdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: 60,
      disableRestartBtn: true,
      disableFinishBtn: true,
      disableStartBtn: false,
    };

    this.countdownHandler = this.countdownHandler.bind(this);
    this.beginCountdown = this.beginCountdown.bind(this);
    this.endGameHandler = this.endGameHandler.bind(this);
    this.restartGameHandler = this.beginCountdown.bind(this);
  }

  countdownHandler() {
    let time = this.state.startTime;
    if (time === 0) {
      clearInterval(this.beginCountdown);
      this.setState({
        disableStartBtn: true,
        disableRestartBtn: false,
        disableFinishBtn: false,
      });
      return;
    }
    time--;
    this.setState(
      {
        startTime: time,
      },
      () => console.log(this.state.startTime)
    );
  }

  beginCountdown() {
    if (this.state.startTime > 0) {
      setInterval(this.countdownHandler, 1500);
    }
  }

  endGameHandler() {
    /* TODOS:
      1. reset canvas, 
      2. send score value to database
      3. update leaderboard
      4. return to entrance
    */
  }

  restartGameHandler() {
    /* TODOS:
      1. reset canvas
      2. send score value to database
      3. update leaderboard
      4. enable Start button and reset startTime = 60sec
      5. User click on start to start playing.
    */
  }

  render() {
    return (
      <div className='countdown-container'>
        <div className='button-container'>
          <button
            className='btn btn-info btn-xs w-10'
            disabled={this.state.disableRestartBtn}>
            Restart
          </button>
          <button
            className='btn btn-success btn-xs w-15'
            onClick={this.beginCountdown}
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
