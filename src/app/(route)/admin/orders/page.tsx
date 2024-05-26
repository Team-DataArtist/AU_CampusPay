import React from 'react';
import {BsThreeDotsVertical} from "react-icons/bs";
import RecentOrdersIcon from "@/app/_components/ui/Icons/RecentOrdersIcon";

import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";
import {redirect} from "next/navigation";

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

const OrdersPage = async () => {
    const session = await getServerSession(options);
    if (session?.user?.role != 'admin' || !session) {
        redirect('/')
    }

    return (
        <div className='bg-gray-100 min-h-screen'>
            <div className='p-4'>
                <div className='w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto'>
                    <div
                        className='my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
                        <span>Order</span>
                        <span className='sm:text-left text-right'>Status</span>
                        <span className='hidden md:grid'>Last Order</span>
                        <span className='hidden sm:grid'>Method</span>
                    </div>
                    <ul>
                        {test.map((order, index) => (
                            <li
                                key={index}
                                className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'
                            >
                                <div className='flex'>
                                    <div className='bg-blue-100 p-3 rounded-lg'>
                                        <RecentOrdersIcon className='text-blue-custom'/>
                                    </div>
                                    <div className='pl-4'>
                                        <p className='text-gray-800 font-bold'>
                                            {order.price.toLocaleString()}원
                                        </p>
                                        <p className='text-gray-800 text-sm'>
                                            {order.name.first}
                                        </p>
                                    </div>
                                </div>
                                <p className='text-gray-600 sm:text-left text-right'>
                  <span
                      className={
                          order.status == 'Processing'
                              ? 'bg-green-200 p-2 rounded-lg'
                              : order.status == 'Completed'
                                  ? 'bg-blue-200 p-2 rounded-lg'
                                  : 'bg-yellow-200 p-2 rounded-lg'
                      }
                  >
                    {order.status}
                  </span>
                                </p>
                                <p className='hidden md:flex'>{order.date}</p>
                                <div className='sm:flex hidden justify-between items-center'>
                                    <p>{order.method}</p>
                                    <BsThreeDotsVertical/>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default OrdersPage;