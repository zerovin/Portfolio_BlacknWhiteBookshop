import { useEffect, useState } from "react"
import apiClient from "../../http-commons"

const MyInfo=()=>{
    const [infoData, setInfoData]=useState({
        userId:"",
        userName:"",
        emailId:"",
        emailDomain:"naver.com",
        phone:"",
        post:"",
        addr1:"",
        addr2:""
    })
    useEffect(()=>{
        const fetchInfo=async()=>{
            try{
                const res=await apiClient.get("/member/myinfo")
                const [eId, eDomain]=res.data.email.split("@")

                setInfoData({
                    userId:res.data.userId,
                    userName:res.data.userName,
                    emailId:eId,
                    emailDomain:eDomain,
                    phone:res.data.phone,
                    post:res.data.post,
                    addr1:res.data.addr1,
                    addr2:res.data.addr2
                })
            }catch(err){
                alert("사용자의 정보를 불러오는데 실패했습니다.")
            }
        }
        fetchInfo()
    },[])
    const handlePostcode=()=>{
        new window.daum.Postcode({
            oncomplete: function (data) {
                let addr = ''
                if (data.userSelectedType === 'R') {
                  addr = data.roadAddress
                } else {
                  addr = data.jibunAddress
                }
                setInfoData(prev => ({
                    ...prev,
                    post: data.zonecode,
                    addr1: addr
                }))
            }
        }).open()
    }
    const handleCancel=()=>{
        window.location.reload()
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()

        try{
            const { emailId, emailDomain, ...rest } = infoData;
            const reqData = {
            ...rest,
            email: `${emailId}@${emailDomain}`
            }
            const res=await apiClient.put("/member/update", reqData)
            if(res.data==="Success"){
                alert("수정 되었습니다.")
            }else{
                alert("수정에 실패했습니다.")
            }
        }catch(err){
            alert("요청 중 오류 발생")
            console.error(err)
        }
    }
    return(
        <div id="Mypage">
            <div className="container">
                <div className="myinfo">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>아이디</label>
                            <input type="text" value={infoData.userId} readOnly/>
                        </div>
                        <div>
                            <label>이름</label>
                            <input type="text" value={infoData.userName} readOnly/>
                        </div>
                        <div className="input_wrap">
                            <label>이메일</label>
                            <div className="email_box">
                                <input type="text" className="email_id" placeholder="아이디" value={infoData.emailId} 
                                 onChange={(e)=>setInfoData({...infoData, emailId:e.target.value})}/>
                                <span className="at_mark">@</span>
                                <select className="email_domain" value={infoData.emailDomain}
                                 onChange={(e)=>setInfoData({...infoData, emailDomain:e.target.value})}>
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
                            <input type="text" value={infoData.phone} 
                             onChange={(e)=>setInfoData({...infoData, phone:e.target.value})}/>
                        </div>
                        <div>
                            <label>우편번호</label>
                            <input type="text" value={infoData.post} readOnly />
                            <button type="button" className="zipcode_btn" onClick={handlePostcode}>검색</button>
                        </div>
                        <div>
                            <label>기본주소</label>
                            <input type="text" value={infoData.addr1} readOnly />
                        </div>
                        <div>
                            <label>상세주소</label>
                            <input type="text" value={infoData.addr2} 
                             onChange={(e)=>setInfoData({...infoData, addr2:e.target.value})}/>
                        </div>
                        <div className="mypage_btn">
                            <button type="submit">수정</button>
                            <button type="button" onClick={handleCancel}>취소</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default MyInfo