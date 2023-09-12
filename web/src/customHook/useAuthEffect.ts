import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const useAuthEffect = (
    currentUserRole: number | null,
    allowedRolesList: number[]
) => {
    console.log(currentUserRole, allowedRolesList)

    const router = useRouter()

    useEffect(() => {
        if (currentUserRole !== null) {
            if (!allowedRolesList.includes(currentUserRole)) {
                router.push('/')
            }
        }
    }, [currentUserRole])
}

export default useAuthEffect
