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

const contractAbi = [
    {
        inputs: [
            {
                internalType: 'string',
                name: '_productID',
                type: 'string'
            },
            {
                internalType: 'string',
                name: '_oldCustomerEmail',
                type: 'string'
            },
            {
                internalType: 'string',
                name: '_newCustomerEmail',
                type: 'string'
            },
            {
                internalType: 'string',
                name: '_changeDate',
                type: 'string'
            }
        ],
        name: 'changeCustomer',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool'
            }
        ],
        stateMutability: 'payable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: '_customerEmail',
                type: 'string'
            },
            {
                internalType: 'string',
                name: '_name',
                type: 'string'
            },
            {
                internalType: 'string',
                name: '_phone_number',
                type: 'string'
            }
        ],
        name: 'createCustomer',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool'
            }
        ],
        stateMutability: 'payable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: '_manufactorEmail',
                type: 'string'
            },
            {
                internalType: 'string',
                name: '_manufactorName',
                type: 'string'
            }
        ],
        name: 'createManufactory',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool'
            }
        ],
        stateMutability: 'payable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: '_productID',
                type: 'string'
            },
            {
                internalType: 'string',
                name: '_model',
                type: 'string'
            },
            {
                internalType: 'string',
                name: '_description',
                type: 'string'
            },
            {
                internalType: 'string',
                name: '_manufactoryEmail',
                type: 'string'
            },
            {
                internalType: 'string',
                name: '_productionDate',
                type: 'string'
            }
        ],
        name: 'createProduct',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool'
            }
        ],
        stateMutability: 'payable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: '_retailerEmail',
                type: 'string'
            },
            {
                internalType: 'string',
                name: '_retailerName',
                type: 'string'
            }
        ],
        name: 'createRetailer',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool'
            }
        ],
        stateMutability: 'payable',
        type: 'function'
    },
    {
        inputs: [],
        name: 'getAllProducts',
        outputs: [
            {
                components: [
                    {
                        internalType: 'string',
                        name: 'model',
                        type: 'string'
                    },
                    {
                        internalType: 'string',
                        name: 'description',
                        type: 'string'
                    },
                    {
                        internalType: 'string',
                        name: 'manufactoryEmail',
                        type: 'string'
                    },
                    {
                        internalType: 'string',
                        name: 'retailerEmail',
                        type: 'string'
                    },
                    {
                        internalType: 'string',
                        name: 'customerEmail',
                        type: 'string'
                    },
                    {
                        internalType: 'uint256',
                        name: 'status',
                        type: 'uint256'
                    },
                    {
                        components: [
                            {
                                internalType: 'uint256',
                                name: 'timestamp',
                                type: 'uint256'
                            },
                            {
                                internalType: 'string',
                                name: 'action',
                                type: 'string'
                            },
                            {
                                internalType: 'string',
                                name: 'details',
                                type: 'string'
                            },
                            {
                                internalType: 'string',
                                name: 'date',
                                type: 'string'
                            }
                        ],
                        internalType: 'struct FPIS.HistoryItem[]',
                        name: 'history',
                        type: 'tuple[]'
                    }
                ],
                internalType: 'struct FPIS.Product[]',
                name: '',
                type: 'tuple[]'
            },
            {
                internalType: 'string[]',
                name: '',
                type: 'string[]'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: '_customerEmail',
                type: 'string'
            }
        ],
        name: 'getCustomerDetail',
        outputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string'
            },
            {
                internalType: 'string',
                name: '',
                type: 'string'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: '_manufactorEmail',
                type: 'string'
            }
        ],
        name: 'getManafactorDetail',
        outputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: '_productID',
                type: 'string'
            }
        ],
        name: 'getProductDetail',
        outputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string'
            },
            {
                internalType: 'string',
                name: '',
                type: 'string'
            },
            {
                internalType: 'string',
                name: '',
                type: 'string'
            },
            {
                internalType: 'string',
                name: '',
                type: 'string'
            },
            {
                internalType: 'string',
                name: '',
                type: 'string'
            },
            {
                components: [
                    {
                        internalType: 'uint256',
                        name: 'timestamp',
                        type: 'uint256'
                    },
                    {
                        internalType: 'string',
                        name: 'action',
                        type: 'string'
                    },
                    {
                        internalType: 'string',
                        name: 'details',
                        type: 'string'
                    },
                    {
                        internalType: 'string',
                        name: 'date',
                        type: 'string'
                    }
                ],
                internalType: 'struct FPIS.HistoryItem[]',
                name: '',
                type: 'tuple[]'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: '_customerEmail',
                type: 'string'
            }
        ],
        name: 'getProductsByCustomer',
        outputs: [
            {
                internalType: 'string[]',
                name: '',
                type: 'string[]'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: '_manufactoryEmail',
                type: 'string'
            }
        ],
        name: 'getProductsByManufactory',
        outputs: [
            {
                components: [
                    {
                        internalType: 'string',
                        name: 'model',
                        type: 'string'
                    },
                    {
                        internalType: 'string',
                        name: 'description',
                        type: 'string'
                    },
                    {
                        internalType: 'string',
                        name: 'manufactoryEmail',
                        type: 'string'
                    },
                    {
                        internalType: 'string',
                        name: 'retailerEmail',
                        type: 'string'
                    },
                    {
                        internalType: 'string',
                        name: 'customerEmail',
                        type: 'string'
                    },
                    {
                        internalType: 'uint256',
                        name: 'status',
                        type: 'uint256'
                    },
                    {
                        components: [
                            {
                                internalType: 'uint256',
                                name: 'timestamp',
                                type: 'uint256'
                            },
                            {
                                internalType: 'string',
                                name: 'action',
                                type: 'string'
                            },
                            {
                                internalType: 'string',
                                name: 'details',
                                type: 'string'
                            },
                            {
                                internalType: 'string',
                                name: 'date',
                                type: 'string'
                            }
                        ],
                        internalType: 'struct FPIS.HistoryItem[]',
                        name: 'history',
                        type: 'tuple[]'
                    }
                ],
                internalType: 'struct FPIS.Product[]',
                name: '',
                type: 'tuple[]'
            },
            {
                internalType: 'string[]',
                name: '',
                type: 'string[]'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: '_retailerEmail',
                type: 'string'
            }
        ],
        name: 'getProductsByRetailer',
        outputs: [
            {
                components: [
                    {
                        internalType: 'string',
                        name: 'model',
                        type: 'string'
                    },
                    {
                        internalType: 'string',
                        name: 'description',
                        type: 'string'
                    },
                    {
                        internalType: 'string',
                        name: 'manufactoryEmail',
                        type: 'string'
                    },
                    {
                        internalType: 'string',
                        name: 'retailerEmail',
                        type: 'string'
                    },
                    {
                        internalType: 'string',
                        name: 'customerEmail',
                        type: 'string'
                    },
                    {
                        internalType: 'uint256',
                        name: 'status',
                        type: 'uint256'
                    },
                    {
                        components: [
                            {
                                internalType: 'uint256',
                                name: 'timestamp',
                                type: 'uint256'
                            },
                            {
                                internalType: 'string',
                                name: 'action',
                                type: 'string'
                            },
                            {
                                internalType: 'string',
                                name: 'details',
                                type: 'string'
                            },
                            {
                                internalType: 'string',
                                name: 'date',
                                type: 'string'
                            }
                        ],
                        internalType: 'struct FPIS.HistoryItem[]',
                        name: 'history',
                        type: 'tuple[]'
                    }
                ],
                internalType: 'struct FPIS.Product[]',
                name: '',
                type: 'tuple[]'
            },
            {
                internalType: 'string[]',
                name: '',
                type: 'string[]'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: '_retailerEmail',
                type: 'string'
            }
        ],
        name: 'getRetailerDetail',
        outputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: '_productID',
                type: 'string'
            },
            {
                internalType: 'string',
                name: '_retailerEmail',
                type: 'string'
            },
            {
                internalType: 'string',
                name: '_movingDate',
                type: 'string'
            }
        ],
        name: 'moveToRetailer',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool'
            }
        ],
        stateMutability: 'payable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'string',
                name: '_productID',
                type: 'string'
            },
            {
                internalType: 'string',
                name: '_retailerEmail',
                type: 'string'
            },
            {
                internalType: 'string',
                name: '_customerEmail',
                type: 'string'
            },
            {
                internalType: 'string',
                name: '_saleDate',
                type: 'string'
            }
        ],
        name: 'sellToFirstCustomer',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool'
            }
        ],
        stateMutability: 'payable',
        type: 'function'
    },
    {
        stateMutability: 'payable',
        type: 'receive'
    }
];
const contractAddress = '0xa96E93cc9349CF34C11728677d39c0eB9D41635E';
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
