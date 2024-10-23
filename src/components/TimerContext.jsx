import React, { createContext, useState, useEffect, useRef } from 'react';
import Timer from 'easytimer.js';
import { useNavigate } from 'react-router-dom';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
    const [timer] = useState(new Timer());
    const [time, setTime] = useState('00:00');
    const [breakTimeLeft, setBreakTimeLeft] = useState('00:00');
    const [isTimerFinished, setIsTimerFinished] = useState(false);
    const [isBreakActive, setIsBreakActive] = useState(false);
    const [isBreakFinished, setIsBreakFinished] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [breakMessageShown, setBreakMessageShown] = useState(false);
    const [timerKey, setTimerKey] = useState(0);
    const navigate = useNavigate();

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
        isIntervalModeRef.current = intervalMode;
        isBreakModeRef.current = breakMode;
        initialMinutesRef.current = minutes;

        setIsTimerFinished(false);
        setIsBreakActive(false);
        setIsBreakFinished(false);
        setBreakMessageShown(false);

        timer.removeEventListener('targetAchieved', handleTargetAchieved);

        startTimer(minutes);
        setTimerKey(prevKey => prevKey + 1);
    };

    const startTimer = (minutes) => {
        timer.start({ countdown: true, startValues: { minutes: minutes } });
        timer.addEventListener('targetAchieved', handleTargetAchieved);
    };

    const handleTargetAchieved = () => {
        if (isIntervalModeRef.current || isBreakModeRef.current) {
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
                if (isBreakModeRef.current && !isBreakActive && !breakMessageShown) {
                    setBreakMessageShown(true);
                    startBreak();
                } else if (isIntervalModeRef.current) {
                    restartInterval();
                } else {
                    setIsTimerFinished(true);
                    navigate('/timer/alarm');
                    timer.removeEventListener('targetAchieved', handleTargetAchieved);
                }
            }, 1000);
        } else {
            setIsTimerFinished(true);
            navigate('/timer/alarm');
            timer.removeEventListener('targetAchieved', handleTargetAchieved);
        }
    };

    const startBreak = () => {
        setIsBreakActive(true);
        timer.removeEventListener('targetAchieved', handleTargetAchieved);
        timer.start({ countdown: true, startValues: { minutes: 5 } });
        timer.addEventListener('targetAchieved', handleBreakEnd);
    };

    const handleBreakEnd = () => {
        setIsBreakActive(false);
        setIsBreakFinished(true);
        isBreakModeRef.current = true;

        setBreakMessageShown(false);
        timer.removeEventListener('targetAchieved', handleBreakEnd);
        startTimer(initialMinutesRef.current);
    };

    const restartInterval = () => {
        startTimer(initialMinutesRef.current);
    };

    const stopTimer = () => {
        timer.stop();
        setIsTimerFinished(true);
        timer.removeEventListener('targetAchieved', handleTargetAchieved);
    };

    return (
        <TimerContext.Provider value={{ timer, time, breakTimeLeft, initializeTimer, stopTimer, isTimerFinished, isBreakFinished, isBreakActive, showMessage, isBreakMode: isBreakModeRef.current, timerKey }}>
            {children}
        </TimerContext.Provider>
    );
};