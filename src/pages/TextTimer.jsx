import React, { useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';
import TimerButton from '../components/TimerButton';
import { TimerContext } from '../components/TimerContext';

function TextTimer() {
    const location = useLocation();
    const navigate = useNavigate();
    
    const { time, startTimer, stopTimer, timer, breakTimeLeft, isBreakActive, isTimerFinished } = useContext(TimerContext);

    useEffect(() => {
        if (isTimerFinished && !isBreakActive) {
            console.log('Timer finished completely');
            navigate('/timer/alarm');
        }
    }, [isTimerFinished, isBreakActive, navigate]);

    function printWords(time) {
        const [mm, ss] = time.split(':').map(Number);
        const words = [
            "ZERO", "ONE", "TWO", "THREE", "FOUR", "FIVE",
            "SIX", "SEVEN", "EIGHT", "NINE", "TEN",
            "ELEVEN", "TWELVE", "THIRTEEN", "FOURTEEN",
            "FIFTEEN", "SIXTEEN", "SEVENTEEN", "EIGHTEEN",
            "NINETEEN", "TWENTY", "THIRTY", "FORTY", "FIFTY"
        ];

        let minuteWords = '';
        if (mm === 0) {
            minuteWords = '';
        } else if (mm === 1) {
            minuteWords = "ONE MINUTE";
        } else if (mm < 20) {
            minuteWords = words[mm] + " MINUTES";
        } else {
            minuteWords = words[20 + Math.floor(mm / 10) - 2] + " " + (mm % 10 !== 0 ? words[mm % 10] : "") + " MINUTES";
        }

        let secondWords = '';
        if (ss === 0) {
            secondWords = "ZERO SECONDS";
        } else if (ss === 1) {
            secondWords = "ONE SECOND";
        } else if (ss < 20) {
            secondWords = words[ss] + " SECONDS";
        } else {
            secondWords = words[20 + Math.floor(ss / 10) - 2] + " " + (ss % 10 !== 0 ? words[ss % 10] : "") + " SECONDS";
        }

        if (minuteWords === '') {
            return secondWords;
        }

        return `${minuteWords} AND ${secondWords}`;
    }

    function abortTimer() {
        stopTimer();
        navigate("/timer/alarm");
    }

    return (
        <div className="text-timer-container">
            <section className="top-wrapper">
                <Menu />
                <Link to="/" className="app-name">interval</Link>
            </section>
            <section className="text-clock">
                <div className="clock">
                    <p className="text-time">{printWords(isBreakActive ? breakTimeLeft : time)}</p>
                </div>
            </section>
            <TimerButton text="ABORT TIMER" onClick={abortTimer} />
        </div>
    );
}

export default TextTimer;