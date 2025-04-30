import { Fragment, useState, useRef } from "react";
import {Link} from "react-router-dom";
import {useQuery} from "react-query";
import apiClient from "../../http-commons"

const Header=()=>{
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const toggleMenu=(e)=>{
        e.preventDefault();
        setIsOpen(!isOpen);
        setIsScrolled(!isOpen);
    }
    return(
        <Fragment>
            <aside id="aside">
                <h1><Link to={"/"} className="logo">흑백책방</Link></h1>
                <div className="menu_wrap">
                    <ul className="menu">
                        <li><p className="books" onClick={toggleMenu}>책 <i className={`fa-solid ${isOpen?'fa-caret-up':'fa-caret-down'}`}></i></p>
                            <ul className={`sub_menu ${isOpen?'':'fold'}`}>
                                <li><Link to={"/book/all"}>전체</Link></li>
                                <li><Link to={"/book/home"}>가정 살림</Link></li>
                                <li><Link to={"/book/health"}>건강 취미</Link></li>
                                <li><Link to={"/book/economy"}>경제 경영</Link></li>
                                <li><Link to={"/book/language"}>국어 외국어 사전</Link></li>
                                <li><Link to={"/book/college"}>대학교재</Link></li>
                                <li><Link to={"/book/toon"}>만화/라이트노벨</Link></li>
                                <li><Link to={"/book/social"}>사회 정치</Link></li>
                                <li><Link to={"/book/novel"}>소설/시/희곡</Link></li>
                                <li><Link to={"/book/test"}>수험서 자격증</Link></li>
                                <li><Link to={"/book/kids"}>어린이</Link></li>
                                <li><Link to={"/book/essay"}>에세이</Link></li>
                                <li><Link to={"/book/travel"}>여행</Link></li>
                                <li><Link to={"/book/history"}>역사</Link></li>
                                <li><Link to={"/book/art"}>예술</Link></li>
                                <li><Link to={"/book/toddler"}>유아</Link></li>
                                <li><Link to={"/book/Humanity"}>인문</Link></li>
                                <li><Link to={"/book/person"}>인물</Link></li>
                                <li><Link to={"/book/improve"}>자기계발</Link></li>
                                <li><Link to={"/book/science"}>자연과학</Link></li>
                                <li><Link to={"/book/magazin"}>잡지</Link></li>
                                <li><Link to={"/book/complete"}>전집</Link></li>
                                <li><Link to={"/book/religion"}>종교</Link></li>
                                <li><Link to={"/book/teanager"}>청소년</Link></li>
                                <li><Link to={"/book/it"}>IT모바일</Link></li>
                                <li><Link to={"/book/elementary"}>초등참고서</Link></li>
                                <li><Link to={"/book/middle"}>중고등참고서</Link></li>
                            </ul>
                        </li>
                        <li><a href="#">자유게시판</a></li>
                    </ul>
                    <div className="bottom">
                        <ul className="bottom_menu">
                            <li className="welcome">-님 환영합니다.</li>
                            <li><Link to="/member/join">회원가입</Link></li>
                            {
                                
                            }
                            <li><Link to={'/member/login'}>로그인</Link></li>
                            <li><Link to={''}>마이페이지</Link></li>
                            <li><Link to={''}>관리자페이지</Link></li>
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