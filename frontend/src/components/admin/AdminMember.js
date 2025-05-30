import { Fragment, useEffect, useState } from "react";
import apiClient from "../../http-commons"

const AdminMember=()=>{
    const [members, setMembers]=useState([])
    const [filter, setFilter]=useState([])
    const [auth, setAuth]=useState('')
    const [keyword, setKeyword]=useState('')
    const [currentPage, setCurrentPage]=useState(1);
    const rowsize=10;
    const block=5;
    const [pageGroup, setPageGroup]=useState(0);

    useEffect(()=>{
        window.scrollTo({top:0, behavior:'auto'})
        apiClient.post("/member/isLogin")
            .then(res=>{
                if(res.data.loginOk && res.data.userAuth==="ROLE_ADMIN"){
                    apiClient.get("/member/all")
                        .then(res=>{
                            if(Array.isArray(res.data)){
                                setMembers(res.data)
                                setFilter(res.data)
                                console.log(res.data)
                            }else{
                                console.error(res.data)
                            }
                        }).catch(err=>console.error(err))
                }else{
                    alert("잘못된 접근입니다.")
                    navigator('/main/home')
                }
            }).catch(err=>console.error(err))
    }, [])

    const formatDate=(str)=>{
        const d=new Date(str)
        return `${d.getFullYear()}-${(d.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`
    }

    useEffect(()=>{
        const lowerKeyword=keyword.toLowerCase()
        const result=members.filter(member=>{
            const matchId=member.userId.toLowerCase().includes(lowerKeyword)
            const userAuth=member.authority==="ROLE_ADMIN"?"관리자":"일반회원"
            const matchAuth=auth==="" || userAuth === auth
            return matchId && matchAuth
        })
        setFilter(result)
    }, [keyword, auth, members])

    useEffect(()=>{
        setCurrentPage(1);
        setPageGroup(0);
    },[filter])

    const totalpage=Math.ceil(filter.length/rowsize);
    const startpage=pageGroup*block+1;
    const endpage=Math.min(startpage+block - 1, totalpage)
    const indexOfLastItem=currentPage*rowsize;
    const indexOfFirstItem=indexOfLastItem-rowsize;
    const currentItems=filter.slice(indexOfFirstItem, indexOfLastItem)
    const prev = () => {
        if (pageGroup > 0) {
          const newGroup = pageGroup - 1;
          setPageGroup(newGroup);
          setCurrentPage(newGroup*block + 1);
        }
    };
      
    const next = () => {
        if ((pageGroup+1)*block<totalpage) {
            const newGroup=pageGroup+1;
            setPageGroup(newGroup);
            setCurrentPage(newGroup*block + 1);
        }
    };

    const pageArr = [];
    for (let i=startpage;i<=endpage;i++) {
        pageArr.push(
            <li key={i} className={currentPage===i?"active":""}>
                <button onClick={()=>setCurrentPage(i)}>{i}</button>
            </li>
        );
    }

    return(
        <Fragment>
            <div id="adminorder" className="member">
                <div className="container">
                    <div className="filter">
                        <select className="filter-select" value={auth}
                            onChange={(e)=>setAuth(e.target.value)}>
                            <option value={""}>전체</option>
                            <option value={"일반회원"}>일반회원</option>
                            <option value={"관리자"}>관리자</option>
                        </select>
                        <div className="search-box">
                            <input type="text" className="filter-search" placeholder="아이디 검색" value={keyword}
                                onChange={(e)=>setKeyword(e.target.value)} />
                            <button className="search-button">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                    </div>
                    <div className="memberlist">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>번호</th>
                                    <th>아이디</th>
                                    <th>회원명</th>
                                    <th>이메일</th>
                                    <th>연락처</th>
                                    <th>주소</th>
                                    <th>가입일</th>
                                    <th>최종로그인</th>
                                    <th>권한</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((member, idx)=> ( 
                                    <tr key={idx}>
                                        <td>{members.length-idx}</td>
                                        <td>{member.userId}</td>
                                        <td>{member.userName}</td>
                                        <td>{member.email}</td>
                                        <td>{member.phone}</td>
                                        <td>[{member.post}]{member.addr1} {member.addr2}</td>
                                        <td>{formatDate(member.regdate)}</td>
                                        <td>{formatDate(member.lastlogin)}</td>
                                        <td>{member.authority==="ROLE_ADMIN"?"관리자":"일반회원"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <ul className="pagination">
                        {
                            startpage > 1 &&
                            <li>
                                <button onClick={prev}><i className="fa-solid fa-angle-left"></i></button>
                            </li>
                        }
                        {pageArr}
                        {
                            endpage < totalpage &&    
                            <li>
                                <button onClick={next}><i className="fa-solid fa-angle-right"></i></button>
                            </li>
                        }
                    </ul>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default AdminMember;