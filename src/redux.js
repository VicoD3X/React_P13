import { configureStore, createSlice } from '@reduxjs/toolkit';


const userSlice = createSlice({
  initialState: {  },
  reducers: {},
});

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
