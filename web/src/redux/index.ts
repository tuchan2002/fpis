import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authSlice'
import alertReducer from './reducers/alertSlice'

const store = configureStore({
    reducer: {
        authReducer,
        alertReducer
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
