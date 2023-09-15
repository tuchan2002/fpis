import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'
import axios from 'axios'
import { showAlert } from './alertSlice'
import { AuthState, ILoginParams, IRegisterParams } from '../types/auth-types'

const initialState: AuthState = {
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        handleAuthStateChanged(state, action) {
            state.user = action.payload
        }

    },
    extraReducers: (builder) => {
    }
})

const authReducer = authSlice.reducer

export const authSelector = (state: RootState) => state.authReducer

export const {handleAuthStateChanged} = authSlice.actions

export default authReducer
