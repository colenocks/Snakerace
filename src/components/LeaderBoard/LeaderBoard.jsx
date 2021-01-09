import React from "react";

const LeaderBoard = (props) => {
  const { pointsTable } = props;
  return (
    <div className='leaderboard-container w-50 d-flex mx-auto mt-4'>
      <table className='table table-sm table-dark table-striped table-hover'>
        <thead>
          <tr>
            <th colSpan='3' className='text-warning'>
              Leader Board
            </th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Player</th>
            <th scope='col'>Point</th>
          </tr>
        </thead>
        <tbody>
          {/* {pointsTable.map((player, index)=>{
              <tr key={player._id}>
              <th scope='row'>{index+1}</th>
              <td>{player.username}</td>
              <td>{player.points}</td>
            </tr>
          })} */}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoard;
