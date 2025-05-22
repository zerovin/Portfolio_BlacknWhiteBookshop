
const MyOrder=()=>{
 
    return(
        <div id="Myorder">
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>도서명</th>
                            <th>수량</th>
                            <th>금액</th>
                            <th>구매일</th>
                            <th>수령방식</th>
                            {/* <th>상태</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><img src="/img/ex1.jpg" alt="도서" /></td>
                            <td className="title">단 한 번의 삶</td>
                            <td>1</td>
                            <td>29,000원</td>
                            <td>2025-05-15</td>
                            <td>배송</td>
                            {/* <td>배송중</td> */}
                        </tr>
                        <tr>
                            <td><img src="/img/ex2.jpg" alt="도서" /></td>
                            <td className="title">어른의 품격을 채우는 필사노트</td>
                            <td>1</td>
                            <td>29,000원</td>
                            <td>2025-05-14</td>
                            <td>픽업</td>
                            {/* <td>픽업 완료</td> */}
                        </tr>
                        <tr>
                            <td><img src="/img/ex3.jpg" alt="도서" /></td>
                            <td className="title">사카모토 데이즈</td>
                            <td>1</td>
                            <td>31,800원</td>
                            <td>2025-05-14</td>
                            <td>픽업</td>
                            {/* <td>픽업 완료</td> */}
                        </tr>
                        <tr>
                            <td><img src="/img/ex4.jpg" alt="도서" /></td>
                            <td className="title">듀얼 브레인</td>
                            <td>1</td>
                            <td>29,000원</td>
                            <td>2025-05-14</td>
                            <td>픽업</td>
                            {/* <td>픽업 완료</td> */}
                        </tr>
                        <tr>
                            <td><img src="/img/ex5.jpg" alt="도서" /></td>
                            <td className="title">어른의 행복은 조용하다</td>
                            <td>1</td>
                            <td>19,500원</td>
                            <td>2025-05-14</td>
                            <td>픽업</td>
                            {/* <td>픽업 완료</td> */}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MyOrder