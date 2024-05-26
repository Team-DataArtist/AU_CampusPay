"use client"
import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";

import DashboardIcon from "@/components/ui/Icons/DashboardIcon";
import AdminTicketIcon from "@/components/ui/Icons/AdminTicketIcon";
import UserIcon from "@/components/ui/Icons/UserIcon";
import QrCodeIcon from "@/components/ui/Icons/QrCodeIcon";
import NoticeIcon from "@/components/ui/Icons/NoticeIcon";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";

const sideMenu = [
    {
        href: '/admin',
        icon: <DashboardIcon />,
        name: '대시보드'
    },
    {
        href: '/admin/orders',
        icon: <AdminTicketIcon />,
        name: '주문 관리'
    },
    {
        href: '/admin/customers',
        icon: <UserIcon />,
        name: '사용자 관리'
    },
    {
        href: '/notice/lists?page=1',
        icon: <NoticeIcon />,
        name: '공지 관리'
    },
    {
        href: '/admin/scanner',
        icon: <QrCodeIcon />,
        name: '스캐너'
    }
];

const Sidebar = () => {
    return (
        <div
            className='
                flex
                w-20
                ease-out
                duration-200
            '
        >
            <div
                className='
                fixed
                w-20
                z-40
                top-0
                bottom-0
                h-full
                p-4
                bg-white
                border-r-[1px]
                flex
                flex-col
                ease-out
                duration-300
                '
            >
                <Link
                    href='/'
                    className='
                        p-1
                        top-1
                        bg-blue-custom
                        rounded-[50%]
                    '
                >
                    <Image
                        src='/AU_Small_SVG.svg'
                        width={60}
                        height={60}
                        alt='웹페이지 로고'
                    />
                </Link>
                <div
                    className='
                        w-full
                        flex
                        flex-col
                        justify-evenly
                        mt-5
                        gap-[25px]
                    '
                >
                    {sideMenu.map((item, index) => (
                        <div
                            key={index}
                            className='
                                flex
                                flex-col
                                text-center
                                items-center
                                gap-1.5
                            '
                        >
                            <Link
                                href={item.href}
                                className='
                                    flex
                                    flex-row
                                    items-center
                                    w-fit
                                    pr-0
                                    rounded-[25px]
                                    ease-out
                                    duration-300
                                    hover:bg-gray-100
                                '
                            >
                                <div
                                    className='
                                    p-4
                                    w-fit
                                    h-fit
                                    rounded-lg
                                    bg-gray-100
                                    hover:bg-gray-200
                                    ease-out
                                    duration-300
                                    '
                                >
                                    {item.icon}
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;