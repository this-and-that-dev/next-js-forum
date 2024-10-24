import {connectDB} from "@/util/database";
import {ObjectId} from "mongodb";

export default async function handler(request, response) {
    if (request.method === "POST") {
        try {
            const db = (await connectDB).db("forum");
            let result = await db.collection('post').deleteOne({_id: new ObjectId(request.body.id)});
            if (result.deletedCount > 0) {
                response.status(200).json("삭제성공");
            } else {
                response.status(404).json("게시글이 존재하지 않습니다.");
            }
        } catch (error) {
            response.status(500).json("삭제 중 에러발생");
        }
    } else {
        response.status(405).json(`Method ${request.method}는 허용하지 않습니다.`)
    }
}