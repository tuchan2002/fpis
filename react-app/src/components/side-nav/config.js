import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import QrCodeIcon from '@heroicons/react/24/solid/QrCodeIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import TruckIcon from '@heroicons/react/24/solid/TruckIcon';
import TagIcon from '@heroicons/react/24/solid/TagIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';

import { SvgIcon } from '@mui/material';

const items = [
    {
        title: 'Tổng quan',
        path: '/',
        icon: (
            <SvgIcon fontSize='small'>
                <ChartBarIcon />
            </SvgIcon>
        ),
        allowedRolesList: [0, 1, 2, 3]
    },
    {
        title: 'Quản lý tài khoản',
        path: '/accounts',
        icon: (
            <SvgIcon fontSize='small'>
                <UsersIcon />
            </SvgIcon>
        ),
        allowedRolesList: [3]
    },
    {
        title: 'Danh sách sản phẩm',
        path: '/products',
        icon: (
            <SvgIcon fontSize='small'>
                <ShoppingBagIcon />
            </SvgIcon>
        ),
        allowedRolesList: [0, 1, 2, 3]
    },
    {
        title: 'Di chuyển sản phẩm',
        path: '/move-product',
        icon: (
            <SvgIcon fontSize='small'>
                <TruckIcon />
            </SvgIcon>
        ),
        allowedRolesList: [0]
    },
    {
        title: 'Bán sản phẩm',
        path: '/sell-product',
        icon: (
            <SvgIcon fontSize='small'>
                <TagIcon />
            </SvgIcon>
        ),
        allowedRolesList: [1]
    },
    {
        title: 'Chuyển quyền sở hữu',
        path: '/change-ownership',
        icon: (
            <SvgIcon fontSize='small'>
                <LockClosedIcon />
            </SvgIcon>
        ),
        allowedRolesList: [2]
    },
    {
        title: 'Xác minh sản phẩm',
        path: '/verify-product',
        icon: (
            <SvgIcon fontSize='small'>
                <QrCodeIcon />
            </SvgIcon>
        ),
        allowedRolesList: [2]
    },
    {
        title: 'Cài đặt',
        path: '/#',
        icon: (
            <SvgIcon fontSize='small'>
                <CogIcon />
            </SvgIcon>
        ),
        allowedRolesList: [0, 1, 2, 3]
    }
];

export default items;
