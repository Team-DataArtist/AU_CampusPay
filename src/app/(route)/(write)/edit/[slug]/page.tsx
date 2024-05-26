import React from 'react';
import {redirect} from "next/navigation";
import {ObjectId} from "mongodb";
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";
import EditForm from "@/components/form/EditForm";

type Props = {
    params: {
        slug : string;
    }
    searchParams: {
        post: ObjectId;
    }
}

const NoticeEditPage = async ({ params, searchParams }: Props) => {
    const session = await getServerSession(options);
    if (session?.user.role !== 'admin') {
        redirect('/');
    }

    const res = await fetch(`${process.env.SITE_URL}/api/admin/find/notice?post=${searchParams.post}`)
    const data = await res.json();
    const findData = data.data;

    return (
        <div className="md:px-52 flex justify-center">
            <EditForm findData={findData}/>
        </div>
    );
};

export default NoticeEditPage;