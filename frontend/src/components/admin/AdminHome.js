import { Fragment } from "react";
import { Link } from "react-router-dom";

const AdminHome=()=>{
    return(
        <Fragment>
            <div id="adminhome">
                <div className="container">
                    <div className="mymain">
                        <div className="section">
                            <div className="section-header">
                                <h3>최근주문내역</h3>
                                <Link to={"/admin/order"}>전체보기</Link>
                                </div>
                            <div className="empty-box">
                                <p className="">최근 주문내역이 없습니다.</p>
                            </div>
                        </div>
                        <div className="grid-section">
                            <div className="section">
                                <div className="section-header">
                                    <h3>게시판 현황</h3>
                                    <Link to={"/admin/board"}>전체보기</Link>
                                </div>
                                <div className="empty-box">
                                    <p>등록된 글이 없습니다.</p>
                                </div>
                            </div>
                            <div className="section">
                                <div className="section-header">
                                    <h3>문의 현황</h3>
                                    <Link to={"/admin/qna"}>전체보기</Link>
                                </div>
                                <div className="empty-box">
                                    <p>문의가 없습니다.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default AdminHome;