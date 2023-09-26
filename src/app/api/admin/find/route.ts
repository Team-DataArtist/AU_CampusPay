import {connectDB} from "@/app/api/db/mongoDb";
import {NextResponse} from "next/server";
import {ObjectId} from "mongodb";

export async function GET(request: Request) {
    try {
        const postId = request.query.id as string;

        const db = (await connectDB).db(process.env.MONGODB_NAME);
        const findCollection = await db.collection(process.env.MONGODB_ANNOUNCEMENT as string).findOne({
            _id: new ObjectId(postId)
        });
        console.log('findCollection: ', findCollection)

        return NextResponse.json({
            success: true,
            status: 200,
            message: '수정할 게시물을 성공적으로 가져왔습니다.',
            data: findCollection,
        })
    } catch (err) {
        return NextResponse.json({
            success: false,
            status: 500,
            massage: `오류가 발생했습니다. ${err}`
        })
    }
}