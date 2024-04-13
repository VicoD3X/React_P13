import { configureStore, createSlice } from '@reduxjs/toolkit';

// Création d'un slice pour gérer l'état de l'utilisateur.
// Un "slice" est une collection de reducer logic et actions pour une partie spécifique de l'état de l'application.
const userSlice = createSlice({
  name: 'user', // Nom du slice, utilisé dans les actions et le reducer.
  initialState: {
    token: null, // Stocke le token d'authentification de l'utilisateur, initialisé à null.
    info: null, // Stocke les informations supplémentaires de l'utilisateur, initialisé à null.
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload; // Met à jour le token de l'utilisateur dans l'état.
    },
    setUserInfo: (state, action) => {
      state.info = action.payload; // Met à jour les informations de l'utilisateur dans l'état.
    },
  },
});

// Exportation des actions générées par le slice.
// Ces actions peuvent être dispatchées pour modifier l'état du slice 'user'.
export const { setToken, setUserInfo } = userSlice.actions;

// Configuration et création du store Redux.
// Le store est configuré ici avec le reducer 'user' provenant du userSlice.
export const store = configureStore({
  reducer: {
    user: userSlice.reducer, // Intègre le reducer pour le slice 'user' dans le store global.
  },
});
