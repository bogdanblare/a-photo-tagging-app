import { useEffect, useState } from "react";
import { getLeaderboard } from "../firebase";

export default function LeaderboardModal() {
  const [leaderboard, setLeaderboard] = useState([]);

  const refreshPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const data = await getLeaderboard();
        setLeaderboard(data);
      } catch (error) {
        console.log("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderboardData();
  }, []);

  return (
    <div className="modal-background">
      <div id="leaderboard-modal-container" className="modal-container">
        <h1>Leaderboard</h1>
        {leaderboard.map((doc, index) => {
          return (
            <div className="leaderboard-player" key={index}>
              <p>
                {index + 1} - {doc.id}
              </p>
              <p>{doc.data.time}s</p>
            </div>
          );
        })}
        <button onClick={refreshPage} className="leaderboard-restart-button">
          Restart
        </button>
      </div>
    </div>
  );
}
