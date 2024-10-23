import React, { useContext, useEffect } from 'react';
import TimerButton from '../components/TimerButton';
import { useNavigate } from 'react-router-dom';
import { TimerContext } from '../components/TimerContext';

function Alarm() {
    const navigate = useNavigate();
    const { isTimerFinished } = useContext(TimerContext);

    useEffect(() => {
        if (!isTimerFinished) {
            navigate('/timer');
        }
    }, [isTimerFinished, navigate]);

    function newTimer() {
        navigate('/timer');
    }

    return (
        <div className="alarm-container">
            <section className="rings-wrapper">
                <img src="/ring4.png" alt="bigger ring" className="bigger-ring" />
                <img src="/ring3.png" alt="big ring" className="big-ring"/>
                <img src="/ring2.png" alt="medium ring" className="medium-ring"/>
                <section className="small-ring-container">
                    <img src="/ring1.png" alt="small ring" className="small-ring"/>
                    <section className="alarm-wrapper">
                        <img src="/alarm.png" alt="alarm-clock-icon" className="alarm-icon" />
                        <h1 className="alarm-text">Time's up!</h1>
                    </section>
                </section>
            </section>
            <TimerButton text="SET NEW TIMER" onClick={newTimer}/>
        </div>
    )
}

export default Alarm;
