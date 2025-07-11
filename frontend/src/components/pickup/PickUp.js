import { useEffect, useState, useMemo } from "react"
import { useLocation } from "react-router-dom"
import apiClient from "../../http-commons"

const PickUp=()=>{
    const location = useLocation()
    const { userId, items } = location.state || {}
    const [userInfo, setUserInfo] = useState({ name: "", phone: "" })
    const [wrap, setWrap] = useState(false)
    const [pickupDate, setPickupDate] = useState(() => new Date().toISOString().split("T")[0])
    const [pickupTime, setPickupTime] = useState("")
    const cnoList = items.map(item => item.cno)
    const dateChange = (e) => setPickupDate(e.target.value)
    const timeChange = (e) => setPickupTime(e.target.value)

    const today = new Date().toISOString().split('T')[0]

    const timeOptions = ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"]
    const isPastTime = (time) => {
    if (pickupDate !== today) return false
    const [hour] = time.split(":").map(Number)
    const now = new Date()
    return hour <= now.getHours()
}
    const discountedTotal = useMemo(()=>{
        if (!items) return 0
        return items.reduce((sum, item)=>{
            const discounted = Math.floor(item.price * 0.9)
            return sum + (discounted * item.quantity)
        }, 0)
    }, [items])
    const discountAmount=useMemo(()=>{
        if (!items) return 0;
        return items.reduce((sum, item)=>{
          const discountPerBook = item.price - Math.floor(item.price * 0.9)
          return sum + discountPerBook * item.quantity
        }, 0)
    }, [items])
    const point = useMemo(()=>{
        return Math.floor(discountedTotal * 0.01)
    }, [discountedTotal])
    const wrapFee = wrap ? 100 : 0
    const finalTotal = discountedTotal + wrapFee
    const formatPhone = (phone)=>{
        if (!phone) return ""
        return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
    }

    const payment=async()=>{
        if(!pickupDate || !pickupTime){
            alert("픽업 날짜와 시간을 선택해주세요.")
            return
        }

        if(!userInfo.name || !userInfo.phone){
            alert("사용자 정보를 확인해주세요.")
            return
        }
        const { IMP } = window
        IMP.init("imp57640514")

        IMP.request_pay(
            {
            pg: "html5_inicis",
            pay_method: "card",
            merchant_uid: `pickup_${new Date().getTime()}`,
            name: `${items[0].title} 외 ${items.length - 1}권`,
            amount: finalTotal,
            buyer_name: userInfo.name,
            buyer_tel: userInfo.phone,
            },
            async function (rsp){
                try{
                await apiClient.post("/pickup/insert", {
                    userId,
                    name: userInfo.name,
                    phone: userInfo.phone,
                    pdate: pickupDate,
                    ptime: pickupTime,
                    wrap: wrap ? "Y" : "N",
                    items: items.map((item)=>({
                    bno: item.bno,
                    quantity: item.quantity,
                    price: Math.floor(item.price * 0.9),
                    })),
                    cnoList
                })
                window.location.href = "/pickup/complete"
                }catch (err){
                    console.error("예약 저장 실패", err)
                    alert("서버 오류가 발생했습니다.")
                }
            }
        )
    }

    useEffect(()=>{
        if(userId){
          apiClient.get(`/member/info/${userId}`)
            .then(res=>{
              const data=res.data
              setUserInfo({
                name: data.userName,
                phone: data.phone
              })
            })
            .catch(err=>{
              console.error("회원 정보 조회 실패", err)
            })
        }
    }, [userId])
    return(
        <div id="PickUp">
            <div className="container">
                <div className="top">
                    <h3>바로픽업</h3>
                    <div className="process">
                        <p><span>1</span> 장바구니</p>
                        <p><span>2</span> 주문/결제</p>
                        <p><span>3</span> 주문완료</p>
                    </div>
                </div>
                <div className="content">
                    <div className="left">
                        <div className="pickup_info">
                            <h3>픽업 정보</h3>
                            <ul>
                                <li>픽업 가능일
                                    <span>
                                        <input type="date" min={today} value={pickupDate} onChange={dateChange}/>
                                        <select value={pickupTime} onChange={timeChange}>
                                            <option value="">시간 선택</option>
                                            {timeOptions.map(time => (
                                                <option key={time} value={time} disabled={isPastTime(time)}>
                                                {time}
                                                </option>
                                            ))}
                                        </select>
                                    </span>
                                </li>
                                <li>픽업 매장<span>흑백책방 홍대점</span></li>
                                <li>수령 방법<span>바로픽업</span></li>
                                <li>수령인<span>{userInfo.name} / {formatPhone(userInfo.phone)}</span></li>
                                <li className="wrap-row">
                                    포장 옵션
                                    <span className="wrap-option">
                                        <label htmlFor="wrap">포장 서비스를 이용합니다. (+100원)</label>
                                        <input type="checkbox" id="wrap" checked={wrap} onChange={(e)=>setWrap(e.target.checked)}/>
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div className="order">
                            <h3>주문 상품</h3>
                            {items && items.map((item, idx)=>(
                            <div className="row" key={idx}>
                                <div className="thumb">
                                    <img src={item.thumb} alt={item.title} />
                                </div>
                                <div className="title">{item.title}</div>
                                <div className="origin">{item.price.toLocaleString()}원</div>
                                <div className="price">{Math.floor(item.price * 0.9).toLocaleString()}원</div>
                                <div className="qty">{item.quantity}</div>
                                <div className="t_price">{(Math.floor(item.price * 0.9) * item.quantity).toLocaleString()}원</div>
                            </div>
                            ))}
                        </div>
                    </div>
                    <div className="right">
                        <div className="payment">
                            <div className="row">
                                <span>상품 금액</span>
                                <span>{discountedTotal.toLocaleString()}원</span>
                            </div>
                            <div className="row">
                                <span>포장 옵션</span>
                                <span>{wrap ? "+100원" : "0원"}</span>
                            </div>
                            <div className="row">
                                <span>배송비</span>
                                <span>0원</span>
                            </div>
                            <div className="row discount">
                                <span>상품 할인</span>
                                <span>-{discountAmount.toLocaleString()}원</span>
                            </div>
                            <div className="total">
                                <span>결제 예정 금액</span>
                                <strong>{finalTotal.toLocaleString()}원</strong>
                            </div>
                            <div className="point">
                                <span>적립 예정 포인트</span>
                                <span>{point.toLocaleString()}P</span>
                            </div>
                            <button type="button" className="payBtn" onClick={payment}>결제하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PickUp;