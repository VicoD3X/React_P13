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
    const [email, setEmail] = useState('');                  // État pour stocker l'email entré par l'utilisateur.
    const [password, setPassword] = useState('');            // État pour stocker le mot de passe entré.
    const [emailError, setEmailError] = useState('');        // État pour gérer les erreurs liées à l'email.
    const [passwordError, setPasswordError] = useState('');  // État pour gérer les erreurs liées au mot de passe.
    const { fetchData, data, loading, error } = useFetch();  // Utilise un hook personnalisé pour les requêtes fetch.
    const navigate = useNavigate();                          // Hook pour naviguer entre les routes.
    const dispatch = useDispatch();                          // Hook pour dispatcher les actions Redux.



    // Utilise useEffect pour réagir aux changements dans les données de l'API ou les erreurs.
    useEffect(() => {
        if (data && data.status === 200) {             // Vérifie si la réponse est correcte.
            console.log('Token:', data.body?.token);   // Log le token reçu pour le debug.
            dispatch(setToken(data.body.token));       // Sauvegarde le token dans l'état global.
            navigate('/user/');                        // Redirige l'utilisateur vers la page utilisateur.
        } else if (error) {                            // Si une erreur est présente,
            setEmailError('Invalid email');            // Définit un message d'erreur pour l'email.
            setPasswordError('Invalid password');      // Définit un message d'erreur pour le mot de passe.
        }
    }, [data, error, navigate, dispatch]);  // Liste des dépendances de useEffect.



    // Fonction appelée lors de la soumission du formulaire.
    const handleSubmit = (event) => {
        event.preventDefault();          // Empêche le comportement par défaut du formulaire.
        setEmailError('');               // Réinitialise les erreurs d'email.
        setPasswordError('');            // Réinitialise les erreurs de mot de passe.

        // Exécute la requête de connexion avec les données fournies par l'utilisateur.
        fetchData('http://localhost:3001/api/v1/user/login',
            { body: { email, password } }, 'POST');  // Requête POST avec email et mot de passe.
    };


    // Gestion de l'affichage en cas de chargement ou d'erreur.
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    // Rendu du composant, incluant la navigation, l'accueil de l'utilisateur et la gestion du compte.
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
