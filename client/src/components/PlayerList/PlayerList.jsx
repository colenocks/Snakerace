import React, { Component } from "react";
import { socket } from "../../clientSocket";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./PlayerList.scss";
import { withRouter } from "react-router-dom";

class PlayerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerInstance: null,
      players: [],
    };
    this.leaveGameHandler = this.leaveGameHandler.bind(this);
    this.updatePlayerList = this.updatePlayerList.bind(this);
  }

  componentDidMount() {
    socket.on("update playerslist", (players) => {
      this.updatePlayerList(players);
    });

    const players = JSON.parse(localStorage.getItem("players"));
    const playerInstance = JSON.parse(localStorage.getItem("playerInstance"));
    if (players || playerInstance) {
      this.setState({ players, playerInstance });
    }
  }

  updatePlayerList(players) {
    localStorage.setItem("players", JSON.stringify(players));
    this.setState({ players });
  }

  leaveGameHandler() {
    const { players, playerInstance } = this.state;
    if (playerInstance || players) {
      if (confirm("Are you sure you want to leave?")) {
        players.splice(players.indexOf(playerInstance), 1);
        this.updatePlayerList(players);
        localStorage.removeItem("playerInstance");
        socket.disconnect();
        this.props.history.push("/");
        location.reload(); //this causes the canvas element to re-render
      }
    }
  }

  render() {
    const { players } = this.props;
    return (
      <aside className='playerlist-container'>
        <ul className='list-group w-75 d-flex mx-auto'>
          <li className='card card-sm mb-0 mt-4 text-dark text-center'>
            <h5>Active Players</h5>
          </li>
          {players
            ? players.map((player) => {
                return (
                  <li
                    id={player.color}
                    key={player.id}
                    className='list-group-item text-capitalize'>
                    {player.name}
                    <span className='badge badge-primary badge-pill'>
                      {player.score}
                    </span>
                  </li>
                );
              })
            : null}
        </ul>
        <div className='card card-sm mt-3 w-75 d-flex mx-auto'>
          <button
            className='btn btn-md btn-danger'
            onClick={this.leaveGameHandler}>
            Leave
          </button>
        </div>
      </aside>
    );
  }
}

export default withRouter(PlayerList);
