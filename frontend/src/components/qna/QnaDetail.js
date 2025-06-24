import { Fragment, useCallback, useEffect, useRef, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import apiClient from "../../http-commons"

const QnaDetail=()=>{
    const [loginUserId, setLoginUserId]=useState(null)
    const [userAuth, setUserAuth]=useState(null);
    const {qno}=useParams()
    const {state}=useLocation()
    const navigate = useNavigate()
    const [post,setPost]=useState(null)
    const fetched=useRef(false)
    const [answerInput, setAnswerInput]=useState('')
    const [editMode, setEditMode]=useState(false)

    const categoryLabels = {
        book: "도서/상품정보",
        order: "주문/결제",
        delivery: "배송/수령일",
        etc: "기타문의"
    }

    const fetchDetail=useCallback(async(auth)=>{
        if (fetched.current) return
        fetched.current=true
        try{
            const res=await apiClient.post('/qna/detail',{
                qno:parseInt(qno), 
                pw:state?.pw||'',
                userAuth:auth
            },
            {
                headers:{
                    "Content-Type":"application/json"
                }
            })
            setPost(res.data)
        }catch(error){
            alert("비밀번호가 일치하지 않거나 접근 권한이 없습니다.")
            navigate("/qna/list")
        }
    },[qno, state?.pw, navigate])

    useEffect(()=>{
        window.scrollTo({top:0, behavior:'auto'})
        apiClient.post("/member/isLogin")
          .then(res => {
            if (res.data.loginOk) {
              setLoginUserId(res.data.userId);
              setUserAuth(res.data.userAuth)
            }
            fetchDetail(res.data.userAuth)
        })
    }, [fetchDetail])

    const handleDelete=async()=>{
        if (window.confirm("정말 삭제하시겠습니까?")) {
            try {
              await apiClient.delete(`/qna/delete/${qno}`);
              alert("삭제되었습니다.");
              navigate("/qna/list");
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

    const answerInsert=async()=>{
        try{
            await apiClient.post(`/qna/${qno}/answer`,{a_content:answerInput})
            setEditMode(false)
            fetched.current = false;
            fetchDetail(userAuth);
            setAnswerInput('')
        }catch(err){
            console.log(err)
        }
    }

    const openInput=()=>{
        setAnswerInput(post.a_content)
        setEditMode(true)
    }

    const answerDelete=async()=>{
        if (window.confirm("정말 삭제하시겠습니까?")) {
        await apiClient.post(`/qna/${qno}/answer`,{a_content:null})
        fetched.current = false;
        fetchDetail(userAuth)
        }
    }

    if (!post) return <h3 style={{textAlign:'center',lineHeight:'100vh'}}>로딩중...</h3>

    return(
        <Fragment>
            <div id="qnadetail">
                <div className="container">
                <div className="top">
                        <h3>Q & A</h3>
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
                            <pre>{post.content}</pre>
                        </div>

                        <div className="btn-group">
                            {loginUserId === post.writer && (
                                <button className="edit-btn" onClick={handleUpdate}>수정</button>
                            )}
                            <button className="list-btn" onClick={handlelist}>목록</button>
                            {loginUserId === post.writer && (
                                <button className="delete-btn" onClick={handleDelete}>삭제</button>
                            )}
                        </div>
                        {(userAuth==="ROLE_ADMIN" || post.a_content) &&
                            <div className="answer_wrap">
                                <h4>답변</h4>
                                <div className="answer_box">
                                    {post.a_content &&
                                        <div className="answer_answer">
                                                <div className="answer_top">
                                                    <p>관리자</p>
                                                    <div className="right">
                                                        <span>{post.a_date}</span>
                                                        {userAuth==='ROLE_ADMIN' &&
                                                            <div className="btns">
                                                                <button onClick={openInput}>수정</button>
                                                                <button onClick={answerDelete}>삭제</button>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            <pre>{post.a_content}</pre>
                                        </div>
                                    }   
                                    {userAuth==='ROLE_ADMIN' && (!post.a_content || editMode) && (
                                        <div className="answer_input">
                                            <textarea rows={5} value={answerInput} onChange={(e)=>setAnswerInput(e.target.value)}></textarea>
                                            <button type="button" onClick={answerInsert}>{editMode?"수정":"등록"}</button>
                                        </div>
                                    )}
                                </div>    
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default QnaDetail;