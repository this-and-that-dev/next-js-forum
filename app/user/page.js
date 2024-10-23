export default function userForm() {
    return (
        <div>
            <h4>회원가입</h4>
            <form action={"/api/user"} method={"post"}>
                <input type={'text'} name={'id'} placeholder={"아이디를 입력하세요"}/>
                <input type={'text'} name={'password'} placeholder={"비밀번호를 입력하세요"}></input>
                <button type="submit">버튼</button>
            </form>
        </div>
    )
};