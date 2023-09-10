import React from 'react'
import { useSelector } from 'react-redux'
import CustomAlert from './custom-alert'
import Loading from './loading'
import { alertSelector } from '@/redux/reducers/alertSlice'

const GlobalAlert = () => {
    const { alert } = useSelector(alertSelector)
    console.log('alert', alert)

    return (
        <div>
            {alert.loading && <Loading />}

            {alert.error && (
                <CustomAlert message={alert.error} success={false} />
            )}

            {alert.success && (
                <CustomAlert message={alert.success} success={true} />
            )}
        </div>
    )
}

export default GlobalAlert
