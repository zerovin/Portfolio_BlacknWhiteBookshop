import { Fragment, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import apiClient from "../../http-commons";

const CartOrder=()=>{
    const [checkBooks, setCheckBooks]=useState(new Set());

    const {isLoading, error, data}=useQuery(['cart_list'],
        async()=>{
            const res=await apiClient.get('/cart/list')
            return res.data;
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

    return(
        <Fragment>
            <div id="cartOrder">
                <div className="container">
                    <div className="top">
                        <h3>주문/결제</h3>
                        <div className="process">
                            <p><span>1</span> 장바구니</p>
                            <p><span>2</span> 주문/결제</p>
                            <p><span>3</span> 주문완료</p>
                        </div>
                    </div>
                    <div className="grid_wrap">
                        <div className="left">
                            <div className="delivery_info left_border">
                                <div className="del">
                                    <h3>배송지 정보</h3>
                                    <div className="deli_right">
                                        <input type="text" name="name" value="이름"/>
                                        <input type="text" name="phone" value="폰번호"/>
                                        <input type="text" name="address" value="주소"/>
                                    </div>
                                </div>
                                <div className="del">
                                    <h3>배송요청사항</h3>
                                    <input type="text" name="msg"/>
                                </div>
                            </div>
                            <div className="cart_list left_border">
                                <h3>주문상품 <span>총 {allQuantity}권</span></h3>
                                <table>
                                    <thead className="hidden">
                                        <tr>
                                            <th scope="col">상품정보</th>
                                            <th scope="col">금액, 수량</th>
                                            <th scope="col">배송정보</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map(item=>(
                                                <tr key={item.cno}>
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
                                                        <p>{item.quantity}권</p>
                                                    </td>
                                                    <td className="delivery">
                                                        <div>
                                                            <p className="border">당일배송</p>
                                                            <p>{deliveryDay()} 도착</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
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
                                <button className="buy">결제하기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default CartOrder;