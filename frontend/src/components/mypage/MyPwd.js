import { useState } from "react"
import apiClient from "../../http-commons"

const MyPwd=()=>{
    const [pwdData, setPwdData]=useState({
        curPwd:"",
        newPwd:"",
        newPwdCheck:""
    })
    const pwdChange=(e)=>{
        const {name, value}=e.target
        setPwdData({...pwdData,[name]:value})
    }
    const pwdCancel=()=>{
        setPwdData({
            curPwd:"",
            newPwd:"",
            newPwdCheck:""
        })
    }
    const pwdSubmit=async(e)=>{
        e.preventDefault()
        const {curPwd, newPwd, newPwdCheck}=pwdData
        if(newPwd!==newPwdCheck){
            alert("새 비밀번호가 일치하지 않습니다.")
            return
        }
        try{
            const res=await apiClient.put("/member/pwdChange",{
                curPwd: curPwd,
                newPwd: newPwd
            })
            if(res.data==="Success"){
                alert("비밀번호가 변경되었습니다.")
                setPwdData({
                    curPwd:"",
                    newPwd:"",
                    newPwdCheck:""
                })
            }else if(res.data==="WrongPwd"){
                alert("현재 비밀번호가 일치하지 않습니다.")
            }else{
                alert("비밀번호 변경에 실패했습니다.")
            }
        }catch(err){
            alert("오류가 발생했습니다.")
            console.error(err)
        }
    }
    return(
        <div id="Mypage">
            <div className="container">
                <form onSubmit={pwdSubmit}>
                    <div>
                        <label>현재 비밀번호</label>
                        <input type="password" name="curPwd" value={pwdData.curPwd} onChange={pwdChange}/>
                    </div>

                    <div>
                        <label>새 비밀번호</label>
                        <input type="password" name="newPwd" value={pwdData.newPwd} onChange={pwdChange}/>
                    </div>

                    <div>
                        <label>재확인</label>
                        <input type="password" name="newPwdCheck" value={pwdData.newPwdCheck} onChange={pwdChange}/>
                    </div>

                    <div className="mypage_btn">
                        <button type="submit">비밀번호 변경</button>
                        <button type="button" onClick={pwdCancel}>취소</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default MyPwd