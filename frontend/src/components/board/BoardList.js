import {useQuery} from "react-query"
import {useEffect, useState,Fragment} from 'react'
import {Link} from "react-router-dom"
import apiClient from "../../http-commons"

const BoardList=()=>{
    const [category, setCategory]=useState("")
    const [curpage, setCurpage]=useState(1)
    const {isLoading,isError,error,data,refetch:loadingNotExecute}=useQuery(['board-list',curpage],
        async ()=>{
            return await apiClient.get(`/board/list/${curpage}`,{
                params:{category}
            })
        }
    )
    useEffect(()=>{
        loadingNotExecute()
    },[curpage, category])
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
        setCurpage(data.data.totalpage && curpage<data.data.totalpage?curpage+1:curpage)
    }
    let pageArr=[]
    for (let i = data.data.startpage; i <= data.data.endpage; i++) {
        pageArr.push(
          <button key={i} className={curpage === i ? "page active" : "page"}
            onClick={() => pageChange(i)}>{i} </button>)  
    }
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
                                <select className="category" value={category} onChange={handleCategoryChange}>
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
                                {data.data.list && data.data.list.map((vo)=>
                                    <tr key={vo.no}>
                                        <td>{vo.no}</td>
                                        <td>{vo.category}</td>
                                        <td><Link to={`/board/detail/${vo.no}`}>{vo.title}</Link></td>
                                        <td>{vo.userId}</td>
                                        <td>{vo.regdate && vo.regdate.substring(0, 10)}</td>
                                        <td>{vo.hit}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="pagination">
                        {data.data.startpage && data.data.startpage > 1 &&
                         <button onClick={prev}>&lt;</button>}
                        {pageArr}
                        {data.data.endpage && data.data.endpage < data.data.totalpage &&   
                        <button onClick={next}>&gt;</button>}
                    </div>                   
                </div>
            </div>
        </Fragment>
    )
}

export default BoardList