import {connectDB} from "@/util/database";
import {ObjectId} from "mongodb";
import Comment from "@/app/detail/Comment";
import {notFound} from "next/navigation";

export default async function Detail(props) {
    const db = (await connectDB).db("forum");
    let result = await db.collection('post').findOne({_id : new ObjectId(props.params.contentNo)})

    if (result === null) {
        return notFound();
    }

    return (
        <div>
            <h4>상세페이지</h4>
            <h4>{result.title}</h4>
            <p>{result.content}</p>
            {
                result.imgUrl !== undefined && <img src={result.imgUrl} alt={result.title} />
            }
            <Comment contentId={props.params.contentNo}/>
        </div>
    );
};