import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../components/Hook'; // Assurez-vous que le chemin est correct
import { setUserInfo } from '../redux'; // Assurez-vous que l'importation de l'action est correcte
import mainLogo from '../assets/argentBankLogo.png';
import Popup from '../components/Popup';

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

    fetchData('http://localhost:3001/api/v1/user/profile', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }, 'POST'); // Utiliser 'POST' conformément aux exigences de ton API
  }, [token, fetchData, navigate]);

  useEffect(() => {
    if (data && data.status === 200 && data.body) {
      dispatch(setUserInfo(data.body));
    }
  }, [data, dispatch]);

  const updateProfile = (updatedInfo) => {
    console.log(updatedInfo);
    console.log(userInfo);
    dispatch (setUserInfo(updatedInfo))
     fetchData('http://localhost:3001/api/v1/user/profile', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: updatedInfo,
    }, 'PUT'); // Ici, on utilise 'PUT' pour la mise à jour conformément à la documentation de l'API


  };

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
