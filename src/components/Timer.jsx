import React, { useState, useEffect, useRef } from "react";
import { FiSettings, FiRefreshCcw, FiPlay, FiPause } from "react-icons/fi";
import { useAuth } from "../Firebase/AuthContext";
import { addTimerSession } from "../Firebase/userDataService";

const Timer = () => {
  const { user, userLoggedIn } = useAuth();
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState("Pomodoro");
  const [showSettings, setShowSettings] = useState(false);
  const [alarmPlaying, setAlarmPlaying] = useState(false);
  const [sessionStart, setSessionStart] = useState(null);
  const [focusedTime, setFocusedTime] = useState(0);
  const [timerStart, setTimerStart] = useState(null);
  const [initialDuration, setInitialDuration] = useState(0);

  const [defaults, setDefaults] = useState({
    Pomodoro: { min: 25, sec: 0 },
    ShortBreak: { min: 5, sec: 0 },
    LongBreak: { min: 15, sec: 0 },
  });

  const timeoutRef = useRef(null);
  const alarmRef = useRef(null);
  const lastMinuteSavedRef = useRef(0);

  const saveCurrentSession = async () => {
    if (sessionStart) {
      const sessionDuration = Math.round((Date.now() - sessionStart) / 60000);
      const remainingMinutes = Math.max(
        0,
        sessionDuration - lastMinuteSavedRef.current,
      );

      if (userLoggedIn && user && remainingMinutes > 0) {
        await addTimerSession(user.uid, remainingMinutes);
        setTimeout(
          () => window.dispatchEvent(new CustomEvent("timerUpdate")),
          100,
        );
      }

      setFocusedTime(0);
      setSessionStart(null);
      lastMinuteSavedRef.current = 0;
    }
  };

  const toggleTimer = () => {
    setIsActive((prev) => {
      if (!prev) {
        setSessionStart(Date.now());
        setTimerStart(Date.now());
        setInitialDuration(minutes * 60 + seconds);
        lastMinuteSavedRef.current = 0;
      } else {
        saveCurrentSession();
        setTimerStart(null);
      }
      return !prev;
    });
  };

  useEffect(() => {
    if (isActive && timerStart) {
      timeoutRef.current = setInterval(() => {
        const elapsedSeconds = Math.floor((Date.now() - timerStart) / 100);
        const remaining = Math.max(0, initialDuration * 10 - elapsedSeconds);
        const elapsedMinutes = Math.floor(elapsedSeconds / 600);

        const newMinutes = Math.floor(remaining / 600);
        const newSeconds = Math.floor((remaining % 600) / 10);

        setMinutes(newMinutes);
        setSeconds(newSeconds);

        // Save exactly when seconds reach 00 (every minute)
        if (
          newSeconds === 0 &&
          elapsedMinutes > lastMinuteSavedRef.current &&
          elapsedMinutes > 0 &&
          userLoggedIn &&
          user
        ) {
          addTimerSession(user.uid, 1).then(() => {
            window.dispatchEvent(new CustomEvent("timerUpdate"));
          });

          lastMinuteSavedRef.current = elapsedMinutes;
        }

        if (remaining <= 0) {
          clearInterval(timeoutRef.current);
          setIsActive(false);
          setAlarmPlaying(true);
          alarmRef.current.play();

          const remainingMinutes = Math.max(
            0,
            elapsedMinutes - lastMinuteSavedRef.current,
          );

          if (userLoggedIn && user && remainingMinutes > 0) {
            addTimerSession(user.uid, remainingMinutes).then(() => {
              setTimeout(
                () => window.dispatchEvent(new CustomEvent("timerUpdate")),
                100,
              );
            });
          }

          lastMinuteSavedRef.current = 0;
          setFocusedTime(0);
          setSessionStart(null);
          setTimerStart(null);
        }
      }, 100);
    } else {
      clearInterval(timeoutRef.current);
    }

    return () => clearInterval(timeoutRef.current);
  }, [isActive, timerStart, initialDuration, sessionStart, userLoggedIn, user]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      saveCurrentSession();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [sessionStart, focusedTime, userLoggedIn, user]);

  useEffect(() => {
    document.title = isActive
      ? `FocusLab - ${String(minutes).padStart(2, "0")}:${String(
          seconds,
        ).padStart(2, "0")}`
      : minutes === 0 && seconds === 0
        ? "Time's Up!"
        : "FocusLab";
  }, [minutes, seconds, isActive]);

  const setTimerMode = async (newMode) => {
    if (isActive && sessionStart) {
      const sessionDuration = Math.round((Date.now() - sessionStart) / 60000);
      const remainingMinutes = Math.max(
        0,
        sessionDuration - lastMinuteSavedRef.current,
      );

      if (userLoggedIn && user && remainingMinutes > 0) {
        await addTimerSession(user.uid, remainingMinutes);
        setTimeout(
          () => window.dispatchEvent(new CustomEvent("timerUpdate")),
          100,
        );
      }
    }

    setFocusedTime(0);
    setSessionStart(null);
    lastMinuteSavedRef.current = 0;

    const modeKey =
      newMode === "Short Break"
        ? "ShortBreak"
        : newMode === "Long Break"
          ? "LongBreak"
          : "Pomodoro";

    const time = defaults[modeKey];
    setMode(newMode);
    setMinutes(time.min);
    setSeconds(time.sec);
    clearTimeout(timeoutRef.current);
    setIsActive(false);
    setAlarmPlaying(false);
  };

  const resetTimer = async () => {
    if (isActive && sessionStart) {
      const sessionDuration = Math.round((Date.now() - sessionStart) / 60000);
      const remainingMinutes = Math.max(
        0,
        sessionDuration - lastMinuteSavedRef.current,
      );

      if (userLoggedIn && user && remainingMinutes > 0) {
        await addTimerSession(user.uid, remainingMinutes);
        setTimeout(
          () => window.dispatchEvent(new CustomEvent("timerUpdate")),
          100,
        );
      }
    }

    setFocusedTime(0);
    setSessionStart(null);
    lastMinuteSavedRef.current = 0;
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

    for (const [label, time] of Object.entries(newDefaults)) {
      if (time.min === 0 && time.sec === 0) {
        alert(`${label} time cannot be 00:00`);
        return;
      }
    }

    setDefaults(newDefaults);
    setShowSettings(false);
  };

  useEffect(() => {
    const modeKey =
      mode === "Short Break"
        ? "ShortBreak"
        : mode === "Long Break"
          ? "LongBreak"
          : "Pomodoro";

    const time = defaults[modeKey];
    setMinutes(time.min);
    setSeconds(time.sec);
    setIsActive(false);
    setAlarmPlaying(false);
  }, [defaults, mode]);

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

      <div className="flex bg-[#EFD6B1] mt-7 justify-center items-center mx-auto p-1 rounded-full border-2 border-[#C49B59] text-sm overflow-hidden max-w-lg">
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

      <div className="mt-12 flex justify-center items-center">
        <div className="flex justify-between items-center w-full max-w-xs mx-auto">
          <FiSettings
            className="text-[#4C4037] text-3xl cursor-pointer hover:scale-110 transition-all p-0"
            onClick={() => setShowSettings(true)}
          />
          {isActive ? (
            <FiPause
              className="text-[#4C4037] text-4xl cursor-pointer hover:scale-110 transition-all"
              onClick={toggleTimer}
            />
          ) : (
            <FiPlay
              className="text-[#4C4037] text-4xl cursor-pointer hover:scale-110 transition-all"
              onClick={toggleTimer}
            />
          )}
          <FiRefreshCcw
            className="text-[#4C4037] text-3xl cursor-pointer hover:rotate-90 transition-all p-0"
            onClick={resetTimer}
          />
        </div>
      </div>

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
                  className="px-4 py-2 bg-[#ae5d32]  text-white rounded hover:brightness-110 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <audio ref={alarmRef} src="/audio/Alarm.mp3" />
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
