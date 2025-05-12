import { useEffect,useState } from "react"
import { useNavigate,useParams } from "react-router-dom";
import apiClient from "../../http-commons";

const BoardUpdate=()=>{
    const navigate = useNavigate()
    const {no}=useParams()

    const [deleteFile, setDeleteFile]=useState(false)
    const [file, setFile]=useState(null)
    const [filename, setFilename]=useState("")
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
                setFilename(res.data.filename)
            }catch(error){
                alert("글을 불러오는데 실패했습니다.")
                navigate("/board/list")
            }
        }
        fetchPost()
    },[no, navigate])
    const handleFileChange=(e)=>{
        const selectedFile=e.target.files[0]
        setFile(selectedFile)
        if(selectedFile){
            setFilename(selectedFile.name)
            setDeleteFile(false)
        }
    }
    const handleDeleteFile=()=>{
        setDeleteFile(true)
        setFile(null)
        setFilename("")
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!title.trim() || !content.trim()) {
            alert("제목과 내용을 모두 입력해주세요.")
            return
        }
        try {
            const formData = new FormData()
            formData.append("title", title)
            formData.append("content", content)
            formData.append("category", category)
            formData.append("deleteFile", deleteFile)
            if (file) formData.append("file", file)
            await apiClient.put(`/board/update/${no}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            alert("수정이 완료되었습니다.")
            navigate(`/board/detail/${no}`)
        }catch(error){
            alert("수정에 실패했습니다.")
            console.error(error)
        }
      }
    const handleCancel=()=>{
        navigate(`/board/detail/${no}`)
      }
    return(
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
                                <option value="review">구매 후기</option>
                                <option value="proof">책 인증샷</option>
                                <option value="event">이벤트 참여</option>
                                <option value="free">자유글</option>
                            </select>
                            <input type="text" placeholder="제목을 입력해 주세요" className="title-input" 
                            value={title} onChange={(e)=>setTitle(e.target.value)}/>
                        </div>
                        <div className="row">
                            <textarea value={content} onChange={(e)=>setContent(e.target.value)} placeholder="내용을 입력해 주세요"></textarea>
                        </div>
                        <div className="row file-row">
                            <input type="text" disabled className="file-name" value={filename || "첨부파일 없음"}/>
                            <label className="upload-change-btn">파일 선택<input type="file" style={{display: "none"}} 
                            onChange={handleFileChange}/></label>
                            {filename && (<button type="button" className="upload-btn" onClick={handleDeleteFile}>파일 삭제</button>)}
                        </div>
                        <div className="row button-row">
                            <button type="submit" className="submit-btn">확인</button>
                            <button type="button" className="cancel-btn" onClick={handleCancel}>취소</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default BoardUpdate