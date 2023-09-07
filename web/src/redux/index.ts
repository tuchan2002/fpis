import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authSlice'
import alertReducer from './reducers/alertSlice'
import productReducer from './reducers/productSlice'
import userReducer from './reducers/userSlice'

const store = configureStore({
    reducer: {
        authReducer,
        alertReducer,
        productReducer,
        userReducer
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
