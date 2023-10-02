import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { showAlert } from './alertSlice';
import { changeCustomer, createProductOnBlockchain, getAllProducts, getProductDetail, getProductsByCustomer, getProductsByManufactory, getProductsByRetailer, moveToRetailer, sellToCustomer } from '../../utils/web3-method/product';
import showSweetAlert from '../../utils/show-swal';

const initialState = {
    products: [],
    product: undefined
};

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
            dispatch(showAlert({ loading: true }));

            await createProductOnBlockchain(data, contract, accountAddress);

            dispatch(
                showAlert({
                    success: 'Successfully saved product to the blockchain.'
                })
            );
            window.location.href = '/products';
        } catch (error) {
            console.log(error);

            dispatch(
                showAlert({
                    error: 'Failed to save product to the blockchain.'
                })
            );
        }
    }
);

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
            dispatch(showAlert({ loading: true }));

            const products = await getAllProducts(contract, accountAddress);
            console.log('products', products);

            dispatch(showAlert({ loading: false }));

            return products;
        } catch (error) {
            dispatch(
                showAlert({
                    error: 'Failed retrieved products information.'
                })
            );
        }
    }
);

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
            dispatch(showAlert({ loading: true }));

            const products = await getProductsByManufactory(manufactoryEmail, contract, accountAddress);

            dispatch(showAlert({ loading: false }));

            return products;
        } catch (error) {
            dispatch(
                showAlert({
                    error: 'Failed retrieved products information.'
                })
            );
        }
    }
);

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
            dispatch(showAlert({ loading: true }));

            const products = await getProductsByRetailer(retailerEmail, contract, accountAddress);

            dispatch(showAlert({ loading: false }));

            return products;
        } catch (error) {
            dispatch(
                showAlert({
                    error: 'Failed retrieved products information.'
                })
            );
        }
    }
);

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
            dispatch(showAlert({ loading: true }));

            const products = await getProductsByCustomer(customerEmail, contract, accountAddress);

            dispatch(showAlert({ loading: false }));

            return products;
        } catch (error) {
            dispatch(
                showAlert({
                    error: 'Failed retrieved products information.'
                })
            );
        }
    }
);

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
            dispatch(showAlert({ loading: true }));

            const product = await getProductDetail(
                productID,
                contract,
                accountAddress
            );

            console.log('productproduct', product);

            dispatch(showAlert({ loading: false }));

            return product;
        } catch (error) {
            console.log(error);
            dispatch(
                showAlert({
                    error: 'Failed retrieved product information.'
                })
            );
        }
    }
);

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
            dispatch(showAlert({ loading: true }));

            await moveToRetailer(
                data,
                contract,
                accountAddress
            );

            const product = await getProductDetail(
                data.productID,
                contract,
                accountAddress
            );

            dispatch(showAlert({ loading: false }));

            await showSweetAlert('success', 'Successfully moved the product to the retailer.');

            return product;
        } catch (error) {
            console.error(error);
            dispatch(showAlert({ loading: false }));
            await showSweetAlert('error', 'Failed to move the product to the retailer.');

            const product = await getProductDetail(
                data.productID,
                contract,
                accountAddress
            );
            return product;
        }
    }
);

export const sellProductToCustomer = createAsyncThunk(
    'product/sellProductToCustomer',
    async (
        {
            data,
            contract,
            accountAddress
        },
        { dispatch }
    ) => {
        try {
            dispatch(showAlert({ loading: true }));

            await sellToCustomer(
                data,
                contract,
                accountAddress
            );

            const product = await getProductDetail(
                data.productID,
                contract,
                accountAddress
            );

            dispatch(showAlert({ loading: false }));

            await showSweetAlert('success', 'Successfully sold the product to the customer.');

            return product;
        } catch (error) {
            await showSweetAlert('error', 'Failed to sell the product to the customer.');

            const product = await getProductDetail(
                data.productID,
                contract,
                accountAddress
            );
            return product;
        }
    }
);

export const changeCustomerOfProduct = createAsyncThunk(
    'product/changeCustomerOfProduct',
    async (
        {
            data,
            contract,
            accountAddress
        },
        { dispatch }
    ) => {
        try {
            dispatch(showAlert({ loading: true }));

            await changeCustomer(
                data,
                contract,
                accountAddress
            );

            const product = await getProductDetail(
                data.productID,
                contract,
                accountAddress
            );

            dispatch(showAlert({ loading: false }));

            await showSweetAlert('success', 'Successfully changed the product to another customer.');

            return product;
        } catch (error) {
            await showSweetAlert('error', 'Failed to change the product.');

            const product = await getProductDetail(
                data.productID,
                contract,
                accountAddress
            );
            return product;
        }
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllOfProducts.fulfilled, (state, action) => {
            state.products = action.payload;
        });

        builder.addCase(getProductById.fulfilled, (state, action) => {
            state.product = action.payload;
        });

        builder.addCase(getAllProductsByManufactory.fulfilled, (state, action) => {
            state.products = action.payload;
        });

        builder.addCase(getAllProductsByRetailer.fulfilled, (state, action) => {
            state.products = action.payload;
        });

        builder.addCase(getAllProductsByCustomer.fulfilled, (state, action) => {
            state.products = action.payload;
        });

        builder.addCase(moveProductToRetailer.fulfilled, (state, action) => {
            state.product = action.payload;
        });

        builder.addCase(sellProductToCustomer.fulfilled, (state, action) => {
            state.product = action.payload;
        });

        builder.addCase(changeCustomerOfProduct.fulfilled, (state, action) => {
            state.product = action.payload;
        });
    }
});

const productReducer = productSlice.reducer;

export const productSelector = (state) => state.productReducer;

// export const {} = productSlice.actions;

export default productReducer;
