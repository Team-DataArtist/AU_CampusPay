'use client'
import React, {useState} from 'react';
import Link from "next/link";
import Image from 'next/image'

import {signIn, signOut, useSession} from "next-auth/react";
import Button from "@/_components/ui/Button/Button";
import {User} from "@/_model/user";
import {GiHamburgerMenu} from "react-icons/gi";
import {IoClose} from "react-icons/io5";

type CustomSession = {
    user: User;
}

const DesktopNavbar = () => {
    const {data: session} = useSession();
    const userRole = session?.user?.role;

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const NavbarRoute = [
        {
            id: 1,
            label: '식단표',
            href: `/menu/student?page=1`,
        },
        {
            id: 2,
            label: '이용방법',
            href: `/guide`,
        },
        {
            id: 3,
            label: '공지사항',
            href: `/notice/lists?page=1`,
        },
        {
            id: 4,
            label: '문의하기',
            href: `/`,
        },
        {
            id: 5,
            label: '식권구입',
            href: `/payment/${session?.user?.username}`,
        }
    ];

    // 햄버거 메뉴 클릭 핸들러
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const getLinkItem = (session: CustomSession | null) => {
        switch (userRole) {
            case 'admin':
                return (
                    <>
                        <li className='flex items-center text-primary-color'>
                            <Link href='/admin'>
                                관리자 페이지
                            </Link>
                        </li>
                        <li className='flex items-center text-primary-color'>
                            <Button
                                text={'로그아웃'}
                                onClick={() => signOut()}
                            />
                        </li>
                    </>
                )
            case 'customer':
                return (
                    <>
                        <li className='text-primary-color'>
                            <Link href={`/users/accounts/${session?.user?.student_number}`}>
                                마이 페이지
                            </Link>
                        </li>
                        <li className='ml-3 text-primary-color'>
                            <Button
                                text={'로그아웃'}
                                onClick={() => signOut()}
                            />
                        </li>
                    </>
                )
            default:
                return !session ? (
                    <>
                        <li className='flex items-center text-black-color font-bold'>
                            <Link href='/register'>회원가입</Link>
                        </li>
                        <li className='py-1 px-4 text-primary-color text-xl border-solid border-primary-color border-4 rounded-3xl hover:bg-primary-color hover:text-white hover:duration-300'>
                            <Button
                                text={'로그인'}
                                onClick={() => signIn()}
                            />
                        </li>
                    </>
                ) : null;
        }
    }

    return (
        <header>
            {/* Global Navigation Menu (Responsive) */}
            <nav
                className='
                        md:flex
                        md:items-center
                        md:justify-around
                    '
            >
                <div
                    className='
                            m-3
                            flex
                            justify-between
                        '
                >
                    <Link href='/'>
                        <Image
                            src='/Logo.svg'
                            alt='웹페이지 로고'
                            width={93}
                            height={13}
                        />
                    </Link>
                    <button
                        className='
                                block
                                md:hidden
                            '
                        onClick={toggleMenu}
                    >
                        {isMenuOpen ?
                            <IoClose className='w-9 h-9'/> :
                            <GiHamburgerMenu className='w-9 h-9'/>
                        }
                    </button>
                </div>
                <ul
                    className={`
                            flex-col
                            text-center
                            md:flex
                            md:flex-row
                            ${isMenuOpen ? 'flex' : 'hidden'}
                        `}
                >
                    {NavbarRoute.map((item => (
                        <li
                            key={item.id}
                            className='
                                    my-5
                                    text-[20px]
                                    md:mx-5
                                    md:my-0
                                '
                        >
                            <Link href={item.href}>
                                {item.label}
                            </Link>
                        </li>
                    )))}
                    {/* 로그인한 사용자가 관리자일 경우 */}
                    {userRole === 'admin' && (
                        <li
                            className='
                                flex
                                items-center
                                text-primary-color
                            '
                        >
                            <Link href='/admin'>
                                관리자 페이지
                            </Link>
                        </li>
                    )}
                    {/* 로그인한 사용자가 일반 유저인 경우 */}
                    {userRole === 'customer' && (
                        <li className='flex items-center text-primary-color'>
                            <Link href={`/users/accounts/${session?.user?.student_number}`}>
                                마이 페이지
                            </Link>
                        </li>
                    )}
                    {/* 사용자 세션이 없는 경우 */}
                    {!session && (
                        <>
                            <li
                                className='
                                    flex
                                    items-center
                                    text-black-color
                                    font-bold
                                '
                            >
                                <Link href='/register'>
                                    회원가입
                                </Link>
                            </li>
                            <li
                                className='
                                    py-1
                                    px-4
                                    text-primary-color
                                    text-xl
                                    border-solid
                                    border-primary-color
                                    border-4
                                    rounded-3xl
                                    hover:bg-primary-color
                                    hover:text-white
                                    hover:duration-300
                                '
                            >
                                <Button
                                    text={'로그인'}
                                    onClick={() => signIn()}
                                />
                            </li>
                        </>
                    )}
                    {/* 사용자 세션이 있는경우 (admin, customer) */}
                    {session && (
                        <li
                            className='
                            ml-5
                                flex
                                items-center
                                text-primary-color
                            '
                        >
                            <Button
                                text={'로그아웃'}
                                onClick={() => signOut()}
                            />
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default DesktopNavbar;