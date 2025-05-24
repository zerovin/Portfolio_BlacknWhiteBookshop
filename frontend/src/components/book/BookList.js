import { Fragment, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import apiClient from "../../http-commons";

const BookList=()=>{
    const navigate=useNavigate();
    const {cate}=useParams();
    const category=decodeURIComponent(atob(cate));
    const display=cate==='all'?'전체':category;
    const [sort, setSort]=useState("");
    const [searchParams]=useSearchParams();
    const mainSort=searchParams.get("sort");
    const [curpage, setCurpage] = useState(1);
    const [cartModal, setCartModal]=useState(false);

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
    },[cate, mainSort])

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

     const addCart=async(bno)=>{
        try{
            await apiClient.post(
                '/cart/add',
                {bookNo:bno, quantity:1},
                {withCredentials:true}
            )
            setCartModal(true);
        }catch(error){
            if(error.response?.status === 401){
                alert('로그인이 필요합니다.')
            }else{
                alert('장바구니 담기에 실패했습니다.')
            }
        }
    }

    const goCart=()=>{
        setCartModal(false);
        navigate('/cart/list');
    }

    const closeModal=()=>{
        setCartModal(false);
    }

    const gopay=async(bno)=>{
        try{
            const res=await apiClient.get('/member/myinfo')
            if(res.status===200 && res.data.userId){
                navigate('/cart/order',{state:{directBuy:bno}})
            }else{
                alert('로그인이 필요합니다.')
            }
        }catch(error){
            alert('로그인이 필요합니다.')
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
                                        <button onClick={()=>addCart(vo.no)}>장바구니</button>
                                        <button>바로픽업</button>
                                        <button onClick={()=>gopay(vo.no)}>바로구매</button>
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
                <div id="addcart_box" className={cartModal?"active":""}>
                    <div>
                        <p>상품이 장바구니에 담겼습니다.</p> 
                        <p>장바구니로 이동하시겠습니까?</p>
                    </div>
                    <div className="gocart_btn">
                        <button className="ok" onClick={goCart}>이동</button>
                        <button className="cancel" onClick={closeModal}>취소</button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default BookList;