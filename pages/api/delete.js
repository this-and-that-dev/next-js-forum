import {connectDB} from "@/util/database";
import {ObjectId} from "mongodb";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

export default async function handler(request, response) {
    if (request.method === "POST") {
        try {
            let session = await getServerSession(request, response, authOptions);
            if (session === null) {
                response.status(401).json("로그인 하셈 ㅅㄱ");
                return;
            }
            if(session.user.email !== request.body.regId) {
                response.status(403).json("너가 쓴거 아님 ㅅㄱ");
                return;
            }
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