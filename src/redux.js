import { configureStore, createSlice } from '@reduxjs/toolkit';

// Définit un slice pour gérer l'état de l'utilisateur
const userSlice = createSlice({
  name: 'user', // Nom du slice
  initialState: {
    token: null, // Le token de l'utilisateur (null par défaut)
    info: null, // Ajout d'un champ pour les informations de l'utilisateur
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload; // Mettre à jour le token dans l'état
    },
    setUserInfo: (state, action) => {
      state.info = action.payload; // Mettre à jour les informations de l'utilisateur
    },
  },
});

// Exporte les actions
export const { setToken, setUserInfo } = userSlice.actions;

// Crée le store Redux avec le reducer user
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
