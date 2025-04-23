const Footer=()=>{
    return(
        <footer id="footer">
            <div className="container">
                <div className="left">
                    <p className="copy">copyright &copy; 2025 black & white bookshop</p>
                    <p>본 사이트는 포트폴리오 사이트로 제작되어 상업적 목적이 아닙니다.</p>
                    <p>사용된 이미지 및 폰트 등은 별도의 출처가 있음을 밝혀 드립니다.</p>
                </div>
                <div className="right">
                    <p>흑백서점</p>
                    <ul className="contact">
                        <li>
                            <span>이영빈</span>
                            <a href="mailto:amorfati9021@gmail.com" target="_blank">amorfati9021@gmail.com</a>
                        </li>
                        <li>
                            <span>맹주희</span>
                            <a href="mailto:juheemaeng@naver.com" target="_blank">juheemaeng@naver.com</a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer;