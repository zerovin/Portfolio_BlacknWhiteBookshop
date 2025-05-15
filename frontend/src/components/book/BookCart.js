import { Fragment } from "react";
import { Link } from "react-router-dom";

const BookCart=()=>{
    return(
        <Fragment>
            <div id="bookCart">
                <div className="container">
                    <div className="top">
                        <h3>장바구니 &#91;1&#93;</h3>
                        <div className="process">
                            <p><span>1</span> 장바구니</p>
                            <p><span>2</span> 주문/결제</p>
                            <p><span>3</span> 주문완료</p>
                        </div>
                    </div>
                    <div className="grid_wrap">
                        <div className="left">
                            <div className="table_top">
                                <input type="checkbox" id="all_check" className="hidden"/>
                                <label htmlFor="all_check">전체선택</label>
                            </div>
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
                                    <tr>
                                        <td className="td_check">
                                            <input type="checkbox" id="check1" className="hidden"/>
                                            <label htmlFor="check1">선택</label>
                                        </td>
                                        <td className="book_info">
                                            <Link to={"/book/detail/1"}>
                                                <img src="../../img/ex1.jpg" alt="title"/>
                                            </Link>
                                            <div className="info_text">
                                                <p>사는 동안 틈틈이 행복합니다</p>
                                                <div className="price">
                                                    <p className="percent">10%</p>
                                                    <p className="dis">16,020원</p>
                                                    <p className="prime">17,800원</p>
                                                    <p className="point">&#40;890P&#41;</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="price_amt">
                                            <p className="t_price">16,020원</p>
                                            <div className="amount">
                                                <button className="miunus"><i className="fa-solid fa-minus"></i></button>
                                                <p>1</p>
                                                <button className="plus"><i className="fa-solid fa-plus"></i></button>
                                            </div>
                                        </td>
                                        <td className="delivery">
                                            <div>
                                                <p>당일배송</p>
                                                <p>오늘(5/16, 금) 도착</p>
                                            </div>
                                            <div>
                                                <p>바로픽업</p>
                                                <p>오늘(5/16, 금)부터 수령 가능</p>
                                            </div>
                                        </td>
                                        <td>
                                            <button><i className="fa-solid fa-xmark"></i></button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="td_check">
                                            <input type="checkbox" id="check2" className="hidden"/>
                                            <label htmlFor="check2">선택</label>
                                        </td>
                                        <td className="book_info">
                                            <Link to={"/book/detail/1"}>
                                                <img src="../../img/ex1.jpg" alt="title"/>
                                            </Link>
                                            <div className="info_text">
                                                <p>사는 동안 틈틈이 행복합니다</p>
                                                <div className="price">
                                                    <p className="percent">10%</p>
                                                    <p className="dis">16,020원</p>
                                                    <p className="prime">17,800원</p>
                                                    <p className="point">&#40;890P&#41;</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="price_amt">
                                            <p className="t_price">16,020원</p>
                                            <div className="amount">
                                                <button className="miunus"><i className="fa-solid fa-minus"></i></button>
                                                <p>1</p>
                                                <button className="plus"><i className="fa-solid fa-plus"></i></button>
                                            </div>
                                        </td>
                                        <td className="delivery">
                                            <div>
                                                <p>당일배송</p>
                                                <p>오늘(5/16, 금) 도착</p>
                                            </div>
                                            <div>
                                                <p>바로픽업</p>
                                                <p>오늘(5/16, 금)부터 수령 가능</p>
                                            </div>
                                        </td>
                                        <td>
                                            <button><i className="fa-solid fa-xmark"></i></button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="td_check">
                                            <input type="checkbox" id="check3" className="hidden"/>
                                            <label htmlFor="check3">선택</label>
                                        </td>
                                        <td className="book_info">
                                            <Link to={"/book/detail/1"}>
                                                <img src="../../img/ex1.jpg" alt="title"/>
                                            </Link>
                                            <div className="info_text">
                                                <p>사는 동안 틈틈이 행복합니다</p>
                                                <div className="price">
                                                    <p className="percent">10%</p>
                                                    <p className="dis">16,020원</p>
                                                    <p className="prime">17,800원</p>
                                                    <p className="point">&#40;890P&#41;</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="price_amt">
                                            <p className="t_price">16,020원</p>
                                            <div className="amount">
                                                <button className="miunus"><i className="fa-solid fa-minus"></i></button>
                                                <p>1</p>
                                                <button className="plus"><i className="fa-solid fa-plus"></i></button>
                                            </div>
                                        </td>
                                        <td className="delivery">
                                            <div>
                                                <p>당일배송</p>
                                                <p>오늘(5/16, 금) 도착</p>
                                            </div>
                                            <div>
                                                <p>바로픽업</p>
                                                <p>오늘(5/16, 금)부터 수령 가능</p>
                                            </div>
                                        </td>
                                        <td>
                                            <button><i className="fa-solid fa-xmark"></i></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="right">
                            <div className="buy_info">
                                <div>
                                    <p>상품 금액</p>
                                    <p className="bold">17,800원</p>
                                </div>
                                <div>
                                    <p>배송비</p>
                                    <p>+ 0원</p>
                                </div>
                                <div>
                                    <p>상품 할인</p>
                                    <p className="bold">- 1,780원</p>
                                </div>
                                <div className="total">
                                    <p className="bold">결제 예정 금액</p>
                                    <p className="total_price">16,020원</p>
                                </div>
                                <div className="gray">
                                    <p>적립 예정 포인트</p>
                                    <p>890 P</p>
                                </div>
                                <Link to={"/book/buy"} className="buy">주문하기 (1)</Link>
                            </div>
                            <Link to={"/book/pickup"}>바로픽업 주문 (1)</Link>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default BookCart;