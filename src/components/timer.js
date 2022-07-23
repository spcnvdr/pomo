import React, {useEffect, useRef, useReducer} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'
import '../index.css';
import alarm from "./alarm.mp3"


const Timer = (props) => {
    const initialState = {
        inWork: false,
        isActive: false,
        restLength: props.rest,
        rounds: 0,
        seconds: props.work,
        sound: props.sound,
        workLength: props.work
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const interval = useRef(0);

    const formatSeconds = (seconds) => {
        var date = new Date(0);
        date.setSeconds(seconds);
        var timeString = date.toISOString().substr(11, 8);
        return timeString;
    }

    useEffect(() => {
        if (!state.isActive){
            return;
        }
        
        interval.current = setInterval(() => dispatch({type: "tick"}), 1000);

        return () => {
            clearInterval(interval.current)
            interval.current = 0;
        }
    }, [state.isActive]);

    return (
        <div className='container'>
            <div className='row center-div'>
                <h1>
                    {formatSeconds(state.seconds)}
                </h1>
            </div>                
            <div className='row center-div'>
                <button className='button' onClick={() => dispatch({type: "toggle"})}>
                    {state.isActive ? <FontAwesomeIcon icon={faPause} size="lg" /> : <FontAwesomeIcon icon={faPlay} size="lg" />}
                </button>
            </div>
        </div>
    )
}

const playSound = () => {
    var audio = new Audio(alarm);
    audio.play();
}

function reducer(state, action) {
    switch (action.type) {
      case "toggle":
        return { ...state, isActive: !state.isActive };
      case "tick":
        if (state.seconds > 0){
            return { ...state, seconds: state.seconds - 1 };
        } else {
            (state.sound && playSound())
            if (state.rounds >= 6) {
                return { ...state, isActive: !state.isActive, inWork: !state.inWork,
                    rounds: -1, seconds: state.restLength * 3};
            } else {
                let s = state.inWork ? state.workLength : state.restLength;
                return { ...state, isActive: !state.isActive, inWork: !state.inWork,
            rounds: state.rounds + 1, seconds: s};
            }
        }
      default:
        throw new Error();
    }
  }

export default Timer
