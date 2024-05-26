'use client'
import React, {useState} from 'react';
import Link from "next/link";
import Image from "next/image";
import {useRouter} from "next/navigation";
import PasswordIcon from "@/components/ui/Icons/PasswordIcon";

const ChangePage = () => {

    const path = window.location.pathname;
    const parts = path.split('/');
    const targetUser = parts[parts.length - 1];
    console.log(targetUser);

    const [formData, setFormData] = useState({
        _id: targetUser,
        password: ''
    });
    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await fetch('/api/inquiry/password/change', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        console.log(res);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 sm:bg-white">
            <div className="max-w-md w-full space-y-6 bg-white p-6 rounded-md shadow-md sm:shadow-none">
                <div className='px-10 flex justify-center'>
                    <Link className='flex items-center gap-1' href='/'>
                        <Image
                            src='/Logo_AU_CampusPay_Blue.svg'
                            width={225}
                            height={100}
                            alt='웹페이지 로고'
                        />
                    </Link>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="mt-5 space-y-6"
                >
                    <div className="rounded-md flex flex-col gap-4">
                        <div className="relative">
                            <label htmlFor="password" className="sr-only">
                                비밀번호
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none outline-none rounded-[10px] relative block w-full px-3 py-2 bg-gray-100 border border-gray-300 placeholder-gray-500 text-gray-900 focus:bg-gray-200 focus:ring-blue-custom focus:border-blue-custom-deep focus:z-10 focus:scale-[1.01] sm:text-sm ease-out duration-200"
                                placeholder="새로운 비밀번호"
                                value={formData.password}
                                onChange={handleOnchange}
                            />
                            <span className="absolute right-[10px] top-[50%] -mt-[8px] z-10">
                        <PasswordIcon/>
                    </span>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-blue-custom-hover border-transparent text-[18px] font-medium rounded-[10px] text-white bg-blue-custom-deep hover:bg-blue-custom-hover active:outline-none active:ring active:ring-offset-3 active:ring-blue-custom-hover ease-out duration-200"
                        >
                            변경
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePage;