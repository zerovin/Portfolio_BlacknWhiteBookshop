
const MyOrder=()=>{
    const bookSearch=()=>{

    }
    return(
        <div id="Myorder">
            <div className="container">
                <div className="filter">
                    <select className="filter-select">
                        <option value={""}>전체</option>
                        <option value={"배송"}>바로배송</option>
                        <option value={"픽업"}>바로픽업</option>
                    </select>
                    <div className="search-box">
                        <input type="text" className="filter-search" placeholder="도서명 검색" value={bookSearch}/>
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
                            <tr>
                                <td>5</td>
                                <td>2025-05-15</td>
                                <td className="title">단 한 번의 삶</td>
                                <td>1</td>
                                <td>29,000원</td>
                                <td>배송</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>2025-05-15</td>
                                <td className="title">어른의 품격을 채우는 필사노트</td>
                                <td>1</td>
                                <td>29,000원</td>
                                <td>픽업</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>2025-05-15</td>
                                <td className="title">사카모토 데이즈</td>
                                <td>1</td>
                                <td>31,800원</td>
                                <td>픽업</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>2025-05-15</td>
                                <td className="title">듀얼 브레인</td>
                                <td>1</td>
                                <td>29,000원</td>
                                <td>픽업</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2025-05-15</td>
                                <td className="title">어른의 행복은 조용하다</td>
                                <td>1</td>
                                <td>19,500원</td>
                                <td>픽업</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default MyOrder