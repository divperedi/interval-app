import React from 'react';
import TimerButton from '../components/TimerButton';

function Break() {
    return (
        <div className="break-container">
            <section className="rings-wrapper">
                <img src="/ring4.png" alt="bigger ring" className="ring bigger-ring"/>
                <img src="/ring3.png" alt="big ring" className="ring big-ring"/>
                <img src="/ring2.png" alt="medium ring" className="ring medium-ring"/>
                <section className="small-ring-container">
                    <img src="/ring1.png" alt="small ring" className="ring small-ring"/>
                    <section className="break-content">
                    <img src="/break.png" alt="break-icon" className="break-icon" />
                    <h1 className="pause">Pause & breathe!</h1>
                    <h2 className="time-left">Time left</h2>
                </section>
            </section>
            </section>
            <TimerButton text="NO PAUSE, GO NOW!" />
        </div>
    )
}

export default Break;