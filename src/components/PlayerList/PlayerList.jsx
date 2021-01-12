import React, { Component } from "react";
import { getBaseURL } from "../../AxiosConfig";
import socketIOClient from "socket.io-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./PlayerList.scss";

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
    const players = JSON.parse(localStorage.getItem("players"));
    const playerInstance = JSON.parse(localStorage.getItem("playerInstance"));
    if (players || playerInstance) {
      this.setState({ players, playerInstance });
    }
    const socket = socketIOClient(getBaseURL());
    socket.on("update playerslist", (players) => {
      this.updatePlayerList(players);
    });
  }

  updatePlayerList(players) {
    localStorage.setItem("players", JSON.stringify(players));
    this.setState({ players });
  }

  leaveGameHandler() {
    const { players, playerInstance } = this.state;
    if (players && playerInstance) {
      if (confirm("Are you sure you want to leave?")) {
        const socket = socketIOClient(getBaseURL());
        window.location.reload();
        socket.close();
        players.splice(players.indexOf(playerInstance), 1);
        localStorage.removeItem("playerInstance");
        this.updatePlayerList(players);
        toast("A player has left");
      }
    }
  }
  /* TODOS:
        1. increment badge number based on scores from each food eaten
       
    */
  render() {
    const { players } = this.state;
    return (
      <aside className='playerlist-container'>
        <ul className='list-group w-50 d-flex mx-auto'>
          <li className='card card-sm mb-0 mt-4 text-dark text-center'>
            <h5>Active Players</h5>
          </li>
          {players
            ? players.map((player) => {
                return (
                  <li
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
        <div className='card card-sm mt-3 w-50 d-flex mx-auto'>
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

export default PlayerList;
