import React, { useEffect } from 'react';
import { Html5QrcodeScanType, Html5QrcodeScanner } from 'html5-qrcode';

function QRCodeScanner({
    setResult
}) {
    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            'reader',
            {
                qrbox: {
                    width: 200,
                    height: 200
                },
                fps: 5,
                supportedScanTypes: [
                    Html5QrcodeScanType.SCAN_TYPE_CAMERA,
                    Html5QrcodeScanType.SCAN_TYPE_FILE
                ]
            },
            false
        );

        const onScanSuccess = (scanData) => {
            if (scanData) {
                scanner.clear();
                setResult(JSON.parse(scanData));
            }
        };

        const onScanError = (err) => {
            console.error(err);
        };
        scanner.render(onScanSuccess, onScanError);
    }, []);

    return (
        <div id='reader' style={{ width: 375 }} />
    );
}

export default QRCodeScanner;
