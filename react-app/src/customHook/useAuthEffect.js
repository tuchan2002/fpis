import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuthEffect = (
    currentUserRole,
    allowedRolesList,
    isActive
) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUserRole !== null) {
            if (!allowedRolesList.includes(currentUserRole) || !isActive) {
                navigate('/');
            }
        }
    }, [currentUserRole]);
};

export default useAuthEffect;
