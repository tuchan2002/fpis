import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { getDocument, getDocuments, getDocumentsCondition, updateDocument } from '../../firebase/services'
import { showAlert } from './alertSlice'
import { createCustomer, createManufactory, createRetailer } from '../../utils/web3-method/auth'

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

export const toggleActiveAccount = createAsyncThunk(
    'user/toggleActiveAccount',
    async ({
        userData,
        contract,
        accountAddress
    }, {dispatch}) => {
        try {
            dispatch(showAlert({ loading: true }))
            
            if(userData.isActive === false) {
                if(userData.role === 0) {
                    await createManufactory({name: userData.displayName, email: userData.email}, contract, accountAddress)
                } else if(userData.role === 1) {
                    await createRetailer({name: userData.displayName, email: userData.email}, contract, accountAddress)
                } else if(userData.role === 2) {
                    await createCustomer({name: userData.displayName, email: userData.email, phone_number: ""}, contract, accountAddress)
                }
            }

            await updateDocument('users', { isActive: !userData.isActive }, 'uid', userData.uid)

            dispatch(showAlert({ success: `Account ${!userData.isActive ? 'activation' : 'deactivation'} successful.` }))

            return !userData.isActive
        } catch (error) {
            dispatch(showAlert({ error: `Account ${!userData.isActive ? 'activation' : 'deactivation'} failed.` }))
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

        builder.addCase(toggleActiveAccount.fulfilled, (state, action) => {
            console.log('fulfilled')
            state.user = {...state.user, isActive: action.payload}
        })
    }
})

const userReducer = userSlice.reducer

export const userSelector = (state) => state.userReducer

export const {} = userSlice.actions

export default userReducer
