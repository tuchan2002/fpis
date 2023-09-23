import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    provider: null,
    web3: null,
    contract: null,
    account: ''
};

const web3Slice = createSlice({
    name: 'web3',
    initialState,
    reducers: {
        setAccount(state, action) {
            state.account = action.payload;
        },
        setWeb3State(state, action) {
            if (action.payload) {
                state.provider = action.payload.provider;
                state.web3 = action.payload.web3;
                state.contract = action.payload.contract;
            }
        }
    }
});

const web3Reducer = web3Slice.reducer;

export const web3Selector = (state) => state.web3Reducer;

export const { setAccount, setWeb3State } = web3Slice.actions;

export default web3Reducer;
