import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
                                <li><Link to="/timer">Set timer</Link></li>
                                <li><Link to="/timer/analog">Analog Timer</Link></li>
                                <li><Link to="/timer/digital">Digital Timer</Link></li>
                                <li><Link to="/timer/text">Text Timer</Link></li>
                            </ul>
                        </section>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Menu;