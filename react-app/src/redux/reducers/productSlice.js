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

            await showSweetAlert('success', 'Di chuyển sản phẩm sang đại lý thành công.');

            return product;
        } catch (error) {
            console.error(error);
            dispatch(showAlert({ loading: false }));
            await showSweetAlert('error', 'Di chuyển sản phẩm sang đại lý thất bại.');

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

            await showSweetAlert('success', 'Bán sản phẩm thành công.');

            return product;
        } catch (error) {
            dispatch(showAlert({ loading: false }));
            await showSweetAlert('error', 'Bán sản phẩm thất bại.');

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
            await showSweetAlert('success', 'Thay đổi quyền sở hữu cho khách hàng khách thành công.');

            return product;
        } catch (error) {
            dispatch(showAlert({ loading: false }));
            dispatch(showAlert({ loading: false }));
            await showSweetAlert('error', 'Thay đổi quyền sở hữu cho khách hàng khách thất bại.');

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
