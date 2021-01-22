import React, { Component } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./Countdown.scss";

class Countdown extends Component {
  constructor(props) {
    super(props);

    this.endGameHandler = this.endGameHandler.bind(this);
    this.restartGameHandler = this.restartGameHandler.bind(this);
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
    if (this.props.time === 0) {
      console.log("Restart game");
      //implement restart game handler
    }
  }

  render() {
    return (
      <div className='countdown-container'>
        <button
          className='btn btn-info btn-xs w-10'
          onClick={this.restartGameHandler}>
          Restart
        </button>
        <div className='timer-container'>
          <div className='timer'>{this.props.time}</div>
        </div>

        <button className='btn btn-danger btn-xs w-10'>Finish</button>
      </div>
    );
  }
}

export default Countdown;
