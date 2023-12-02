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
                    width: 225,
                    height: 225
                },
                fps: 10,
                supportedScanTypes: [
                    Html5QrcodeScanType.SCAN_TYPE_FILE,
                    Html5QrcodeScanType.SCAN_TYPE_CAMERA
                ]
            },
            false
        );

        const onScanSuccess = (scanData) => {
            try {
                if (scanData && typeof JSON.parse(scanData) === 'object') {
                    setResult(JSON.parse(scanData));
                    scanner.clear();
                }
            } catch (error) {
                throw new Error('Invalid QR code.');
            }
        };

        const onScanError = (err) => {
            console.error(err);
        };
        scanner.render(onScanSuccess, onScanError);

        return () => {
            scanner.clear();
        };
    }, []);

    return (
        <div id='reader' style={{ width: 400 }} />
    );
}

export default QRCodeScanner;
