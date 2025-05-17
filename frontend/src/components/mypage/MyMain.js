import { useEffect, useState } from "react"
import apiClient from "../../http-commons"

const MyMain=()=>{
    const [userName, setUserName]=useState("")
    useEffect(()=>{
        const getUser=async()=>{
            try{
                const res=await apiClient.get("/member/myinfo")
                setUserName(res.data.userName)
            }catch(err){
                console.error(err)
            }
        }
        getUser()
    },[])
    return(
        <div id="Mypage">
            <div className="container">
                <div className="mymain">
                    <p>{userName}님, 환영합니다.</p>
                </div>
            </div>
        </div>
    )
}

export default MyMain