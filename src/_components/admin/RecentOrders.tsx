import React from 'react';
import RecentOrdersIcon from "@/components/ui/Icons/RecentOrdersIcon";

const test = [
    {
        id: 1,
        name: {
            first: 'test',
            last: 'last',
        },
        price: 5000,
        status: 'Processing',
        method: 'KaKao Pay',
        date: '2023.01.01'
    },
    {
        id: 2,
        name: {
            first: 'test',
            last: 'last',
        },
        price: 5000,
        status: 'Processing',
        method: 'KaKao Pay',
        date: '2023.01.01'
    },
    {
        id: 3,
        name: {
            first: 'test',
            last: 'last',
        },
        price: 5000,
        status: 'Processing',
        method: 'KaKao Pay',
        date: '2023.01.01'
    }
]

const RecentOrders = () => {
    return (
        <div
            className='
                w-full
                col-span-1
                relative
                lg:h-[70vh]
                h-[50vh]
                m-auto
                p-4
                border
                rounded-lg
                bg-white
                overflow-y-scroll
            '>
            <h1>RecentOrders</h1>
            <ul>
                {test.map((orders, index) => (
                    <li
                        key={index}
                        className='
                            bg-gray-50
                            rounded-lg
                            my-3
                            p-2
                            flex
                            items-center
                            cursor-pointer
                            hover:bg-gray-100
                        '
                    >
                        <div className='bg-blue-100 rounded-lg p-3'>
                            <RecentOrdersIcon className='text-blue-custom'/>
                        </div>
                        <div className='pl-4'>
                            <p className='text-gray-800 font-bold'>
                                {orders.price} 원
                            </p>
                            <p className='text-gray-400 text-sm'>
                                {orders.name.first}
                            </p>
                        </div>
                        <p
                            className='
                                absolute
                                right-6
                                text-sm
                                md:hidden
                                lg:flex
                            '
                        >
                            {orders.date}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentOrders;