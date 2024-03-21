import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import mainLogo from '../assets/argentBankLogo.png'; // Import du logo

const SignIn = () => {
    return (
        <>
            <div className='master-contain'>
                <nav className="main-nav">
                    <Link className="main-nav-logo" to="/home/">
                        <img
                            className="main-nav-logo-image"
                            src={mainLogo} // Utilisation du logo importé
                            alt="Argent Bank Logo"
                        />
                        <h1 className="sr-only">Argent Bank</h1>
                    </Link>
                </nav>
                <main className="main bg-dark">
                    <section className="sign-in-content">
                        <FontAwesomeIcon icon={faCircleUser} className="sign-in-icon" /> {/* Utilisation de FontAwesomeIcon */}
                        <h1>Sign In</h1>
                        <form>
                            <div className="input-wrapper">
                                <label htmlFor="username">Username</label>
                                <input type="text" id="username" />
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" />
                            </div>
                            <div className="input-remember">
                                <input type="checkbox" id="remember-me" />
                                <label htmlFor="remember-me">Remember me</label>
                            </div>
                            <button type="submit" className="sign-in-button">Sign In</button>
                        </form>
                    </section>
                </main>
                <footer className="footer">
                    <p className="footer-text">Copyright &copy; 2020 Argent Bank</p>
                </footer>
            </div>
        </>
    );
};

export default SignIn;
