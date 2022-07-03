import React, {useState, useEffect} from 'react';
import './index.css';

const Timer = (props) => {
    const [seconds, setSeconds] = useState(props.work);
    const [inWork, setInWork] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [rounds, setRounds] = useState(0);
    let interval = null;

    const formatSeconds = (seconds) => {
        var date = new Date(0);
        date.setSeconds(seconds);
        var timeString = date.toISOString().substr(11, 8);
        return timeString;
    }

    function toggle() {
        setIsActive(!isActive);
    }

    useEffect(() => {
        if(isActive) {
            if(seconds > 0) {
                interval = setInterval(() => {
                    setSeconds(seconds => seconds - 1);
                }, 1000);
            } else {
                toggle();
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
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    return (
        <div className='container'>
            <div className='row time'>
                <h2>
                    {formatSeconds(seconds)}
                </h2>
            </div>                
            <div className='row time'>
                <button onClick={toggle}>
                    {isActive ? (String.fromCodePoint(0x23F8)) : (String.fromCodePoint(0x25B6))}
                </button>
            </div>
        </div>
    )
}

const App = () => {
    const [workMin, setWorkMin] = useState(25);
    const [restMin, setRestMin] = useState(5);
    const [begin, setBegin] = useState(false);

    const handleClick = () => {
        setBegin(!begin);
    }

    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='column-25'>
                        <label>Work Time</label>
                        <input type='number' value={workMin} onChange={e => {setWorkMin(e.target.value)}} />
                    </div>
                    <div className='column-25'>
                        <label>Rest Time</label>
                        <input type='number' value={restMin} onChange={e => {setRestMin(e.target.value)}} />
                    </div>
                </div>
                <div className='row'>
                    <button onClick={handleClick}>{begin ? ('Stop Timer') : ('Start Timer')}</button>
                </div>
            </div>
            {begin ? (<Timer work={workMin} rest={restMin} />) : (<div></div>)}
        </div>
    )
}

export default App
