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
const initialState: { users: IUser[] } = {
    users: []
}

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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        builder.addCase(getUsersByRole.pending, (state, action) => {
            console.log('pending')
        })
        builder.addCase(getUsersByRole.fulfilled, (state, action) => {
            console.log('fulfilled', action)

            state.users = action.payload.data.users
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        builder.addCase(getUsersByRole.rejected, (state, action) => {
            console.log('rejected')
        })
    }
})

const userReducer = userSlice.reducer

export const userSelector = (state: RootState) => state.userReducer

export const {} = userSlice.actions

export default userReducer
