import React from 'react';
import { motion } from 'framer-motion';

function TimerButton(props) {
    return (
        <div className="timer-btn-container">
            <motion.button
                className="timer-btn"
                whileTap={{
                    scale: 0.9,
                    transition: { duration: 0.1 }
                }}
                animate={{ x: [0, 80, 0] }}
                id="timer-button"
                onClick={props.onClick}
            >
                {props.text}
            </motion.button>
        </div>
    );
}

export default TimerButton;