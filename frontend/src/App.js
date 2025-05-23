import { Fragment } from "react";
import {Routes, Route} from "react-router-dom";
import Header from "./components/main/Header";
import Footer from "./components/main/Footer";
import Home from "./components/main/Home";
import Join from "./components/member/Join";
import Login from "./components/member/Login";
import BookList from "./components/book/BookList";
import BookDetail from "./components/book/BookDetail";
import CartList from "./components/cart/CartList";
import CartOrder from "./components/cart/CartOrder";
import CartPaycomplete from "./components/cart/CartPaycomplete.js";
import PickUp from "./components/pickup/PickUp";
import BoardList from "./components/board/BoardList";
import BoardInsert from "./components/board/BoardInsert";
import BoardDetail from "./components/board/BoardDetail";
import BoardUpdate from "./components/board/BoardUpdate";
import BoardDelete from "./components/board/BoardDelete";
import MyPage from "./components/mypage/MyPage";
import MyMain from "./components/mypage/MyMain";
import MyInfo from "./components/mypage/MyInfo";
import MyPwd from "./components/mypage/MyPwd";
import MyOrder from "./components/mypage/MyOrder";
import MyView from "./components/mypage/MyView";
import MyWish from "./components/mypage/MyWish";
import MyPost from "./components/mypage/MyPost";
import MyQnA from "./components/mypage/MyQnA";

function App() {
  return (
    <Fragment>
      <Header/>
      <div className="main_wrap">
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path={"/member/join"} element={<Join/>}/>
              <Route path={"/member/login"} element={<Login/>}/>
              <Route path={"/book/list/:cate"} element={<BookList/>}/>
              <Route path={"/book/detail/:no"} element={<BookDetail/>}/>
              <Route path={"/cart/list"} element={<CartList/>}/>
              <Route path={"/cart/order"} element={<CartOrder/>}/>
              <Route path={"/cart/paycomplete"} element={<CartPaycomplete/>}/>
              <Route path={"/book/pickup"} element={<PickUp/>}/>
              <Route path={"/board/list"} element={<BoardList/>}/>
              <Route path={"/board/insert"} element={<BoardInsert/>}/>
              <Route path={"/board/detail/:no"} element={<BoardDetail/>}/>
              <Route path={"/board/update/:no"} element={<BoardUpdate/>}/>
              <Route path={"/board/delete"} element={<BoardDelete/>}/>
              <Route path={"/mypage"} element={<MyPage/>}>
                <Route index element={<MyMain/>}/>
                <Route path="main" element={<MyMain/>}/>
                <Route path="info" element={<MyInfo/>}/>
                <Route path="pwd" element={<MyPwd/>}/>
                <Route path="order" element={<MyOrder/>}/>
                <Route path="view" element={<MyView/>}/>
                <Route path="wish" element={<MyWish/>}/>
                <Route path="post" element={<MyPost/>}/>
                <Route path="qna" element={<MyQnA/>}/>
              </Route>
          </Routes>
          <Footer/>
      </div>
    </Fragment>
  );
}

export default App;
