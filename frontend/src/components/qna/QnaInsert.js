import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../http-commons"

const QnaInsert=()=>{
    const navigate = useNavigate()
    const [title,setTitle]=useState("")
    const [content,setContent]=useState("")
    const [category, setCategory]=useState("")
    const [isSecret, setIsSecret]=useState(false)
    const [pw, setPw]=useState('')

    useEffect(()=>{
        if(!isSecret){
            setPw("")
        }
    },[isSecret])

    const handleSubmit=async(e)=>{
        e.preventDefault()
        if(!category.trim()){
            alert("카테고리를 선택해주세요.")
            return
        }
        if(!title.trim()){
            alert("제목을 입력해주세요.")
            return
        }
        if(!content.trim()){
            alert("내용을 입력해주세요.")
            return
        }
        const formData=new FormData()
        formData.append("issecret",isSecret?'y':'n')
        formData.append("pw",pw)
        formData.append("title",title)
        formData.append("content",content)
        formData.append("cate",category)
        try{
            await apiClient.post("/qna/insert",formData,{
                headers:{
                    "Content-Type":"application/json"
                }
            })
            alert("글이 등록되었습니다.")
            navigate("/qna/list")
        }catch(error){
            alert("글 등록에 실패했습니다.")
            console.error(error)
        }
    }
    const handleCancel=()=>{
        navigate("/qna/list")
    }

    return(
        <Fragment>
            <div id="qnainsert">
                <div className="container">
                    <div className="top">
                        <h3>Q & A</h3>
                    </div>
                    <div className="insert">
                        <form className="form" onSubmit={handleSubmit}>
                            <div className="row issecret">
                                <div>
                                    <input type="checkbox" id="secret" name="secret" checked={isSecret} onChange={(e)=>setIsSecret(e.target.checked)}/>
                                    <label htmlFor="secret">비밀글</label>
                                </div>
                                <input type="password" id="pw" value={pw} onChange={(e)=>setPw(e.target.value)} disabled={!isSecret} placeholder="비밀글을 원할 시 체크 후 비밀번호를 입력하세요"/>
                            </div>
                            <div className="row title-row">
                                <select className="category" value={category} onChange={(e)=>setCategory(e.target.value)}>
                                    <option value="">분류</option>
                                    <option value="book">도서/상품정보</option>
                                    <option value="order">주문/결제</option>
                                    <option value="delivery">배송/수령일</option>
                                    <option value="etc">기타문의</option>
                                </select>
                                <input type="text" placeholder="제목을 입력하세요" className="title-input" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                            </div>
                            <div className="row">
                                <textarea placeholder="내용을 입력하세요" value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
                            </div>
                            <div className="row button-row">
                                <button type="submit" className="submit">확인</button>
                                <button type="button" className="cancel" onClick={handleCancel}>취소</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default QnaInsert;