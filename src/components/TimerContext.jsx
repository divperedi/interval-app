import React, { createContext, useState, useEffect, useRef } from 'react';
import Timer from 'easytimer.js';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
    const [timer] = useState(new Timer());
    const [time, setTime] = useState('00:00');
    const [breakTimeLeft, setBreakTimeLeft] = useState('00:00');
    const [isTimerFinished, setIsTimerFinished] = useState(false);
    const [isBreakActive, setIsBreakActive] = useState(false);
    const [isBreakFinished, setIsBreakFinished] = useState(false);

    // Use refs to store the latest values of these states
    const isIntervalModeRef = useRef(false);
    const isBreakModeRef = useRef(false);
    const initialMinutesRef = useRef(0);

    useEffect(() => {
        const updateTimer = () => {
            const { minutes, seconds } = timer.getTimeValues();
            const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            if (isBreakActive) {
                setBreakTimeLeft(formattedTime);
            } else {
                setTime(formattedTime);
            }
        };

        timer.addEventListener('secondsUpdated', updateTimer);

        return () => {
            timer.removeEventListener('secondsUpdated', updateTimer);
        };
    }, [timer, isBreakActive]);

    const initializeTimer = (minutes, intervalMode = false, breakMode = false) => {
        console.log("initializeTimer called with:", { minutes, intervalMode, breakMode });

        // Store the latest state in refs
        isIntervalModeRef.current = intervalMode;
        isBreakModeRef.current = breakMode;
        initialMinutesRef.current = minutes;

        setIsTimerFinished(false);
        setIsBreakActive(false);
        setIsBreakFinished(false);

        // Remove any existing targetAchieved listener before adding a new one
        timer.removeEventListener('targetAchieved', handleTargetAchieved);

        console.log("Timer started for:", minutes, "minutes. Interval Mode:", intervalMode, "Break Mode:", breakMode);
        startTimer(minutes);
    };

    const startTimer = (minutes) => {
        timer.start({ countdown: true, startValues: { minutes: minutes } });
        timer.addEventListener('targetAchieved', handleTargetAchieved);
    };

    const handleTargetAchieved = () => {
        console.log("Target achieved. Timer ended.");
        const isIntervalMode = isIntervalModeRef.current;
        const isBreakMode = isBreakModeRef.current;

        console.log("Interval Mode:", isIntervalMode, "Break Mode:", isBreakMode);
    
        if (isBreakMode && !isBreakActive) {
            console.log("Starting a 5-minute break.");
            startBreak();
        } else if (isIntervalMode) {
            console.log("Restarting the timer for intervals.");
            restartInterval();
        } else {
            console.log("Timer finished completely.");
            setIsTimerFinished(true);
            // Clean up event listeners once the timer is fully completed
            timer.removeEventListener('targetAchieved', handleTargetAchieved);
        }
    };

    const startBreak = () => {
        console.log("Break started for 5 minutes.");
        setIsBreakActive(true);
        timer.removeEventListener('targetAchieved', handleTargetAchieved); // Remove the previous listener
        timer.start({ countdown: true, startValues: { minutes: 5 } }); // Set break time to 5 minutes
        timer.addEventListener('targetAchieved', handleBreakEnd); // Add the break end listener
    };

    const handleBreakEnd = () => {
        console.log("Break ended. Resuming interval.");
        setIsBreakActive(false);
        setIsBreakFinished(true);
        isBreakModeRef.current = false; // Reset break mode to avoid continuous break loops

        // Restart the timer after the break is over
        timer.removeEventListener('targetAchieved', handleBreakEnd); // Remove the break listener
        startTimer(initialMinutesRef.current); 
    };

    const restartInterval = () => {
        console.log("Restarting interval for:", initialMinutesRef.current, "minutes.");
        startTimer(initialMinutesRef.current); // Restart the interval timer
    };

    const stopTimer = () => {
        console.log("Timer stopped.");
        timer.stop();
        setIsTimerFinished(true);
        timer.removeEventListener('targetAchieved', handleTargetAchieved); // Clean up listeners
    };

    return (
        <TimerContext.Provider value={{ timer, time, breakTimeLeft, initializeTimer, stopTimer, isTimerFinished, isBreakFinished, isBreakActive }}>
            {children}
        </TimerContext.Provider>
    );
};
