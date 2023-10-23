import { Avatar, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import React from 'react';
import convertRoleToText from '../../../utils/convertRoleToText';

function UserInfo({userDetailInfo}) {
    return (
        <>
            <Avatar alt={userDetailInfo.displayName} src={userDetailInfo.photoURL} sx={{width: 100, height: 100, alignSelf: 'center'}} />
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableBody>
                        <TableRow>
                            <TableCell component='th' scope='row'>
                                Email
                            </TableCell>
                            <TableCell align='right'>
                                {userDetailInfo.email}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component='th' scope='row'>
                                Name
                            </TableCell>
                            <TableCell align='right'>{userDetailInfo.displayName}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component='th' scope='row'>
                                Role
                            </TableCell>
                            <TableCell align='right'>
                                {convertRoleToText(
                                    userDetailInfo.role
                                )}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default React.memo(UserInfo);
