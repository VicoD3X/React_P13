import { configureStore, createSlice } from '@reduxjs/toolkit';

// Définit un slice pour gérer l'état de l'utilisateur
const userSlice = createSlice({

  // Nom du slice
  name: 'user',
  // Etat initial
  initialState: {
    // Le token de l'utilisateur (null par défaut)
    token: null, // Initialisation de la propriété token à null
  },
  reducers: {
    setToken: (state, action) => {

      // Le nouveau token est passé en payload
      state.token = action.payload; // Mettre à jour le token dans l'état
    },
  },
});

// Exporte l'action setToken
export const { setToken } = userSlice.actions;

// Crée le store Redux avec le reducer user
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
