'use client'
import Link from "next/link";

import { useState } from 'react';
import {useSession} from "next-auth/react";

import PreviousButton from "@/components/ui/Button/PreviousButton";

interface ApiResponse {
    success: boolean;
    status: number;
    message: string;
}

const WriteForm = () => {
    const { data: session } = useSession();
    const [Message, setMessage] = useState<string | null>(null);
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = event.currentTarget;
        const title = (formData.elements.namedItem("title") as HTMLInputElement)?.value;
        const content = (formData.elements.namedItem("content") as HTMLTextAreaElement)?.value;

        const data = {
            user_id: session?.user._id,
            username: session?.user.username,
            title: title,
            content: content,
        };

        try {
            const response = await fetch('/api/admin/write', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log(result);
            setMessage(result.message);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <form className="w-full px-10 py-5 flex flex-col justify-center gap-5" onSubmit={handleSubmit}>
            {Message && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-20">
                    <div className="bg-white rounded-lg p-5">
                        <div className="text-center">
                            <p className="text-lg font-semibold mb-3">{Message}</p>
                            <div className="flex justify-around">
                                <span className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 z-10 ease-out duration-200">
                                    <Link href="/admin">
                                        돌아가기
                                    </Link>
                                </span>

                                <button
                                    type="reset"
                                    onClick={() => {
                                        setMessage(null);
                                        window.location.reload();
                                    }}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ease-out duration-200"
                                >
                                    다시 작성
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div>
                <input
                    className="w-full h-[50px] p-5 appearance-none outline-none placeholder-gray-400 text-gray-900 text-[17px] focus:rounded-[15px] focus:bg-gray-100 focus:ring-blue-custom focus:border-blue-custom-deep focus:z-10 focus:scale-[1.01] duration-200 border-b-2 border-gray-300"
                    type="text"
                    name="title"
                    placeholder="공지의 제목"
                />
            </div>
            <div>
                <textarea
                    className="w-full md:min-h-[550px] md:max-h-[550px] min-h-[800px] max-h-[800px] p-5 appearance-none outline-none placeholder-gray-400 text-gray-900 text-[17px] focus:rounded-[15px] focus:bg-gray-100 focus:ring-blue-custom focus:border-blue-custom-deep focus:z-10 focus:scale-[1.01] ease-out duration-200 border-b-2 border-gray-300"
                    name="content"
                    placeholder="공지의 내용"
                />
            </div>
            <div className="flex justify-between">
                <PreviousButton
                    props='취소'
                    className='
                        w-[200px]
                        py-3
                        px-4
                        group
                        relative
                        flex
                        justify-center
                        border
                        border-blue-custom-hover
                        border-transparent
                        text-[18px]
                        font-medium
                        rounded-[25px]
                        bg-blue-custom-deep
                        hover:bg-blue-custom-hover
                        active:outline-none
                        active:ring
                        active:ring-offset-3
                        active:ring-blue-custom-hover
                        ease-out duration-200
                    '
                />
                <button
                    type='submit'
                    className='
                        w-[200px]
                        py-3
                        px-4
                        group
                        relative
                        justify-center
                        flex
                        border
                        border-blue-custom-hover
                        border-transparent
                        text-[18px]
                        text-white
                        font-medium
                        rounded-[25px]
                        bg-primary-color
                        hover:bg-blue-custom-hover
                        active:outline-none
                        active:ring
                        active:ring-offset-3
                        active:ring-blue-custom-hover
                        ease-out duration-200
                    '
                >
                    게시하기
                </button>
            </div>
        </form>
    );
};

export default WriteForm;