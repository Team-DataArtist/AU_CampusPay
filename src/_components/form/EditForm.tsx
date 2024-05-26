'use client'
import React from 'react';
import PreviousButton from "@/components/ui/Button/PreviousButton";
import {useRouter} from "next/navigation";

type Props = {
    findData: {
        _id: any;
        username: any;
        title: any;
        content: any;
    };
}

const EditForm = ({findData}: Props) => {
    const router = useRouter();

    // input name 값을 가져오기 위해(둠 요소에 직접 접근하기 위한) useRef 선언
    const _idRef = React.useRef<HTMLInputElement>(null);
    const titleRef = React.useRef<HTMLInputElement>(null);
    const contentRef = React.useRef<HTMLTextAreaElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // 폼의 기본 제출 동작 중지

        // 폼 데이터를 객체에 저장 (_id, title, content)
        const data = {
            _id: _idRef.current?.value,
            title: titleRef.current?.value,
            content: contentRef.current?.value
        };

        try {
            const response = await fetch('/api/admin/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                alert(result.message || '오류가 발생했습니다.');
                return;
            } else if (response.ok && result.success) {
                alert(result.message);
                router.push('/notice');
            } else if (response.ok && !result.success) {
                alert(result.message);
            }

        } catch (error) {
            alert(`There was a problem with the fetch operation ${error}`)
        }
    };

    return (
        <form
            className="w-full px-10 py-5 flex flex-col justify-center gap-5"
            onSubmit={handleSubmit}
        >
            {findData ? (
                <>
                    <div className="w-fit flex rounded-[15px] px-3 py-2 bg-gray-100">
                        <span className="font-semibold">작성자 :</span>
                        <p className="ml-1">{findData.username}</p>
                    </div>

                    <input
                        ref={_idRef}
                        type="hidden"
                        name="_id"
                        defaultValue={findData._id}
                    />

                    <div>
                        <input
                            ref={titleRef}
                            className="w-full h-[50px] p-5 appearance-none outline-none placeholder-gray-400 text-gray-900 text-[17px] focus:rounded-[15px] focus:bg-gray-100 focus:ring-blue-custom focus:border-blue-custom-deep focus:z-10 focus:scale-[1.01] duration-200 border-b-2 border-gray-300"
                            type="text"
                            name="title"
                            placeholder="공지의 제목"
                            defaultValue={findData.title}
                        />
                    </div>

                    <div>
                <textarea
                    ref={contentRef}
                    className="w-full md:min-h-[515px] md:max-h-[515px] min-h-[750px] max-h-[750px] p-5 appearance-none outline-none placeholder-gray-400 text-gray-900 text-[17px] focus:rounded-[15px] focus:bg-gray-100 focus:ring-blue-custom focus:border-blue-custom-deep focus:z-10 focus:scale-[1.01] ease-out duration-200 border-b-2 border-gray-300"
                    name="content"
                    placeholder="공지의 내용"
                    defaultValue={findData.content}
                />
                    </div>
                </>
            ) : (
                <p>데이터 불러오는 중</p>
            )}

            <div className="flex justify-between">
                <PreviousButton
                    className={"group relative w-[200px] flex justify-center py-3 px-4 border border-blue-custom-hover border-transparent text-[18px] font-medium rounded-[25px] text-white bg-blue-custom-deep hover:bg-blue-custom-hover active:outline-none active:ring active:ring-offset-3 active:ring-blue-custom-hover ease-out duration-200"}
                    props={"취소"}
                />
                <button
                    className="group relative w-[200px] flex justify-center py-3 px-4 border border-blue-custom-hover border-transparent text-[18px] font-medium rounded-[25px] text-white bg-blue-custom-deep hover:bg-blue-custom-hover active:outline-none active:ring active:ring-offset-3 active:ring-blue-custom-hover ease-out duration-200"
                    type='submit'
                >
                    수정
                </button>
            </div>
        </form>
    );
};

export default EditForm;
