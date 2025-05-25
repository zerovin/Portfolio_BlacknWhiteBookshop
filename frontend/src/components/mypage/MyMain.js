import { useEffect, useState } from "react"
import { Link } from "react-router-dom" 
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
                    {/* <p className="welcome">{userName}님, 환영합니다.</p> */}
                    <div className="section">
                        <div className="section-header">
                            <h3>최근주문내역</h3>
                            <Link to={"/mypage/order"}>전체보기</Link>
                            </div>
                        <div className="empty-box">
                            <p className="">최근 주문내역이 없습니다.</p>
                        </div>
                    </div>
                    <div className="grid-section">
                        <div className="section">
                            <div className="section-header">
                                <h3>나의 보관함</h3>
                                <Link to={"/mypage/view"}>전체보기</Link>
                            </div>
                            <div className="empty-box">
                                <p>보관된 상품이 없습니다.</p>
                            </div>
                        </div>
                        <div className="section">
                            <div className="section-header">
                                <h3>나의 문의내역</h3>
                                <Link to={"/mypage/post"}>전체보기</Link>
                            </div>
                            <div className="empty-box">
                                <p>문의가 없습니다.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyMain