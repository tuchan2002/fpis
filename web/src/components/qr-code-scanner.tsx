import React, { useEffect } from 'react'
import { Html5QrcodeScanType, Html5QrcodeScanner } from 'html5-qrcode'

const QRCodeScanner = ({
    result,
    setResult
}: {
    result: string | null
    setResult: React.Dispatch<React.SetStateAction<string | null>>
}) => {
    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            'reader',
            {
                qrbox: {
                    width: 256,
                    height: 256
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
            setResult(scanData)
        }

        const onScanError = (err: any) => {
            console.error(err)
        }
        scanner.render(onScanSuccess, onScanError)
    }, [])

    return <div id='reader'></div>
}

export default QRCodeScanner
