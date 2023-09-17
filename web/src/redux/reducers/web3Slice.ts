import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'
import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'
import { showAlert } from './alertSlice'
import { Web3State } from '../types/web3-types'

const initialState: Web3State = {
    provider: null,
    web3: null,
    contract: null,
    account: ''
}

const web3Slice = createSlice({
    name: 'web3',
    initialState,
    reducers: {
        setAccount(state, action) {
            state.account = action.payload
        },
        setWeb3State(state, action) {
            if (action.payload) {
                state.provider = action.payload.provider
                state.web3 = action.payload.web3
                state.contract = action.payload.contract
                state.account = action.payload.account
            }
        }
    },
    extraReducers: (builder) => {}
})

const web3Reducer = web3Slice.reducer

export const web3Selector = (state: RootState) => state.web3Reducer

export const { setAccount, setWeb3State } = web3Slice.actions

export default web3Reducer
