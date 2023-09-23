import Swal from 'sweetalert2';

const showSweetAlert = async (icon = 'success', text = '') => {
    await Swal.fire({
        icon,
        text
    });
};

export default showSweetAlert;
