import {connectDB} from "@/util/database";

export default async function list(request, response) {

    let result = {};

    if (request.method === "GET") {
        const db = (await connectDB).db("forum");
        result = await db.collection('post').find().toArray();
    }

    response.status(200).json(result);
};