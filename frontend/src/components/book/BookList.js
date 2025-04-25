import { Fragment } from "react";

const BookList=()=>{
    return(
        <Fragment>
            <div id="bookList">
                <div className="container">
                    <div className="top">
                        <h3>전체</h3>
                        <ul className="filter">
                            <li>베스트 순</li>
                            <li>신상품 순</li>
                        </ul>
                    </div>
                    <ul className="book_list">
                        <li></li>
                    </ul>
                </div>
            </div>
        </Fragment>
    )
}

export default BookList;