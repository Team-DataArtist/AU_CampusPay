'use client'
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { ObjectId } from "mongodb";
import Navbar from "@/app/_components/nav/Navbar";
import { useSession } from "next-auth/react";
import PageNation from "@/app/_components/ui/PageNation";
import SearchBox from "@/app/_components/ui/Input/SearchBox";
import DesktopNavbar from "@/app/_components/nav/DesktopNavbar";

type noticeData = {
    _id: ObjectId,
    username: string;
    user_id: ObjectId;
    title: string;
    content: string;
    date: string;
    time: string;
    count: number;
}

const NoticePage = () => {
    const { data: session } = useSession();
    const [posts, setPosts] = useState<noticeData[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/notice?page=${page}`);
            const data = await res.json();

            setPosts(data.data.reverse());
            setTotalPages(Math.ceil(data.totalPages / 10));
        };

        fetchData();
    }, [page])

    return (
        <Navbar>
            <DesktopNavbar/>
            <h2
                className='
                    mt-24
                    mb-16
                    mx-auto
                    text-xl
                    text-center
                    font-bold
                '
            >
                CampusPay 소식을 알려드립니다.
            </h2>
            <SearchBox/>
            <div className={'w-64 ml-auto'}>
                <Link href="/write" passHref>
                    <span
                        className='
                        cursor-pointer
                        px-4
                        py-2
                        text-white
                        bg-blue-500
                        rounded-md
                        hover:bg-blue-600
                        '
                    >
                        공지 작성
                    </span>
                </Link>
            </div>
            <div
                className='
                    min-w-[320px]
                    w-10/12
                    mx-auto
                    p-8
                '
            >
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-center">
                            제목
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            날짜
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            조회수
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-center">
                            편집
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {posts.map((item: noticeData) => (
                        <tr key={item._id.toString()} className="bg-white border-b">
                            <td className="px-6 py-4">
                                <Link href={`/edit/find?post=${item._id}`}>
                                        <span
                                            className='
                                                font-medium
                                                text-blue-600
                                                hover:underline
                                            '
                                        >
                                            {item.title}
                                        </span>
                                </Link>
                            </td>
                            <td className="px-6 py-4 text-center">
                                {item.date}
                            </td>
                            <td className="px-6 py-4 text-center">
                                {item.count}
                            </td>
                            <td className="px-6 py-4 text-center">
                                {session?.user.role === 'admin' && (
                                    <Link href={`/edit/find?post=${item._id}`}>
                                            <span className="text-blue-500 hover:underline">
                                                Edit
                                            </span>
                                    </Link>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <PageNation
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </Navbar>
    );
};

export default NoticePage;