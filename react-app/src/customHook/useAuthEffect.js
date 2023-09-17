import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const useAuthEffect = (
    currentUserRole,
    allowedRolesList
) => {
    const navigate = useNavigate()

    useEffect(() => {
        if (currentUserRole !== null) {
            if (!allowedRolesList.includes(currentUserRole)) {
                navigate('/')
            }
        }
    }, [currentUserRole])
}

export default useAuthEffect
