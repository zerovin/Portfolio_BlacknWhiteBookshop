import { Fragment,useEffect,useState } from "react"
import { useNavigate,useParams } from "react-router-dom";
import apiClient from "../../http-commons";

const BoardUpdate=()=>{
    const navigate = useNavigate()
    const {no}=useParams()

    const [category, setCategory]=useState("")
    const [title, setTitle]=useState("")
    const [content, setContent]=useState("")

    useEffect(()=>{
        const fetchPost=async()=>{
            try{
                const res=await apiClient.get(`/board/detail/${no}`)
                setCategory(res.data.category)
                setTitle(res.data.title)
                setContent(res.data.content)
            }catch(error){
                alert("글을 불러오는데 실패했습니다.")
                navigate("/board/list")
            }
        }
        fetchPost()
    },[no, navigate])
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!title.trim() || !content.trim()) {
          alert("제목과 내용을 모두 입력해주세요.")
          return
        }
        try {
          await apiClient.put(`/board/update/${no}`, {
            title,
            content,
            category
          })
          alert("수정이 완료되었습니다.")
          navigate(`/board/detail/${no}`)
        } catch (error) {
          alert("수정에 실패했습니다.")
          console.error(error)
        }
      }
    const handleCancel=()=>{
        navigate(`/board/detail/${no}`)
      }
    return(
        <Fragment>
            <div id="BoardInsert">
                <div className="container">
                    <div className="top">
                        <h3>자유게시판</h3>
                    </div>
                    <div className="insert">
                        <form className="form" onSubmit={handleSubmit}>
                            <div className="row title-row">
                                <select className="category" value={category} onChange={(e)=>setCategory(e.target.value)}>
                                    <option value="">분류</option>
                                    <option value="후기">구매 후기</option>
                                    <option value="인증">책 인증샷</option>
                                    <option value="이벤트">이벤트 참여</option>
                                    <option value="자유">자유글</option>
                                </select>
                                <input type="text" placeholder="제목을 입력해 주세요" className="title-input" 
                                value={title} onChange={(e)=>setTitle(e.target.value)}/>
                            </div>
                            <div className="row">
                              
                                <textarea value={content} onChange={(e)=>setContent(e.target.value)} placeholder="내용을 입력해 주세요"></textarea>
                            </div>
                            <div className="row file-row">
                               
                                <input type="text" placeholder="선택된 파일 없음" disabled className="file-name" />
                                <button type="button" className="upload-btn">파일 올리기</button>
                            </div>
                            <div className="row button-row">
                                <button type="submit" className="submit-btn">확인</button>
                                <button type="button" className="cancel-btn" onClick={handleCancel}>취소</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default BoardUpdate