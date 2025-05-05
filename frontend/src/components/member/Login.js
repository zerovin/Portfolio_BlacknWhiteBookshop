import { Fragment, useRef, useState } from "react";
import { useQuery } from "react-query";
import apiClient from "../../http-commons";
import { Link } from "react-router-dom";

const Login=()=>{
    const [id, setId]=useState('');
    const [pw, setPw]=useState('');
    const [warn, setWarn]=useState('');
    
    const idRef=useRef(null);
    const pwRef=useRef(null);

    const {refetch:loginOk}=useQuery(['login-ok'],
        async()=>{
            return await apiClient.post(`/member/login/${id}/${pw}`)
        },
        {
            enabled: false,
            onSuccess:(res)=>{
                if(res.data.msg==="NOID" || res.data.msg==="NOPW"){
                    setId('')
                    setPw('')
                    setWarn("입력하신 정보가 일치하지 않습니다.<br/> 다시 확인해 주세요.")
                    idRef.current.focus()
                }else if(res.data.msg==="LOGIN"){
                    window.location.href="/"
                }
            },
            onError:(err)=>{
                console.log(err.response)
            }
        }
    )

    const memberLogin=(e)=>{
        e.preventDefault()
        if(id.trim()===""){
            idRef.current.focus()
            return
        }else if(pw.trim()===""){
            pwRef.current.focus()
            return
        }
        loginOk()
    }

    return(
        <Fragment>
            <div id="login">
                <h2>로그인</h2>
                <form action={''} method="post">
                    <div>
                        <label id="userid">아이디</label>
                        <input type="text" name="userid" value={id} onChange={(e)=>setId(e.target.value)} ref={idRef}/>
                    </div>
                    <div>
                        <label id="userpw">비밀번호</label>
                        <input type="password" name="userpw" value={pw} onChange={(e)=>setPw(e.target.value)} ref={pwRef}/>
                    </div>
                    <p className="warning" dangerouslySetInnerHTML={{__html:warn}}></p>
                    <div className="btn">
                        <button onClick={memberLogin}>로그인</button>
                        <Link to={"/member/join"}>회원가입</Link>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}
export default Login;