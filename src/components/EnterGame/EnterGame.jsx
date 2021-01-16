import React, { Component } from "react";
import { socket } from "../../clientSocket";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EnterGame.scss";

class EnterGame extends Component {
  constructor() {
    super();
    this.state = {
      username: null,
      user_session: null,
      playerInstance: {},
      disableJoinBtn: false,
      disableEnterBtn: true,
    };

    this.joinGameHandler = this.joinGameHandler.bind(this);
    this.enterGameHandler = this.enterGameHandler.bind(this);
  }

  componentDidMount() {
    const username = localStorage.getItem("username");
    const user_session = localStorage.getItem("user_session");
    if (username || user_session) {
      this.setState({
        username: username,
        user_session: user_session,
      });
    }
  }

  joinGameHandler() {
    const { username, user_session } = this.state;
    if (username || user_session) {
      if (!socket.connected) {
        socket.connect();
      }
      this.setState({
        disableJoinBtn: true,
        disableEnterBtn: false,
      });
      toast("You just joined the game", { type: "info" });
      socket.emit("join game", username, user_session);

      //get player instance
      socket.on("player instance", (playerInstance) => {
        if (playerInstance) {
          this.setState({ playerInstance });
          localStorage.setItem(
            "playerInstance",
            JSON.stringify(playerInstance)
          );
        }
      });
    } else {
      toast("You are not logged in");
    }
  }

  enterGameHandler() {
    // display race arena
    socket.emit("enter arena", this.state.playerInstance);
    this.setState({
      disableJoinBtn: false,
      disableEnterBtn: true,
    });
    this.props.history.push("/arena");
  }

  render() {
    return (
      <section className='entergame-container'>
        <h4 className='entergame-text'>
          Hi{" "}
          <span className='text-uppercase text-danger'>
            {this.state.username}
          </span>
          , click <span className='text-primary'>join</span> to wait to be
          connected and then <span className='text-success'>play</span> to enter
          game room
        </h4>
        <div className='entergame-button'>
          <ul>
            <li>
              <input
                onClick={this.joinGameHandler}
                type='button'
                className='btn btn-primary btn-sm'
                value='Join'
                disabled={this.state.disableJoinBtn}
              />
            </li>
            <li>
              <input
                onClick={this.enterGameHandler}
                type='button'
                className='btn btn-success btn-sm'
                value='play'
                disabled={this.state.disableEnterBtn}
              />
            </li>
          </ul>
        </div>
      </section>
    );
  }
}

export default EnterGame;
