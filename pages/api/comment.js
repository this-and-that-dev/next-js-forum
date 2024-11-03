import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {connectDB} from "@/util/database";
import {ObjectId} from "mongodb";

export default async function handler(request, response) {

    if (request.method === "POST") {
        let session = await getServerSession(request, response, authOptions);

        if (session === null) {
            response.status(401).json("로그인하셈");
        }

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
            response.status(500).json("댓글 등록하다 에러남");
        }
    }
    if (request.method === "GET") {
        const db = (await connectDB).db("forum");
        let result = await db.collection('comment').find({contentId: new ObjectId(request.query.contentId)}).toArray();
        response.status(200).json(result);
    }
}