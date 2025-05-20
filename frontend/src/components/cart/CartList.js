import { Fragment, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import apiClient from "../../http-commons";

const CartList=()=>{
    const queryClient=useQueryClient();
    const [deleteCno, setDeleteCno]=useState(null);
    const [checkBooks, setCheckBooks]=useState(new Set());
    const [deleteModal, setDeleteModal]=useState(false);

    const {isLoading, error, data}=useQuery(['cart_list'],
        async()=>{
            const res=await apiClient.get('/cart/list')
            return res.data;
        }
    )
    
    const updateQuntity=useMutation(
        async({cno, quantity})=>{
            await apiClient.put('/cart/update',{cno, quantity})
        },
        {
            onSuccess:()=>{
                queryClient.invalidateQueries(['cart_list'])
            }
        }
    )

    const deleteCart=useMutation(
        async(cno)=>await apiClient.delete(`/cart/delete/${cno}`),
        {
            onSuccess:()=>{
                queryClient.invalidateQueries(['cart_list'])
                closeDeleteModal();
            },
            onError:(err)=>{
                console.error("삭제 실패", err)
            }
        }
    )

    useEffect(()=>{
        window.scrollTo({top:0, behavior:'auto'})
        if(data){
            const allCheckBooks=new Set(data.map(item=>item.cno))
            setCheckBooks(allCheckBooks)
        }
    },[data])

    const total=useMemo(()=>{
        if(!data) return 0;
        return data
            .filter(item=>checkBooks.has(item.cno))
            .reduce((sum, item)=>sum+item.price*item.quantity, 0)
    },[data, checkBooks])

    const allQuantity=useMemo(()=>{
        if(!data) return 0;
        return data
            .filter(item=>checkBooks.has(item.cno))
            .reduce((sum, item)=>sum+item.quantity,0)
    },[data, checkBooks])

    if(isLoading){
        return <p style={{textAlign:'center',height:'100vh',lineHeight:'100vh'}}>로딩중...</p>
    }
    if(error){
        return <p style={{textAlign:'center',height:'100vh',lineHeight:'100vh'}}>{error.message}</p>
    }

    const checkbox=(cno)=>{
        setCheckBooks(prev=>{
            const newSet=new Set(prev);
            if(newSet.has(cno)){
                newSet.delete(cno);
            }else{
                newSet.add(cno);
            }
            return newSet;
        })
    }

    const allCheck=()=>{
        if(data && checkBooks.size !== data.length){
            setCheckBooks(new Set(data.map(item=>item.cno)))
        }else{
            setCheckBooks(new Set())
        }
    }

    const qunatityChange=(cno, newQuantity)=>{
        if(newQuantity>=1){
            updateQuntity.mutate({cno, quantity:newQuantity})
        }
    }

    const deliveryDay=()=>{
        const now=new Date();
        const cutTime=17;
        const weekdays=['일','월','화','수','목','금','토'];
        const isCutTime=now.getHours>=cutTime;
        if(isCutTime){
            now.setDate(now.getDate()+1);
        }
        const isToday=isCutTime?'내일':'오늘';
        const month=now.getMonth()+1;
        const date=now.getDate();
        const day=weekdays[now.getDay()];
        return `${isToday}(${month}/${date}, ${day})`
    }

    const openDeleteModal=(cno)=>{
        setDeleteCno(cno)
        setDeleteModal(true)
    }

    const closeDeleteModal=()=>{
        setDeleteCno(null)
        setDeleteModal(false)
    }
    

    return(
        <Fragment>
            <div id="cartList">
                <div className="container">
                    <div className="top">
                        <h3>장바구니 &#91;{checkBooks.size}&#93;</h3>
                        <div className="process">
                            <p><span>1</span> 장바구니</p>
                            <p><span>2</span> 주문/결제</p>
                            <p><span>3</span> 주문완료</p>
                        </div>
                    </div>
                    <div className="grid_wrap">
                        <div className="left">
                            <div className="table_top">
                                <input type="checkbox" id="all_check" className="hidden" checked={data && checkBooks.size === data.length} onChange={allCheck}/>
                                <label htmlFor="all_check">전체선택</label>
                            </div>
                            {data.length===0?(
                                <div style={{textAlign:'center', padding:'80px 0'}}>장바구니에 담긴 상품이 없습니다 🛒</div>
                            ):(
                            <table>
                                <thead className="hidden">
                                    <tr>
                                        <th scope="col">상품선택</th>
                                        <th scope="col">상품정보</th>
                                        <th scope="col">금액, 수량</th>
                                        <th scope="col">배송정보</th>
                                        <th scope="col">삭제</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map(item=>(
                                            <tr key={item.cno}>
                                                <td className="td_check">
                                                    <input type="checkbox" id={`check${item.cno}`} className="hidden" checked={checkBooks.has(item.cno)} onChange={()=>checkbox(item.cno)}/>
                                                    <label htmlFor={`check${item.cno}`}>선택</label>
                                                </td>
                                                <td className="book_info">
                                                    <Link to={`/book/detail/${item.bno}`}>
                                                        <img src={item.thumb} alt={item.title}/>
                                                    </Link>
                                                    <div className="info_text">
                                                        <p>{item.title}</p>
                                                        <div className="price">
                                                            <p className="percent">10%</p>
                                                            <p className="dis">{((item.price)*0.9).toLocaleString()}원</p>
                                                            <p className="prime">{item.price.toLocaleString()}원</p>
                                                            <p className="point">&#40;{((item.price)*0.05).toLocaleString()}P&#41;</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="price_amt">
                                                    <p className="t_price">{(((item.price)*0.9)*(item.quantity)).toLocaleString()}원</p>
                                                    <div className="amount">
                                                        <button className="miunus" onClick={()=>qunatityChange(item.cno, item.quantity-1)}><i className="fa-solid fa-minus"></i></button>
                                                        <p>{item.quantity}</p>
                                                        <button className="plus" onClick={()=>qunatityChange(item.cno, item.quantity+1)}><i className="fa-solid fa-plus"></i></button>
                                                    </div>
                                                </td>
                                                <td className="delivery">
                                                    <div>
                                                        <p className="notice">오후 7시 이전 주문시<br/> 당일배송, 바로픽업 가능</p>
                                                        <p className="border">당일배송</p>
                                                        <p>{deliveryDay()} 도착</p>
                                                    </div>
                                                    <div>
                                                        <p className="border">바로픽업</p>
                                                        <p>{deliveryDay()}부터 수령 가능</p>
                                                    </div>
                                                </td>
                                                <td>
                                                    <button onClick={()=>openDeleteModal(item.cno)}><i className="fa-solid fa-xmark"></i></button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            )}
                        </div>
                        <div className="right">
                            <div className="buy_info">
                                <div>
                                    <p>상품 금액</p>
                                    <p className="bold">{total.toLocaleString()}원</p>
                                </div>
                                <div>
                                    <p>배송비</p>
                                    <p>+ 0원</p>
                                </div>
                                <div>
                                    <p>상품 할인</p>
                                    <p className="bold">- {(total*0.1).toLocaleString()}원</p>
                                </div>
                                <div className="total">
                                    <p className="bold">결제 예정 금액</p>
                                    <p className="total_price">{(total*0.9).toLocaleString()}원</p>
                                </div>
                                <div className="gray">
                                    <p>적립 예정 포인트</p>
                                    <p>{(total*0.05).toLocaleString()} P</p>
                                </div>
                                <Link to={allQuantity>0?"/book/buy":"#"} className={`buy ${allQuantity===0?"disabled":""}`}>주문하기 ({allQuantity})</Link>
                            </div>
                            <Link to={allQuantity>0?"/book/pickup":"#"} className={allQuantity===0?"disabled":""}>바로픽업 주문 ({allQuantity})</Link>
                        </div>
                    </div>
                </div>
                <div id="delete_box" className={deleteModal?"active":""}>
                    <div>
                        <p>선택 상품을 삭제하시겠어요?</p>
                    </div>
                    <div className="delete_btn">
                        <button className="ok" onClick={()=>deleteCart.mutate(deleteCno)}>삭제</button>
                        <button className="cancel" onClick={closeDeleteModal}>취소</button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default CartList;