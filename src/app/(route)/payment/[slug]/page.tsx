import React from 'react';
import PaymentContainer from "@/app/payment/PaymentContainer";
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";
import {redirect} from "next/navigation";
import Navbar from "@/app/_components/nav/Navbar";

const PaymentsPage = async () => {
    const session = await getServerSession(options);
    const user = session?.user;

    if (!user) {
        redirect('/login')
    }

    return (
        <Navbar>
            <div className="min-h-screen bg-[#f7f7f7]">
                <div className="flex flex-col p-10 gap-[25px]">
                    <h1 className="text-center font-bold text-[40px]">어떤 식당에서 식사하십니까?</h1>
                    <PaymentContainer/>
                </div>
            </div>
        </Navbar>
    );
};

export default PaymentsPage;