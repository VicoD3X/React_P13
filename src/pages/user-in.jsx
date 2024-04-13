import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../components/Hook'; 
import { setUserInfo } from '../redux'; 
import mainLogo from '../assets/argentBankLogo.png'; 
import Popup from '../components/Popup'; 

const UserIn = () => {
  const dispatch = useDispatch(); // Accès à la fonction dispatch de Redux pour envoyer des actions.
  const navigate = useNavigate(); // Hook pour la navigation programmée entre les routes.
  const { fetchData, data, loading, error } = useFetch(); // Utilisation du hook useFetch pour les opérations de réseau.
  const token = useSelector((state) => state.user.token); // Sélection du token utilisateur depuis l'état Redux.
  const userInfo = useSelector((state) => state.user.info); // Sélection des informations de l'utilisateur depuis l'état Redux.



  // Déclencheur d'effets pour la gestion de la navigation en absence de token.
  useEffect(() => {
    if (!token) {                      // Vérifie si le token n'existe pas.
      navigate('/home/sign-in');       // Redirige vers la page de connexion.
      return;                          // Sort de l'effet si aucun token.
    }


    // Si le token existe, fait une requête pour récupérer le profil de l'utilisateur.
    fetchData('http://localhost:3001/api/v1/user/profile', {
      headers: {
        'Authorization': `Bearer ${token}`,  // Ajoute le token dans les en-têtes pour l'authentification.
      },
    }, 'POST');  // Utilise la méthode POST pour la requête.
  }, [token, fetchData, navigate]);  // Dépendances de l'effet.



  // Effet pour actualiser les informations de l'utilisateur dans le store Redux.
  useEffect(() => {
    if (data && data.status === 200 && data.body) {  // Vérifie si les données sont disponibles et valides.
      dispatch(setUserInfo(data.body));              // Met à jour les informations de l'utilisateur dans Redux.
    }
  }, [data, dispatch]);  // Dépendances de l'effet.

  // Fonction pour envoyer une mise à jour du profil de l'utilisateur.
  const updateProfile = (updatedInfo) => {
    dispatch(setUserInfo(updatedInfo));  // Dispatch l'action pour mettre à jour les infos dans Redux.
    fetchData('http://localhost:3001/api/v1/user/profile', {
      headers: {
        'Authorization': `Bearer ${token}`,  // Authentification avec token JWT.
      },
      body: updatedInfo,  // Corps de la requête avec les informations mises à jour.
    }, 'PUT');            // Utilise la méthode PUT pour mettre à jour les données.
  };


  // Gestion de l'affichage en cas de chargement ou d'erreur.
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Rendu du composant, incluant la navigation, l'accueil de l'utilisateur et la gestion du compte.
  return (
    <div className='master-contain'>
      <nav className="main-nav">
        <Link to="/home/" className="main-nav-logo">
          <img className="main-nav-logo-image" src={mainLogo} alt="Argent Bank Logo" />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          <Link className="main-nav-item" to="/user/">
            <i className="fa fa-user-circle"></i>
            {userInfo?.firstName || "User"}
          </Link>
          <Link className="main-nav-item" to="/home/">
            <i className="fa fa-sign-out"></i>
            Sign Out
          </Link>
        </div>
      </nav>
      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back<br />{userInfo?.firstName} {userInfo?.lastName}!</h1>
          <Popup userInfo={userInfo} onUpdate={updateProfile} />
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright &copy; 2020 Argent Bank</p>
      </footer>
    </div>
  );
};

export default UserIn;
