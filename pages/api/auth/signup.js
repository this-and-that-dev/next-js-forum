import {connectDB} from "@/util/database";
import bcrypt from "bcrypt";

export default async function handler(request, response) {
    if (request.method === "POST") {
        let hashPassword = await bcrypt.hash(request.body.password, 10);
        try {
            const requestBody = {
                name : request.body.name,
                email : request.body.email,
                password : hashPassword,
            }

            const db = (await connectDB).db("forum");
            await db.collection('user').insertOne(requestBody);
            response.redirect(302, "/");
        } catch (e) {
            response.stats(500).json("회원가입 중 오류발생");
        }
    }
}