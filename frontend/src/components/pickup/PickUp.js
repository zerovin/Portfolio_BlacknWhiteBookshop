import { Fragment } from "react";

const PickUp=()=>{
    return(
        <Fragment>
            <div id="PickUp">
                <div className="container">
                    <div className="top">
                        <h3>바로픽업</h3>
                    </div>
                    <div className="content">
                        <div className="left">
                            <div className="pickup_info">
                                <h3>픽업 정보</h3>
                                <ul>
                                    <li><strong>픽업 가능일</strong><span>2025년 5월 1일</span></li>
                                    <li><strong>방문할 매장</strong><span>분당점</span></li>
                                    <li><strong>선택 유형</strong><span>바로픽업존에서 받기</span></li>
                                </ul>
                            </div>
                            <div className="member_info">
                                <h3>주문자 정보</h3>
                                <div className="row">
                                    <span>고홍시 / 010-1234-1234</span>
                                    <button type="button" className="changeBtn">변경</button>
                                </div>
                            </div>
                            <div className="order">
                                <h3>주문 상품</h3>
                                <div className="row">
                                    <img src="/img/ex1.jpg" alt="책 썸네일" />
                                    <div className="product">
                                        <p className="title">단 한 번의 삶</p>
                                        <p className="option">바로픽업 / 1개</p>
                                        <p className="price">15,120원 <span className="origin">16,800원</span></p>
                                    </div>
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
                                <div className="row">
                                    <span>포인트 사용</span>
                                    <span>0원</span>
                                </div>
                                <div className="total">
                                    <strong>결제 금액</strong>
                                    <strong>0원</strong>
                                </div>
                                <div className="point">
                                    <span>적립 예정 포인트</span>
                                    <span>1,100P</span>
                                </div>
                                <div className="agreement">
                                    <input type="checkbox" id="agree" />
                                    <label htmlFor="agree">&nbsp;위 주문내용을 확인하였으며, 결제에 동의합니다.</label>
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