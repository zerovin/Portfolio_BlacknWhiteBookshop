import { Fragment, useState, useEffect } from "react";
import {Link} from "react-router-dom";
import apiClient from "../../http-commons"
import { useQuery } from "react-query";

const Header=()=>{
    const [menu, setMenu]=useState([]);
    const [guest, setGuest]=useState(true);
    const [userName, setUserName]=useState(null);
    const [admin, setAdmin]=useState(false);
    const [logoutActive, setLogoutActive]=useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const toggleMenu=(e)=>{
        e.preventDefault();
        setIsOpen(!isOpen);
        setIsScrolled(!isOpen);
    }

    useEffect(()=>{
        const categoryList=async()=>{
            try{
                const res=await apiClient.get('/main/menu')
                setMenu(res.data)
            }catch(error){
                console.error(error)
            }
        }
        categoryList();
    },[])

    useEffect(()=>{
        apiClient.post('/member/isLogin')
        .then(res=>{
            if(res.data.loginOk){
                setGuest(false)
                setUserName(res.data.userName)
                if(res.data.userAuth==="ROLE_USER"){
                    setAdmin(false)
                }else if(res.data.userAuth==="ROLE_ADMIN"){
                    setAdmin(true)
                }
            }else{
                setGuest(true)
            }
        })
        .catch(err=>{
            console.error(err)
        })
    },[])

    const checkLogout=()=>{
        setLogoutActive(true)
    }

    const logoutCancel=()=>{
        setLogoutActive(false)
    }

    const {refetch:logout}=useQuery(['logout'],
        async()=>{
            return await apiClient.get(`/member/logout`)
        },
        {
          enabled:false,
          onSuccess:(res)=>{
            if(res.data.logout){
                setGuest(!guest)
                setUserName(null)
                setAdmin(false)
                window.location.href="/"
            }
          },
          onError:(err)=>{
            console.log(err.response)
          }
        }
    )

    return(
        <Fragment>
            <aside id="aside">
                <h1><Link to={"/"} className="logo">흑백책방</Link></h1>
                <div className="menu_wrap">
                    <ul className="menu">
                        <li><p className="books" onClick={toggleMenu}>책 <i className={`fa-solid ${isOpen?'fa-caret-up':'fa-caret-down'}`}></i></p>
                            <ul className={`sub_menu ${isOpen?'':'fold'}`}>
                                <li><Link to={"/book/list/all"}>전체</Link></li>
                                {
                                    menu.map((category, idx)=>{
                                        const cate=btoa(encodeURIComponent(category));
                                        return(
                                            <li key={idx+1}><Link to={`/book/list/${cate}`}>{category}</Link></li>
                                        )
                                    })
                                }
                            </ul>
                        </li>
                        <li><Link to="/board/list">자유게시판</Link></li>
                    </ul>
                    <div className="bottom">
                        <ul className="bottom_menu">
                            {
                                !guest  &&
                                <li className="welcome"><span>{userName}</span>님 환영합니다.</li>
                            }
                            {
                                guest &&
                                <li><Link to="/member/join">회원가입</Link></li>
                            }
                            {
                                guest &&
                                <li><Link to={'/member/login'}>로그인</Link></li>
                            }
                            {
                                !guest && !admin &&
                                <li><Link to={''}>마이페이지</Link></li>
                            }
                            {
                                !guest && admin &&
                                <li><Link to={''}>관리자페이지</Link></li>
                            }
                            {
                                !guest &&
                                <li><Link onClick={checkLogout}>로그아웃</Link></li>
                            }
                        </ul>
                        <form action="#" method="get">
                            <label htmlFor="search">검색</label>
                            <input type="search" name="search" id="search"/>
                            <button><i className="fa-solid fa-magnifying-glass"></i></button>
                        </form>
                    </div>
                </div>
            </aside>
            <div id="logout_box" className={logoutActive?"active":""}>
                <p>로그아웃 하시겠습니까?</p>
                <div className="logout_btn">
                    <button className="ok" onClick={logout}>로그아웃</button>
                    <button className="cancel" onClick={logoutCancel}>취소</button>
                </div>
            </div>
        </Fragment>
    )
}

export default Header;