import React from 'react';
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";
import {redirect} from "next/navigation";
import Link from "next/link";

const MyAccount = async () => {
    const session: any = await getServerSession(options)
    if (!session || session?.user.role !== 'customer') {
        redirect('/');
    }

    const navbarLink = [
        {
            id: 1,
            href: `/ticket/${session?.user?.username}`,
            label: '식권사용'
        },
        {
            id: 2,
            href: `/payment/${session?.user?.username}`,
            label: '식권구입'
        },
        {
            id: 3,
            href: `/history/${session?.user?.username}`,
            label: '결제내역'
        },
        {
            id: 4,
            href: '/',
            label: '식단표'
        },
        {
            id: 5,
            href: '/notice/lists?page=1',
            label: '공지사항'
        },
    ];

    return (
        <div className='flex items-center justify-center w-full h-screen'>
            <div className='w-[320px] h-[620px] m-auto text-center'>
                <div className='mb-16 relative'>
                    <h1 className='mt-5 text-4xl text-black-color'>
                        @{session?.user.username}&nbsp;
                        <span className='text-2xl text-black'>님</span>
                    </h1>
                    <span className='absolute right-0 text-[16px] text-black'>
                        식사 맛있게 하세요!
                    </span>
                </div>
                <main className='flex flex-col gap-10'>
                    {navbarLink.map(item => (
                        <Link key={item.id} href={item.href}>
                            <div  className='text-2xl bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110'>
                                {item.label}
                            </div>
                        </Link>
                    ))}
                    <div className='text-2xl text-black-color px-6 py-2 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110'>
                        <Link href={'/'}>
                            돌아가기
                        </Link>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MyAccount;