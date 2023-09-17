'use client'

import { AppDispatch } from '@/redux'
import { handleAuthStateChanged } from '@/redux/reducers/authSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import GlobalAlert from './global-alert'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/config'
import { getDocument } from '@/firebase/services'
import {
    setAccount,
    setWeb3State,
    web3Selector
} from '@/redux/reducers/web3Slice'
import { showAlert } from '@/redux/reducers/alertSlice'
import detectEthereumProvider from '@metamask/detect-provider'
import Web3 from 'web3'

const contractAbi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'string',
                name: 'newValue',
                type: 'string'
            }
        ],
        name: 'StateChanged',
        type: 'event'
    },
    {
        inputs: [
            { internalType: 'string', name: '_productID', type: 'string' },
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
            { internalType: 'string', name: '_changeDate', type: 'string' }
        ],
        name: 'changeCustomer',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'payable',
        type: 'function'
    },
    {
        inputs: [
            { internalType: 'string', name: '_customerEmail', type: 'string' },
            { internalType: 'string', name: '_name', type: 'string' },
            { internalType: 'string', name: '_phone_number', type: 'string' }
        ],
        name: 'createCustomer',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
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
            { internalType: 'string', name: '_manufactorName', type: 'string' }
        ],
        name: 'createManufactory',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'payable',
        type: 'function'
    },
    {
        inputs: [
            { internalType: 'string', name: '_productID', type: 'string' },
            { internalType: 'string', name: '_model', type: 'string' },
            { internalType: 'string', name: '_description', type: 'string' },
            {
                internalType: 'string',
                name: '_manufactoryEmail',
                type: 'string'
            },
            { internalType: 'string', name: '_productionDate', type: 'string' }
        ],
        name: 'createProduct',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'payable',
        type: 'function'
    },
    {
        inputs: [
            { internalType: 'string', name: '_retailerEmail', type: 'string' },
            { internalType: 'string', name: '_retailerName', type: 'string' }
        ],
        name: 'createRetailer',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'payable',
        type: 'function'
    },
    {
        inputs: [],
        name: 'getAllProducts',
        outputs: [
            {
                components: [
                    { internalType: 'string', name: 'model', type: 'string' },
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
            { internalType: 'string[]', name: '', type: 'string[]' }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            { internalType: 'string', name: '_customerEmail', type: 'string' }
        ],
        name: 'getCustomerDetail',
        outputs: [
            { internalType: 'string', name: '', type: 'string' },
            { internalType: 'string', name: '', type: 'string' }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            { internalType: 'string', name: '_manufactorEmail', type: 'string' }
        ],
        name: 'getManafactorDetail',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            { internalType: 'string', name: '_productID', type: 'string' }
        ],
        name: 'getProductDetail',
        outputs: [
            { internalType: 'string', name: '', type: 'string' },
            { internalType: 'string', name: '', type: 'string' },
            { internalType: 'string', name: '', type: 'string' },
            { internalType: 'string', name: '', type: 'string' },
            { internalType: 'string', name: '', type: 'string' },
            {
                components: [
                    {
                        internalType: 'uint256',
                        name: 'timestamp',
                        type: 'uint256'
                    },
                    { internalType: 'string', name: 'action', type: 'string' },
                    { internalType: 'string', name: 'details', type: 'string' },
                    { internalType: 'string', name: 'date', type: 'string' }
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
            { internalType: 'string', name: '_customerEmail', type: 'string' }
        ],
        name: 'getProductsByCustomer',
        outputs: [{ internalType: 'string[]', name: '', type: 'string[]' }],
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
                    { internalType: 'string', name: 'model', type: 'string' },
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
            { internalType: 'string[]', name: '', type: 'string[]' }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            { internalType: 'string', name: '_retailerEmail', type: 'string' }
        ],
        name: 'getProductsByRetailer',
        outputs: [
            {
                components: [
                    { internalType: 'string', name: 'model', type: 'string' },
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
            { internalType: 'string[]', name: '', type: 'string[]' }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            { internalType: 'string', name: '_retailerEmail', type: 'string' }
        ],
        name: 'getRetailerDetail',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            { internalType: 'string', name: '_productID', type: 'string' },
            { internalType: 'string', name: '_retailerEmail', type: 'string' },
            { internalType: 'string', name: '_movingDate', type: 'string' }
        ],
        name: 'moveToRetailer',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'payable',
        type: 'function'
    },
    {
        inputs: [
            { internalType: 'string', name: '_productID', type: 'string' },
            { internalType: 'string', name: '_retailerEmail', type: 'string' },
            { internalType: 'string', name: '_customerEmail', type: 'string' },
            { internalType: 'string', name: '_saleDate', type: 'string' }
        ],
        name: 'sellToFirstCustomer',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'payable',
        type: 'function'
    },
    { stateMutability: 'payable', type: 'receive' }
]
const contractAddress = '0x7F79BAC746fd87d929601c4200255e1EE992C3F9'
const WrapperContainer = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()

    const web3Reducer = useSelector(web3Selector)
    console.log('web3Reducer', web3Reducer)

    useEffect(() => {
        const unsubcribed = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDoc = await getDocument('users', 'uid', user.uid)
                console.log('userDoc', userDoc)

                const { displayName, email, uid, photoURL } = user
                dispatch(
                    handleAuthStateChanged({
                        displayName,
                        email,
                        uid,
                        photoURL,
                        role: userDoc?.role
                    })
                )
            } else {
                router.push('/login')
            }
        })

        return () => {
            unsubcribed()
        }
    }, [])

    useEffect(() => {
        const loadProvider = async () => {
            try {
                const provider = await detectEthereumProvider()
                const web3 = new Web3(provider as any)
                const contract = new web3.eth.Contract(
                    contractAbi,
                    contractAddress
                )

                if (provider) {
                    let accountAddress
                    provider.on('accountsChanged', (accounts) => {
                        console.log('accounts', accounts)
                        accountAddress = accounts[0]
                    })

                    const data = {
                        provider,
                        web3,
                        contract,
                        account: accountAddress
                    }

                    dispatch(setWeb3State(data))

                    console.log(data)
                } else {
                    dispatch(showAlert({ error: 'Please, Install Metamask' }))
                }

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                console.log(error)
            }
        }
        loadProvider()
    }, [])

    useEffect(() => {
        const getAccount = async () => {
            const accounts = await web3Reducer.web3.eth.getAccounts()
            dispatch(setAccount(accounts[0]))
        }
        web3Reducer.web3 && getAccount()
    }, [web3Reducer.web3])

    return (
        <>
            <GlobalAlert />
            {children}
        </>
    )
}

export default WrapperContainer
