import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { showAlert } from './alertSlice'
import { createProductOnBlockchain, getAllProducts, getProductDetail, getProductsByCustomer, getProductsByManufactory, getProductsByRetailer, moveToRetailer, sellToFirstCustomer } from '../../utils/web3-method/product'

const initialState = {
    products: [],
    product: undefined
}

export const createProduct = createAsyncThunk(
    'product/createProduct',
    async (
        {
            data,
            contract,
            accountAddress
        },
        { dispatch }
    ) => {
        try {
            dispatch(showAlert({ loading: true }))

            await createProductOnBlockchain(data, contract, accountAddress)

            dispatch(
                showAlert({
                    success: 'Successfully saved product to the blockchain.'
                })
            )
            window.location.href = '/products'

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error) {
            console.log(error)

            dispatch(
                showAlert({
                    error: 'Failed to save product to the blockchain.'
                })
            )
        }
    }
)

export const getAllOfProducts = createAsyncThunk(
    'product/getAllOfProducts',
    async (
        {
            contract,
            accountAddress
        },
        { dispatch }
    ) => {
        try {
            dispatch(showAlert({ loading: true }))

            const products = await getAllProducts(contract, accountAddress)
            console.log('products', products)

            dispatch(showAlert({ loading: false }))

            return products

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error) {
            dispatch(
                showAlert({
                    error: 'Failed retrieved products information.'
                })
            )
        }
    }
)

export const getAllProductsByManufactory = createAsyncThunk(
    'product/getProductsByManufactory',
    async (
        {
            manufactoryEmail,
            contract,
            accountAddress
        },
        { dispatch }
    ) => {
        try {
            dispatch(showAlert({ loading: true }))

            const products = await getProductsByManufactory(manufactoryEmail, contract, accountAddress)

            dispatch(showAlert({ loading: false }))

            return products

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error) {
            dispatch(
                showAlert({
                    error: 'Failed retrieved products information.'
                })
            )
        }
    }
)

export const getAllProductsByRetailer = createAsyncThunk(
    'product/getAllProductsByRetailer',
    async (
        {
            retailerEmail,
            contract,
            accountAddress
        },
        { dispatch }
    ) => {
        try {
            dispatch(showAlert({ loading: true }))

            const products = await getProductsByRetailer(retailerEmail, contract, accountAddress)

            dispatch(showAlert({ loading: false }))

            return products
        } catch (error) {
            dispatch(
                showAlert({
                    error: 'Failed retrieved products information.'
                })
            )
        }
    }
)

export const getAllProductsByCustomer = createAsyncThunk(
    'product/getAllProductsByCustomer',
    async (
        {
            customerEmail,
            contract,
            accountAddress
        },
        { dispatch }
    ) => {
        try {
            dispatch(showAlert({ loading: true }))

            const products = await getProductsByCustomer(customerEmail, contract, accountAddress)

            dispatch(showAlert({ loading: false }))

            return products
        } catch (error) {
            dispatch(
                showAlert({
                    error: 'Failed retrieved products information.'
                })
            )
        }
    }
)


export const getProductById = createAsyncThunk(
    'product/getProductById',
    async (
        {
            productID,
            contract,
            accountAddress
        },
        { dispatch }
    ) => {
        try {
            dispatch(showAlert({ loading: true }))

            const product = await getProductDetail(
                productID,
                contract,
                accountAddress
            )
            console.log('product', product)

            dispatch(showAlert({ loading: false }))

            return product

        } catch (error) {
            dispatch(
                showAlert({
                    error: 'Failed retrieved product information.'
                })
            )
        }
    }
)


export const moveProductToRetailer = createAsyncThunk(
    'product/moveProductToRetailer',
    async (
        {
            data,
            contract,
            accountAddress
        },
        { dispatch }
    ) => {
        try {
            dispatch(showAlert({ loading: true }))

            await moveToRetailer(
                data,
                contract,
                accountAddress
            )

            dispatch(showAlert({ success: 'Successfully moved the product to the retailer.' }))

        } catch (error) {
            dispatch(showAlert({ error: 'Failed to move the product to the retailer.' }))
        }
    }
)

export const sellProductToRetailer = createAsyncThunk(
    'product/sellProductToRetailer',
    async (
        {
            data,
            contract,
            accountAddress
        },
        { dispatch }
    ) => {
        try {
            dispatch(showAlert({ loading: true }))

            await sellToFirstCustomer(
                data,
                contract,
                accountAddress
            )

            dispatch(showAlert({ success: 'Successfully sold the product to the customer.' }))

        } catch (error) {
            dispatch(showAlert({ error: 'Failed to sell the product to the customer.' }))
        }
    }
)

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllOfProducts.fulfilled, (state, action) => {
            console.log('fulfilled')
            state.products = action.payload
        })

        builder.addCase(getProductById.fulfilled, (state, action) => {
            console.log('fulfilled')
            state.product = action.payload
        })

        builder.addCase(getAllProductsByManufactory.fulfilled, (state, action) => {
            console.log('fulfilled')
            state.products = action.payload
        })

        builder.addCase(getAllProductsByRetailer.fulfilled, (state, action) => {
            console.log('fulfilled')
            state.products = action.payload
        })
    }
})

const productReducer = productSlice.reducer

export const productSelector = (state) => state.productReducer

export const {} = productSlice.actions

export default productReducer
