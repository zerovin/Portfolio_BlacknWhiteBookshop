import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Join(){
    const [idCheckResult, setIdCheckResult] = useState('')
    const handleIdCheck=(e)=>{
        e.preventDefault()

        axios.get('http://localhost/member/checkId', {  
            params: { userId:formData.userId }
        })
        .then(response=>{
            if (response.data === 'exist') {
                setIdCheckResult('이미 존재하는 아이디입니다.')
            } else {
                setIdCheckResult('사용 가능한 아이디입니다.')
            }
        })
        .catch(error=>{
            console.error(error)
        })
    }
    const [formData, setFormData] = useState({
        userId: '',
        userPwd: '',
        userPwdCheck: '',
        userName: '',
        emailId: '',
        emailDomain: 'naver.com',
        phone: '',
        post: '',
        addr1: '',
        addr2: ''
    })

    const [postcode, setPostcode] = useState('')
    const [address, setAddress] = useState('')
    const [detailAddress, setDetailAddress] = useState('')

    const navigate = useNavigate()

    const handlePostcode=()=>{
        new window.daum.Postcode({
            oncomplete: function (data) {
                let addr = ''
                if (data.userSelectedType === 'R') {
                  addr = data.roadAddress
                } else {
                  addr = data.jibunAddress
                }
                setPostcode(data.zonecode)
                setAddress(addr)
            }
        }).open()
    }
    
    const handleSubmit=async(e)=>{
        e.preventDefault() 

        if (formData.userPwd !== formData.userPwdCheck) {
            alert('비밀번호가 일치하지 않습니다.')
            return
        }

        const fullEmail = formData.emailId + "@" + formData.emailDomain

        const signupData = {
            ...formData,    
            email: fullEmail,     
            post: postcode,       
            addr1: address,        
            addr2: detailAddress,
            userId: formData.userId    
        }
      
        try {
            const res = await axios.post('/member/join', signupData) 
            console.log(res.data)
            alert('회원가입이 완료되었습니다!')
            navigate("/")
        } catch (error) {
            console.error(error)
            alert('회원가입에 실패했습니다.')
        }
    }

    return (
        <div id="Join">
            <div className="container">
                <div className="top">
                    <h3>회원가입</h3>
                </div>
                <div className="join">
                    <form onSubmit={handleSubmit}>
                        <div className="input_wrap">
                            <label>아이디</label>
                            <input type="text" value={formData.userId}
                              onChange={(e)=>setFormData({...formData, userId:e.target.value})}/>
                            <button className="check_btn" onClick={handleIdCheck}>중복확인</button>
                            {idCheckResult && <p className="id-check-result">{idCheckResult}</p>}
                        </div>

                        <div>
                            <label>비밀번호</label>
                            <input type="password" value={formData.userPwd}
                              onChange={(e)=>setFormData({...formData, userPwd: e.target.value})}/>
                        </div>
                        <div>
                            <label>비밀번호 확인</label>
                            <input 
                              type="password" 
                              value={formData.userPwdCheck}
                              onChange={(e) => setFormData({ ...formData, userPwdCheck: e.target.value })}/>
                        </div>

                        <div>
                            <label>이름</label>
                            <input type="text" value={formData.userName}
                              onChange={(e)=>setFormData({...formData, userName: e.target.value})}/>
                        </div>

                        <div className="input_wrap">
                            <label>이메일</label>
                            <div className="email_box">
                                <input type="text" className="email_id" placeholder="아이디" value={formData.emailId}
                                  onChange={(e)=>setFormData({...formData, emailId: e.target.value})}/>
                              <span className="at_mark">@</span>
                              <select className="email_domain" value={formData.emailDomain}
                                  onChange={(e) => setFormData({...formData, emailDomain: e.target.value})}>
                                  <option value="naver.com">naver.com</option>
                                  <option value="gmail.com">gmail.com</option>
                                  <option value="daum.net">daum.net</option>
                                  <option value="kakao.com">kakao.com</option>
                                  <option value="kakao.com">nate.com</option>
                              </select>
                            </div>
                        </div>

                        <div>
                            <label>핸드폰 번호</label>
                            <input type="text" placeholder="- 제외 입력" value={formData.phone}
                              onChange={(e)=>setFormData({...formData, phone: e.target.value})}/>
                        </div>

                        <div>
                            <label>우편번호</label>
                            <input type="text" value={postcode} readOnly />
                            <button type="button" className="zipcode_btn" onClick={handlePostcode}>검색</button>
                        </div>

                        <div>
                            <label>기본주소</label>
                            <input type="text" value={address} readOnly />
                        </div>

                        <div>
                            <label>상세주소</label>
                            <input type="text" value={detailAddress} onChange={(e) => setDetailAddress(e.target.value)} />
                        </div>

                        <div className="join_btn">
                            <button type="submit">가입</button>
                            <button type="submit">취소</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Join