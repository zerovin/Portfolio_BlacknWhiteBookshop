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
import PickUpComplete from "./components/pickup/PickUpComplete.js";
import BoardList from "./components/board/BoardList";
import BoardInsert from "./components/board/BoardInsert";
import BoardDetail from "./components/board/BoardDetail";
import BoardUpdate from "./components/board/BoardUpdate";
import BoardDelete from "./components/board/BoardDelete";
import QnaList from "./components/qna/QnaList";
import QnaInsert from "./components/qna/QnaInsert";
import QnaDetail from "./components/qna/QnaDetail";
import QnaUpdate from "./components/qna/QnaUpdate";
import MyPage from "./components/mypage/MyPage";
import MyMain from "./components/mypage/MyMain";
import MyInfo from "./components/mypage/MyInfo";
import MyPwd from "./components/mypage/MyPwd";
import MyOrder from "./components/mypage/MyOrder";
import MyView from "./components/mypage/MyView";
import MyWish from "./components/mypage/MyWish";
import MyPost from "./components/mypage/MyPost";
import MyQnA from "./components/mypage/MyQnA";
import Admin from "./components/admin/AdminPage";
import AdminHome from "./components/admin/AdminHome";
import AdminMember from "./components/admin/AdminMember";
import AdminOrder from "./components/admin/AdminOrder";
import AdminBoard from "./components/admin/AdminBoard";
import AdminQna from "./components/admin/AdminQna";

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
              <Route path={"/pickup/order"} element={<PickUp/>}/>
              <Route path={"/pickup/complete"} element={<PickUpComplete/>}/>
              <Route path={"/board/list"} element={<BoardList/>}/>
              <Route path={"/board/insert"} element={<BoardInsert/>}/>
              <Route path={"/board/detail/:no"} element={<BoardDetail/>}/>
              <Route path={"/board/update/:no"} element={<BoardUpdate/>}/>
              <Route path={"/board/delete"} element={<BoardDelete/>}/>
              <Route path={"/qna/list"} element={<QnaList/>}/>
              <Route path={"/qna/insert"} element={<QnaInsert/>}/>
              <Route path={"/qna/detail/:qno"} element={<QnaDetail/>}/>
              <Route path={"/qna/update/:qno"} element={<QnaUpdate/>}/>
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
              <Route path={"/admin"} element={<Admin/>}>
                <Route index element={<AdminHome/>}/>
                <Route path="home" element={<AdminHome/>}/>
                <Route path="member" element={<AdminMember/>}/>
                <Route path="order" element={<AdminOrder/>}/>
                <Route path="board" element={<AdminBoard/>}/>
                <Route path="qna" element={<AdminQna/>}/>
              </Route>
          </Routes>
          <Footer/>
      </div>
    </Fragment>
  );
}

export default App;
