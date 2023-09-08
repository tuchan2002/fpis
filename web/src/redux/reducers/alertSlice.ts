import { createSlice } from '@reduxjs/toolkit'

interface AlertState {
    loading: boolean
    error: string
    success: string
}
const initialState: AlertState = {
    loading: false,
    error: '',
    success: ''
}
const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showAlert(state, action) {
            state = action.payload
        }
    }
})

const alertReducer = alertSlice.reducer

export const { showAlert } = alertSlice.actions

export default alertReducer
