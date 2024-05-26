import React from 'react';
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";
import {redirect} from "next/navigation";

import AdminTopCard from "@/app/_components/ui/Card/AdminTopCard";
import BarChart from "@/app/_components/ui/Chart/BarChart";
import RecentOrders from "@/app/_components/admin/RecentOrders";

const AdminPage = async () => {
    const session = await getServerSession(options);
    if (!session?.user.role || !session) {
        redirect('/')
    }

    const res = await fetch(`${process.env.SITE_URL}/api/admin/stats/daily`);
    const data = await res.json();

    return (
        <>
            <AdminTopCard data={data}/>
            <div className='p-4 grid md:grid-cols-3 grid-cols-1 gap-4'>
                <BarChart/>
                <RecentOrders/>
            </div>
        </>
    );
};

export default AdminPage;