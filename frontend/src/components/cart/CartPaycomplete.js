import { Fragment } from "react"
import { Link } from "react-router-dom";

const CartPaycomplete=()=>{
    return(
        <Fragment>
            <div id="paycomplete">
                <div className="container">
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