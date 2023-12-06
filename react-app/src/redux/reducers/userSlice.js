import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDocument, getDocumentsCondition, updateDocument } from '../../firebase/services';
import { showAlert } from './alertSlice';
import { createCustomer, createManufactory, createRetailer, removeCustomer, removeManufactory, removeRetailer } from '../../utils/web3-method/auth';

const initialState = {
    users: [],
    user: null
};

export const getAllOfUsers = createAsyncThunk(
    'user/getAllOfUsers',
    async () => {
        try {
            const users = await getDocumentsCondition('users', 'role', '!=', 3);
            return users;
        } catch (error) {
            console.log(error);
        }
    }
);

export const getUserById = createAsyncThunk(
    'user/getUserById',
    async ({
        userId
    }) => {
        try {
            const user = await getDocument('users', 'uid', userId);
            return user;
        } catch (error) {
            console.log(error);
        }
    }
);

export const getUsersByRole = createAsyncThunk(
    'user/getUsersByRole',
    async ({ role }) => {
        try {
            const users = await getDocumentsCondition('users', 'role', '==', role);
            return users;
        } catch (error) {
            console.log(error);
        }
    }
);

export const activateAccount = createAsyncThunk(
    'user/activateAccount',
    async ({
        userData,
        roleOption,
        contract,
        accountAddress
    }, {dispatch}) => {
        let success = false;
        try {
            dispatch(showAlert({ loading: true }));

            if (roleOption === 0) {
                await createManufactory({name: userData.displayName, email: userData.email}, contract, accountAddress);
            } else if (roleOption === 1) {
                await createRetailer({name: userData.displayName, email: userData.email}, contract, accountAddress);
            } else if (roleOption === 2) {
                await createCustomer({name: userData.displayName, email: userData.email}, contract, accountAddress);
            }
            success = true;
        } catch (error) {
            success = false;
            dispatch(showAlert({ error: 'Kích hoạt tài khoản thất bại.' }));
        } finally {
            if (success) {
                await updateDocument('users', { isActive: true, role: roleOption }, 'uid', userData.uid);
                dispatch(showAlert({ success: 'Kích hoạt tài khoản thành công.' }));
            }
        }
        return {roleOption, success};
    }
);

export const deactivateAccount = createAsyncThunk(
    'user/deactivateAccount',
    async ({
        userData,
        contract,
        accountAddress
    }, {dispatch}) => {
        const guestRole = -1;
        let success = false;

        try {
            dispatch(showAlert({ loading: true }));

            if (userData.role === 0) {
                await removeManufactory({ email: userData.email}, contract, accountAddress);
            } else if (userData.role === 1) {
                await removeRetailer({ email: userData.email}, contract, accountAddress);
            } else if (userData.role === 2) {
                await removeCustomer({ email: userData.email}, contract, accountAddress);
            }
            success = true;
        } catch (error) {
            success = false;
            dispatch(showAlert({ error: 'Vô hiệu hóa tài khoản thất bại.' }));
        } finally {
            if (success) {
                await updateDocument('users', { isActive: false, role: guestRole }, 'uid', userData.uid);
                dispatch(showAlert({ success: 'Vô hiệu hóa tài khoản thành công.' }));
            }
        }

        return {guestRole, success};
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllOfUsers.fulfilled, (state, action) => {
            state.users = action.payload;
        });

        builder.addCase(getUserById.fulfilled, (state, action) => {
            state.user = action.payload;
        });

        builder.addCase(getUsersByRole.fulfilled, (state, action) => {
            state.users = action.payload;
        });

        builder.addCase(activateAccount.fulfilled, (state, action) => {
            if (action.payload.success) {
                state.user.isActive = true;
                state.user.role = action.payload.roleOption;
            }
        });

        builder.addCase(deactivateAccount.fulfilled, (state, action) => {
            if (action.payload.success) {
                state.user.isActive = false;
                state.user.role = action.payload.guestRole;
            }
        });
    }
});

const userReducer = userSlice.reducer;

export const userSelector = (state) => state.userReducer;

// export const {} = userSlice.actions;

export default userReducer;
