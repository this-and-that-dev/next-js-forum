import {connectDB} from "@/util/database";

export default async function createUser(request, response) {
    if (request.method === "POST") {
        const id = request.body.id;
        const password = request.body.password;
        const db = (await connectDB).db("forum");
        let document;
        try {
            document = await db.collection('user').findOne({id: id});
        } catch (error) {
            response.status(500).json("아이디를 찾는데 실패하였습니다.");
        }
        console.log(document);
        try {
            if (document === null || Object.keys(document).length === 0) {
                await db.collection('user').insertOne({
                    id: id,
                    password: password
                });
                response.status(302).redirect("/user");
            } else {
                response.status(400).json("아이디가 이미 존재합니다.");
            }
        } catch (error) {
            response.status(500).json(error);
        }
    }
};