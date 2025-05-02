import { Fragment } from "react"
import { Link } from "react-router-dom";

const BoardDelete=()=>{
    return(
        <Fragment>
            <div id="BoardDelete">
                <div className="container">
                    <div className="top">
                        <h3>자유게시판</h3>
                    </div>
                    <div className="boarddelete"></div>
                </div>
            </div>
        </Fragment>
    )
}

export default BoardDelete