import { Fragment, useEffect, useState } from "react";
import apiClient from "../../http-commons";
import { Link } from "react-router-dom";

const Home=()=>{
    const [bestseller, setBestseller]=useState([]);
    const [newBook, setNewBook]=useState([]);

    useEffect(()=>{
        const mainData=async()=>{
            try{
                const resultBest=await apiClient.get('/main/best')
                const resultNew=await apiClient.get('/main/new')
                setBestseller(resultBest.data)
                setNewBook(resultNew.data)
            }catch(error){
                console.error(error)
            }
        }
        mainData();
    },[])

    return(
        <Fragment>
            <main>
            <div className="container">
                <div id="main">
                    <div className="greating">
                        <p>당신의 삶이 흑이여도 백이여도 당신의 삶을 응원합니다.</p> 
                        <p>안녕하세요. 흑백책방입니다.</p>
                    </div>
                    <div className="best">
                        <h2>best seller</h2>
                        <ul className="best_list">
                            {
                                bestseller.map((best, idx)=>(
                                    <li key={idx} className={idx===0?"winner":""}>
                                        <Link to={`/book/detail/${best.no}`}><img src={best.thumb} alt={best.title}/></Link>
                                    </li>
                                ))
                            }
                            <li><Link to={"/book/list/all?sort=best"} className="read_more"><i className="fa-solid fa-arrow-right"></i>더보기</Link></li>
                        </ul>
                    </div>
                    <div className="new">
                        <h2>new</h2>
                        <ul className="new_list">
                            <li><Link to="/book/list/all?sort=new" className="read_more"><i className="fa-solid fa-arrow-right"></i>더보기</Link></li>
                            {
                                newBook.map((n, idx)=>(
                                    <li key={idx}>
                                        <Link to={`/book/detail/${n.no}`}><img src={n.thumb} alt={n.title}/></Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </main>
        </Fragment>
    )
}

export default Home;