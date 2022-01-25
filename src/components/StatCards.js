import React from "react";
import { useData } from "../contexts/DataContext";
import "../styles/statCards.css";

export default function StatCards(props) {
  const { userData, teamsData } = useData();
  console.log(props.teamId);
  const teamName = props.teamId;
  let roundsPlayed = 0;

  const record = () => {
    let wins = 0;
    let loses = 0;
    let ties = 0;
    teamsData[teamName].rounds.forEach((round) => {
      const points = round.points;
      if (round.completed) {
        roundsPlayed += 1;
        if (points > 9) {
          wins += 1;
        } else if (points === 9) {
          ties += 1;
        } else {
          loses += 1;
        }
      }
    });
    return `${wins}-${loses}-${ties}`;
  };

  return (
    <div className="spl_stats-container">
      <div className="spl_stat-card">
        <h4>Record</h4>
        <p>{record()}</p>
      </div>
      <div className="spl_stat-card">
        <h4>Total Points</h4>
        <p>{teamsData[teamName].totalPoints}</p>
      </div>
      <div className="spl_stat-card">
        <h4>Rounds Played</h4>
        <p>{roundsPlayed}/14</p>
      </div>
    </div>
  );
}
