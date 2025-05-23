import { Link } from "react-router-dom"

const PickUpComplete=()=>{
    return(
        <div id="PickUp">
            <div className="container">
                <div className="top">
                    <h3>바로픽업</h3>
                    <div className="process_3">
                        <p><span>1</span> 장바구니</p>
                        <p><span>2</span> 주문/결제</p>
                        <p><span>3</span> 주문완료</p>
                    </div>
                </div> 
                <div className="complete">  
                    <p className="success">결제가 성공적으로 완료되었습니다 🎉</p>
                    <div className="after_btn">
                        <Link to="/book/list/all">계속 둘러보기</Link>
                        <Link to="/mypage/order">구매내역 보기</Link>
                    </div>
                </div>     
            </div>
        </div>
    )
}

export default PickUpComplete