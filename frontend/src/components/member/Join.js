function Join(){
    return (
      <div>
      <div className="sub_title">
        <h1>회원가입</h1>
      </div>
      <form>
        <div>
          <label>아이디</label>
          <input type="text" />
        </div>

        <div>
          <label>비밀번호</label>
          <input type="password" />
        </div>

        <div>
          <label>비밀번호 확인</label>
          <input type="password" />
        </div>

        <div>
          <label>이름</label>
          <input type="text" />
        </div>

        <div>
          <label>이메일</label>
          <input type="email" />
        </div>

        <div>
          <label>핸드폰 번호</label>
          <input type="text" placeholder="- 제외 입력" />
        </div>

        <div>
          <label>우편번호</label>
          <input type="text" />
        </div>

        <div>
          <label>기본주소</label>
          <input type="text" />
        </div>

        <div>
          <label>상세주소</label>
          <input type="text" />
        </div>

        <div className="join_btn">
          <button type="submit">가입하기</button>
          <button type="submit">취소</button>
        </div>
      </form>
    </div>
      )
}

export default Join