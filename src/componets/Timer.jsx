import {useEffect, useReducer} from "react";
import TimerButton from "./TimerButton.jsx";

const TimerActionType = Object.freeze({
  START: 'START',
  STOP: 'STOP',
  RESET: 'RESET',
  LAP: 'LAP',
  TICK: 'TICK'
});


const countReducer = (state, {type}) => {
  switch (type) {
    case TimerActionType.START:
      return {
        ...state,
        isCounting: true,
      };
    case TimerActionType.STOP:
      return {
        ...state,
        isCounting: false,
      };
    case TimerActionType.RESET:
      return {
        count: 0,
        isCounting: false,
        laps: [],
      };
    case TimerActionType.LAP:
      return {
        ...state,
        laps: [state.count, ...state.laps],
      };
    case TimerActionType.TICK:
      return {
        ...state,
        count: state.count + 1,
      };
    default:
      return state;
  }
}

function getDefaultCount() {
  const count = localStorage.getItem('count');
  return count ? +count : 0;
}

function getDefaultLaps() {
  const laps = localStorage.getItem('laps');
  return laps ? JSON.parse(laps) : [];
}

export function Timer() {
  const [{count, isCounting, laps}, dispatch] = useReducer(
      countReducer, {count: getDefaultCount(), isCounting: false, laps: getDefaultLaps()}
  )

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
    let stopWatchId = null
    if (isCounting) {
      stopWatchId = setInterval(() => {
        dispatch({type: 'TICK'})
      }, 100)
    }

    return () => {
      stopWatchId && clearInterval(stopWatchId);
      stopWatchId = null;
    };
  }, [isCounting]);

  return (
      <>
        <p className="text-2xl sm:text-4xl font-bold text-center drop-shadow-lg mb-4">
          {formatTime(count)}
        </p>
        <div className="flex flex-row items-center gap-4 mb-4">
          {isCounting ?
              <TimerButton onClick={() => dispatch({type: 'STOP'})}>Stop</TimerButton> :
              <TimerButton onClick={() => dispatch({type: 'START'})}>Start</TimerButton>}
          {isCounting && <TimerButton onClick={() => dispatch({type: 'LAP'})}>Lap</TimerButton>}
          <TimerButton onClick={() => dispatch({type: 'RESET'})}>Reset</TimerButton>
        </div>
        <h3 className='text-xl sm:text-2xl font-bold text-center drop-shadow-lg mb-2'>Laps</h3>
        {laps.map((timer, i) => (
            <p key={i}>{formatTime(timer)}</p>
        ))}
      </>
  );
}