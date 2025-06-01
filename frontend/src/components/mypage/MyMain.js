import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { Link } from "react-router-dom" 
import apiClient from "../../http-commons"

const MyMain=()=>{
    const [isLogin, setIsLogin]=useState(false)
    const [board, setBoard] = useState([])
    const [qna, setQna] = useState([])
    const [orders, setOrders] = useState([])

    const categoryLabels={
        review: "구매 후기",
        proof: "책 인증샷",
        event: "이벤트 참여",
        free: "자유글"
    }
    const categoryLabelsQna={
        book: "도서/상품",
        order: "주문/결제",
        delivery: "배송/수령일",
        etc: "기타문의"
    }

    useEffect(()=>{
        const homeData=async()=>{
            try {
                const res = await apiClient.post("/member/isLogin")
                if(res.data.loginOk){
                    setIsLogin(true)
                    const boardRes = await apiClient.get("/myhome/post")
                    const qnaRes = await apiClient.get("/myhome/qna")
                    const orderRes = await apiClient.get("/mypage/orders")
                    setBoard(boardRes.data.slice(0, 5))
                    setQna(qnaRes.data.slice(0, 5))
                    setOrders(orderRes.data.slice(0, 8))
                }else{
                    setIsLogin(false)
                }
            }catch(err){
                console.error(err)
                setIsLogin(false)
            }
        }
        homeData()
    }, [])
    return(
        <div id="Mypage">
            <div className="container">
                <div className="mymain">
                    <div className="section">
                        <div className="section-header">
                            <h3>주문 내역</h3>
                            <Link to={"/mypage/order"}>전체보기</Link>
                            </div>
                        <div className="empty-box">
                            <table className="home_order">
                                <thead>
                                    <tr>
                                        <th>주문번호</th>
                                        <th>주문일</th>
                                        <th>주문내역</th>
                                        <th>수량</th>
                                        <th>결제 금액</th>
                                        <th>수령방식</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.length > 0 ? (
                                    orders.slice(0, 8).map((order)=>(
                                        <tr key={order.orderNoText}>
                                        <td>{order.orderNoText}</td>
                                        <td>{order.orderDate?.substring(0, 10)}</td>
                                        <td>{order.title}</td>
                                        <td>{order.quantity}</td>
                                        <td>{order.total.toLocaleString()}원</td>
                                        <td>{order.method}</td>
                                        </tr>
                                    ))
                                    ) : (
                                    <tr>
                                        <td colSpan="6">
                                            <p className="empty-msg">문의가 없습니다.</p>
                                        </td>
                                    </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="grid-section">
                        <div className="section">
                            <div className="section-header">
                                <h3>내가 쓴 글</h3>
                                <Link to={"/mypage/post"}>전체보기</Link>
                            </div>
                            <div className="empty-box">
                                <table className="home_board">
                                    <thead>
                                        <tr>
                                            <th>번호</th>
                                            <th>분류</th>
                                            <th>제목</th>
                                            {/* <th>작성자</th> */}
                                            <th>날짜</th>
                                            <th>조회수</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {board?.length > 0 ? (
                                            board.map((vo, idx)=>(
                                                <tr key={vo.no}>
                                                    <td>{vo.no}</td>
                                                    <td>{categoryLabels[vo.category]}</td>
                                                    <td><Link to={`/board/detail/${vo.no}`}>{vo.title}{vo.filename ? <span style={{ marginLeft: "5px" }}>📎</span> : null}</Link></td>
                                                    {/* <td>{vo.userName}</td> */}
                                                    <td>{vo.regdate?.substring(5, 10)}</td>
                                                    <td>{vo.hit}</td>
                                                </tr>
                                            ))
                                            ) : (
                                            <tr>    
                                                <td colSpan="5">
                                                    <p className="empty-msg">작성글이 없습니다.</p>
                                                </td>
                                            </tr>
                                            )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="section">
                            <div className="section-header">
                                <h3>나의 문의</h3>
                                <Link to={"/mypage/qna"}>전체보기</Link>
                            </div>
                            <div className="empty-box">
                                <table className="home_qna">
                                    <thead>
                                        <tr>
                                            <th>번호</th>
                                            <th>분류</th>
                                            <th>제목</th>
                                            {/* <th>작성자</th> */}
                                            <th>날짜</th>
                                            <th>답변</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {qna?.length > 0 ? (
                                            qna && qna.map((vo, idx)=>(
                                                <tr key={vo.qno}>
                                                    <td>{vo.qno}</td>
                                                    <td>{categoryLabelsQna[vo.cate]}</td>
                                                    <td>
                                                        <Link to={`/qna/detail/${vo.qno}`}><span>🔓</span>{vo.title}</Link>
                                                    </td>
                                                    {/* <td>{vo.writer}</td> */}
                                                    <td>{vo.regdate?.substring(5, 10)}</td>
                                                    <td>
                                                        <span className={vo.a_content?"done":""}>{vo.a_content?"답변완료":"답변대기"}</span>
                                                    </td>
                                                </tr>
                                            ))
                                            ) : (
                                            <tr>    
                                                <td colSpan="5">
                                                    <p className="empty-msg">문의가 없습니다.</p>
                                                </td>
                                            </tr>
                                            )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyMain