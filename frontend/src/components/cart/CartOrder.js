import { Fragment, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import apiClient from "../../http-commons";

const CartOrder=()=>{
    const location=useLocation();
    const navigate=useNavigate();
    const {selectBooks}=location.state||{selectBooks:[]};
    const [name, setName]=useState('');
    const [phone, setPhone]=useState('');
    const [postcode, setPostcode]=useState('');
    const [addr1, setAddr1]=useState('');
    const [addr2, setAddr2]=useState('');
    const [msg, setMsg]=useState('');

    const {isLoading, error, data}=useQuery(['cart_list'],
        async()=>{
            const res=await apiClient.get('/cart/list')
            return res.data.filter(item=>selectBooks.includes(item.cno))
        }
    )

    const {isLoading:memberLoading, error:memberError, data:memberInfo}=useQuery(['member_info'],
        async()=>{
            const res=await apiClient.get('/member/myinfo')
            return res.data
        }
    )
    useEffect(()=>{
        window.scrollTo({top:0, behavior:'auto'})
        if(memberInfo){
            setName(memberInfo.userName)
            setPhone(memberInfo.phone)
            setPostcode(memberInfo.post)
            setAddr1(memberInfo.addr1)
            setAddr2(memberInfo.addr2)
        }
        if(window.IMP){
            window.IMP.init('imp57640514')
        }
    },[data, memberInfo])

    const total=useMemo(()=>{
        const selectItem = new Set(selectBooks)
        return data
            .filter(item=>selectItem.has(item.cno))
            .reduce((sum, item)=>sum+item.price*item.quantity, 0)
    },[data, selectBooks])

    const allQuantity=useMemo(()=>{
        const selectItem = new Set(selectBooks)
        return data
            .filter(item=>selectItem.has(item.cno))
            .reduce((sum, item)=>sum+item.quantity,0)
    },[data, selectBooks])

    if(isLoading || memberLoading){
        return <p style={{textAlign:'center',height:'100vh',lineHeight:'100vh'}}>로딩중...</p>
    }
    if(error || memberError){
        return <p style={{textAlign:'center',height:'100vh',lineHeight:'100vh'}}>{error.message}</p>
    }

    const searchPost=()=>{
        new window.daum.Postcode({
            oncomplete: function (data) {
                let addr = ''
                if (data.userSelectedType === 'R') {
                  addr = data.roadAddress
                } else {
                  addr = data.jibunAddress
                }
                setPostcode(data.zonecode)
                setAddr1(addr)
            }
        }).open()
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

    const payOrder=()=>{
        const phoneCheck=(phone)=>{
            return /^[0-9]{11}$/.test(phone)
        }
        if(name.trim()===''){
            alert('받는 분 성함을 입력하세요.')
            return;
        }
        if(phone.trim()===''){
            alert('받는 분 연락처를 입력하세요.')
            return;
        }else if(!phoneCheck(phone)){
            alert('전화번호는 \'-\' 없이 11자리의 숫자만 입력해야 합니다.')
            return;
        }            
        if(addr1.trim()===''){
            alert('주소를 입력하세요.')
            return;
        }
        payment() 
    }

    const payment=()=>{
        const {IMP}=window;
        IMP.request_pay(
            {
            pg: 'html5_inicis',
            pay_method: 'card',
            merchant_uid: `mid_${new Date().getTime()}`,
            name:`${data[0].title} 외 ${allQuantity}권`,
            amount: total*0.9,
            buyer_email: memberInfo.email,
            buyer_name: name,
            buyer_tel: phone,
            buyer_addr: `${addr1} ${addr2}`,
            buyer_postcode: postcode,
            },
            async function(afterPay){
                const orders=data.map(item=>({
                    bno:item.bno,
                    title:item.title,
                    thumb:item.thumb,
                    quantity:item.quantity,
                    price:item.price*0.9,
                    total:(item.price*0.9)*item.quantity,
                    receiver:name,
                    phone:phone,
                    addr:`[${postcode}]${addr1} ${addr2}`,
                    msg:msg
                }))
                const cnoList=data.map(item=>item.cno)
                try{
                    await apiClient.post('/cart/order', {orders, cnoList})
                    navigate('/cart/paycomplete')
                }catch(error){
                    console.error(error)
                }
            }
        )
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
                                        <label htmlFor="name">받는 분</label>
                                        <input type="text" name="name" placeholder="이름" value={name} onChange={(e)=>setName(e.target.value)}/>
                                        <input type="text" name="phone" placeholder="-제외한 휴대폰번호" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                                        <label htmlFor="addr1">주소</label>
                                        <div className="post_area">
                                            <input type="text" name="postcode" placeholder="우편번호" readOnly value={postcode}/>
                                            <button onClick={searchPost}>우편번호 검색</button>
                                        </div>
                                        <input type="text" name="addr1" placeholder="우편번호 검색을 클릭해주세요" readOnly value={addr1} onChange={(e)=>setAddr1(e.target.value)}/>
                                        <input type="text" name="addr2" placeholder="상세주소" value={addr2} onChange={(e)=>setAddr2(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="del">
                                    <h3>배송요청사항</h3>
                                    <input type="text" name="msg" value={msg} onChange={(e)=>setMsg(e.target.value)}/>
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
                                <button className="buy" onClick={payOrder}>결제하기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default CartOrder;