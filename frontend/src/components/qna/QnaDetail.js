import { Fragment, useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import apiClient from "../../http-commons"

const QnaDetail=()=>{
    const [loginUserId, setLoginUserId]=useState(null)
    const {qno}=useParams()
    const navigate = useNavigate()
    const [post,setPost]=useState(null)
    const fetched=useRef(false)

    const categoryLabels = {
        book: "도서/상품정보",
        order: "주문/결제",
        delivery: "배송/수령일",
        etc: "기타문의"
    }
    useEffect(()=>{
        apiClient.post("/member/isLogin")
          .then(res => {
            if (res.data.loginOk) {
              setLoginUserId(res.data.userId);
            }
          })
    }, [])

    useEffect(() => {
        if (post) {
          console.log(post);
          console.log(post.content);
        }
      }, [post]);

    useEffect(()=>{
        if (fetched.current) return
        fetched.current=true
        const fetchDetail=async()=>{
            try{
                const res=await apiClient.get(`/qna/detail/${qno}`)
                setPost(res.data)
            }catch(error){
                alert("글을 불러오는데 실패했습니다.")
                navigate("/qna/list")
            }
        }
        fetchDetail()
    },[qno,navigate])

    const handleDelete=async()=>{
        if (window.confirm("정말 삭제하시겠습니까?")) {
            try {
              await apiClient.delete(`/board/delete/${qno}`);
              alert("삭제되었습니다.");
              navigate("/board/list");
            } catch (error) {
              alert("삭제에 실패했습니다.");
              console.error(error);
            }
        }
    }
    
    const handleUpdate=()=>{
        navigate(`/qna/update/${qno}`)
    }

    const handlelist=()=>{
        navigate("/qna/list")
    }
    if (!post) return <h3>로딩 중...</h3>

    return(
        <Fragment>
            <div id="qnadetail">
                <div className="container">
                <div className="top">
                        <h3>자유게시판</h3>
                    </div>
                    <div>
                        <table className="detail">
                            <tbody>
                                <tr>
                                    <th>번호</th>
                                    <td>{post.qno}</td>
                                    <th>작성일</th>
                                    <td>{post.regdate?.substring(0, 10)}</td>
                                </tr>
                                <tr>
                                    <th>이름</th>
                                    <td>{post.writer}</td>
                                    <th>답변여부</th>
                                    <td>{post.a_content?"답변완료":"답변대기"}</td>
                                </tr>
                                <tr>
                                    <th>제목</th>
                                    <td colSpan="3">[{categoryLabels[post.cate]}] {post.title}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="content">
                            <p>{post.content}</p>
                        </div>

                        <div className="btn-group">
                            {loginUserId === post.userId && (
                                <button className="edit-btn" onClick={handleUpdate}>수정</button>
                            )}
                            <button className="list-btn" onClick={handlelist}>목록</button>
                            {loginUserId === post.userId && (
                                <button className="delete-btn" onClick={handleDelete}>삭제</button>
                            )}
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
export default QnaDetail;