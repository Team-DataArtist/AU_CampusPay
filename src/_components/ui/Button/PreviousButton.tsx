'use client'
import React from 'react';
import {useRouter} from "next/navigation";

type PreviousButtonProps = {
    props: string;
    className?: string;
}

const PreviousButton = ({props, className}: PreviousButtonProps) => {
    const router = useRouter();
    return <button type="button" className={className} onClick={()=> router.back()}>{props}</button>
};

export default PreviousButton;