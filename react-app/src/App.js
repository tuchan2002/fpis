import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import { getDocument } from './firebase/services';
import { handleAuthStateChanged } from './redux/reducers/authSlice';
import { auth } from './firebase/config';
import { showAlert } from './redux/reducers/alertSlice';
import GlobalAlert from './components/global-alert';
import NavbarMenu from './components/navbar-menu';
import Login from './app/login/page';
import Home from './app/page';
import Products from './app/products/page';
import SellProduct from './app/sell-product/page';
import NotFound from './app/not-found/page';
import MoveProduct from './app/move-product/page';
import ChangeOwnership from './app/change-ownership/page';
import Accounts from './app/accounts/page';
import AccountDetails from './app/accounts/[id]/page';
import VerifyProduct from './app/verify-product/page';
import CreateProduct from './app/create-product/page';
import { setAccount, setWeb3State, web3Selector } from './redux/reducers/web3Slice';
import ProductDetails from './app/products/[id]/page';
import contractInfo from './contract-info.json';

const contractAbi = contractInfo.contractABI;
const contractAddress = contractInfo.contractAddress;
console.log(contractAbi, contractAddress);
function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const web3Reducer = useSelector(web3Selector);
    console.log('web3Reducer', web3Reducer);

    useEffect(() => {
        const unsubcribed = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDoc = await getDocument('users', 'uid', user.uid);
                console.log('userDoc', userDoc);

                const { displayName, email, uid, photoURL } = user;
                dispatch(
                    handleAuthStateChanged({
                        displayName,
                        email,
                        uid,
                        photoURL,
                        role: userDoc?.role,
                        isActive: userDoc?.isActive
                    })
                );
            } else {
                navigate('/login');
            }
        });

        return () => {
            unsubcribed();
        };
    }, []);

    useEffect(() => {
        const loadProvider = async () => {
            try {
                const provider = await detectEthereumProvider();
                const web3 = new Web3(provider);
                const contract = new web3.eth.Contract(
                    contractAbi,
                    contractAddress
                );

                if (provider) {
                    let accountAddress;
                    provider.on('accountsChanged', (accounts) => {
                        console.log('accounts', accounts);
                        accountAddress = accounts[0];
                    });

                    const data = {
                        provider,
                        web3,
                        contract,
                        account: accountAddress
                    };

                    dispatch(setWeb3State(data));

                    console.log(data);
                } else {
                    dispatch(showAlert({ error: 'Please, Install Metamask' }));
                }
            } catch (error) {
                console.log(error);
            }
        };
        loadProvider();
    }, []);

    useEffect(() => {
        const getAccount = async () => {
            const accounts = await web3Reducer.web3.eth.getAccounts();
            dispatch(setAccount(accounts[0]));
        };

        if (web3Reducer.web3) {
            getAccount();
        }
    }, [web3Reducer.web3]);

    return (
        <>
            <GlobalAlert />
            <NavbarMenu />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route
                    path='/login'
                    element={<Login />}
                />
                <Route
                    path='/create-product'
                    element={<CreateProduct />}
                />
                <Route
                    path='/products'
                    element={<Products />}
                />
                <Route
                    path='/products/:id'
                    element={<ProductDetails />}
                />
                <Route
                    path='/sell-product'
                    element={<SellProduct />}
                />
                <Route
                    path='/move-product'
                    element={<MoveProduct />}
                />
                <Route
                    path='/change-ownership'
                    element={<ChangeOwnership />}
                />
                <Route
                    path='/verify-product'
                    element={<VerifyProduct />}
                />
                <Route
                    path='/accounts'
                    element={<Accounts />}
                />
                <Route
                    path='/accounts/:id'
                    element={<AccountDetails />}
                />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
