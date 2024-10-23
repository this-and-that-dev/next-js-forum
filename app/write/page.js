export default function Write() {
    return (
        <div>
            <form action={"/api/write"} method={"post"}>
                <h4>글작성</h4>
                <input type={'text'} name={'title'} placeholder={"글제목 입력하세요"}/>
                <input type={'text'} name={'content'} placeholder={"내용을 입력하세요"}></input>
                <button type="submit">버튼</button>
            </form>
        </div>
    )
};