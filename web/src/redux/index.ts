import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authSlice'
import alertReducer from './reducers/alertSlice'
import productReducer from './reducers/productSlice'
import userReducer from './reducers/userSlice'
import web3Reducer from './reducers/web3Slice'

const store = configureStore({
    reducer: {
        authReducer,
        alertReducer,
        productReducer,
        userReducer,
        web3Reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
