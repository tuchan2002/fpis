import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    users: [],
    user: null
}

export const getAllOfUsers = createAsyncThunk(
    'user/getAllOfUsers',
    async ({ accessToken }) => {
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
    async ({ role, accessToken }) => {
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

export const userSelector = (state) => state.userReducer

export const {} = userSlice.actions

export default userReducer
