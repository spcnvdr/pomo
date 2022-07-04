import React, {useState} from 'react';
import './index.css';
import Timer from './components/timer';

const App = () => {
    const [workMin, setWorkMin] = useState("25");
    const [restMin, setRestMin] = useState("5");
    const [begin, setBegin] = useState(false);

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
                    <button onClick={() => {setBegin(!begin)}}>{begin ? ('Stop Timer') : ('Start Timer')}</button>
                </div>
            </div>
            {begin ? (<Timer work={workMin} rest={restMin} />) : (<div></div>)}
        </div>
    )
}

export default App
