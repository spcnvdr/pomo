import React, {useEffect, useRef, useReducer} from 'react';
import '../index.css';


const Timer = (props) => {
    const initialState = {
        inWork: false,
        isActive: false,
        restLength: props.rest,
        rounds: 0,
        seconds: props.work,
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
                <button onClick={() => dispatch({type: "toggle"})}>
                    {state.isActive ? (String.fromCodePoint(0x23F8)) : (String.fromCodePoint(0x25B6))}
                </button>
            </div>
        </div>
    )
}


function reducer(state, action) {
    switch (action.type) {
      case "toggle":
        return { ...state, isActive: !state.isActive };
      case "tick":
        if (state.seconds > 0){
            return { ...state, seconds: state.seconds - 1 };
        } else {
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
