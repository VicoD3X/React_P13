import React, { useState } from 'react';
import '../App.css';

// Composant Popup pour éditer le prénom et le nom de l'utilisateur.
const Popup = ({ userInfo, onUpdate }) => {
    // État pour contrôler l'affichage du popup.
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // États pour stocker temporairement le nouveau prénom et le nouveau nom.
    const [newName, setNewName] = useState(userInfo?.firstName || '');
    const [newLastName, setNewLastName] = useState(userInfo?.lastName || ''); // Stocke le nouveau nom de famille.

    // Gère l'ouverture du popup.
    const handleEditClick = () => {
        setIsPopupOpen(true);
    };

    // Gère la fermeture du popup.
    const handlePopupClose = () => {
        setIsPopupOpen(false);
    };

    // Met à jour le prénom dans l'état local quand l'utilisateur modifie le champ de texte.
    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };

    // Met à jour le nom de famille dans l'état local quand l'utilisateur modifie le champ de texte.
    const handleLastNameChange = (e) => {
        setNewLastName(e.target.value); // Gère le changement dans le champ du nom de famille
    };

    // Gère la soumission du formulaire pour mettre à jour le nom complet.
    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate({ firstName: newName, lastName: newLastName }); // Envoie les nouveaux noms au composant parent
        handlePopupClose(); // Ferme le popup après la soumission
    };

    // Rendu conditionnel pour afficher le popup seulement s'il est ouvert.
    return (
        <>
            <button className="edit-button" onClick={handleEditClick}>Edit Name</button>
            {isPopupOpen && (
                <div className="popup">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="newFirstName">Votre nouveau prénom</label>
                        <input id="newFirstName" type="text" value={newName} onChange={handleNameChange} placeholder="New first name" />
                        <label htmlFor="newLastName">Votre nouveau nom</label>
                        <input id="newLastName" type="text" value={newLastName} onChange={handleLastNameChange} placeholder="New last name" />
                        <button type="submit">Update</button>
                        <button type="button" onClick={handlePopupClose}>Cancel</button>
                    </form>
                </div>
            )}
        </>
    );
};

export default Popup;
