import React from 'react';
import EditForm from "@/components/form/EditForm";
import SmallNavbar from "@/components/nav/SmallNavbar";

const Layout = async ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="w-full">
            <SmallNavbar/>
            <main className="md:px-52 flex justify-center">
                {children}
            </main>
        </div>
    );
};

export default Layout;