import React from 'react';
import {Menu} from "@/model/menu";
import Link from "next/link";

import {getServerSession} from "next-auth";
import {AiOutlineQrcode} from "react-icons/ai";

import {options} from "@/app/api/auth/[...nextauth]/options";
import {redirect} from "next/navigation";
import {ObjectId} from "mongodb";
import Image from "next/image";
import Navbar from "@/app/_components/nav/Navbar";

type Props = {
    params: {
        slug: string;
    }
    searchParams: {
        post: ObjectId;
    }
}

const TicketPage = async ({params}: Props) => {
    const session = await getServerSession(options);
    if (!session) {
        redirect('/')
    }

    // 현재 로그인한 사용자 이름 또는 아이디
    const currentUserId = session?.user._id || session?.user.username;

    // 현재 로그인한 사용자 기준으로 데이터 패칭
    const res = await fetch(`${process.env.SITE_URL}/api/confirmation/user?name=${currentUserId}`)
    const data = await res.json();
    const featDate = data.data.reverse();

    // "state"가 false인 아이템만 출력
    const unusedItems = featDate.filter((item: Menu) => !item.state);

    return (
        <Navbar>
            <main className='mx-5 my-10'>
                <h1 className="pb-10 text-center font-medium text-[40px]">내 식권 목록</h1>
                <div className="flex flex-col items-center w-full">
                    {unusedItems.length > 0 ? (
                        <>
                            {unusedItems.map((item: Menu) => (
                                <div key={item._id}
                                     className='mb-5 flex flex-col w-[900px] justify-between md:flex-row items-start md:items-center p-3 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white cursor-pointer'>
                                    <div className="flex items-center gap-[75px]">
                                        <div className="w-[100px] h-[100px] col-span-2 bg-black-color rounded-[1px]">
                                            <Image
                                                className="rounded-[6px]"
                                                src={'/img/TemporaryMenu.jpg'}
                                                alt={'임시 메뉴 이미지'}
                                                width={100}
                                                height={100}
                                            />
                                        </div>
                                        <Link
                                            href={`/confirmation/${encodeURIComponent(item.name)}?id=${encodeURIComponent(item._id)}&menu=${encodeURIComponent(item.menu ?? '')}&state=${encodeURIComponent(item.state ?? '')}`}>
                                            <h3 className="text-[22px] font-semibold mb-[20px]">{item.menu}</h3>
                                            <p className="text-gray-500 text-[18px]">임시값: {item._id}</p>
                                            {/* DB 마이그레이션을 통한 식당 표시 기능 필요 */}
                                        </Link>
                                    </div>
                                    <div className="flex flex-col items-end gap-3">
                                        <div className="w-fit border-[1px] border-black">
                                            <AiOutlineQrcode size="60px"/>
                                        </div>
                                        <div
                                            className="w-fit py-[1px] px-[25px] text-[18px] text-white bg-primary-color rounded-[50px]">{item.time}</div>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className="py-10 px-6 border border-gray-300 rounded-lg shadow-md text-center">
                            <p className="text-gray-500">사용 가능한 식권이 없습니다.</p>
                        </div>
                    )}
                </div>
            </main>
        </Navbar>
    );
};

export default TicketPage;