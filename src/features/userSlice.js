// src/features/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
        update: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
    },
});

export const { login, logout, update } = userSlice.actions;
export default userSlice.reducer;
