import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Menu() {

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    }

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
        <div>
            <img
                src="/menu.png"
                alt="menu logo"
                className="menu-img"
                onClick={toggleModal} />
            {modal && (
                <div className="modal">
                    <div className="overlay">
                        <section className="modal-content">
                            <img
                                src="/menu.png"
                                alt="menu logo"
                                className="menu-img-modal"
                                onClick={toggleModal} />
                            <ul className="modal-list">
                                <motion.li
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Link to="/timer">Set timer</Link>
                                </motion.li>
                                <motion.li
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <Link to="/timer/analog">Analog Timer</Link>
                                </motion.li>
                                <motion.li
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.9 }}
                                >
                                    <Link to="/timer/digital">Digital Timer</Link>
                                </motion.li>
                                <motion.li
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1.2}}
                                >
                                    <Link to="/timer/text">Text Timer</Link>
                                </motion.li>
                            </ul>
                        </section>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Menu;