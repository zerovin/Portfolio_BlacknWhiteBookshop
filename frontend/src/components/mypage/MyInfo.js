
const MyInfo=()=>{

    return(
        <div id="Mypage">
            <div className="container">
                <div className="myinfo">
                    <form>
                        <div>
                            <label>아이디</label>
                            <input type="text" value={"userId"} readOnly />
                        </div>

                        <div>
                            <label>이름</label>
                            <input type="text" value={"userName"} />
                        </div>

                        <div className="input_wrap">
                            <label>이메일</label>
                            <div className="email_box">
                                <input type="text" className="email_id" placeholder="아이디" value={"emailId"} />
                                <span className="at_mark">@</span>
                                <select className="email_domain" value={"emailDomain"}>
                                <option value="naver.com">naver.com</option>
                                <option value="gmail.com">gmail.com</option>
                                <option value="daum.net">daum.net</option>
                                <option value="kakao.com">kakao.com</option>
                                <option value="nate.com">nate.com</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label>핸드폰 번호</label>
                            <input type="text" placeholder="- 제외 입력" value={"phone"} />
                        </div>

                        <div>
                            <label>우편번호</label>
                            <input type="text" value={"postcode"} readOnly />
                            <button type="button" className="zipcode_btn">검색</button>
                        </div>

                        <div>
                            <label>기본주소</label>
                            <input type="text" value={"address"} readOnly />
                        </div>

                        <div>
                            <label>상세주소</label>
                            <input type="text" value={"detailAddress"} />
                        </div>

                        <div className="mypage_btn">
                            <button type="submit">정보 수정</button>
                            <button type="button">취소</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default MyInfo