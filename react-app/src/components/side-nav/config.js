import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import { SvgIcon } from '@mui/material';

const items = [
    {
        title: 'Overview',
        path: '/',
        icon: (
            <SvgIcon fontSize='small'>
                <ChartBarIcon />
            </SvgIcon>
        )
    },
    {
        title: 'Accounts',
        path: '/accounts',
        icon: (
            <SvgIcon fontSize='small'>
                <UsersIcon />
            </SvgIcon>
        )
    },
    {
        title: 'Products',
        path: '/products',
        icon: (
            <SvgIcon fontSize='small'>
                <ShoppingBagIcon />
            </SvgIcon>
        )
    },
    {
        title: 'Move Product',
        path: '/move-product',
        icon: (
            <SvgIcon fontSize='small'>
                <UserIcon />
            </SvgIcon>
        )
    },
    {
        title: 'Sell Product',
        path: '/sell-product',
        icon: (
            <SvgIcon fontSize='small'>
                <CogIcon />
            </SvgIcon>
        )
    },
    {
        title: 'Change Ownership',
        path: '/change-ownership',
        icon: (
            <SvgIcon fontSize='small'>
                <LockClosedIcon />
            </SvgIcon>
        )
    },
    {
        title: 'Verify Product',
        path: '/verify-product',
        icon: (
            <SvgIcon fontSize='small'>
                <UserPlusIcon />
            </SvgIcon>
        )
    }
];

export default items;
