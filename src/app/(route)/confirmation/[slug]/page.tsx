import React from 'react';
import QrCode from "@/app/_components/ui/QrCode";
import PreviousButton from "@/app/_components/ui/Button/PreviousButton";
import Image from "next/image";


type Props = {
    params: {
        slug: string;
    }
    searchParams: {
        id: string;
        state: string;
        menu: string;
    }
}

const ConfirmationPage = async ({params, searchParams}: Props) => {
    const stateText = searchParams.state === 'false' ? '사용가능' : '사용불가';

    return (
        <div className="h-screen flex flex-col justify-center items-center bg-[#fbfbfb]">
            <div className="relative w-[320px] h-[365px] bg-white rounded-lg shadow-lg flex flex-col items-center justify-center border-[1px] border-[#7C7C7C] z-50">
                <div className="absolute px-3 pt-5 left-0 top-0">
                    <Image
                        src='/Logo.svg'
                        alt='웹페이지 로고'
                        width={40}
                        height={15}
                    />
                </div>
                <div className="w-[150px] h-[150px] mt-14 border-[3px] border-[#009223] flex items-center justify-center bg-white rounded-[5px] mb-2">
                    <QrCode props={searchParams}/>
                </div>
                <p className="text-[22px] text-center font-semibold mb-[7px]">
                    {searchParams.menu}
                </p>
                <p className="text-[18px] text-[#555555] text-center mb-[20px]">
                    {searchParams.id}
                </p>
                <div className={`w-full py-[5px] ${stateText === '사용가능' ? 'bg-[#009223]' : 'bg-[#920000]'}`}></div>
                <span className={`font-bold py-3 ${stateText === '사용가능' ? 'text-green-500' : 'text-red-500'}`}>
                        {stateText}
                </span>
            </div>
            <div className="absolute w-full h-[200px] bg-primary-color z-0"></div>
            <div className="absolute left-0 top-0 p-9">
                <PreviousButton className="text-[40px] font-semibold" props={`<`}/>
            </div>
        </div>
    );
};


export default ConfirmationPage;