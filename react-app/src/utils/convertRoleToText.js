const convertRoleToText = (role) => {
    switch (role) {
    case 0:
        return 'Manufactory';
    case 1:
        return 'Retailer';
    case 2:
        return 'Customer';
    case 3:
        return 'Admin';
    default:
        return 'Guest';
    }
};
export default convertRoleToText;
