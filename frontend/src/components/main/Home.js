import { Fragment } from "react";

const Home=()=>{
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
                            <li className="winner"><a href="#"><img src="./img/ex1.jpg" alt="단 한 번의 삶"/></a></li>
                            <li><a href="#"><img src="./img/ex2.jpg" alt="듀얼브레인"/></a></li>
                            <li><a href="#"><img src="./img/ex3.jpg" alt="어른의 품격을 채우는 100일 필사 노트"/></a></li>
                            <li><a href="#"><img src="./img/ex4.jpg" alt="사카모토데이즈"/></a></li>
                            <li><a href="#"><img src="./img/ex5.jpg" alt="어른의 행복은 조용하다"/></a></li>
                            <li><a href="#"><img src="./img/ex6.jpg" alt="소년이 온다"/></a></li>
                            <li><a href="#"><img src="./img/ex7.jpg" alt="여학교의 별4"/></a></li>
                            <li><a href="#"><img src="./img/ex8.jpg" alt="작별하지 않는다"/></a></li>
                            <li><a href="#"><img src="./img/ex9.jpg" alt="젊은작가상 수상작품집"/></a></li>
                            <li><a href="#"><img src="./img/ex10.jpg" alt="모순"/></a></li>
                            <li><a href="#" className="read_more"><i className="fa-solid fa-arrow-right"></i>더보기</a></li>
                        </ul>
                    </div>
                    <div className="new">
                        <h2>new</h2>
                        <ul className="new_list">
                            <li><a href="#" className="read_more"><i className="fa-solid fa-arrow-right"></i>더보기</a></li>
                            <li><a href="#"><img src="./img/ex1.jpg" alt="단 한 번의 삶"/></a></li>
                            <li><a href="#"><img src="./img/ex2.jpg" alt="듀얼브레인"/></a></li>
                            <li><a href="#"><img src="./img/ex3.jpg" alt="어른의 품격을 채우는 100일 필사 노트"/></a></li>
                            <li><a href="#"><img src="./img/ex4.jpg" alt="사카모토데이즈"/></a></li>
                            <li><a href="#"><img src="./img/ex5.jpg" alt="어른의 행복은 조용하다"/></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
        </Fragment>
    )
}

export default Home;