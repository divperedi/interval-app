import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';
import TimerButton from '../components/TimerButton';
import { TimerContext } from '../components/TimerContext';

function SetTimer() {
    const minutes = Array.from({ length: 60 }, (_, i) => i + 1);
    let [currentMinute, setCurrentMinute] = useState(0);
    const { initializeTimer, stopTimer, timer } = useContext(TimerContext);

    const [isIntervalChecked, setIsIntervalChecked] = useState(false);
    const [isBreakChecked, setIsBreakChecked] = useState(false);

    const navigate = useNavigate();

    function handleStartTimer() {
        stopTimer(); // Stop any ongoing timer
        // Pass the selected minutes, and whether intervals or breaks are checked
        initializeTimer(minutes[currentMinute], isIntervalChecked, isBreakChecked);
        
        // Pass both `isIntervalChecked` and `isBreakChecked` to ensure correct mode is passed
        navigate('/timer/analog', { 
            state: { 
                selectedMinutes: minutes[currentMinute], 
                isIntervalChecked, 
                isBreakChecked 
            } 
        });
    }

    function handleLeftArrow() {
        if (currentMinute > 0) {
            setCurrentMinute(currentMinute - 1);
        }
    }

    function handleRightArrow() {
        if (currentMinute < minutes.length - 1) {
            setCurrentMinute(currentMinute + 1);
        }
    }

    return (
        <div className="set-timer-container">
            <section className="top-wrapper">
                <Menu />
                <Link to="/" className="app-name">interval</Link>
            </section>
            <section className="minutes-wrapper">
                <button className="minutes-left-arrow" onClick={handleLeftArrow}>
                    <img src="/left-arrow.png" alt="left-arrow" className="left-arrow" />
                </button>
                <section className="time-desc">
                    <h3 className="minutes-text">{minutes[currentMinute]}</h3>
                    <h5>minutes</h5>
                </section>
                <button className="minutes-right-arrow" onClick={handleRightArrow}>
                    <img src="/right-arrow.png" alt="right-arrow" className="right-arrow" />
                </button>
            </section>
            <section className="breaks">
                <div className="checkbox-div">
                    <input
                        type="checkbox"
                        id="interval-checkbox"
                        checked={isIntervalChecked}
                        onChange={() => setIsIntervalChecked(!isIntervalChecked)}
                        disabled={isBreakChecked} // Disable if break is checked
                    />
                    <label htmlFor="interval-checkbox">Intervals</label>
                </div>
                <div className="checkbox-div">
                    <input
                        type="checkbox"
                        id="break-checkbox"
                        checked={isBreakChecked}
                        onChange={() => setIsBreakChecked(!isBreakChecked)}
                        disabled={isIntervalChecked} // Disable if interval is checked
                    />
                    <label htmlFor="break-checkbox">5 min break / interval</label>
                </div>
            </section>
            <TimerButton text="START TIMER" onClick={handleStartTimer} />
        </div>
    );
}

export default SetTimer;