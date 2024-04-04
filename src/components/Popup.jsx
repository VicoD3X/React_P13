import React, { useState } from 'react';
import '../App.css';

const Popup = ({ userInfo, onUpdate }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [newName, setNewName] = useState(userInfo?.firstName || '');
    const [newLastName, setNewLastName] = useState(userInfo?.lastName || ''); // Ajout d'un état pour le nouveau nom de famille

    const handleEditClick = () => {
        setIsPopupOpen(true);
    };

    const handlePopupClose = () => {
        setIsPopupOpen(false);
    };

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setNewLastName(e.target.value); // Gère le changement dans le champ du nom de famille
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate({ firstName: newName, lastName: newLastName }); // Mise à jour pour passer à la fois le nouveau prénom et le nouveau nom de famille
        handlePopupClose();
    };

    return (
        <>
            <button className="edit-button" onClick={handleEditClick}>Edit Name</button>
            {isPopupOpen && (
                <div className="popup">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="newFirstName">Votre nouveau prénom</label>
                        <input id="newFirstName" type="text" value={newName} onChange={handleNameChange} placeholder="New first name" />
                        <label htmlFor="newLastName">Votre nouveau nom</label>
                        <input id="newLastName" type="text" value={newLastName} onChange={handleLastNameChange} placeholder="New last name" /> {/* Champ pour le nouveau nom de famille */}
                        <button type="submit">Update</button>
                        <button type="button" onClick={handlePopupClose}>Cancel</button>
                    </form>
                </div>
            )}
        </>
    );
};

export default Popup;
