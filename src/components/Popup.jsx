import React, { useState } from 'react';
import '../App.css';

const Popup = ({ userInfo, onUpdate }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [newName, setNewName] = useState(userInfo?.firstName || '');

    const handleEditClick = () => {
        setIsPopupOpen(true);
    };

    const handlePopupClose = () => {
        setIsPopupOpen(false);
    };

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(newName); // Appelle la fonction de mise à jour passée en prop avec le nouveau nom
        handlePopupClose();
    };

    return (
        <>
            <button className="edit-button" onClick={handleEditClick}>Edit Name</button>
            {isPopupOpen && (
                <div className="popup">
                    <form onSubmit={handleSubmit}>
                        <input type="text" value={newName} onChange={handleNameChange} placeholder="New name" />
                        <button type="submit">Update</button>
                        <button type="button" onClick={handlePopupClose}>Cancel</button>
                    </form>
                </div>
            )}
        </>
    );
};

export default Popup;
