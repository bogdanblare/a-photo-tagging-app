import { addToLeaderboard } from "../firebase";
import { useState } from "react";
import LeaderboardModal from "./LeaderboardModal";

export default function Modal(props) {
  const [submitted, setSubmitted] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    const username = document.querySelector(".modal-container input").value;
    await addToLeaderboard(e, username, props.userTime);
    setSubmitted(true);
  };

  return (
    <div id="modal-add-leaderboard" className="modal-background">
      <div className="modal-container">
        <h2>You finished in {props.userTime} seconds!</h2>
        <p>Submit your score to the leaderboard!</p>
        <form onSubmit={submitHandler}>
          <input placeholder="username" maxLength={16} required></input>
          <div className="modal-buttons">
            <button
              type="button"
              className="modal-cancel-button"
              onClick={() => setSubmitted(true)}
            >
              CANCEL
            </button>
            <button className="modal-submit-button">Submit Score</button>
          </div>
        </form>
        {submitted && <LeaderboardModal />}
      </div>
    </div>
  );
}
