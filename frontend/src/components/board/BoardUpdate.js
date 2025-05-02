import { Fragment } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const BoardUpdate=()=>{
    const navigate = useNavigate()

    const handleCancel=()=>{
        navigate("/board/detail")
      }
    return(
        <Fragment>
            <div id="BoardInsert">
                <div className="container">
                    <div className="top">
                        <h3>자유게시판</h3>
                    </div>
                    <div className="insert">
                        <form className="form">
                            <div className="row title-row">
                              
                                <select className="category">
                                    <option value="">분류</option>
                                    <option value="공지">공지</option>
                                    <option value="후기">후기</option>
                                    <option value="자유">자유</option>
                                </select>
                                <input type="text" placeholder="제목을 입력해 주세요" className="title-input" />
                            </div>
                            <div className="row">
                              
                                <textarea placeholder="내용을 입력해 주세요"></textarea>
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