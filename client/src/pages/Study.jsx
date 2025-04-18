// src/pages/Study.jsx
import React, { useState, useEffect } from 'react';

export const Study = () => {
  const [customMinutes, setCustomMinutes] = useState(25); // Default to 25 minutes
  const [secondsLeft, setSecondsLeft] = useState(customMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [rewards, setRewards] = useState([]);

  const startTimer = () => {
    // Reset the timer with the current customMinutes value when starting
    setSecondsLeft(customMinutes * 60);
    setIsRunning(true);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(customMinutes * 60);
  };

  // Update secondsLeft when customMinutes changes
  useEffect(() => {
    if (!isRunning) {
      setSecondsLeft(customMinutes * 60);
    }
  }, [customMinutes, isRunning]);

  // Timer countdown
  useEffect(() => {
    let interval;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => setSecondsLeft((prev) => prev - 1), 1000);
    } else if (isRunning && secondsLeft === 0) {
      fetchPokemon();
      resetTimer();
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  const fetchPokemon = async () => {
    const res = await fetch('http://localhost:3000/api/reward');
    const data = await res.json();
    setRewards((prev) => [...prev, data]);
  };

  const handleMinutesChange = (e) => {
    const minutes = parseInt(e.target.value);
    if (!isNaN(minutes) && minutes > 0) {
      setCustomMinutes(minutes);
    }
  };

  const setPresetDuration = (seconds) => {
    setCustomMinutes(seconds / 60);
    if (!isRunning) {
      setSecondsLeft(seconds);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">🎯 Focus Timer & Pokémon Rewards</h1>

      <div className="flex flex-col space-y-4 mb-6">
        <div className="flex items-center space-x-4">
          <div className="text-4xl font-mono">
            {Math.floor(secondsLeft / 60)
              .toString()
              .padStart(2, '0')}
            :{(secondsLeft % 60).toString().padStart(2, '0')}
          </div>

          <button onClick={startTimer} className="btn btn-primary">
            Start
          </button>

          <button onClick={resetTimer} className="btn btn-secondary">
            Reset
          </button>
        </div>

        <div className="flex flex-col space-y-2">
          <p className="font-medium">Focus for:</p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setPresetDuration(10)}
              disabled={isRunning}
              className="btn btn-sm btn-outline"
            >
              10 sec
            </button>
            <button
              onClick={() => setPresetDuration(60)}
              disabled={isRunning}
              className="btn btn-sm btn-outline"
            >
              1 min
            </button>
            <button
              onClick={() => setPresetDuration(600)}
              disabled={isRunning}
              className="btn btn-sm btn-outline"
            >
              10 min
            </button>
            <button
              onClick={() => setPresetDuration(1800)}
              disabled={isRunning}
              className="btn btn-sm btn-outline"
            >
              30 min
            </button>
            <button
              onClick={() => setPresetDuration(3600)}
              disabled={isRunning}
              className="btn btn-sm btn-outline"
            >
              1 hour
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <label htmlFor="timer-minutes">Or set custom duration (minutes):</label>
          <input
            type="number"
            id="timer-minutes"
            min="1"
            max="120"
            value={customMinutes}
            onChange={handleMinutesChange}
            disabled={isRunning}
            className="input input-bordered w-20"
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {rewards.map((reward, idx) => (
          <div key={idx} className="card bg-base-200 shadow-md">
            <figure>
              <img src={reward.image} alt={reward.name} className="h-32 object-contain" />
            </figure>
            <div className="card-body p-2 items-center">
              <p className="font-bold capitalize">{reward.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};