import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'
import axios from 'axios'
import { showAlert } from './alertSlice'

interface ICreateProductParams {
    body: {
        productID: string
        model: string
        description: string
    }
    accessToken: string
}

interface IHistoryItem {
    timestamp: string
    action: string
    details: string
    date: string
}
interface IProduct {
    productID: string
    model: string
    description: string
    manufactoryEmail: string
    retailerEmail: string
    customerEmail: string
    history: IHistoryItem[]
}

const initialState: { products: IProduct[]; product: IProduct | null } = {
    products: [],
    product: null
}

export const createProduct = createAsyncThunk(
    'product/createProduct',
    async (data: ICreateProductParams, { dispatch }) => {
        try {
            dispatch(showAlert({ loading: true }))

            const response = await axios.post(
                `http://localhost:8000/api/v1/product`,
                data.body,
                {
                    headers: { Authorization: `Bearer ${data.accessToken}` }
                }
            )

            dispatch(showAlert({ success: response.data.message }))

            return response.data
        } catch (error: any) {
            dispatch(showAlert({ error: error.response.data.message }))
        }
    }
)

export const getAllOfProducts = createAsyncThunk(
    'product/getAllOfProducts',
    async ({ accessToken }: { accessToken: string }) => {
        const response = await axios.get(
            `http://localhost:8000/api/v1/product`,
            {
                headers: { Authorization: `Bearer ${accessToken}` }
            }
        )
        return response.data
    }
)

export const getOwnedProducts = createAsyncThunk(
    'product/getOwnedProducts',
    async ({ accessToken }: { accessToken: string }) => {
        const response = await axios.get(
            `http://localhost:8000/api/v1/product/owned`,
            {
                headers: { Authorization: `Bearer ${accessToken}` }
            }
        )
        return response.data
    }
)

export const getProductsByCustomer = createAsyncThunk(
    'product/getProductsByCustomer',
    async ({
        customerId,
        accessToken
    }: {
        customerId: string
        accessToken: string
    }) => {
        const response = await axios.get(
            `http://localhost:8000/api/v1/product/customer/${customerId}`,
            {
                headers: { Authorization: `Bearer ${accessToken}` }
            }
        )
        return response.data
    }
)

export const getProductById = createAsyncThunk(
    'product/getProductById',
    async ({
        productID,
        accessToken
    }: {
        productID: string
        accessToken: string
    }) => {
        const response = await axios.get(
            `http://localhost:8000/api/v1/product/${productID}`,
            {
                headers: { Authorization: `Bearer ${accessToken}` }
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
        builder.addCase(getAllOfProducts.pending, (state, action) => {
            console.log('pending')
        })
        builder.addCase(getAllOfProducts.fulfilled, (state, action) => {
            console.log('fulfilled', action)

            state.products = action.payload.data.products
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        builder.addCase(getAllOfProducts.rejected, (state, action) => {
            console.log('rejected')
        })

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        builder.addCase(getOwnedProducts.pending, (state, action) => {
            console.log('pending')
        })
        builder.addCase(getOwnedProducts.fulfilled, (state, action) => {
            console.log('fulfilled', action)

            state.products = action.payload.data.products
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        builder.addCase(getOwnedProducts.rejected, (state, action) => {
            console.log('rejected')
        })

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        builder.addCase(getProductsByCustomer.pending, (state, action) => {
            console.log('pending')
        })
        builder.addCase(getProductsByCustomer.fulfilled, (state, action) => {
            console.log('fulfilled', action)

            state.products = action.payload.data.products
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        builder.addCase(getProductsByCustomer.rejected, (state, action) => {
            console.log('rejected')
        })

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        builder.addCase(getProductById.pending, (state, action) => {
            console.log('pending')
        })
        builder.addCase(getProductById.fulfilled, (state, action) => {
            console.log('fulfilled', action)

            state.product = action.payload.data.product
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        builder.addCase(getProductById.rejected, (state, action) => {
            console.log('rejected')
        })
    }
})

const productReducer = productSlice.reducer

export const productSelector = (state: RootState) => state.productReducer

export const {} = productSlice.actions

export default productReducer
