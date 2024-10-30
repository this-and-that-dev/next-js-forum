
import ListItem from "@/app/list/ListItem";
import {connectDB} from "@/util/database";

export const dynamic = 'force-dynamic'

export default async function List() {
    const db = (await connectDB).db("forum");
    let result = await db.collection('post').find().toArray();

    let newResult = result.map(post => {
        return {
            _id : post._id.toString(),
            title : post.title,
            content : post.content
        }
    })

    return (
        <div className="list-bg">
            <ListItem result={newResult} />
        </div>
    )
}