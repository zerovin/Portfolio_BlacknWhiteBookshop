import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

const BookDetail=()=>{
    useEffect(()=>{
        window.scrollTo({top:0, behavior:'auto'})

    },[])

    return(
        <Fragment>
            <div id="bookDetail">
                <div className="container">
                    <div className="bread_crumb">
                        <Link to={"/book/all"}><i class="fa-solid fa-house"></i></Link>
                        <p>&gt;</p>
                        <Link to={"/book/+category"}>category</Link>
                    </div>
                    <div className="detail_wrap">
                        <div className="img_wrap">
                            <img src="../../img/ex1.jpg" alt=""/>
                        </div>
                        <div className="text">
                            <h3 className="title">단 한 번의 삶</h3>
                            <div className="info">
                                <p>김영하 저</p>
                                <p>복복서가</p>
                            </div>
                            <p className="date">2025년 04월 06일</p>
                            <p className="sales"><span>판매지수</span> 123,456</p>
                            <div className="price">
                                <p className="dis">15,120원</p>
                                <p className="prime">16,800원</p>
                                <p className="percent">10% 할인</p>
                            </div>
                            <div className="text_bottom">
                                <div>
                                    <p>적립금</p>
                                    <p>840원 <span>5% 적립</span></p>
                                </div>
                                <div>
                                    <p>배송비</p>
                                    <p>무료 <span>해외배경의 경우 지역에 따라 상이</span></p>
                                </div>
                            </div>
                            <div className="cal">
                                <div className="amount">
                                    <button className="miunus"><i class="fa-solid fa-minus"></i></button>
                                    <p>1</p>
                                    <button className="plus"><i class="fa-solid fa-plus"></i></button>
                                </div>
                                <p className="total"><span>15,120</span>원</p>
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
                                <p>인생은 탐구하면서 살아가는 것이 아니라, 살아가면서 탐구하는 것이다.
                                실수는 되풀이된다. 그것이 인생이다…….</p>
                            </div>
                            <div className="contents">
                                <h4 className="sub_tt">목차</h4>
                                <p>1 생의 외침<br/>
2 거짓말들<br/>
3 사람이 있는 풍경<br/>
4 슬픈 일몰의 아버지<br/>
5 희미한 사랑의 그림자<br/>
6 오래전 그 십 분의 의미<br/>
7 불행의 과장법<br/>
8 착한 주리<br/>
9 선운사 도솔암 가는 길에<br/>
10 사랑에 관한 세 가지 메모</p>
                            </div>
                            <div className="detail_img">
                                <h4 className="sub_tt">출판사 제공 책소개</h4>
                                <img src="../../img/ex1.jpg" alt=""/>
                            </div>
                        </div>
                        <div className="right">
                            <div className="mini_info">
                                <img src="../../img/ex1.jpg" alt=""/>
                                <h5>단 한 번의 삶 단 한 번의 삶 단 한 번의 삶 단 한 번의 삶</h5>
                            </div>
                            <div className="cal">
                                <div className="amount">
                                    <button className="miunus"><i class="fa-solid fa-minus"></i></button>
                                    <p>1</p>
                                    <button className="plus"><i class="fa-solid fa-plus"></i></button>
                                </div>
                                <p className="total"><span>15,120</span>원</p>
                            </div>
                            <p className="alert">실결제 금액은 적립금, 쿠폰 등에 따라 달라질 수 있습니다.</p>
                            <div className="btns">
                                <button>장바구니</button>
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