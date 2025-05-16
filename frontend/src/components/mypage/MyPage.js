import { Link, useLocation, Outlet } from "react-router-dom"

const MyPage=()=>{
    const location=useLocation()
    return(
        <div id="Mypage">
            <div className="container">
                <div className="top">
                    <h3>마이페이지</h3>
                </div>
                <div className="tab-menu">
                    <Link to="main" className={location.pathname.endsWith("main") ? "active" : ""}>홈</Link>
                    <Link to="info" className={location.pathname.endsWith("info") ? "active" : ""}>회원정보 변경</Link>
                    <Link to="pwd" className={location.pathname.endsWith("pwd") ? "active" : ""}>비밀번호 변경</Link>
                    <Link to="order" className={location.pathname.endsWith("order") ? "active" : ""}>구매 내역</Link>
                    {/* <Link to="wish" className={location.pathname.endsWith("wish") ? "active" : ""}>찜한 내역</Link> */}
                    <Link to="view" className={location.pathname.endsWith("view") ? "active" : ""}>최근 본 목록</Link>
                    <Link to="post" className={location.pathname.endsWith("post") ? "active" : ""}>내가 쓴 글</Link>
                    <Link to="qna" className={location.pathname.endsWith("qna") ? "active" : ""}>나의 문의</Link>
                </div>
                <div className="tab-content">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default MyPage