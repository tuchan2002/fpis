import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { getDocument, getDocuments, getDocumentsCondition } from '../../firebase/services'

const initialState = {
    users: [],
    user: null
}

export const getAllOfUsers = createAsyncThunk(
    'user/getAllOfUsers',
    async () => {
        try {
            const users = await getDocumentsCondition('users', 'role', '!=', 3)
            return users
        } catch (error) {
            console.log(error);
        }
    }
)

export const getUserById = createAsyncThunk(
    'user/getUserById',
    async ({
        userId,
    }) => {
        try {
            const user = await getDocument('users', 'uid', userId)
            return user
        } catch (error) {
            console.log(error);
        }
    }
)

export const getUsersByRole = createAsyncThunk(
    'user/getUsersByRole',
    async ({ role }) => {
        try {
            const users = await getDocumentsCondition('users', 'role', '==', role)
            return users
        } catch (error) {
            console.log(error);
        }
    }
)
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllOfUsers.fulfilled, (state, action) => {
            console.log('fulfilled')

            state.users = action.payload
        })

        builder.addCase(getUserById.fulfilled, (state, action) => {
            console.log('fulfilled')

            state.user = action.payload
        })

        builder.addCase(getUsersByRole.fulfilled, (state, action) => {
            console.log('fulfilled')
            state.users = action.payload
        })
    }
})

const userReducer = userSlice.reducer

export const userSelector = (state) => state.userReducer

export const {} = userSlice.actions

export default userReducer
