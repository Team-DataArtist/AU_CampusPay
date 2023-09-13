'use client'
import React, {useEffect, useRef} from 'react';
import QRCode from "qrcode";

const QrCode = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current) {
            QRCode.toCanvas(canvasRef.current, 'http://localhost:3000/confirmation/undefined', function (error) {
                if (error) console.error(error);
                console.log('success!');
            });
        }
    }, []);

    return (
        <canvas ref={canvasRef}></canvas>
    );
};

export default QrCode;