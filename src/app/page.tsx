import Link from "next/link";
import {options} from "@/app/api/auth/[...nextauth]/option";
import {getServerSession} from "next-auth";
import {undefined} from "zod";

type User = {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined
} | undefined;

type Session = {
    user?: User;
}

type T = {
    session: Session | null;
}

export default async function Home() {
  const session: Session | null = await getServerSession(options)

    return (
    <main className='mx-auto w-1/2 p-4'>
        <div>
            <h2>세션 정보</h2>
            <p>
                아이디 : test<br/>
                비밀번호 : test<br/>
                공급자 : 깃허브
            </p>
            <>
                {session ? (
                    <div>session : {session?.user?.name}</div>
                ) : (
                    <div>session : null</div>
                )}
            </>
        </div>
    </main>
  )
}