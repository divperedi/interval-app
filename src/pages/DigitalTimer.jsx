import React, { useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';
import TimerButton from '../components/TimerButton';
import { TimerContext } from '../components/TimerContext';

function DigitalTimer() {
    const location = useLocation();
    const navigate = useNavigate();
    const { time, stopTimer, isTimerFinished, breakTimeLeft, isBreakActive, isBreakMode } = useContext(TimerContext);

    useEffect(() => {
        if (isTimerFinished && !isBreakActive) {
            console.log('Timer finished completely');
            navigate('/timer/alarm');
        }
    }, [isTimerFinished, isBreakActive, navigate]);

    return (
        <div className="digital-timer-container">
            <section className="top-wrapper">
                <Menu />
                <Link to="/" className="app-name">interval</Link>
            </section>
            <section className="digital-clock">
                <div className="clock">
                    <p className="digital-time">{isBreakActive ? breakTimeLeft : time}</p>
                </div>
            </section>
            <TimerButton text="ABORT TIMER" onClick={stopTimer} />
        </div>
    );
}

export default DigitalTimer;