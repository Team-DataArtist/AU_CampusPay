'use client'
import React, {useEffect, useRef} from 'react';
import QRCode from "qrcode";
import {useSession} from "next-auth/react";
import {Menu} from "@/model/menu";

type QrCodeProps = {
    id: string;
    state: string;
    menu: string;
};

type Props = {
    props: QrCodeProps;
}

const QrCode = ({props}: Props) => {
    const { data: session } = useSession();
    const canvasRef = useRef(null);
    const data = props.id ? props.id.toString() : '';

    useEffect(() => {
        if (canvasRef.current) {
            QRCode.toCanvas(
                canvasRef.current,
                `${data}`,
                function (error) {
                if (error) console.error(error);
                // console.log(`success! : ${data}`);
            });
        }
    }, []);

    return (
        <canvas ref={canvasRef}/>
    );
};

export default QrCode;