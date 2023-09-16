import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'
import axios from 'axios'
import { showAlert } from './alertSlice'
import { ICreateProductParams, IProductState } from '../types/product-types'
import { createProductOnBlockchain } from '@/utils/web3-method/product'

const initialState: IProductState = {
    products: [],
    product: null
}

export const createProduct = createAsyncThunk(
    'product/createProduct',
    async (
        {
            data,
            contract,
            contractAddress
        }: {
            data: ICreateProductParams
            contract: any
            contractAddress: string
        },
        { dispatch }
    ) => {
        try {
            dispatch(showAlert({ loading: true }))

            const result = await createProductOnBlockchain(
                data,
                contract,
                contractAddress
            )

            if (result.status === 1n) {
                dispatch(
                    showAlert({
                        success: 'Successfully saved product to the blockchain.'
                    })
                )
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error)

            dispatch(
                showAlert({
                    error: 'Failed to save product to the blockchain.'
                })
            )
        }
    }
)

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {}
})

const productReducer = productSlice.reducer

export const productSelector = (state: RootState) => state.productReducer

export const {} = productSlice.actions

export default productReducer
