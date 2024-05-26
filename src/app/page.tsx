import React from "react";
import {options} from "@/app/api/auth/[...nextauth]/options";
import {getServerSession} from "next-auth";

import Navbar from "@/_components/nav/Navbar";
import Footer from "@/_components/Footer";
import IndexSection from "@/_components/IndexSection";
import DesktopNavbar from "@/_components/nav/DesktopNavbar";

export default async function Home() {
    const session: any = await getServerSession(options)

    return (
        <Navbar>
            <DesktopNavbar/>
            <main
                className='
                    min-h-screen
                    max-h-full
                    text-white
                '
            >
                <IndexSection session={session}/>
            </main>
            <Footer/>
        </Navbar>
    )
}