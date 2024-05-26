'use client'
import React, {useEffect, useState} from 'react';
import Image from "next/image";
import Link from "next/link";

interface SessionType {
    user?: {
        username?: string;
    }
}

interface IndexSectionProps {
    session?: SessionType;
}

const IndexSection = ({session}: IndexSectionProps) => {
    const sectionsData = [
        {
            className: '',
            imageSrc: '/img/index/Project.svg',
            title: '점심을 위한 더 나은 방법',
            description: 'AU CampusPay는 안산대학교 학생을 위한, 빠르고 간편한 식권 구입 시스템입니다.',
            extraContent: () => (
                <div className='flex gap-7 mt-10'>
                    <Image
                        src={'/img/index/QR_Example.svg'}
                        alt={'메인페이지 첫 번째 소개 섹션 이미지'}
                        width={103}
                        height={33}
                    />
                    <div>
                        <h1 className='text-[26px] font-semibold'>
                            빠르고 쉬운 식권 인증 시스템.
                        </h1>
                        <p className='text-[20px]'>
                            온라인 구매와 QR코드 인증 시스템이 합쳐진<br/>
                            빠른 인증 시스템을 활용한 더 나은 시스템을<br/>
                            제공합니다.
                        </p>
                    </div>
                </div>
            )
        },
        {
            className: 'bg-section2-color',
            imageSrc: '/img/index/Iphone.svg',
            title: '앉은 자리에서 간편하게',
            description: '핸드폰과 노트북만으로 카카오페이를 이용해, 그 자리에서 간편하게 식권을 구매할 수 있습니다.',
            extraContent: (session?: SessionType) => (
                <Link
                    className='
                    w-40
                    h-10
                    mt-10
                    text-lg
                    flex
                    justify-center
                    items-center
                    font-medium
                    bg-section2-color
                    border-2
                    border-primary-color
                    text-primary-color
                    rounded-lg
                    '
                    href={`/payment/${session?.user?.username}`}>
                    식권 구매하기
                </Link>
            )
        },
        {
            className: 'bg-section3-color',
            imageSrc: '/img/index/Scanner.svg',
            title: '스캐너를 이용한 간편 인증.',
            description: '카페테리아에 비치된 스캐너에, QR 식권을 스캐너에 비추는 것 만으로, 끝나는 빠르고 간편한 인증을 할 수 있습니다.',
            extraContent: () => null
        },
        {
            className: 'bg-section4-color',
            imageSrc: '/img/index/Calendar.svg',
            title: '보기 쉬운 식단표',
            description: '식당 별로 매 주 단위로 정리된 식단표를 통해, 빠르고 직관적으로 식단을 파악할 수 있습니다.',
            extraContent: () => (
                <Link
                    className='inline-block mt-10 w-38 h-12 text-lg text-center leading-[3rem] font-medium bg-section4-color text-primary-color border-2 border-primary-color rounded-lg'
                    href={'/'}
                >
                    식단표 보러가기
                </Link>
            )
        },
        {
            className: 'bg-section5-color',
            imageSrc: '/img/index/Chatbot.svg',
            title: '챗봇을 통한 안내 시스템',
            description: 'AU CampusPay의 카카오톡 챗봇을 추가하면, 각종 이용 안내 및 오류 해결 방안을 얻을 수 있습니다.',
            extraContent: () => null
        }
    ];

    return (
        <div className='grid grid-cols-12'>
            {sectionsData.map((section, index) => (
                <section
                    key={index}
                    className={`
                        min-h-screen
                        col-span-12
                        grid
                        place-items-center
                        ${section.className}
                    `
                }>
                    <div
                        className='
                            grid
                            grid-cols-2
                            gap-5
                            max-w-7xl
                            mx-auto
                        '
                    >
                        <div>
                            <Image
                                width={456}
                                height={457}
                                src={section.imageSrc}
                                alt={section.title}
                            />
                        </div>
                        <div
                            className='
                                flex
                                flex-col
                                justify-center
                                items-center
                                text-black-color
                            '
                        >
                            <h1 className='text-[36px] font-bold'>
                                {section.title}
                            </h1>
                            <p className='text-[20px]'>
                                {section.description}
                            </p>
                            {section.extraContent()}
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
};

export default IndexSection;