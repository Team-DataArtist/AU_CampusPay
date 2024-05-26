"use client"
import React, {useEffect, useState} from 'react';
import Navbar from "@/app/_components/nav/Navbar";
import Link from "next/link";
import PageNation from "@/app/_components/ui/PageNation";
import {ObjectId} from "mongodb";

type Props = {
    params: {
        slug: string;
    }
}

type cookData = {
    _id: ObjectId;
    cook_id: number;
    date: string;
    menu: [];
    price: number;
}

const tabList = [
    {
        label: '학생',
        path: 'student'
    },
    {
        label: '교직원',
        path: 'staff'
    },
    {
        label: '기숙사',
        path: 'dormitory'
    }
]


const MenuPage = (params: Props) => {
    const currentpath = params.params.slug
    const getDateInfo = (dateString: string) => {
        const itemDate = new Date(dateString);
        const dateInfo = `${itemDate.getFullYear()}.${itemDate.getMonth() + 1}.${itemDate.getDate()}`;
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        const week = days[itemDate.getDay()];
        return {dateInfo, week};
    };

    const getRestaurant = (cook_id: number) => {
        const restaurantCode = cook_id.toString().substring(0, 1);
        switch (restaurantCode) {
            case '1':
                return '학생';
            case '2':
                return '교직원';
            case '3':
                return '기숙사';
            default:
                return '존재하지 않는 식당';
        }
    };

    const getMenuName = (cook_id: number) => {
        const menuCode = cook_id.toString().substring(5);
        switch (menuCode) {
            case '1':
                return '[중식] 일품1';
            case '2':
                return '[중식] 일품2';
            case '3':
                return '조식';
            case '4':
                return '석식';
            default:
                return '존재하지 않는 메뉴';
        }
    };

    const getPathName = (currentpath: string) => {
        switch (currentpath) {
            case 'student':
                return '학생';
            case 'staff':
                return '교직원';
            case 'dormitory':
                return '기숙사';
            default:
                return '존재하지 않는 식당';
        }
    };

    const splitMenu = (menu: []) => {
        const splitMenus = menu.join(", ");
        return splitMenus;
    }

    const findItem = (currentpath: string) => {
        switch (currentpath) {
            case 'student':
                return 100000;
            case 'staff':
                return 200000;
            case 'dormitory':
                return 300000;
            default:
                return '클라이언트 오류';
        }
    }
    console.log(findItem(currentpath));

    const [activeTab, setActiveTab] = useState(getPathName(currentpath) || '');

    const [menus, setMenus] = useState<cookData[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/cook?page=${page}&restaurant=${findItem(currentpath)}`);
            const data = await res.json();

            setMenus(data.data.reverse());
            setTotalPages(Math.ceil(data.totalPages / 10));
        };

        fetchData();
    }, [page])

    return (
        <Navbar>
            <div className='min-h-screen bg-[#f7f7f7]'>
                <div
                    className='
                        w-[1200px]
                        h-[840px]
                        mx-auto
                        relative
                        translate-y-[50px]
                        bg-white
                        rounded-[5px]
                    '
                >
                    <h2
                        className='
                            w-full
                            text-[22px]
                            font-semibold
                            text-center
                            leading-[70px]
                        '
                    >
                        식단표에서 메뉴를 확인해 보세요!
                    </h2>
                    <div
                        className='
                            h-[60px]
                            flex
                            text-[22px]
                            text-white
                            bg-[#555555]
                        '
                    >
                        {tabList.map((item) => (
                            <Link
                                href={`${item.path}?page=${page}&restaurant=${findItem(currentpath)}`}
                                key={item.label}
                                className={`leading-[60px] w-full text-center ${activeTab === item.label ? "font-semibold bg-[#009223]" : ""}`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                    <div
                        className="relative w-full leading-[50px] text-[20px] text-[#555555] flex text-center border-b-[1px] border-[#555555]">
                        <div className="w-[163px]">
                            날짜
                        </div>
                        <div className="w-[116px]">
                            식당
                        </div>
                        <div className="w-[172px]">
                            메뉴 이름
                        </div>
                        <div className="w-[116px]">
                            가격
                        </div>
                        <div className="w-[635px]">
                            메뉴
                        </div>
                    </div>

                    {menus.map((item: cookData) => {
                        const {dateInfo, week} = getDateInfo(item.date);
                        const restaurant = getRestaurant(item.cook_id);
                        const menuName = getMenuName(item.cook_id);
                        const menuDetail = splitMenu(item.menu);

                        return (
                            <div key={item._id.toString()}
                                 className="relative w-full h-[60px] text-center text-[18px] flex">
                                <span className="w-[163px] flex items-center justify-center">
                                    {dateInfo} ({week})
                                </span>
                                <span className="w-[116px] flex items-center justify-center">
                                    {restaurant}
                                </span>
                                <span className="w-[172px] flex items-center justify-center">
                                    {menuName}
                                </span>
                                <span className="w-[116px] flex items-center justify-center">
                                    {item.price}원
                                </span>
                                <span className="w-[635px] flex items-center justify-center">
                                    {menuDetail}
                                </span>
                            </div>
                        );
                    })}

                    <PageNation
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </div>
            </div>
        </Navbar>
    );
};

export default MenuPage;