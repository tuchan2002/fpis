import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'
import { AlertState } from '../types/alert-types'

const initialState: AlertState = {
    alert: {
        loading: false,
        error: '',
        success: ''
    }
}
const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showAlert(state, action) {
            state.alert = action.payload
        }
    }
})

const alertReducer = alertSlice.reducer

export const alertSelector = (state: RootState) => state.alertReducer

export const { showAlert } = alertSlice.actions

export default alertReducer
