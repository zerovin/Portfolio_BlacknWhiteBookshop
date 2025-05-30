import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../http-commons"
import { useQuery } from "react-query";

const AdminHome=()=>{
    const [orders, setOrders]=useState([])
    const [isLogin, setIsLogin]=useState(false)

    const categoryLabels = {
        review: "구매 후기",
        proof: "책 인증샷",
        event: "이벤트 참여",
        free: "자유글"
    }
    const categoryLabelsQna = {
        book: "도서/상품",
        order: "주문/결제",
        delivery: "배송/수령일",
        etc: "기타문의"
    }

    /* ----------- ORDER ------------*/
    const groupOrdersByOrderNo=(orders)=>{
        const grouped={}

        orders.forEach(order=>{
            const key=order.orderNo
            if (!grouped[key]){
                grouped[key]={
                    orderNo: order.orderNo,
                    orderNoText: order.orderNoText,
                    orderDate: order.orderDate,
                    titles: [order.title],
                    quantity: order.quantity,
                    total: order.total,
                    method: order.method,
                    userid: order.userid
                }
            }else{
                grouped[key].titles.push(order.title)
                grouped[key].quantity += order.quantity
                grouped[key].total += order.total
            }
        })

        return Object.values(grouped)
            .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
            .map(order => ({
                ...order,
                title: order.titles.length > 1
                    ? `${order.titles[0]} 외 ${order.titles.length - 1}종`
                    : order.titles[0]
            }))
    }
    useEffect(()=>{
        window.scrollTo({top:0, behavior:'auto'})
        apiClient.post("/member/isLogin")
            .then(res=>{
                if(res.data.loginOk && res.data.userAuth==="ROLE_ADMIN"){
                    apiClient.get("/admin/order")
                        .then(res=>{
                            if(Array.isArray(res.data)){
                                const grouped=groupOrdersByOrderNo(res.data)
                                setOrders(grouped.slice(0,5))
                            }else{
                                console.error(res.data)
                            }
                        }).catch(err=>console.error(err))
                }else{
                    alert("잘못된 접근입니다.")
                    navigator('/main/home')
                }
            }).catch(err=>console.error(err))
    }, [])

    const formatDate=(str)=>{
        const d=new Date(str)
        return `${d.getFullYear()}-${(d.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`
    }

    /* ----------- BOARD ------------*/
    const {isLoading,isError,error, data,refetch:loadingNotExecute}=useQuery(['board-list'],
        async ()=>{
            const res=await apiClient.get('/board/list/1',{
                params:{}
            })
            return res.data.list
        }
    )
    const board=data?.slice(0,5)
    
    useEffect(()=>{
        loadingNotExecute()
    },[loadingNotExecute, data])
    
    /* ----------- QNA ------------*/
    const {isLoading:qnaLoading,isError:qnaErr,error:qnaError,data:qnaData,refetch:qnaList}=useQuery(['qna_list'],
        async ()=>{
            const res=await apiClient.get('/qna/list/1',{
                params:{}
            })
            return res.data.list
        }
    )
    const qna=qnaData?.slice(0,5)
    
    useEffect(() => {
        apiClient.post("/member/isLogin").then(res=>{
            if (res.data.loginOk){
                setIsLogin(true)
            }else{
                setIsLogin(false)
            }
        }).catch(err=>{
            console.error(err)
            setIsLogin(false)
        })
        qnaList()
    }, [qnaList])
    
    if(isLoading || qnaLoading)
        return <h1 className={"text-center"}>서버에서 데이터 전송 지연...</h1>
    if(isError || qnaErr)
        return <h1 className={"text-center"}>{error.message||qnaError.message}</h1>

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
                                <table className="table home_order">
                                    <thead>
                                        <tr>
                                            <th>주문번호</th>
                                            <th>주문일</th>
                                            <th>주문자</th>
                                            <th>주문내역</th>
                                            <th>수량</th>
                                            <th>결제 금액</th>
                                            <th>수령방식</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.length === 0 ? (
                                            <tr>
                                                <td colSpan="6" style={{ textAlign: 'center', padding: '30px' }}>
                                                    최근 주문 내역이 없습니다.
                                                </td>
                                            </tr>
                                        ) : (
                                            orders.map((order, idx) => ( 
                                                <tr key={idx}>
                                                    <td>{order.orderNoText}</td>
                                                    <td>{formatDate(order.orderDate)}</td>
                                                    <td>{order.userid}</td>
                                                    <td className="title">{order.title}</td>
                                                    <td>{order.quantity}</td>
                                                    <td>{order.total.toLocaleString()}원</td>
                                                    <td>{order.method}</td>
                                                </tr>
                                            ))
                                        )} 
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="grid-section">
                            <div className="section">
                                <div className="section-header">
                                    <h3>게시판 현황</h3>
                                    <Link to={"/admin/board"}>전체보기</Link>
                                </div>
                                <div className="empty-box">
                                    <table className="home_board">
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
                                            {board && board.map((vo, idx)=>
                                                <tr key={vo.no}>
                                                    <td>{board.length-idx}</td>
                                                    <td>{categoryLabels[vo.category]}</td>
                                                    <td><Link to={`/board/detail/${vo.no}`}>{vo.title}{vo.filename ? <span style={{ marginLeft: "5px" }}>📎</span> : null}</Link></td>
                                                    <td>{vo.userName}</td>
                                                    <td>{vo.regdate && vo.regdate.substring(5, 10)}</td>
                                                    <td>{vo.hit}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="section">
                                <div className="section-header">
                                    <h3>문의 현황</h3>
                                    <Link to={"/admin/qna"}>전체보기</Link>
                                </div>
                                <div className="empty-box">
                                    <table className="home_qna">
                                        <thead>
                                            <tr>
                                                <th>번호</th>
                                                <th>분류</th>
                                                <th>제목</th>
                                                <th>작성자</th>
                                                <th>날짜</th>
                                                <th>답변상태</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {qna && qna.map((vo, idx)=>
                                                <tr key={vo.qno}>
                                                    <td>{qna.length - idx}</td>
                                                    <td>{categoryLabelsQna[vo.cate]}</td>
                                                    <td>
                                                        <Link to={`/qna/detail/${vo.qno}`}><span>🔓</span>{vo.title}</Link>
                                                    </td>
                                                    <td>{vo.writer}</td>
                                                    <td>{vo.regdate.substring(5, 10)}</td>
                                                    <td>
                                                        <span className={vo.a_content?"done":""}>{vo.a_content?"답변완료":"답변대기"}</span>
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
        </Fragment>
    )
}

export default AdminHome;