import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Loading() {
    return (
        <section className="logo-container">
            <Link to="/timer" className="logo">
                <img src="/interval.png" alt="interval logo" className="interval-img" />
                <motion.h2 
                    className="slogan"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                >For all your timing needs</motion.h2>
            </Link>
        </section>
    )
}

export default Loading;