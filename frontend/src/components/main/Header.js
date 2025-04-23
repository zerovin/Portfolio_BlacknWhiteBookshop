import { Fragment, useState, useRef } from "react";
import {Link} from "react-router-dom";
import {useQuery} from "react-query";
import apiClient from "../../http-commons"

const Header=()=>{
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const toggleMenu=()=>{
        setIsOpen(!isOpen);
        setIsScrolled(!isOpen);
    }
    return(
        <Fragment>
            <aside id="aside">
                <h1><a href="index.html" className="logo">흑백책방</a></h1>
                <div className="menu_wrap">
                    <ul className="menu">
                        <li><a href="#" className="books" onClick={toggleMenu}>책 <i className={`fa-solid ${isOpen?'fa-caret-up':'fa-caret-down'}`}></i></a>
                            <ul className={`sub_menu ${isOpen?'':'fold'}`}>
                                <li><a href="#">가정 살림</a></li>
                                <li><a href="#">건강 취미</a></li>
                                <li><a href="#">경제 경영</a></li>
                                <li><a href="#">국어 외국어 사전</a></li>
                                <li><a href="#">대학교재</a></li>
                                <li><a href="#">만화/라이트노벨</a></li>
                                <li><a href="#">사회 정치</a></li>
                                <li><a href="#">소설/시/희곡</a></li>
                                <li><a href="#">수험서 자격증</a></li>
                                <li><a href="#">어린이</a></li>
                                <li><a href="#">에세이</a></li>
                                <li><a href="#">여행</a></li>
                                <li><a href="#">역사</a></li>
                                <li><a href="#">예술</a></li>
                                <li><a href="#">유아</a></li>
                                <li><a href="#">인문</a></li>
                                <li><a href="#">인물</a></li>
                                <li><a href="#">자기계발</a></li>
                                <li><a href="#">자연과학</a></li>
                                <li><a href="#">잡지</a></li>
                                <li><a href="#">전집</a></li>
                                <li><a href="#">종교</a></li>
                                <li><a href="#">청소년</a></li>
                                <li><a href="#">IT모바일</a></li>
                                <li><a href="#">초등참고서</a></li>
                                <li><a href="#">중고등참고서</a></li>
                            </ul>
                        </li>
                        <li><a href="#">자유게시판</a></li>
                    </ul>
                    <div className="bottom">
                        <ul className="bottom_menu">
                            <li className="welcome">-님 환영합니다.</li>
                            <li><a href="#">회원가입</a></li>
                            <li><a href="#">로그인</a></li>
                            <li><a href="#">마이페이지</a></li>
                            <li><a href="#">관리자페이지</a></li>
                        </ul>
                        <form action="#" method="get">
                            <label htmlFor="search">검색</label>
                            <input type="search" name="search" id="search"/>
                            <button><i className="fa-solid fa-magnifying-glass"></i></button>
                        </form>
                    </div>
                </div>
            </aside>
        </Fragment>
    )
}

export default Header;