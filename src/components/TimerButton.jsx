import React, { useState } from 'react';

function TimerButton(props) {
    return (
        <div className="timer-btn-container">
            <button className="timer-btn" id="timer-button" onClick={props.onClick}>{props.text}</button>
        </div>
    )
}

export default TimerButton;