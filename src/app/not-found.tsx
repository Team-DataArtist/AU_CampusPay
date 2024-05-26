import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PreviousButton from "@/_components/ui/Button/PreviousButton";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="mr-auto px-10 pt-7">
                <Link href="/">
                    <Image
                        src="/AU_Blue_SVG.svg"
                        width={60} // 변경된 크기
                        height={40} // 변경된 크기
                        alt="웹페이지 로고"
                        className="w-24 h-16" // 이미지 스타일 변경
                    />
                </Link>
            </div>
            <div className="mx-auto text-center">
                <div className="mb-10">
                    <Image
                        className="m-auto w-[60%] max-w-xl"
                        src="/404Image_SVG.svg"
                        width={485}
                        height={328}
                        alt="404메인 이미지"
                    />
                </div>
                <div className='px-10'>
                    <p className="mb-4 xmd:text-[40px] sd:text-[32px] font-semibold text-blue-custom">페이지를 찾을 수 없습니다!</p>
                    <p className="mb-4 xmd:text-[17px] sd:text-[13px] text-blue-custom">존재하지 않는 주소를 입력하셨거나, 요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.</p>
                    <p className="xmd:text-[17px] sd:text-[13px] text-blue-custom">페이지의 주소가 올바른지 다시 한번 확인해 주시길 부탁드립니다.</p>
                </div>
                <div className="mt-10">
                    <PreviousButton props="이 전 페이지로 돌아가기" className="bg-blue-custom w-[400px] h-[75px] text-[25px] text-white font-semibold rounded" />
                </div>
            </div>
        </div>
    )
}