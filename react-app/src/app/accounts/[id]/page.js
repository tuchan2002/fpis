import { Box, Button, FormControlLabel, FormGroup, List, ListItem, ListItemText, Paper, Switch } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate, useParams } from 'react-router-dom'
import { AppDispatch } from '../../../redux'
import { authSelector } from '../../../redux/reducers/authSlice'
import useAuthEffect from '../../../customHook/useAuthEffect'
import { getUserById, toggleActiveAccount, userSelector } from '../../../redux/reducers/userSlice'
import { web3Selector } from '../../../redux/reducers/web3Slice'

const AccountDetails = () => {
    const params = useParams();

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userReducer = useSelector(userSelector)
    const web3Reducer = useSelector(web3Selector)


    const authReducer = useSelector(authSelector)
    const currentUserRole = authReducer.user && authReducer.user?.role
    const allowedRolesList = [3]
    useAuthEffect(currentUserRole, allowedRolesList, authReducer.user?.isActive)

    useEffect(() => {
        dispatch(
            getUserById({
                userId: params?.id,
            })
        )
    }, [authReducer.user])

    const convertRoleToText = (role) => {
        switch (role) {
            case 0:
                return 'Manufactory'
            case 1:
                return 'Retailer'
            case 2:
                return 'Customer'
            default:
                return 'Manufactory'
        }
    }

    const handleToggleActiveAccount = async () => {
        dispatch(toggleActiveAccount({userData: userReducer.user, contract: web3Reducer.contract, accountAddress: web3Reducer.account}))
    }

    return (
        currentUserRole !== null &&
        allowedRolesList.includes(currentUserRole) && (
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
                <Paper sx={{ p: 3, maxWidth: 720, width: '100%' }}>
                    <Button
                        variant='text'
                        onClick={() => navigate(-1)}
                        startIcon={<ArrowBackIcon />}
                    >
                        戻る
                    </Button>
                    <List
                        sx={{
                            width: '100%',
                            bgcolor: 'background.paper'
                        }}
                    >
                        <ListItem>
                            <ListItemText
                                primary='Email'
                                secondary={userReducer.user?.email}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary='Name'
                                secondary={userReducer.user?.displayName}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary='Role'
                                secondary={convertRoleToText(
                                    userReducer.user?.role
                                        ? userReducer.user?.role
                                        : 3
                                )}
                            />
                        </ListItem>
                        <ListItem>
                            <FormGroup>
                                <FormControlLabel control={<Switch checked={userReducer.user?.isActive} onClick={handleToggleActiveAccount} />} label={userReducer.user?.isActive ? "Active" : "Inactive"} />
                            </FormGroup>
                        </ListItem>
                    </List>
                </Paper>
            </Box>
        )
    )
}

export default AccountDetails
