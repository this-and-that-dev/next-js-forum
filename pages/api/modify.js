import {connectDB} from "@/util/database";
import {ObjectId} from "mongodb";

export default async function modify(request, response) {
    if (request.method === "POST") {
        const title = request.body.title;
        const content = request.body.content;
        const db = (await connectDB).db("forum");
        if (title && content) {
            try {
                let result = await db.collection('post').updateOne(
                    {
                        _id: new ObjectId(request.body._id)
                    },
                    {
                        $set: {
                            title: title, content: content
                        }
                    });
            } catch (error) {
                response.status(500).json("에러가 발생했음");
            }

        } else {
            response.status(400).json("제목 내용 입력해줘");
        }
        response.redirect(302, "/list");
    } else {
        response.status(405).json("POST 로 보내주세요");
    }
};