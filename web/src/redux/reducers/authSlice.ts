import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'
import axios from 'axios'
import { showAlert } from './alertSlice'

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

interface IRegisterParams {
    userData: {
        name: string
        email: string
        password: string
        phone_number: string
        location: string
        role: number
    }
    accessToken: string
}

interface ILoginParams {
    email: string
    password: string
}
export const login = createAsyncThunk(
    'auth/login',
    async (data: ILoginParams, { dispatch }) => {
        try {
            dispatch(showAlert({ loading: true }))

            const response = await axios.post(
                `http://localhost:8000/api/v1/auth/login`,
                data
            )

            dispatch(showAlert({ success: response.data.message }))

            return response.data
        } catch (error: any) {
            dispatch(showAlert({ error: error.response.data.message }))
        }
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

export const register = createAsyncThunk(
    'auth/register',
    async (data: IRegisterParams, { dispatch }) => {
        try {
            dispatch(showAlert({ loading: true }))

            const response = await axios.post(
                `http://localhost:8000/api/v1/auth/register`,
                data.userData,
                {
                    headers: { Authorization: `Bearer ${data.accessToken}` }
                }
            )
            dispatch(showAlert({ success: response.data.message }))

            return response.data
        } catch (error: any) {
            dispatch(showAlert({ error: error.response.data.message }))
        }
    }
)

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
            console.log('action.payload auth', action.payload)

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

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        builder.addCase(register.pending, (state, action) => {
            console.log('pending')
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        builder.addCase(register.fulfilled, (state, action) => {
            console.log('fulfilled')
        })

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        builder.addCase(register.rejected, (state, action) => {
            console.log('rejected')
        })
    }
})

const authReducer = authSlice.reducer

export const authSelector = (state: RootState) => state.authReducer

export const {} = authSlice.actions

export default authReducer
