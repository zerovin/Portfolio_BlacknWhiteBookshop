import { Fragment, useEffect, useState } from "react";
import apiClient from "../../http-commons"

const AdminOrder=()=>{
    const [orders, setOrders]=useState([])
    const [filter, setFilter]=useState([])
    const [method, setMethod]=useState('')
    const [keyword, setKeyword]=useState('')
    const [currentPage, setCurrentPage]=useState(1);
    const rowsize=10;
    const block=5;
    const [pageGroup, setPageGroup]=useState(0);

    const groupOrdersByOrderNo=(orders)=>{
        const grouped={}

        orders.forEach(order=>{
            const key=order.orderNo
            if (!grouped[key]){
                grouped[key]={
                    orderNo: order.orderNo,
                    orderNoText: order.orderNoText,
                    orderDate: order.orderDate,
                    titles: [order.title],
                    quantity: order.quantity,
                    total: order.total,
                    method: order.method,
                    userid: order.userid
                }
            }else{
                grouped[key].titles.push(order.title)
                grouped[key].quantity += order.quantity
                grouped[key].total += order.total
            }
        })

        return Object.values(grouped)
            .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
            .map(order => ({
                ...order,
                title: order.titles.length > 1
                    ? `${order.titles[0]} 외 ${order.titles.length - 1}종`
                    : order.titles[0]
            }))
    }

    useEffect(()=>{
        apiClient.post("/member/isLogin")
            .then(res=>{
                if(res.data.loginOk && res.data.userAuth==="ROLE_ADMIN"){
                    apiClient.get("/admin/order")
                        .then(res=>{
                            if(Array.isArray(res.data)){
                                const grouped=groupOrdersByOrderNo(res.data)
                                setOrders(grouped)
                                setFilter(grouped)
                            }else{
                                console.error(res.data)
                            }
                        }).catch(err=>console.error(err))
                }else{
                    alert("잘못된 접근입니다.")
                    navigator('/main/home')
                }
            }).catch(err=>console.error(err))
    }, [])

    useEffect(()=>{
        const lowerKeyword=keyword.toLowerCase()
        const result=orders.filter(order=>{
            const matchTitle=order.title.toLowerCase().includes(lowerKeyword)
            const matchMethod=method === "" || order.method === method
            return matchTitle && matchMethod
        })
        setFilter(result)
    }, [keyword, method, orders])

    useEffect(()=>{
        setCurrentPage(1);
        setPageGroup(0);
    },[filter])

    const formatDate=(str)=>{
        const d=new Date(str)
        return `${d.getFullYear()}-${(d.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`
    }

    const totalpage=Math.ceil(filter.length/rowsize);
    const startpage=pageGroup*block+1;
    const endpage=Math.min(startpage+block - 1, totalpage)
    const indexOfLastItem=currentPage*rowsize;
    const indexOfFirstItem=indexOfLastItem-rowsize;
    const currentItems=filter.slice(indexOfFirstItem, indexOfLastItem)
    const prev = () => {
        if (pageGroup > 0) {
          const newGroup = pageGroup - 1;
          setPageGroup(newGroup);
          setCurrentPage(newGroup*block + 1);
        }
    };
      
    const next = () => {
        if ((pageGroup+1)*block<totalpage) {
            const newGroup=pageGroup+1;
            setPageGroup(newGroup);
            setCurrentPage(newGroup*block + 1);
        }
    };

    const pageArr = [];
    for (let i=startpage;i<=endpage;i++) {
        pageArr.push(
            <li key={i} className={currentPage===i?"active":""}>
                <button onClick={()=>setCurrentPage(i)}>{i}</button>
            </li>
        );
    }

    return(
        <Fragment>
            <div id="adminorder">
                <div className="container">
                    <div className="filter">
                        <select className="filter-select" value={method}
                            onChange={(e)=>setMethod(e.target.value)}>
                            <option value={""}>전체</option>
                            <option value={"배송"}>바로배송</option>
                            <option value={"픽업"}>바로픽업</option>
                        </select>
                        <div className="search-box">
                            <input type="text" className="filter-search" placeholder="도서명 검색" value={keyword}
                                onChange={(e)=>setKeyword(e.target.value)} />
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
                                    <th>주문자</th>
                                    <th>주문내역</th>
                                    <th>수량</th>
                                    <th>결제 금액</th>
                                    <th>수령방식</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filter.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center', padding: '30px' }}>
                                            주문 내역이 없습니다.
                                        </td>
                                    </tr>
                                 ) : (
                                    currentItems.map(order => ( 
                                        <tr key={order.orderNoText}>
                                            <td>{order.orderNoText}</td>
                                            <td>{formatDate(order.orderDate)}</td>
                                            <td>{order.userid}</td>
                                            <td className="title">{order.title}</td>
                                            <td>{order.quantity}</td>
                                            <td>{order.total.toLocaleString()}원</td>
                                            <td>{order.method}</td>
                                        </tr>
                                    ))
                                )} 
                            </tbody>
                        </table>
                        <ul className="pagination">
                        {
                            startpage > 1 &&
                            <li>
                                <button onClick={prev}><i className="fa-solid fa-angle-left"></i></button>
                            </li>
                        }
                        {pageArr}
                        {
                            endpage < totalpage &&    
                            <li>
                                <button onClick={next}><i className="fa-solid fa-angle-right"></i></button>
                            </li>
                        }
                    </ul>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default AdminOrder;