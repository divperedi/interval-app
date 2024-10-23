import React, { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';
import TimerButton from '../components/TimerButton';
import { TimerContext } from '../components/TimerContext';

function DigitalTimer() {
    const navigate = useNavigate();
    const { time, stopTimer, isTimerFinished, breakTimeLeft, isBreakActive, isBreakMode, showMessage } = useContext(TimerContext);

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
                {showMessage ? (
                    <h1 className="break-indicator">{isBreakMode ? '5 MIN BREAK' : 'INTERVAL'}</h1>
                ) : (
                    <>
                        <div className="clock">
                            <p className="digital-time">{isBreakActive ? breakTimeLeft : time}</p>
                        </div>
                    </>
                )}
            </section>
            <TimerButton text="ABORT TIMER" onClick={stopTimer} />
        </div>
    );
}

export default DigitalTimer;