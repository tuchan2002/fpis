import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const useAuthEffect = (
    currentUserRole: number | null,
    allowedRolesList: number[]
) => {
    console.log(currentUserRole, allowedRolesList)

    const router = useRouter()

    useEffect(() => {
        console.log('OK 1', currentUserRole)
        if (currentUserRole !== null) {
            console.log('OK 2', currentUserRole)

            if (!allowedRolesList.includes(currentUserRole)) {
                console.log('OK')
                router.back()
            }
        }
    }, [currentUserRole])
}

export default useAuthEffect
