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

    const count = () => {
        if(seconds > 0) {
            setSeconds(seconds => seconds - 1);
        } else {
            setIsActive(!isActive);
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
    }

    useEffect(() => {
        let interval = null;
        if(isActive) {
            interval = setInterval(() => {
                // do not automatically start the next round
                (seconds <= 0 && clearInterval(interval));
                count();
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    });

    return (
        <div className='container'>
            <div className='row center-div'>
                <h1>
                    {formatSeconds(seconds)}
                </h1>
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