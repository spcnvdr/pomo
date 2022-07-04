import React, {useState} from 'react';
import Timer from './components/timer';
import './index.css';


const App = () => {
    const [workMin, setWorkMin] = useState("25");
    const [restMin, setRestMin] = useState("5");
    const [begin, setBegin] = useState(false);

    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='column'>
                        <label>Work Time</label>
                        <input className='pomo-input' type='number' value={workMin} onChange={e => {setWorkMin(e.target.value)}} />
                    </div>
                    <div className='column'>
                        <label>Rest Time</label>
                        <input type='number' value={restMin} onChange={e => {setRestMin(e.target.value)}} />
                    </div>
                    <div className='column'></div><div className='column'></div>
                </div>
                <div className='row'>
                    <div className='column'>
                    <button className='button' onClick={() => {setBegin(!begin)}}>{begin ? ('Stop Timer') : ('Start Timer')}</button>
                    </div>
                </div>
            </div>
            <div className='row'></div>
            {begin ? (<Timer work={workMin} rest={restMin} />) : (<div></div>)}
        </div>
    )
}

export default App
