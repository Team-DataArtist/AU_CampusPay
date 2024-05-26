import React from 'react';
import FormComponent from "@/components/form/Form";
import SmallNavbar from "@/components/nav/SmallNavbar";

const RegisterPage = () => {
    /**
     * Todo : Server or Client 렌더링 설계
     * - input 입력을 상태로 저장해서 프롭스로 전달 */
    return (
        <div className={'h-[100vh]'}>
            {/* Header */}
            <SmallNavbar/>
            {/* Main */}
            <div
                className='
                    pb-12
                    px-4
                    flex
                    items-center
                    justify-center
                    sm:px-6
                    lg:px-8
                '
            >
                <div
                    className="
                        w-[620px]
                        h-[720px]
                        mt-14
                        p-6
                        space-y-8
                        bg-white
                        rounded-md
                        shadow-md
                    "
                >
                    <FormComponent/>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;