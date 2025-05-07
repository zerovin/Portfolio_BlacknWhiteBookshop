import { Fragment,useEffect,useState,useRef } from "react"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import apiClient from "../../http-commons";

const BoardDetail=()=>{
    const {no}=useParams()
    const navigate = useNavigate()
    const [post,setPost]=useState(null)
    const fetched=useRef(false)

    useEffect(()=>{
        if (fetched.current) return
        fetched.current=true
        const fetchDetail=async()=>{
            try{
                const res=await apiClient.get(`/board/detail/${no}`)
                setPost(res.data)
            }catch(error){
                alert("글을 불러오는데 실패했습니다.")
                navigate("/board/list")
            }
        }
        fetchDetail()
    },[no,navigate])
    const handleDelete=async()=>{
        if (window.confirm("정말 삭제하시겠습니까?")) {
            try {
              await apiClient.delete(`/board/delete/${no}`);
              alert("삭제되었습니다.");
              navigate("/board/list");
            } catch (error) {
              alert("삭제에 실패했습니다.");
              console.error(error);
            }
        }
    }
    const handleUpdate=()=>{
        navigate(`/board/update/${no}`)
    }
    const handlelist=()=>{
        navigate("/board/list")
    }
    if (!post) return <h3>로딩 중...</h3>
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
                                    <td>{post.no}</td>
                                    <th>작성일</th>
                                    <td>{post.regdate?.substring(0, 10)}</td>
                                </tr>
                                <tr>
                                    <th>이름</th>
                                    <td>{post.userId}</td>
                                    <th>조회수</th>
                                    <td>{post.hit}</td>
                                </tr>
                                <tr>
                                    <th>제목</th>
                                    <td colSpan="3">[{post.category}] {post.title}</td>
                                </tr>
                                <tr>
                                    <th>첨부파일</th>
                                    <td colSpan="3">{post.filename?(<a href={post.filepath} download>{post.filename}</a>):("첨부파일 없음")}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="content">
                            <p>{post.content}</p>
                        </div>

                        <div className="btn-group">
                            <button className="edit-btn" onClick={handleUpdate}>수정</button>
                            <button className="list-btn" onClick={handlelist}>목록</button>
                            <button className="delete-btn" onClick={handleDelete}>삭제</button>
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