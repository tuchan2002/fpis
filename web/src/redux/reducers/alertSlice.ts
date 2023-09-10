import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'

interface AlertState {
    alert: {
        loading: boolean
        error: string
        success: string
    }
}
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
            console.log(
                'action.payloadaction.payloadaction.payload',
                action.payload
            )

            state.alert = action.payload
        }
    }
})

const alertReducer = alertSlice.reducer

export const alertSelector = (state: RootState) => state.alertReducer

export const { showAlert } = alertSlice.actions

export default alertReducer
