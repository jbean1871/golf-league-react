import React, { useEffect, useState } from "react";
import { useData } from "../contexts/DataContext";
import "../styles/leaderboard.css";

export default function Leaderboard() {
  const { teamData, teamsData } = useData();
  if (!teamsData) {
    return <h3>Loading Leaderboard</h3>;
  }
  function teamScore(team) {
    return teamsData[team].totalPoints;
  }

  return (
    <div className="m-2">
      <div className="leaderboard-header">
        <div className="position-header">Position</div>
        <div className="team-members-header">Team</div>
        <div className="total-points-header">Points</div>
        <div></div>
      </div>
      {Object.keys(teamsData).map((team, index) => {
        return (
          <div key={index} className="leaderboard-row">
            <div className="position">0{index + 1}</div>
            <div className="team-members">
              {teamsData[team].membersArr[0]}
              {teamsData[team].membersArr[1] ? " & " : ""}
              {teamsData[team].membersArr[1] && teamsData[team].membersArr[1]}
            </div>
            <div className="total-points">{teamScore(team)}</div>
            <div></div>
          </div>
        );
      })}
    </div>
  );
}
