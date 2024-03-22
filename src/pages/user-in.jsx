import React from 'react';
import { Link } from 'react-router-dom';
import mainLogo from '../assets/argentBankLogo.png'; // Assurez-vous d'ajuster le chemin d'accès

const UserIn = () => {
    return (
        <div className='master-contain'>
            <nav className="main-nav">
                <Link to="/home/" className="main-nav-logo">
                    <img
                        className="main-nav-logo-image"
                        src={mainLogo} // Utilisez le logo importé
                        alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>
                <div>
                    {/* Utilisez Link pour la navigation SPA, ajustez les to="" selon vos routes */}
                    <Link className="main-nav-item" to="/user/">
                        <i className="fa fa-user-circle"></i>
                        Tony
                    </Link>
                    <Link className="main-nav-item" to="/home/">
                        <i className="fa fa-sign-out"></i>
                        Sign Out
                    </Link>
                </div>
            </nav>
            <main className="main bg-dark">
                <div className="header">
                    <h1>Welcome back<br />Tony Jarvis!</h1>
                    <button className="edit-button">Edit Name</button>
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
                {/* Autres sections pour Savings et Credit Card similaires */}
            </main>
            <footer className="footer">
                <p className="footer-text">Copyright &copy; 2020 Argent Bank</p>
            </footer>
        </div>
    );
};

export default UserIn;
