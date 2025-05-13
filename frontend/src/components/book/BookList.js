import { Fragment, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams, useSearchParams } from "react-router-dom";
import apiClient from "../../http-commons";

const BookList=()=>{
    const {cate}=useParams();
    const category=decodeURIComponent(atob(cate));
    const display=cate==='all'?'전체':category;
    const [sort, setSort]=useState("");
    const [searchParams]=useSearchParams();
    const mainSort=searchParams.get("sort");
    const [curpage, setCurpage] = useState(1);
    const {isLoading, isError, error, data}=useQuery(["book_List", category, curpage, sort],
        async ()=>{
            return await apiClient.get(`/book/list/${cate}/${curpage}?sort=${sort}`)
        }
    )

    useEffect(()=>{
        window.scrollTo({top:0, behavior:'auto'})
        setCurpage(1);
        setSort("");
        if(mainSort){
            setSort(mainSort)
        }
    },[cate])

    if(isLoading){
        return <p style={{textAlign:'center',height:'100vh',lineHeight:'100vh'}}>로딩중...</p>
    }
    if(isError){
        return <p style={{textAlign:'center',height:'100vh',lineHeight:'100vh'}}>{error.message}</p>
    }

    const pageChange=(page)=>{
        setCurpage(page)
        window.scrollTo({top:0, behavior:'auto'})
    }
    const prev=()=>{
        setCurpage(data.data.startpage-1)
    }
    const next=()=>{
        setCurpage(data.data.endpage+1)
    }
    let pageArr=[]
    for(let i=data.data.startpage;i<=data.data.endpage;i++){
        if(curpage===i){
            pageArr.push(
                <li key={i} className="active">
                    <button onClick={()=>pageChange(i)}>{i}</button>
                </li>
            )
        }else{
            pageArr.push(
                <li key={i}>
                    <button onClick={()=>pageChange(i)}>{i}</button>
                </li>
            )
        }
    }

    return(
        <Fragment>
            <div id="bookList">
                <div className="container">
                    <div className="top">
                        <h3>{display}</h3>
                        <ul className="filter">
                            <li onClick={()=>setSort("best")}>베스트 순</li>
                            <li onClick={(()=>setSort("new"))}>신상품 순</li>
                        </ul>
                    </div>
                    <ul className="book_list">
                        {
                            data.data.book_list && data.data.book_list.map((vo)=>
                                <li key={vo.no}>
                                    <div className="left">
                                        <Link to={"/book/detail/"+vo.no}><img src={vo.thumb} alt={vo.title}/></Link>
                                        <div className="text">
                                            <Link to={'/book/detail/'+vo.no} className="tt">{vo.title}</Link>
                                            <div className="tt_bottom">
                                                <p>{vo.writer}</p>
                                                <p>{vo.publisher}</p>
                                                <p>{vo.pub_date.substring(0, 10)}</p>
                                            </div>
                                            <div className="price">
                                                <p>10%</p>
                                                <p>{(vo.price*0.9).toLocaleString()}원</p>
                                                <p>{vo.price.toLocaleString()}원</p>
                                            </div>
                                            <p className="sales">판매지수 {vo.sales.toLocaleString()}</p>
                                            <p className="intro">{vo.intro.replace(/<[^>]*>/g, ' ')}</p>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <Link to={"/book/cart"}>장바구니</Link>
                                        <Link to={"/book/pickup"}>바로픽업</Link>
                                        <Link to={"/book/buynow"}>바로구매</Link>
                                    </div>
                                </li>
                            )
                        }
                    </ul>
                    <ul className="pagination">
                        {
                            data.data.startpage && data.data.startpage > 1 &&
                            <li>
                                <button onClick={prev}><i className="fa-solid fa-angle-left"></i></button>
                            </li>
                        }
                        {pageArr}
                        {
                            data.data.endpage && data.data.endpage < data.data.totalpage &&    
                            <li>
                                <button onClick={next}><i className="fa-solid fa-angle-right"></i></button>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </Fragment>
    )
}

export default BookList;