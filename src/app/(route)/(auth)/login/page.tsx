'use client'
import React, {useCallback, useState} from 'react';
import Link from "next/link";

import {signIn} from "next-auth/react";
import {isValidEmail, isValidPassword} from '@/service/auth';
import {useRouter} from "next/navigation";

import EmailIcon from "@/components/ui/Icons/EmailIcon";
import PasswordIcon from "@/components/ui/Icons/PasswordIcon";
import FormInput from "@/components/ui/Input/FormInput";
import SmallNavbar from "@/components/nav/SmallNavbar";
import Button from "@/components/ui/Button/Button";

const LoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        // 오류 메세지 재설정
        let isFormValid = true;
        setEmailError('');
        setPasswordError('');

        // 이메일 공백 & 유효성 검사
        if (!email) {
            setEmailError('이메일 주소를 입력해주세요.');
            isFormValid = false;
        } else if (!isValidEmail(email)) {
            setEmailError('유효한 이메일 주소를 입력하세요.');
            isFormValid = false;
        }

        // 비밀번호 공백 & 유효성 검사
        if (!password) {
            setPasswordError('비밀번호를 입력해주세요.');
            isFormValid = false;
        } else if (!isValidPassword(password)) {
            setPasswordError('비밀번호는 8-20자 길이여야 하며, 영문, 숫자, 특수문자를 포함해야 합니다.');
            isFormValid = false;
        }

        return isFormValid;
    }

    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        try {
            setIsSubmitting(true);
            // 로그인 시도
            const response = await signIn('Credentials', {
                redirect: false,
                email,
                password,
            });

            // 로그인 결과 처리
            if (response?.error) {
                setPasswordError('로그인에 실패했습니다. 다시 시도해주세요.');
            } else {
                router.replace('/');
            }
        } catch (error) {
            setEmailError('로그인 중 오류가 발생했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    }, [email, password, router]);

    return (
        <div
            className='
                flex
                flex-col
                h-screen
                overflow-x-hidden
            '
        >
            {/* Header */}
            <SmallNavbar/>
            {/* Main */}
            <div
                className='
                    flex
                    flex-grow
                    items-center
                    justify-center
                    pb-12
                    px-4
                    sm:px-6
                    lg:px-8
                '
            >
                <div
                    className='
                        max-w-max
                        w-full
                        my-24
                        py-20
                        space-y-8
                        p-6
                        bg-white
                        rounded-md
                        shadow-md
                    '
                >
                    <div
                        className='
                            mb-16
                            px-10
                            flex
                            flex-col
                            justify-center
                        '
                    >
                        <h1 className='text-2xl'>
                            <span className='font-semibold'>
                                CampusPay
                            </span>
                            에 오신 것을 환영합니다.
                        </h1>
                        <p className={'mt-2 text-center'}>
                            시작하려면 로그인하세요.
                        </p>
                    </div>
                    {/* Login Form */}
                    <form
                        className="mt-5 space-y-6"
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        {/* Login Input */}
                        <div
                            className='
                                rounded-md
                                flex
                                flex-col
                                gap-4
                            '
                        >
                            <FormInput
                                id="email"
                                type="email"
                                autoComplete="email"
                                required
                                placeholder="이메일 주소"
                                icon={<EmailIcon/>}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                errorMessage={emailError}
                            />
                            <FormInput
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                placeholder="비밀번호"
                                icon={<PasswordIcon/>}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                errorMessage={passwordError}
                            />
                        </div>
                        {/* Login Check Box */}
                        <div
                            className='
                                w-[120px]
                                flex
                                items-center
                                cursor-pointer
                            '
                        >
                            <input
                                type="checkbox"
                                id='loginCheck'
                            />
                            <label
                                htmlFor='loginCheck'
                                className='ml-2 text-sm'
                            >
                                계정 정보 저장
                            </label>
                        </div>
                        {/* Submit OR Register, Inquiry */}
                        <div>
                            <Button
                                buttonType='submit'
                                text='로그인'
                                className='
                                    group
                                    relative
                                    w-full
                                    flex
                                    justify-center
                                    py-3
                                    px-4
                                    border-2
                                    border-solid
                                    text-[18px]
                                    font-bold
                                    rounded
                                    text-white
                                    bg-primary-color
                                    border-primary-color
                                    duration-200
                                    hover:text-white
                                    hover:bg-[#ff8a00]
                                    hover:border-primary-color
                                '
                            />
                            <div
                                className='
                                    mt-5
                                    ml-5
                                    flex
                                    justify-center
                                    gap-5
                                    text-gray-600
                                    text-[14px]
                                '
                            >
                                <Link href={'/register'}>회원가입</Link>
                                <Link href={'/login'}>아이디 찾기</Link>
                                <Link href={'/login'}>비밀번호 변경</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;