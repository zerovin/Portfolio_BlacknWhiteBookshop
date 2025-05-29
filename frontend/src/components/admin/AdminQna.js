import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../http-commons";

const AdminQna=()=>{
    const [curpage, setCurpage]=useState(1)
    const [postList, setPostList]=useState([])
    const [totalPages, setTotalPages]=useState(1)
    const [isLoading, setIsLoading]=useState(false)

    const categoryLabels={
        review: "구매 후기",
        proof: "책 인증샷",
        event: "이벤트 참여",
        free: "자유글"
    }

    useEffect(()=>{
        const postData=async()=>{
            setIsLoading(true)
            try {
                const res = await apiClient.get("/board/list", {
                params: { page: curpage },
                })

                if(curpage === 1){
                    setPostList(res.data.content)
                }else{
                    setPostList((prev)=>[...prev, ...res.data.content])
                }
                    setTotalPages(res.data.totalPages)
            }catch(error){
                console.error("불러오기 실패:", error)
            }finally{
                setIsLoading(false)
            }
        }
        postData()
    }, [curpage])

    const postMore=()=>{
        if (curpage < totalPages){
            setCurpage(curpage + 1)
        }
    }

    return(
        <Fragment>
            <div id="adminboard">
                <div className="boardlist">
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
                            {/* {postList.length === 0 ? ( */}
                            <tr>
                                <td colSpan="6" style={{ textAlign: "center", padding: "40px 0", color: "#888" }}>
                                작성 글이 없습니다.
                                </td>
                            </tr>
                            {/* ) : (
                            postList.map((vo)=>( */}
                                <tr key="">
                                    <td></td>
                                    <td>{/*categoryLabels[vo.category]*/}</td>
                                    <td>
                                        <Link to=""></Link>
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            {/* ))
                            )} */}
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
        </Fragment>
    )
}

export default AdminQna;