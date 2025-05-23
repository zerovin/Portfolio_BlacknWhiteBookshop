import { Fragment } from "react"
import { Link } from "react-router-dom";

const CartPaycomplete=()=>{
    return(
        <Fragment>
            <div id="paycomplete">
                <div className="container">
                    <div className="top">
                        <h3>주문/결제</h3>
                        <div className="process">
                            <p><span>1</span> 장바구니</p>
                            <p><span>2</span> 주문/결제</p>
                            <p><span>3</span> 주문완료</p>
                        </div>
                    </div>
                    <p className="success">결제가 성공적으로 완료되었습니다 🎉</p>
                    <div className="after_btn">
                        <Link to="/book/list/all">계속 둘러보기</Link>
                        <Link to="/mypage/order">구매내역 보기</Link>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default CartPaycomplete;