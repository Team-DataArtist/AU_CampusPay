'use client'
import React, {useState} from 'react';
import Link from "next/link";
import Image from "next/image";
import EmailIcon from "@/components/ui/Icons/EmailIcon";

const tabList = [
    {
        label: '비밀번호 변경',
        path: '/password'
    },
    {
        label: '이메일 찾기',
        path: '/id'
    },
]
const PasswordPage = () => {
    const [activeTab, setActiveTab] = useState('비밀번호 변경');

    const tabIndex = tabList.findIndex(tab => tab.label === activeTab);

    const [formData, setFormData] = useState({
        email: ''
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

        const res = await fetch('/api/inquiry/password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const result = await res.json();
        console.log(result)
        if (result.success) {
            window.location.href= `/password/${result.oid}`;
        } else {
            console.error('error')
        }
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
                <div className="flex border-b mb-4 relative">
                    {tabList.map((item) => (
                        <Link
                            href={item.path}
                            key={item.label}
                            onClick={() => setActiveTab(item.label)}
                            className={`py-2 px-4 w-full text-center ${activeTab === item.label ? "font-semibold" : ""}`}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <div
                        className="absolute left-0 bottom-0 h-1 w-1/2 bg-blue-500 transition-transform duration-300 ease-in-out"
                        style={{ transform: `translateX(${tabIndex * 100}%)` }}
                    ></div>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="mt-5 space-y-6"
                >
                    <div className="rounded-md flex flex-col gap-4">
                        <div className="relative">
                            <label htmlFor="email-address" className="sr-only">
                                이메일 주소
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none outline-none rounded-[10px] relative block w-full px-3 py-2 bg-gray-100 border border-gray-300 placeholder-gray-500 text-gray-900 focus:bg-gray-200 focus:ring-blue-custom focus:border-blue-custom-deep focus:z-10 focus:scale-[1.01] sm:text-sm ease-out duration-200"
                                placeholder="이메일 주소"
                                onChange={handleOnchange}
                            />
                            <span className="absolute right-[10px] top-[50%] -mt-[8px] z-10">
                                <EmailIcon/>
                            </span>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-blue-custom-hover border-transparent text-[18px] font-medium rounded-[10px] text-white bg-blue-custom-deep hover:bg-blue-custom-hover active:outline-none active:ring active:ring-offset-3 active:ring-blue-custom-hover ease-out duration-200"
                        >
                            찾기
                        </button>
                    </div>
                </form>
                <div className="flex justify-around text-[12px] text-gray-600">
                    <Link href={'/login'}>로그인</Link>
                    <Link href={'/id'}>이메일 찾기</Link>
                </div>
            </div>
        </div>
    );
};

export default PasswordPage;