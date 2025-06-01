import { useState, useEffect } from "react"
import apiClient from "../../http-commons"
import { Link } from "react-router-dom"

const MyQnA=()=>{
    const [curpage, setCurpage]=useState(1)
    const [qnaList, setQnaList]=useState([])
    const [totalPages, setTotalPages]=useState(1)
    const [isLoading, setIsLoading]=useState(false)

    const categoryLabels = {
        book: "도서/상품정보",
        order: "주문/결제",
        delivery: "배송/수령일",
        etc: "기타문의"
    }
    useEffect(()=>{
        const qnaData=async()=>{
            setIsLoading(true)
            try {
                const res = await apiClient.get("/mypage/qna", {
                params: { page: curpage },
                })

                if(curpage === 1){
                    setQnaList(res.data.content)
                }else{
                    setQnaList((prev)=>[...prev, ...res.data.content])
                }
                    setTotalPages(res.data.totalPages)
            }catch(error){
                console.error("불러오기 실패:", error)
            }finally{
                setIsLoading(false)
            }
        }
        qnaData()
    }, [curpage])

    const postMore=()=>{
        if (curpage < totalPages){
            setCurpage(curpage + 1)
        }
    }
    return(
        <div id="Myqna">
            <div className="list_wrap">
                <table>
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
                        {qnaList.length > 0 ?(
                            qnaList.map((vo, idx)=>(
                                <tr key={vo.qno}>
                                <td>{vo.qno}</td>
                                <td>{categoryLabels[vo.cate]}</td>
                                <td>
                                    <Link to={`/qna/detail/${vo.qno}`}>
                                    {vo.issecret === 'y' ? '🔐' : '🔓'} {vo.title}
                                    </Link>
                                </td>
                                <td>{vo.writer}</td>
                                <td>{vo.regdate?.substring(0, 10)}</td>
                                <td>
                                    <span className={vo.a_content ? "done" : ""}>
                                    {vo.a_content ? "답변완료" : "답변대기"}
                                    </span>
                                </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={{ textAlign: "center" }}>
                                문의 내역이 없습니다.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {curpage < totalPages && (
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <button onClick={postMore} disabled={isLoading}>
                    {isLoading ? "로딩 중..." : "더보기"}
                    </button>
                </div>
            )}
        </div>
    )
}

export default MyQnA