import React, { useState, useEffect } from 'react';
import './PomodoroClock.css';

const PomodoroClock = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [cycles, setCycles] = useState(2);
  const [isBreak, setIsBreak] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsActive(false);
            if (isBreak) {
              setCycles(cycles - 1);
              setIsBreak(false);
              setMinutes(25);
            } else if (cycles === 0) {
              // All cycles completed
              // Handle logic here
            } else {
              setIsBreak(true);
              setMinutes(5);
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, minutes, seconds, cycles, isBreak]);

  const startTimer = () => {
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setMinutes(25);
    setSeconds(0);
    setCycles(2);
  };

  return (
    <div className="pomodoro-clock">
      <div className="timer">
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </div>
      <div className="controls">
        <button className="start-btn" onClick={startTimer} disabled={isActive}>
          Start
        </button>
        <button className="stop-btn" onClick={stopTimer} disabled={!isActive}>
          Stop
        </button>
        <button className="reset-btn" onClick={resetTimer} disabled={isActive}>
          Reset
        </button>
      </div>
      <div className="cycles">Cycles remaining: {cycles}</div>
    </div>
  );
};

export default PomodoroClock;
