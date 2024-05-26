import React from 'react';
import AdminTicketIcon from "@/app/_components/ui/Icons/AdminTicketIcon";
import AdminTodayPriceIcon from "@/app/_components/ui/Icons/AdminTodayPriceIcon";

type Props = {
    data: {
        totalTicket: number;
        totalAmount: number;
        profit: number;
    }
}

const AdminTopCard = ({ data }: Props) => {
    const ticket = [
        {
            label: '일일 판매 티켓',
            value: `${data.totalTicket} 개`,
            icon: <AdminTicketIcon/>
        },
        {
            label: '일일 판매 금액',
            value: `${data.totalAmount} ₩`,
            icon: <AdminTodayPriceIcon/>
        },
        {
            label: '일일 순수익',
            value: `${data.profit} ₩`,
            icon: <AdminTodayPriceIcon/>
        },
    ]

    return (
        <section className="p-4 grid lg:grid-cols-6 gap-4">
            {ticket.map((item, index) => (
                <article
                    key={index}
                    className="w-full p-4 lg:col-span-2 col-span-1 bg-white flex justify-between border rounded-lg"
                >
                    <div className='w-full pb-4 flex flex-col'>
                        <p className='text-2xl font-bold'>
                            {item.value}
                        </p>
                        <p className='text-gray-600'>
                            {item.label}
                        </p>
                    </div>
                    <p className='p-2 bg-blue-200 flex justify-center items-center rounded-lg'>
                        <span className='text-blue-custom text-lg'>
                            ???%
                        </span>
                    </p>
                </article>
            ))}
        </section>
    );
};

export default AdminTopCard;