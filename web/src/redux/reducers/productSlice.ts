import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'
import axios from 'axios'

const initialState = {}

interface ICreateProductParams {
    body: {
        productID: string
        model: string
        description: string
    }
    accessToken: string
}

export const createProduct = createAsyncThunk(
    'product/createProduct',
    async (data: ICreateProductParams) => {
        const response = await axios.post(
            `http://localhost:8000/api/v1/product`,
            data.body,
            {
                headers: { Authorization: `Bearer ${data.accessToken}` }
            }
        )
        return response.data
    }
)

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        builder.addCase(createProduct.pending, (state, action) => {
            console.log('pending')
        })
        builder.addCase(createProduct.fulfilled, (state, action) => {
            console.log('fulfilled')
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        builder.addCase(createProduct.rejected, (state, action) => {
            console.log('rejected')
        })
    }
})

const productReducer = productSlice.reducer

export const productSelector = (state: RootState) => state.productReducer

export const {} = productSlice.actions

export default productReducer
