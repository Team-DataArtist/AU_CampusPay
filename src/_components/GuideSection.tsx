'use client'
import React, { useEffect, useRef } from 'react';
import Link from "next/link";

type Props = {
    title: string;
    content: React.ReactNode;
}

const GuideSection = ({ title, content }: Props) => {
    const sectionRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        const section = sectionRef.current;
        if (section) {
            const { offsetTop, offsetHeight } = section;
            const screenBottom = window.pageYOffset + window.innerHeight;

            // 섹션의 상단이 화면 하단보다 위에 있고, 섹션의 하단이 화면 상단보다 아래에 있을 때 애니메이션 적용
            if (screenBottom > offsetTop && window.pageYOffset < offsetTop + offsetHeight) {
                section.classList.add('fadeInUp');
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        // 컴포넌트 마운트시 한 번 실행
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className='
                min-h-screen
                p-10
                snap-start
                flex
                flex-col
                items-center
                justify-center
                space-y-8
                bg-gray-50
                border-b
            '
        >
            <div className="text-center space-y-2">
                <h2 className="text-4xl font-bold text-gray-800">
                    {title}
                </h2>
                <div
                    className='
                        text-lg
                        text-gray-600
                        mx-auto
                        leading-relaxed
                    '
                >
                    {content}
                </div>
            </div>
            <Link
                href="/"
                className='
                    mt-4
                    px-6
                    py-2
                    bg-blue-600
                    text-white
                    rounded-full
                    shadow-lg
                    hover:bg-blue-700
                    transition-colors
                '
            >
                자세히 알아보기
            </Link>
        </section>
    );
};

export default GuideSection;