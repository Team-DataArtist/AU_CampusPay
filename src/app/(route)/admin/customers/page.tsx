'use client'
import React, { useEffect, useState } from 'react';
import UserIcon from "@/app/_components/ui/Icons/UserIcon";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ObjectId } from "mongodb";
import {redirect} from "next/navigation";
import {useSession} from "next-auth/react";

type UserData = {
    _id: ObjectId,
    email: string,
    username: string,
    student_number: string,
    phone: string,
    role: string,
    lastAccess: string;
}

const CustomerPage = () => {
    const session = useSession()
    if (session?.data?.user?.role != 'admin' || !session) {
        redirect('/')
    }

    const [userData, setUserData] = useState<UserData[]>([]);

    useEffect(() => {
        fetch(`/api/user`)
            .then((response) => response.json())
            .then((data) => {
                setUserData(data.users);
            })
            .catch((error) => console.error('Error:', error));
    }, []);

    return (
        <div className='bg-gray-100 min-h-screen'>
            <div className='p-4'>
                <div
                    className='w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto'>
                    <div className='my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
                        <span>Name</span>
                        <span className='sm:text-left text-right'>Email</span>
                        <span className='hidden md:grid'>Last Access</span>
                        <span className='hidden sm:grid'>Role</span>
                    </div>
                    <ul>
                        {userData.map((user, id) => (
                            <li key={id} className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
                                <div className='flex items-center'>
                                    <div className='bg-purple-100 p-3 rounded-lg'>
                                        <UserIcon />
                                    </div>
                                    <p className='pl-4'>{user.username}</p>
                                </div>
                                <p className='text-gray-600 sm:text-left text-right'>{user.email}</p>
                                <p className='hidden md:flex'>{user.lastAccess}</p>
                                <div className='sm:flex hidden justify-between items-center'>
                                    <p>{user.role}</p>
                                    <BsThreeDotsVertical />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CustomerPage;