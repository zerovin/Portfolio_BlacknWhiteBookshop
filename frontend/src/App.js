import { Fragment } from "react";
import {Routes, Route} from "react-router-dom";
import Header from "./components/main/Header";
import Footer from "./components/main/Footer";
import Home from "./components/main/Home";
import Join from "./components/member/Join";
import Login from "./components/member/Login";
import BookList from "./components/book/BookList";
import PickUp from "./components/pickup/PickUp";
import BoardList from "./components/board/BoardList";
import BoardInsert from "./components/board/BoardInsert";
import BoardDetail from "./components/board/BoardDetail";
import BoardUpdate from "./components/board/BoardUpdate";
import BoardDelete from "./components/board/BoardDelete";

function App() {
  return (
    <Fragment>
      <Header/>
      <div className="main_wrap">
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path={"/member/join"} element={<Join/>}/>
              <Route path={"/member/login"} element={<Login/>}/>
              <Route path={"/book/all"} element={<BookList/>}/>
              <Route path={"/book/pickup"} element={<PickUp/>}/>
              <Route path={"/board/list"} element={<BoardList/>}/>
              <Route path={"/board/insert"} element={<BoardInsert/>}/>
              <Route path={"/board/detail/:no"} element={<BoardDetail/>}/>
              <Route path={"/board/update/:no"} element={<BoardUpdate/>}/>
              <Route path={"/board/delete"} element={<BoardDelete/>}/>
          </Routes>
          <Footer/>
      </div>
    </Fragment>
  );
}

export default App;
