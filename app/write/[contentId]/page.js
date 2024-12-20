import {connectDB} from "@/util/database";
import {ObjectId} from "mongodb";

export default async function modify(props) {
    const db = (await connectDB).db("forum");
    let result = await db.collection('post').findOne({_id : new ObjectId(props.params.contentId)});
    return (
        <div>
            <form action={"/api/modify"} method={"post"}>
                <h4>글작성</h4>
                <input type={'hidden'} name={'_id'} defaultValue={props.params.contentId} />
                <input type={'text'} name={'title'} placeholder={"글제목 입력하세요"} defaultValue={result.title}></input>
                <input type={'text'} name={'content'} placeholder={"내용을 입력하세요"} defaultValue={result.content}></input>
                <button type="submit">수정하기</button>
            </form>
        </div>
    )
};