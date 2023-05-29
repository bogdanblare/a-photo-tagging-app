import React, { useState, useEffect } from "react";

function Timer(props) {
  let { setUserTime, userTime, foundCharacters } = props;
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Update the timer every millisecond
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 0.01);
    }, 10);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  // Format the seconds with two digits after the decimal point
  const formattedSeconds = (seconds % 60).toFixed(2);

  // Format the seconds and minutes
  const minutes = Math.floor(seconds / 60);
  const formattedTime = `${minutes
    .toString()
    .padStart(2, "0")}:${formattedSeconds.padStart(5, "0")}`;

  useEffect(() => {
    if (foundCharacters === 3) setUserTime(`${seconds.toFixed(2)}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foundCharacters]);

  return (
    <div className="timer-container">
      <h1>{userTime === 0 ? formattedTime : userTime}</h1>
    </div>
  );
}

export default Timer;
