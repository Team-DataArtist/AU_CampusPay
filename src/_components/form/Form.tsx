'use client'
import React, {useMemo, useState} from 'react';
import { useRouter } from "next/navigation";
import { isValidEmail, isValidPassword, isValidUsername, isValidStudentNumber, isValidPhoneNumber } from '@/service/auth';

import EmailIcon from "@/components/ui/Icons/EmailIcon";
import PasswordIcon from "@/components/ui/Icons/PasswordIcon";
import UserIcon from "@/components/ui/Icons/UserIcon";
import StudentIcon from "@/components/ui/Icons/StudentIcon";
import MobileIcon from "@/components/ui/Icons/MobileIcon";
import FormInput from "@/components/ui/Input/FormInput";
import Button from "@/components/ui/Button/Button";

interface FormState {
    data: {
        email: string;
        password: string;
        passwordConfirm: string;
        username: string;
        student_number: string;
        phone: string;
    };
    errors: {
        [key: string]: string;
    };
}

const FormComponent = () => {
    const router = useRouter()

    const [form, setForm] = useState<FormState>({
        data: {
            email: '',
            password: '',
            passwordConfirm: '',
            username: '',
            student_number: '',
            phone: ''
        },
        errors: {}
    });

    // 폼 데이터 상태 업데이트
    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setForm(prevForm => ({
            ...prevForm,
            data: {
                ...prevForm.data,
                [name]: value
            },
            // 필드를 변경할 때마다 관련된 오류를 초기화
            errors: {
                ...prevForm.errors,
                [name]: ''
            }
        }));
    };

    const inputData = useMemo(() => [
        {
            id: 'email',
            type: 'email',
            name: 'email',
            autoComplete: 'email',
            placeholder: '이메일 주소',
            icon: <EmailIcon />,
            errorMessage: form.errors.email,
            value: form.data.email,
        },
        {
            id: 'password',
            type: 'password',
            name: 'password',
            autoComplete: 'current-password',
            placeholder: '비밀번호',
            icon: <PasswordIcon />,
            errorMessage: form.errors.password,
            value: form.data.password,
        },
        {
            id: 'passwordConfirm',
            type: 'password',
            name: 'passwordConfirm',
            autoComplete: 'new-password',
            placeholder: '비밀번호 확인',
            icon: <PasswordIcon />,
            errorMessage: form.errors.passwordConfirm,
            value: form.data.passwordConfirm,
        },
        {
            id: 'username',
            type: 'text',
            name: 'username',
            autoComplete: 'name',
            placeholder: '이름',
            icon: <UserIcon />,
            errorMessage: form.errors.username,
            value: form.data.username,
        },
        {
            id: 'student_number',
            type: 'text',
            name: 'student_number',
            autoComplete: 'off',
            placeholder: '학번',
            icon: <StudentIcon />,
            errorMessage: form.errors.student_number,
            value: form.data.student_number,
        },
        {
            id: 'phone',
            type: 'text',
            name: 'phone',
            autoComplete: 'tel',
            placeholder: '휴대폰 번호',
            icon: <MobileIcon />,
            errorMessage: form.errors.phone,
            value: form.data.phone,
        },
    ], [form.errors, form.data]);

    const validateForm = () => {
        const validationErrors = { ...form.errors }; // 오류 객체 복사
        let isFormValid = true;

        // Email 검증
        if (!form.data.email.trim()) {
            validationErrors.email = '이메일을 입력해주세요.';
            isFormValid = false;
        } else if (!isValidEmail(form.data.email)) {
            validationErrors.email = '유효한 이메일 주소를 입력하세요.';
            isFormValid = false;
        }

        // Password 검증
        if (!form.data.password.trim()) {
            validationErrors.password = '비밀번호를 입력해주세요.';
            isFormValid = false;
        } else if (!isValidPassword(form.data.password)) {
            validationErrors.password = '비밀번호는 8-20자 길이여야 하며, 영문, 숫자, 특수문자를 포함해야 합니다.';
            isFormValid = false;
        }

        // Password Confirm 검증
        if (!form.data.passwordConfirm.trim()) {
            validationErrors.passwordConfirm = '비밀번호 확인란을 입력해주세요.';
            isFormValid = false;
        } else if (form.data.password !== form.data.passwordConfirm) {
            validationErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
            isFormValid = false;
        }

        // Username 검증
        if (!form.data.username.trim()) {
            validationErrors.username = '이름을 입력해주세요.';
        } else if (!isValidUsername(form.data.username)) {
            validationErrors.username = '올바른 이름을 입력하세요.';
        }

        // Student Number 검증
        if (!form.data.student_number.trim()) {
            validationErrors.student_number = '학번을 입력해주세요.';
        } else if (!isValidStudentNumber(form.data.student_number)) {
            validationErrors.student_number = '올바른 학번을 입력하세요.';
        }

        // Phone 검증
        if (!form.data.phone.trim()) {
            validationErrors.phone = '휴대폰 번호를 입력해주세요.';
        } else if (!isValidPhoneNumber(form.data.phone)) {
            validationErrors.phone = '유효한 휴대폰 번호를 입력하세요.';
        }

        // 검사 결과를 form.errors에 설정
        setForm({ ...form, errors: validationErrors });

        return isFormValid;
    }

    const generateErrorMessages = () => {
        const errorMessages = Object.values(form.errors).filter(error => error !== '');
        return errorMessages.length > 0 && (
            <div className="text-red-500 text-sm mt-2">
                {errorMessages.map((error, index) => (
                    <div key={index}>{error}</div>
                ))}
            </div>
        );
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 폼 유효성 검사를 수행하고, 유효하지 않을 경우 false 반환
        if (!validateForm()) {
            return;
        }

        // 폼 데이터 서버에 전송
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form.data),
        });

        const result = await res.json();

        // 결과에 따른 처리 수행
        if (result.success) {
            alert('가입에 성공했습니다!'); // 성공 메시지
            router.replace('/'); // 성공 시 홈페이지로 리다이렉트
        } else {
            console.error('가입 오류', result); // 실패 시 콘솔에 오류 로깅
        }
    }

    return (
        <>
            <div className={'text-center'}>
                <h1 className={'text-2xl'}>
                    <span className={'font-bold'}>CampusPay</span>에 오신 것을 환영합니다.
                </h1>
                <p className={'mt-3'}>회원가입을 통해 다양한 서비스를 만나보세요.</p>
            </div>
            <form
                className="mt-8 space-y-6"
                onSubmit={handleSubmit}
                noValidate
            >
                <div className="rounded-md shadow-sm flex flex-col gap-4">
                    {inputData.map((input, index) => (
                        <FormInput
                            key={index}
                            id={input.id}
                            type={input.type}
                            autoComplete={input.autoComplete}
                            placeholder={input.placeholder}
                            icon={input.icon}
                            value={input.value}
                            onChange={handleOnchange}
                        />
                    ))}
                </div>
                {generateErrorMessages()}
                <div className={'relative'}>
                    <Button
                        buttonType={'submit'}
                        text={'회원가입'}
                        className="w-full py-3 px-4 group justify-center border-2 border-solid text-[18px] font-bold rounded text-white bg-primary-color border-primary-color duration-200 bottom-16 hover:text-white hover:bg-[#ff8a00] hover:border-primary-color"
                    />
                </div>
            </form>
        </>
    );
};

export default FormComponent;