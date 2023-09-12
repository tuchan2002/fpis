import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'
import axios from 'axios'
import { UserState } from '../types/user-types'

const initialState: UserState = {
    users: [],
    user: null
}

export const getAllOfUsers = createAsyncThunk(
    'user/getAllOfUsers',
    async ({ accessToken }: { accessToken: string }) => {
        const response = await axios.get(`http://localhost:8000/api/v1/user`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
        return response.data
    }
)

export const getUserById = createAsyncThunk(
    'user/getUserById',
    async ({
        userId,
        accessToken
    }: {
        userId: string
        accessToken: string
    }) => {
        const response = await axios.get(
            `http://localhost:8000/api/v1/user/${userId}`,
            {
                headers: { Authorization: `Bearer ${accessToken}` }
            }
        )
        return response.data
    }
)

export const getUsersByRole = createAsyncThunk(
    'user/getUsersByRole',
    async ({ role, accessToken }: { role: number; accessToken: string }) => {
        const response = await axios.get(
            `http://localhost:8000/api/v1/user/role/${role}`,
            {
                headers: { Authorization: `Bearer ${accessToken}` }
            }
        )
        return response.data
    }
)
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllOfUsers.fulfilled, (state, action) => {
            console.log('fulfilled')

            state.users = action.payload.data.users
        })

        builder.addCase(getUserById.fulfilled, (state, action) => {
            console.log('fulfilled')

            state.user = action.payload.data.user
        })

        builder.addCase(getUsersByRole.fulfilled, (state, action) => {
            console.log('fulfilled')

            state.users = action.payload.data.users
        })
    }
})

const userReducer = userSlice.reducer

export const userSelector = (state: RootState) => state.userReducer

export const {} = userSlice.actions

export default userReducer
