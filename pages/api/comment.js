import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {connectDB} from "@/util/database";
import {ObjectId} from "mongodb";

export default async function handler(request, response) {
    let session = await getServerSession(request, response, authOptions);

    if (session === null) {
        response.status(401).json("로그인하셈");
    }

    if (request.method !== "POST") {
        response.status(405).json("post 만 가능");
    }

    if (session != null && request.method === "POST") {
        let commentBody = {
            comment: request.body.comment,
            contentId: new ObjectId(request.body.contentId),
            regId: session.user.email,
        };

        try {
            const db = (await connectDB).db("forum");
            await db.collection('comment').insertOne(commentBody);
            response.status(200).json("성공");
        } catch (e) {
            console.log(e);
            response.status(500).json("댓글 등록하다 에러남");
        }
    }
}