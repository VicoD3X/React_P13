import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../components/Hook'; // Assurez-vous que ce chemin est correct
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import mainLogo from '../assets/argentBankLogo.png';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const { fetchData, data, loading, error } = useFetch();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (data && data.status === 200) {
            console.log('Token:', data.body?.token);
            dispatch(setToken(data.body.token)); // Dispatcher l'action pour sauvegarder le token
            navigate('/user/');
        } else if (error) {
            setEmailError('Invalid email');
            setPasswordError('Invalid password');
        }
    }, [data, error, navigate, dispatch]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setEmailError('');
        setPasswordError('');

        fetchData('http://localhost:3001/api/v1/user/login',
            { body: { email, password } }, 'POST');
    };

    return (
        <>
            <div className='master-contain'>
                <nav className="main-nav">
                    <Link className="main-nav-logo" to="/home/">
                        <img
                            className="main-nav-logo-image"
                            src={mainLogo}
                            alt="Argent Bank Logo"
                        />
                        <h1 className="sr-only">Argent Bank</h1>
                    </Link>
                </nav>
                <main className="main bg-dark">
                    <section className="sign-in-content">
                        <FontAwesomeIcon icon={faCircleUser} className="sign-in-icon" />
                        <h1>Sign In</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="input-wrapper">
                                <label htmlFor="username">Email</label>
                                <input type="email" id="username" onChange={(event) => setEmail(event.target.value)} value={email} />
                                {emailError && <p className="error">{emailError}</p>}
                            </div>
                            <div className="input-wrapper">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" onChange={(event) => setPassword(event.target.value)} value={password} />
                                {passwordError && <p className="error">{passwordError}</p>}
                            </div>
                            <div className="input-remember">
                                <input type="checkbox" id="remember-me" />
                                <label htmlFor="remember-me">Remember me</label>
                            </div>
                            <button type="submit" className="sign-in-button">Sign In</button>
                        </form>
                        {loading && <p>Loading...</p>}
                        {error && <div className="error general-error">Login failed. Please check your credentials.</div>}
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
