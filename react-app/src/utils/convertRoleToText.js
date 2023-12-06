const convertRoleToText = (role) => {
    switch (role) {
    case 0:
        return 'Nhà máy';
    case 1:
        return 'Đại lý';
    case 2:
        return 'Khách hàng';
    case 3:
        return 'Quản trị viên';
    default:
        return 'Guest';
    }
};
export default convertRoleToText;
