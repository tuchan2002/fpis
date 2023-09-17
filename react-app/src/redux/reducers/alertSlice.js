import { createSlice } from '@reduxjs/toolkit'

const initialState = {
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

export const alertSelector = (state) => state.alertReducer

export const { showAlert } = alertSlice.actions

export default alertReducer
