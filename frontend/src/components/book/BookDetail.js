import { Fragment, useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import apiClient from "../../http-commons";
import { useQuery } from "react-query";
import DOMPurify from "dompurify";

const BookDetail=()=>{
    const {no}=useParams()
    const [amount, setAmount]=useState(1);
    const [cartModal, setCartModal]=useState(false);
    const goTop=()=>{
        window.scrollTo({top:0, behavior:'smooth'})
    }

    const {isLoading, isError, error, data}=useQuery(['book_detail',no],
        async()=>{
            return await apiClient.get(`/book/detail/${no}`)
        }
    )

    useEffect(()=>{
        window.scrollTo({top:0, behavior:'auto'})
    },[])
    
    const total=useMemo(()=>{
        return ((data?.data?.price || 0)*amount)*0.9;
    },[data, amount])
    
    if(isLoading){
        return <p style={{textAlign:'center',height:'100vh',lineHeight:'100vh'}}>로딩중...</p>
    }
    if(isError){
        return <p style={{textAlign:'center',height:'100vh',lineHeight:'100vh'}}>{error.message}</p>
    }
    
    const cate=btoa(encodeURIComponent(data.data.category));
    const safeIntro=DOMPurify.sanitize(data.data.intro);
    const safeContents=DOMPurify.sanitize(data.data.contents);
    const plusAmount=()=>{
        setAmount(prev=>prev+1)
    }
    const minusAmount=()=>{
        setAmount(prev=>(prev>1?prev-1:1))
    }

    const addCart=async()=>{
        try{
            await apiClient.post(
                '/book/cart',
                {bookNo:data.data.no, amount:amount},
                {withCredentials:true}
            )
            setCartModal(true);
        }catch(error){
            if(error.reponse?.status === 401){
                alert('로그인이 필요합니다.')
            }else{
                alert('장바구니 담기에 실패했습니다.')
            }
        }
    }

    const goCart=()=>{
        setCartModal(false);
        Navigate('/book/cart');
    }

    const closeModal=()=>{
        setCartModal(false);
    }

    return(
        <Fragment>
            <div id="bookDetail">
                <div className="container">
                    <div className="bread_crumb">
                        <Link to={"/book/list/all"}><i className="fa-solid fa-house"></i></Link>
                        <p>&gt;</p>
                        <Link to={`/book/list/${cate}`}>{data.data.category}</Link>
                    </div>
                    <div className="detail_wrap">
                        <div className="img_wrap">
                            <img src={data.data.thumb} alt={data.data.title}/>
                        </div>
                        <div className="text">
                            <h3 className="title">{data.data.title}</h3>
                            <div className="info">
                                <p>{data.data.writer}</p>
                                <p>{data.data.publisher}</p>
                            </div>
                            <p className="date">{data.data.pub_date.substring(0, 10)}</p>
                            <p className="sales"><span>판매지수</span> {data.data.sales.toLocaleString()}</p>
                            <div className="price">
                                <p className="dis">{(data.data.price*0.9).toLocaleString()}원</p>
                                <p className="prime">{data.data.price.toLocaleString()}원</p>
                                <p className="percent">10% 할인</p>
                            </div>
                            <div className="text_bottom">
                                <div>
                                    <p>적립금</p>
                                    <p>{(data.data.price*0.05).toLocaleString()}원 <span>5% 적립</span></p>
                                </div>
                                <div>
                                    <p>배송비</p>
                                    <p>무료 <span>해외배경의 경우 지역에 따라 상이</span></p>
                                </div>
                            </div>
                            <div className="cal">
                                <div className="amount">
                                    <button className="miunus" onClick={minusAmount}><i className="fa-solid fa-minus"></i></button>
                                    <p>{amount}</p>
                                    <button className="plus" onClick={plusAmount}><i className="fa-solid fa-plus"></i></button>
                                </div>
                                <p className="total"><span>{total.toLocaleString()}</span>원</p>
                            </div>
                            <p className="alert">실결제 금액은 적립금, 쿠폰 등에 따라 달라질 수 있습니다.</p>
                            <div className="btns">
                                <button>장바구니</button>
                                <button>바로픽업</button>
                                <button>바로구매</button>
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="left">
                            <div className="intro">
                                <h4 className="sub_tt">책 소개</h4>
                                <p dangerouslySetInnerHTML={{__html:safeIntro}}></p>
                            </div>
                            <div className="contents">
                                <h4 className="sub_tt">목차</h4>
                                <p dangerouslySetInnerHTML={{__html:safeContents}}></p>
                            </div>
                            <div className="detail_img">
                                <h4 className="sub_tt">출판사 제공 책소개</h4>
                                <img src={data.data.detail_img} alt="출판사 제공 책소개"/>
                            </div>
                        </div>
                        <div className="right">
                            <div className="mini_info">
                                <img src={data.data.thumb} alt={data.data.title}/>
                                <h5>{data.data.title}</h5>
                            </div>
                            <div className="cal">
                                <div className="amount">
                                    <button className="miunus" onClick={minusAmount}><i className="fa-solid fa-minus"></i></button>
                                    <p>{amount}</p>
                                    <button className="plus" onClick={plusAmount}><i className="fa-solid fa-plus"></i></button>
                                </div>
                                <p className="total"><span>{total.toLocaleString()}</span>원</p>
                            </div>
                            <p className="alert">실결제 금액은 적립금, 쿠폰 등에 따라 달라질 수 있습니다.</p>
                            <div className="btns">
                                <button onClick={addCart}>장바구니</button>
                                <button>바로픽업</button>
                                <button>바로구매</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default BookDetail;