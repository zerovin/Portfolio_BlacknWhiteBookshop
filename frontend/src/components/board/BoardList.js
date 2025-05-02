import { Fragment } from "react"
import { Link } from "react-router-dom";

const BoardList=()=>{
    return(
        <Fragment>
            <div id="BoardList">
                <div className="container">
                    <div className="top">
                        <h3>자유게시판</h3>
                    </div>
                    <div className="boardlist">
                        <div className="boardlist_top">
                            <div className="left">
                                <select className="category">
                                    <option value="">전체</option>
                                    <option value="후기">구매 후기</option>
                                    <option value="인증">책 인증샷</option>
                                    <option value="이벤트">이벤트 참여</option>
                                    <option value="자유">자유글</option>
                                </select>
                            </div>
                            <div className="right">
                                <Link to="/board/insert" className="insertBtn">글쓰기</Link>
                            </div>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>번호</th>
                                    <th>분류</th>
                                    <th>제목</th>
                                    <th>작성자</th>
                                    <th>날짜</th>
                                    <th>조회수</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>책 인증샷</td>
                                    <td><Link to="/board/detail/">이벤트 책 후기입니다.</Link></td>
                                    <td>홍시</td>
                                    <td>2025-05-01</td>
                                    <td>3</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>책 인증샷</td>
                                    <td>이벤트 책 후기입니다.</td>
                                    <td>홍시</td>
                                    <td>2025-05-01</td>
                                    <td>3</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>책 인증샷</td>
                                    <td>이벤트 책 후기입니다.</td>
                                    <td>홍시</td>
                                    <td>2025-05-01</td>
                                    <td>3</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>책 인증샷</td>
                                    <td>이벤트 책 후기입니다.</td>
                                    <td>홍시</td>
                                    <td>2025-05-01</td>
                                    <td>3</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>책 인증샷</td>
                                    <td>이벤트 책 후기입니다.</td>
                                    <td>홍시</td>
                                    <td>2025-05-01</td>
                                    <td>3</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>책 인증샷</td>
                                    <td>이벤트 책 후기입니다.</td>
                                    <td>홍시</td>
                                    <td>2025-05-01</td>
                                    <td>3</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>책 인증샷</td>
                                    <td>이벤트 책 후기입니다.</td>
                                    <td>홍시</td>
                                    <td>2025-05-01</td>
                                    <td>3</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>책 인증샷</td>
                                    <td>이벤트 책 후기입니다.</td>
                                    <td>홍시</td>
                                    <td>2025-05-01</td>
                                    <td>3</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>책 인증샷</td>
                                    <td>이벤트 책 후기입니다.</td>
                                    <td>홍시</td>
                                    <td>2025-05-01</td>
                                    <td>3</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>책 인증샷</td>
                                    <td>이벤트 책 후기입니다.</td>
                                    <td>홍시</td>
                                    <td>2025-05-01</td>
                                    <td>3</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="pagination">
                        <button>&lt;</button>
                        <button class="page active">1</button>
                        <button class="page">2</button>
                        <button class="page">3</button>
                        <button class="page">4</button>
                        <button class="page">5</button>
                        <button>&gt;</button>
                    </div>
                                       
                </div>
            </div>
        </Fragment>
    )
}

export default BoardList