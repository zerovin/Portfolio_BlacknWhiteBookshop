import { Fragment } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const BoardDetail=()=>{
    const navigate = useNavigate()

    const handlelist=()=>{
        navigate("/board/list")
    }
    return(
        <Fragment>
            <div id="BoardDetail">
                <div className="container">
                    <div className="top">
                        <h3>자유게시판</h3>
                    </div>
                    <div className="boarddetail">
                        <table className="detail">
                            <tbody>
                                <tr>
                                    <th>번호</th>
                                    <td>11</td>
                                    <th>작성일</th>
                                    <td>2024-11-19</td>
                                </tr>
                                <tr>
                                    <th>이름</th>
                                    <td>FillRoom</td>
                                    <th>조회수</th>
                                    <td>3</td>
                                </tr>
                                <tr>
                                    <th>제목</th>
                                    <td colSpan="3">[이벤트] 이벤트 참여했습니다</td>
                                </tr>
                                <tr>
                                    <th>첨부파일</th>
                                    <td colSpan="3">img.jpg</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="content">
                            <p>본문 </p>
                        </div>

                        <div className="btn-group">
                            <button className="edit-btn">수정</button>
                            <button className="list-btn" onClick={handlelist}>목록</button>
                            <button className="delete-btn">삭제</button>
                        </div>
                        <div className="comment-section">
                            <h4>댓글</h4>
                            <div className="comment-form">
                                <input type="text" placeholder="댓글을 입력해 주세요" />
                                <button type="button">등록</button>
                            </div>
                            <ul className="comment-list">
                                <li>댓글 예시</li>
                                <li>댓글 예시 2</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default BoardDetail