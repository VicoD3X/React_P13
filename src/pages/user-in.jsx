import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../components/Hook'; // Assurez-vous que le chemin est correct
import { setUserInfo } from '../redux'; // Assurez-vous que l'importation de l'action est correcte
import mainLogo from '../assets/argentBankLogo.png';

const UserIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fetchData, data, loading, error } = useFetch();
  const token = useSelector((state) => state.user.token);
  const userInfo = useSelector((state) => state.user.info);

  useEffect(() => {
    if (!token) {
      navigate('/home/sign-in');
      return;
    }

    // Utilisez fetchData pour envoyer une requête POST à l'endpoint du profil de l'utilisateur
    fetchData('http://localhost:3001/api/v1/user/profile', {
      headers: {
        'Authorization': `Bearer ${token}`,
        // Pas besoin de définir 'Content-Type': 'application/json', 
        // car il est déjà inclus par défaut dans useFetch
      },
    }, 'POST');
  }, [token, fetchData, navigate]);

  useEffect(() => {
    // Assurez-vous que la structure de la réponse correspond à ce que votre API renvoie
    if (data && data.status === 200 && data.body) {
      // Dispatch les informations de l'utilisateur récupérées dans le store Redux
      dispatch(setUserInfo(data.body));
    }
  }, [data, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
          <Link className="main-nav-item" to="/home/sign-out">
            <i className="fa fa-sign-out"></i>
            Sign Out
          </Link>
        </div>
      </nav>
      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back<br />{userInfo?.firstName} {userInfo?.lastName}!</h1>
          <button className="edit-button">Edit Name</button>
        </div>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright &copy; 2020 Argent Bank</p>
      </footer>
    </div>
  );
};

export default UserIn;
