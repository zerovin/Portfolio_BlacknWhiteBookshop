import { Fragment } from "react";

const PickUp=()=>{
    return(
        <Fragment>
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
                                    <li>픽업 가능일<span><input type="date"/>
                                        <select>
                                            <option>10:00</option>
                                            <option>12:00</option>
                                            <option>14:00</option>
                                            <option>16:00</option>
                                            <option>18:00</option>
                                            <option>20:00</option>
                                        </select></span>
                                    </li>
                                    <li>픽업 매장<span>흑백책방 홍대점</span></li>
                                    <li>수령 방법<span>바로픽업</span></li>
                                    <li>수령인<span>맹주희 / 010-1234-1234</span></li>
                                    <li className="wrap-row">
                                        포장 옵션
                                        <span className="wrap-option">
                                            <label htmlFor="wrap">포장 서비스를 이용합니다. (+100원)</label>
                                            <input type="checkbox" id="wrap" />
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div className="order">
                                <h3>주문 상품</h3>
                                <div className="row">
                                    <div className="thumb">
                                        <img src="/img/ex1.jpg" alt="책 썸네일" />
                                    </div>
                                    <div className="title">단 한 번의 삶</div>
                                    <div className="origin">16,800원</div>
                                    <div className="price">15,120원</div>
                                    <div className="qty">1</div>
                                    <div className="t_price">15,120원</div>
                                </div>
                                <div className="row">
                                    <div className="thumb">
                                        <img src="/img/ex2.jpg" alt="책 썸네일" />
                                    </div>
                                    <div className="title">듀얼 브레인</div>
                                    <div className="origin">16,800원</div>
                                    <div className="price">15,120원</div>
                                    <div className="qty">1</div>
                                    <div className="t_price">15,120원</div>
                                </div>
                                <div className="row">
                                    <div className="thumb">
                                        <img src="/img/ex3.jpg" alt="책 썸네일" />
                                    </div>
                                    <div className="title">100가지의 필사노트</div>
                                    <div className="origin">16,800원</div>
                                    <div className="price">15,120원</div>
                                    <div className="qty">1</div>
                                    <div className="t_price">15,120원</div>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <div className="payment">
                                <div className="row">
                                    <span>상품 금액</span>
                                    <span>22,000원</span>
                                </div>
                                <div className="row">
                                    <span>포장 옵션</span>
                                    <span>+100원</span>
                                </div>
                                <div className="row">
                                    <span>배송비</span>
                                    <span>0원</span>
                                </div>
                                <div className="row discount">
                                    <span>상품 할인</span>
                                    <span>-2,200원</span>
                                </div>
                                <div className="total">
                                    <span>결제 예정 금액</span>
                                    <strong>0원</strong>
                                </div>
                                <div className="point">
                                    <span>적립 예정 포인트</span>
                                    <span>1,100P</span>
                                </div>
                                <button type="button" className="payBtn">결제하기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default PickUp;