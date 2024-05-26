import React from 'react';
import Link from "next/link";
import Image from "next/image";

const SmallNavbar = () => {
    return (
        <div className='w-[100vw] p-5 shadow'>
            <div className={'mx-20'}>
                <Link
                    href='/'
                    className='
                        w-[225px]
                        flex
                        items-center
                        gap-1
                    '
                >
                    <Image
                        src='/Logo.svg'
                        alt='웹페이지 로고'
                        width={93}
                        height={13}
                    />
                </Link>
            </div>
        </div>
    );
};

export default SmallNavbar;