import React, { useState, useEffect, useRef } from "react";
import { FiSettings, FiRefreshCcw, FiPlay, FiPause } from "react-icons/fi";
import { useLocation } from "react-router-dom";

const Timer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState("Pomodoro");
  const [showSettings, setShowSettings] = useState(false);
  const [alarmPlaying, setAlarmPlaying] = useState(false);

  const [defaults, setDefaults] = useState({
    Pomodoro: { min: 25, sec: 0 },
    ShortBreak: { min: 5, sec: 0 },
    LongBreak: { min: 15, sec: 0 },
  });

  const timeoutRef = useRef(null);
  const alarmRef = useRef(null);

  const toggleTimer = () => setIsActive((prev) => !prev);

  // timer logic
  useEffect(() => {
    if (isActive) {
      timeoutRef.current = setTimeout(() => {
        if (seconds > 0) {
          setSeconds((prev) => prev - 1);
        } else if (minutes > 0) {
          setMinutes((prev) => prev - 1);
          setSeconds(59);
        } else {
          clearTimeout(timeoutRef.current);
          setIsActive(false);
          setAlarmPlaying(true); // alarm 
          alarmRef.current.play();      
        }
      }, 1000);
    } else {
      clearTimeout(timeoutRef.current);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [isActive, seconds, minutes]);

  // updating the document title
  useEffect(() => { 
    if (isActive) {
      document.title = `FocusLab - ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    } else if (minutes === 0 && seconds === 0) {
      document.title = "Time's Up!";
    } else {
      document.title = 'FocusLab';
    }
  }, [minutes, seconds, isActive]);

  // modes settings
  const setTimerMode = (newMode) => {
    setMode(newMode);
    const time =
      defaults[
        newMode === "Short Break"
          ? "ShortBreak"
          : newMode === "Long Break"
          ? "LongBreak"
          : "Pomodoro"
      ];
    setMinutes(time.min);
    setSeconds(time.sec);
    clearTimeout(timeoutRef.current);
    setIsActive(false);
    setAlarmPlaying(false);
  };

  const resetTimer = () => {
    setTimerMode(mode);
  };

  const updateDefaults = (e) => {
    e.preventDefault();
    const form = e.target;
  
    const newDefaults = {
      Pomodoro: {
        min: parseInt(form.pomMin.value),
        sec: parseInt(form.pomSec.value),
      },
      ShortBreak: {
        min: parseInt(form.shortMin.value),
        sec: parseInt(form.shortSec.value),
      },
      LongBreak: {
        min: parseInt(form.longMin.value),
        sec: parseInt(form.longSec.value),
      },
    };
  
    // Rejecting any 00:00 setting
    for (const [label, time] of Object.entries(newDefaults)) {
      if (time.min === 0 && time.sec === 0) {
        alert(`${label} time cannot be 00:00`);
        return;
      }
    }
  
    setDefaults(newDefaults);
    setShowSettings(false);
  };

  // updating time with deafaults change
  useEffect(() => {
    const time =
      defaults[
        mode === "Short Break"
          ? "ShortBreak"
          : mode === "Long Break"
          ? "LongBreak"
          : "Pomodoro"
      ];
    setMinutes(time.min);
    setSeconds(time.sec);
    setIsActive(false);
    setAlarmPlaying(false);
  }, [defaults, mode]);


// stopping the alarm
const stopAlarm = () => {
  alarmRef.current.pause();
  alarmRef.current.currentTime = 0;
  setAlarmPlaying(false);
  setTimerMode(mode); 
};

  return (
    <div className="relative w-full h-auto bg-[#F7E5C5] border-2 rounded-2xl border-[#C49B59] p-4 text-center">
      <h1 className="text-9xl text-[#4C3A26]">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </h1>

      <div className="flex bg-[#EFD6B1] mt-7 justify-center items-center mx-10 p-1 rounded-full border-2 border-[#C49B59] text-sm overflow-hidden">
        <button
          className="px-3 py-5 text-[#4C4037] hover:scale-110 transition-all"
          onClick={() => setTimerMode("Pomodoro")}
        >
          Pomodoro
        </button>
        <div className="h-10 w-[0.1rem] bg-[#C49B59] mx-2" />
        <button
          className="px-3 py-5 text-[#4C4037] hover:scale-110 transition-all"
          onClick={() => setTimerMode("Short Break")}
        >
          Short Break
        </button>
        <div className="h-10 w-[0.1rem] bg-[#C49B59] mx-2" />
        <button
          className="px-3 py-5 text-[#4C4037] hover:scale-110 transition-all"
          onClick={() => setTimerMode("Long Break")}
        >
          Long Break
        </button>
      </div>

      <div className="mt-12 flex justify-between items-center">
        <FiSettings
          className="text-[#4C4037] text-3xl cursor-pointer hover:scale-110 transition-all mx-2 p-0"
          onClick={() => setShowSettings(true)}
        />
        {isActive ? (
          <FiPause
            className="text-[#4C4037] text-4xl cursor-pointer hover:scale-110 transition-all"
            onClick={toggleTimer}
          />
        ) : (
          <FiPlay
            className="text-[#4C4037] text-4xl cursor-pointer hover:scale-110 transition-all ml-1"
            onClick={toggleTimer}
          />
        )}

        <FiRefreshCcw
          className="text-[#4C4037] text-3xl cursor-pointer hover:rotate-90 transition-all mx-2 p-0"
          onClick={resetTimer}
        />
      </div>

      {/* Settings */}
      {showSettings && (
        <div className="absolute top-0 left-0 w-full h-full bg-[#00000066] flex items-center justify-center z-10">
          <div className="bg-[#EFD6B1] text-[#4C3A26] border-2 border-[#C49B59] rounded-2xl p-6 w-[90%] max-w-md">
            <h2 className="text-2xl mb-4 font-semibold">Settings</h2>

            <form onSubmit={updateDefaults} className="flex flex-col gap-4">
              <div>
                <label className="block mb-1">Pomodoro</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="pomMin"
                    min="0"
                    required
                    defaultValue={defaults.Pomodoro.min}
                    className="w-1/2 p-2 rounded border"
                    placeholder="Minutes"
                  />
                  <p className="mt-2 font-bold"> : </p>
                  <input
                    type="number"
                    name="pomSec"
                    min="0"
                    max="59"
                    required
                    defaultValue={defaults.Pomodoro.sec}
                    className="w-1/2 p-2 rounded border"
                    placeholder="Seconds"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1">Short Break</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="shortMin"
                    min="0"
                    required
                    defaultValue={defaults.ShortBreak.min}
                    className="w-1/2 p-2 rounded border"
                  />
                  <p className="mt-2 font-bold"> : </p>
                  <input
                    type="number"
                    name="shortSec"
                    min="0"
                    max="59"
                    required
                    defaultValue={defaults.ShortBreak.sec}
                    className="w-1/2 p-2 rounded border"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1">Long Break</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="longMin"
                    min="0"
                    required
                    defaultValue={defaults.LongBreak.min}
                    className="w-1/2 p-2 rounded border"
                  />
                  <p className="mt-2 font-bold"> : </p>
                  <input
                    type="number"
                    name="longSec"
                    min="0"
                    max="59"
                    required
                    defaultValue={defaults.LongBreak.sec}
                    className="w-1/2 p-2 rounded border"
                  />
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#C49B59] text-white rounded hover:brightness-110 transition"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 bg-gray-300 text-[#4C4037] rounded hover:brightness-105 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/*  Alarm  */}
      <audio ref={alarmRef} src="./public/audio/continu.mp3" />
      {alarmPlaying && (
        <button
          className="mt-4 px-4 py-2 w-full bg-[#C49B59] text-white rounded hover:brightness-110 transition"
          onClick={stopAlarm}
        >
          Stop Alarm
        </button> 
      )}
    </div>
  );
};

export default Timer;
