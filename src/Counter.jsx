import React from "react";
import "./index.css";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { useState, useEffect } from "react";

const Counter = () => {
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [hour, setHour] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        if (hour === 0 && minutes === 0 && seconds === 0) {
          clearInterval(interval);
          setIsActive(false);
        } else {
          if (seconds === 0) {
            if (minutes === 0) {
              setHour((prevHour) => prevHour - 1);
              setMinutes(59);
            } else {
              setMinutes((prevMinutes) => prevMinutes - 1);
            }
            setSeconds(59);
          } else {
            setSeconds((prevSeconds) => prevSeconds - 1);
          }
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, hour, minutes, seconds]);

  const handleStart = () => {
    if ((hour > 0 || minutes > 0 || seconds > 0) && !isActive) {
      setIsActive(true);
    }
  };

  const handleInputChange = (e) => {
    const inputMinutes = parseInt(e.target.value, 10) || 0;
    setHour(0); // Reset hours when input changes
    setMinutes(inputMinutes);
    setSeconds(0);
    if (inputMinutes > 0) {
      setIsActive(false);
    }
  };

  return (
    <div className="container">
    <div className="text">
        <label> Enter Minutes </label>
    </div>
      <input type="text" value={minutes} onChange={handleInputChange} />

    <div className="btn">
    <div >
    <PlayCircleIcon  onClick={handleStart} style={{ fontSize: "50px" }} />
    </div>
    <h1>{`${String(hour).padStart(2, "0")}:
       ${String(minutes).padStart(2,"0")}:
       ${String(seconds).padStart(2, "0")}`}
    </h1>
  </div>
  </div>
  );
};

export default Counter;
