import React, { useContext, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';
import TimerButton from '../components/TimerButton';
import { TimerContext } from '../components/TimerContext';

function AnalogTimer() {
    const location = useLocation();
    let selectedMinutes = location.state ? location.state.selectedMinutes : 0;
    const { timer, time, initializeTimer, stopTimer, breakTimeLeft } = useContext(TimerContext);
    const navigate = useNavigate();

    const minuteHandRef = useRef(null);
    const secondHandRef = useRef(null);

    useEffect(() => {
        if (!timer) {
            console.error('Timer is undefined');
            return;
        }

        // Calculate initial rotation
        let minutesRotation = selectedMinutes * 6; // 1 minute = 6 degrees

        minuteHandRef.current = document.querySelector('.minute-hand');
        secondHandRef.current = document.querySelector('.second-hand');

        // Start the timer with the selected minutes if not already running
        if (!timer.isRunning()) {
            initializeTimer(selectedMinutes);
        }

        // Apply initial rotation based on current timer state
        const timeValues = timer.getTimeValues();
        const initialMinutes = timeValues.minutes;
        const initialSeconds = timeValues.seconds;

        minutesRotation = (initialMinutes + initialSeconds / 60) * 6;
        const secondsRotation = -(initialSeconds / 60) * 360;

        if (minuteHandRef.current) {
            minuteHandRef.current.style.transform = `translate(-90%, -100%) rotate(${minutesRotation}deg)`;
        }
        if (secondHandRef.current) {
            secondHandRef.current.style.transform = `translate(-90%, -100%) rotate(${secondsRotation}deg)`;
        }

        const handleSecondsUpdated = () => {
            const timeValues = timer.getTimeValues();
            const secondsRotation = -(timeValues.seconds / 60) * 360;

            if (secondHandRef.current) {
                secondHandRef.current.style.transform = `translate(-90%, -100%) rotate(${secondsRotation}deg)`;
            }
        };

        const handleMinutesUpdated = () => {
            const timeValues = timer.getTimeValues();
            const remainingMinutes = timeValues.minutes;
            const remainingSeconds = timeValues.seconds;

            minutesRotation = (remainingMinutes + remainingSeconds / 60) * 6;

            if (minuteHandRef.current) {
                minuteHandRef.current.style.transform = `translate(-90%, -100%) rotate(${minutesRotation}deg)`;
            }
        };

        timer.on('secondsUpdated', handleSecondsUpdated);
        timer.on('minutesUpdated', handleMinutesUpdated);

        return () => {
            timer.off('secondsUpdated', handleSecondsUpdated);
            timer.off('minutesUpdated', handleMinutesUpdated);
        };
    }, [selectedMinutes, timer]);

    function abortTimer() {
        stopTimer();
        if (minuteHandRef.current && secondHandRef.current) {
            minuteHandRef.current.style.transform = `translate(-90%, -100%) rotate(0deg)`;
            secondHandRef.current.style.transform = `translate(-90%, -100%) rotate(0deg)`;
        }
    }

    return (
        <div className="analog-timer-container">
            <section className="top-wrapper">
                <Menu />
                <Link to="/" className="app-name">interval</Link>
            </section>
            <section className="analog-clock">
                <div className="clock">
                    <img src="/clock.png" alt="clock" className="clock-img" />
                    <div className="black-center"></div>
                    <div className="gray-center"></div>
                    <div className="minute-hand"></div>
                    <div className="second-hand"></div>
                </div>
            </section>
            <TimerButton text="ABORT TIMER" onClick={abortTimer} />
        </div>
    );
}

export default AnalogTimer;