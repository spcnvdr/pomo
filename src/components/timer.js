import React, {useState, useEffect} from 'react';
import '../index.css';

const Timer = (props) => {
    const [seconds, setSeconds] = useState(props.work);
    const [inWork, setInWork] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [rounds, setRounds] = useState(0);

    const formatSeconds = (seconds) => {
        var date = new Date(0);
        date.setSeconds(seconds);
        var timeString = date.toISOString().substr(11, 8);
        return timeString;
    }

    useEffect(() => {
        let interval = null;
        if(isActive) {
            interval = setInterval(() => {
                if(seconds > 0) {
                    setSeconds(seconds => seconds - 1);
                } else {
                    setIsActive(!isActive);
                    clearInterval(interval);
                    setInWork(!inWork);
                    setRounds(rounds + 1);
                    console.log(rounds);
                    if(rounds >= 6) {
                        setRounds(0);
                        setSeconds(props.rest * 3);
                    } else {
                        setSeconds(inWork ? props.work : props.rest);
                    }
                }
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds, rounds, inWork, props.work, props.rest]);

    return (
        <div className='container'>
            <div className='row center-div'>
                <h2>
                    {formatSeconds(seconds)}
                </h2>
            </div>                
            <div className='row center-div'>
                <button onClick={() => {setIsActive(!isActive);}}>
                    {isActive ? (String.fromCodePoint(0x23F8)) : (String.fromCodePoint(0x25B6))}
                </button>
            </div>
        </div>
    )
}

export default Timer