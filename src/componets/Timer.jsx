import {useEffect, useRef, useState} from "react";
import TimerButton from "./TimerButton.jsx";

function getDefaultCount() {
  const count = localStorage.getItem('count');
  return count ? +count : 0;
}

function getDefaultLaps() {
  const laps = localStorage.getItem('laps');
  return laps ? JSON.parse(laps) : [];
}

export function Timer() {
  const [count, setCount] = useState(getDefaultCount)
  const [isCounting, setIsCounting] = useState(false)
  const [laps, setLaps] = useState(getDefaultLaps)

  const stopWatchRef = useRef(null)

  const reset = () => {
    setCount(0)
    setIsCounting(false)
    setLaps([])
  }

  const formatTime = (count) => {
    let hours = Math.floor(count / (60 * 60 * 10));
    if (hours < 10) {
      hours = `0${hours}`
    }
    let remainder = count % (60 * 60 * 10);

    let minutes = Math.floor(remainder / (60 * 10));
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    remainder %= (60 * 10);

    let sec = Math.floor(remainder / 10);
    if (sec < 10) {
      sec = `0${sec}`
    }
    remainder %= 10;
    if (remainder < 10) {
      remainder = `0${remainder}`
    }

    return `${hours}:${minutes}:${sec}.${remainder}`;
  }

  useEffect(() => {
    localStorage.setItem('count', count)
    localStorage.setItem('laps', JSON.stringify(laps))
  }, [count, laps]);

  useEffect(() => {
    if (isCounting) {
      stopWatchRef.current = setInterval(() => {
        setCount(seconds => seconds + 1)
      }, 100)
    }

    return () => {
      stopWatchRef.current && clearInterval(stopWatchRef.current);
      stopWatchRef.current = null;
    };
  }, [isCounting]);

  return (
      <>

        <p className="text-2xl sm:text-4xl font-bold text-center drop-shadow-lg mb-4">
          {formatTime(count)}
        </p>
        <div className="flex flex-row items-center gap-4 mb-4">
          {isCounting ?
              <TimerButton onClick={() => setIsCounting(false)}>Stop</TimerButton> :
              <TimerButton onClick={() => setIsCounting(true)}>Start</TimerButton>}
          {isCounting && <TimerButton onClick={() => setLaps(laps => [count, ...laps])}>Lap</TimerButton>}
          <TimerButton onClick={reset}>Reset</TimerButton>
        </div>
        <h3 className='text-xl sm:text-2xl font-bold text-center drop-shadow-lg mb-2'>Laps</h3>
        {laps.map((timer, i) => (
            <p key={i}>{formatTime(timer)}</p>
        ))}
      </>
  );
}