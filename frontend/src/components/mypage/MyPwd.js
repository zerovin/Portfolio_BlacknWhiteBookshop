
const MyPwd=()=>{

    return(
        <div id="Mypage">
            <div className="container">
                <form>
                    <div>
                        <label>현재 비밀번호</label>
                        <input type="password" value={"currentPwd"} />
                    </div>

                    <div>
                        <label>새 비밀번호</label>
                        <input type="password" value={"newPwd"} />
                    </div>

                    <div>
                        <label>재확인</label>
                        <input type="password" value={"newPwdCheck"} />
                    </div>

                    <div className="mypage_btn">
                        <button type="submit">비밀번호 변경</button>
                        <button type="button">취소</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default MyPwd