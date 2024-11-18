import {connectDB} from "@/util/database";
import {revalidatePath} from "next/cache";

export default async function Write2() {

    const db = (await connectDB).db('form');
    let result = await db.collection('post_test').find().toArray();

    //formData 안에는 form date 가 들어있다.
    async function handleSubmit(formData) {
        'use server' //server api로 변한다.
        const db = (await connectDB).db('form');
        await db.collection('post_test').insertOne({title : formData.get('title')});
        revalidatePath('/write2')
    }

    return (
        <div>
            <form action={handleSubmit}>
                <input name={"title"}></input>
                <button type={"submit"}>버튼</button>
            </form>
            {
                result?.length > 0 ? result.map((data, index) => {
                    return (
                        <p key={index}>글제목 : {data.title}</p>
                    )
                }) : null
            }
        </div>
    )
};