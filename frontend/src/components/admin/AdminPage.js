import { Fragment, useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import apiClient from "../../http-commons";

const AdminPage=()=>{
    const location=useLocation()
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
        <Fragment>
            <div id="adminpage">
                <div className="container">
                    <div className="top">
                        <h3>{userName} 님의 관리자페이지</h3>
                    </div>
                    <div className="tab-menu">
                        <Link to="home" className={location.pathname.endsWith("home") ? "active" : ""}>홈</Link>
                        <Link to="member" className={location.pathname.endsWith("member") ? "active" : ""}>회원 목록</Link>
                        <Link to="order" className={location.pathname.endsWith("order") ? "active" : ""}>주문 목록</Link>
                        <Link to="board" className={location.pathname.endsWith("board") ? "active" : ""}>게시판 현황</Link>
                        <Link to="qna" className={location.pathname.endsWith("qna") ? "active" : ""}>문의 현황</Link>
                    </div>
                    <div className="tab-content">
                        <Outlet />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default AdminPage;