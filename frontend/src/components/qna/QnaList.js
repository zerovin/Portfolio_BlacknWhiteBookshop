import { Fragment, useEffect, useState } from "react"
import { useQuery } from "react-query"
import apiClient from "../../http-commons"
import { Link } from "react-router-dom"

const QnaList=()=>{
    const [isLogin, setIsLogin]=useState(false)
    const [category, setCategory]=useState("")
    const [curpage, setCurpage]=useState(1)

    const {isLoading,isError,error,data,refetch:qnaList}=useQuery(['qna_list',curpage],
        async ()=>{
            return await apiClient.get(`/qna/list/${curpage}`,{
                params:{category}
            })
        }
    )
    const categoryLabels = {
        book: "도서/상품정보",
        order: "주문/결제",
        delivery: "배송/수령일",
        etc: "기타문의"
    }
    
    useEffect(() => {
        apiClient.post("/member/isLogin").then(res=>{
            if (res.data.loginOk) setIsLogin(true)
            else setIsLogin(false)
        }).catch(err=>{
            console.error(err)
            setIsLogin(false)
        })
        qnaList()
    }, [curpage, category, qnaList])

    const handleCategoryChange=(e)=>{
        setCategory(e.target.value)
        setCurpage(1)
    }
    if(isLoading)
        return <h1 className={"text-center"}>서버에서 데이터 전송 지연...</h1>
    if(isError)
        return <h1 className={"text-center"}>{error.message}</h1>
    const pageChange=(page)=>{
        setCurpage(page)
    }
    const prev=()=>{
        setCurpage(curpage>1?curpage-1:curpage)
    }
    const next=()=>{
        setCurpage(data.data.totalPage && curpage<data.data.totalPage?curpage+1:curpage)
    }
    let pageArr=[]
    for (let i = data.data.startPage; i <= data.data.endPage; i++) {
        pageArr.push(
          <button key={i} className={curpage === i ? "page active" : "page"}
            onClick={() => pageChange(i)}>{i} </button>)  
    }

    return(
        <Fragment>
            <div id="qnalist">
                <div className="container">
                <div className="top">
                        <h3>Q & A</h3>
                    </div>
                    <div className="list_wrap">
                        <div className="list_wrap_top">
                            <div className="left">
                                <select className="category" value={category} onChange={handleCategoryChange}>
                                    <option value="">전체</option>
                                    <option value="book">도서/상품정보</option>
                                    <option value="order">주문/결제</option>
                                    <option value="delivery">배송/수령일</option>
                                    <option value="ect">기타문의</option>
                                </select>
                            </div>
                            <div className="right">
                                {isLogin?(
                                <Link to="/board/insert" className="insertBtn">글쓰기</Link>):
                                <p style={{color: "gray"}}>로그인 후 글쓰기가 가능합니다.</p>}
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
                                {data.data.list && data.data.list.map((vo)=>
                                    <tr key={vo.no}>
                                        <td>{vo.no}</td>
                                        <td>{categoryLabels[vo.category]}</td>
                                        <td><Link to={`/board/detail/${vo.no}`}>{vo.title}{vo.filename ? <span style={{ marginLeft: "5px" }}>📎</span> : null}</Link></td>
                                        <td>{vo.userName}</td>
                                        <td>{vo.regdate && vo.regdate.substring(0, 10)}</td>
                                        <td>{vo.hit}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="pagination">
                        {data.data.startPage && data.data.startPage > 1 &&
                         <button onClick={prev}>&lt;</button>}
                        {pageArr}
                        {data.data.endPage && data.data.endPage < data.data.totalPage &&   
                        <button onClick={next}>&gt;</button>}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default QnaList;