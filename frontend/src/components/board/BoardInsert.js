import { Fragment, useState } from "react"
import { useNavigate } from "react-router-dom";
import apiClient from "../../http-commons";

const BoardInsert=()=>{
    const navigate = useNavigate()
    const [title,setTitle]=useState("")
    const [content,setContent]=useState("")
    const [category, setCategory]=useState("")
    const [file, setFile]=useState(null)
    const handleFileChange=(e)=>{
        setFile(e.target.files[0])
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        if(!title.trim() || !content.trim()){
            alert("제목 및 내용을 입력해주세요.")
            return
        }
        const formData=new FormData()
        formData.append("title",title)
        formData.append("content",content)
        formData.append("category",category)
        if(file) formData.append("file",file)
        try{
            await apiClient.post("/board/insert",formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
            alert("글이 등록되었습니다.")
            navigate("/board/list")
        }catch(error){
            alert("글 등록에 실패했습니다.")
            console.error(error)
        }
    }
    const handleCancel=()=>{
        navigate("/board/list")
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
                                <input type="text" placeholder="제목을 입력해 주세요" className="title-input" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                            </div>
                            <div className="row">
                              
                                <textarea placeholder="내용을 입력해 주세요" value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
                            </div>
                            <div className="row file-row">
                                <input type="file" onChange={handleFileChange} className="file-name" />
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

export default BoardInsert