import React, { useEffect } from 'react'
import { Html5QrcodeScanType, Html5QrcodeScanner } from 'html5-qrcode'

interface Map {
    [key: string]: string | undefined
}
interface IProduct extends Map {
    productID: string
    model: string
    description: string
    manufactoryEmail: string
    retailerEmail: string
    customerEmail: string
}
const QRCodeScanner = ({
    setResult
}: {
    setResult: React.Dispatch<React.SetStateAction<IProduct | null>>
}) => {
    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            'reader',
            {
                qrbox: {
                    width: 200,
                    height: 200
                },
                fps: 10,
                rememberLastUsedCamera: true,
                supportedScanTypes: [
                    Html5QrcodeScanType.SCAN_TYPE_CAMERA,
                    Html5QrcodeScanType.SCAN_TYPE_FILE
                ]
            },
            false
        )

        const onScanSuccess = (scanData: string) => {
            // scanner.clear()
            if (scanData) {
                setResult(JSON.parse(scanData))
            }
        }

        const onScanError = (err: object | string) => {
            console.error(err)
        }
        scanner.render(onScanSuccess, onScanError)
    }, [])

    return <div id='reader' style={{ width: 375 }}></div>
}

export default QRCodeScanner
