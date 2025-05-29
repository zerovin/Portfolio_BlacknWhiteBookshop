import { Fragment } from "react";

const AdminOrder=()=>{
    return(
        <Fragment>
            <div id="adminorder">
                <div className="container">
                    <div className="filter">
                        <select className="filter-select" value=""
                            onChange="">
                            <option value={""}>전체</option>
                            <option value={"배송"}>바로배송</option>
                            <option value={"픽업"}>바로픽업</option>
                        </select>
                        <div className="search-box">
                            <input type="text" className="filter-search" placeholder="도서명 검색" value=""
                                onChange="" />
                            <button className="search-button">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                    </div>
                    <div className="order-list">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>주문번호</th>
                                    <th>주문일</th>
                                    <th>주문내역</th>
                                    <th>수량</th>
                                    <th>결제 금액</th>
                                    <th>수령방식</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {filtered.length === 0 ? ( */}
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center', padding: '30px' }}>
                                            주문 내역이 없습니다.
                                        </td>
                                    </tr>
                                {/* ) : (
                                    filtered.map(order => ( */}
                                        <tr key="">
                                            <td></td>
                                            <td></td>
                                            <td className="title"></td>
                                            <td></td>
                                            <td>원</td>
                                            <td></td>
                                        </tr>
                                    {/* ))
                                )} */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default AdminOrder;