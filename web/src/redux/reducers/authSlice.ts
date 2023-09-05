import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'
import axios from 'axios'

interface IUser {
    id: number
    email: string
    location: string
    name: string
    phone_number: string
    role: number
}
interface AuthState {
    token: string
    user: IUser | null
}
const initialState: AuthState = {
    token: '',
    user: null
}

interface ILoginParams {
    email: string
    password: string
}
export const login = createAsyncThunk(
    'auth/login',
    async (data: ILoginParams) => {
        const response = await axios.post(
            `http://localhost:8000/api/v1/auth/login`,
            data
        )
        return response.data
    }
)

export const getAuth = createAsyncThunk('auth/getAuth', async () => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
        const response = await axios.get(
            `http://localhost:8000/api/v1/auth/get-auth`,
            {
                headers: { Authorization: `Bearer ${accessToken}` }
            }
        )
        return response.data
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        builder.addCase(login.pending, (state, action) => {
            console.log('pending')
        })
        builder.addCase(login.fulfilled, (state, action) => {
            console.log(state, state.token, action)

            state.token = action.payload.data.access_token
            state.user = action.payload.data.user
            localStorage.setItem(
                'accessToken',
                action.payload.data.access_token
            )
            window.location.href = '/'

            console.log('fulfilled')
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        builder.addCase(login.rejected, (state, action) => {
            console.log('rejected')
        })
        builder.addCase(getAuth.fulfilled, (state, action) => {
            console.log('state, action', state, action)

            const accessToken = localStorage.getItem('accessToken')
            if (accessToken) {
                state.token = accessToken
                state.user = action.payload.data.user
            }
        })
    }
})

const authReducer = authSlice.reducer

export const authSelector = (state: RootState) => state.authReducer

export const {} = authSlice.actions

export default authReducer
