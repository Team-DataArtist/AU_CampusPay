'use client'
import React from 'react';
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import {RequestPayParams, RequestPayResponse} from "@/types/portone";

// 선택된 상품 타입
type productItem = {
    label: string;
    price: number;
    quantity: number;
}

// 컴포넌트 속성 타입
type PaymentContainerProps = {
    props: productItem | null;
    className?: string
}

const PaymentBtn = ({props, className}: PaymentContainerProps) => {
    const { data: session } = useSession();
    const router = useRouter();

    // 결제 이벤트 핸들러
    const paymentHandler = () => {
        /** "props"는 상품 데이터거나 null */
        if (!window.IMP || !props) return;
        /** ### 1. 가맹점 식별 */
        const { IMP } = window;
        IMP.init(process.env.NEXT_PUBLIC_IAMPORT_IMP as string);
        /**
         * ### 2. 결제 데이터 정의
         * pg 사 코드표 : https://developers.portone.io/docs/ko/tip/pg-2
         * pg : pg사 (카카오 페이 or kg 이니시스)
         * pay_method : 결제 방법
         * merchant_uid : 주문번호
         * name : 주문명
         * amount : 결제금액
         * buyer_name : 구매자 이름
         * buyer_tel : 구매자 전화번호
         * buyer_email : 구매자 이메일
         */
        const data: RequestPayParams = {
            pg: "kakaopay.TC0ONETIME",
            pay_method: "card",
            // 주문번호는 결제창 요청 시 항상 고유 값으로 채번 되어야 합니다.
            // 결제 완료 이후 결제 위변조 대사 작업시 주문번호를 이용하여 검증이 필요하므로 주문번호는 가맹점 서버에서 고유하게(unique)채번하여 DB 상에 저장해주세요
            merchant_uid: `mid_${new Date().getTime()}`,
            name: props.label,
            amount: props.price,
            buyer_name: session?.user.username,
            buyer_tel: session?.user.phone,
            buyer_email: session?.user.email,
            m_redirect_url: `/`,
            //notice_url: `${process.env.SITE_URL}/api/payments/webhook`,
        };
        /** ### 4. 결제 창 호출하기 */
        IMP.request_pay(data, callback);
    };

    async function callback(rsp: RequestPayResponse) {
        const { success, error_msg, merchant_uid, imp_uid } = rsp;

        if (success) {
            const res = await fetch(`/api/payment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    imp_uid: imp_uid,
                    merchant_uid: merchant_uid,
                }),
            });

            const data = await res.json();
            console.log("data : ", data);

            /** 결제 성공시 리다이렉트 경로 */
            alert('결제 성공')
            //router.replace(`${process.env.SITE_URL}/confirmation/${session?.user?.name}`);
            router.replace(`/ticket/${session?.user?.username}`);
        } else {
            alert(`결제 실패: ${error_msg}`);
            /** 결제 실패시 리다이렉트 경로 */
            router.replace(`/payment/${session?.user?.username}`);
        }
    }

    return (
        <button onClick={paymentHandler} className={className}>결제하기</button>
    );
};

export default PaymentBtn;