import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'
import Web3  from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'
import { showAlert } from './alertSlice'
import { Web3State } from '../types/web3-types'

const initialState: Web3State = {
    provider: null,
    web3: null,
    contract: null,
    account: ""
}

export const loadProvider = createAsyncThunk(
    'product/loadProvider',
    async (
        {
            contractAbi,
            contractAddress
        }: { contractAbi: []; contractAddress: string },
        { dispatch }
    ) => {
        try {
            const provider = await detectEthereumProvider()

            if (provider) {
                const web3 = new Web3(provider as any)
                const contract = new web3.eth.Contract(
                    contractAbi,
                    contractAddress
                )

                let accountAddress
                provider.on('accountsChanged', (accounts) => {
                    accountAddress = accounts[0]
                })

                return {
                    provider,
                    web3,
                    contract,
                    account: accountAddress
                }
            } else {
                dispatch(showAlert({ error: 'Please, Install Metamask' }))
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)
        }
    }
)
const web3Slice = createSlice({
    name: 'web3',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        builder.addCase(loadProvider.pending, (state, action) => {})
        builder.addCase(loadProvider.fulfilled, (state, action) => {
            if(action.payload) {
                state.provider = action.payload.provider
                state.web3 = action.payload.web3
                state.contract = action.payload.contract
                state.account = action.payload.account
            }
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        builder.addCase(loadProvider.rejected, (state, action) => {
            console.log('rejected')
        })
    }
})

const web3Reducer = web3Slice.reducer

export const web3Selector = (state: RootState) => state.web3Reducer

export const {} = web3Slice.actions

export default web3Reducer
