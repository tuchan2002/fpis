import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        handleAuthStateChanged(state, action) {
            state.user = action.payload;
        }
    }
});

const authReducer = authSlice.reducer;

export const authSelector = (state) => state.authReducer;

export const { handleAuthStateChanged } = authSlice.actions;

export default authReducer;
