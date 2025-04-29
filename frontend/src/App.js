import { Fragment } from "react";
import {Routes, Route} from "react-router-dom";
import Header from "./components/main/Header";
import Footer from "./components/main/Footer";
import Home from "./components/main/Home";
import Join from "./components/member/Join";
import BookList from "./components/book/BookList";

function App() {
  return (
    <Fragment>
      <Header/>
      <div className="main_wrap">
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path={"/member/join"} element={<Join/>}/>
              <Route path={"/book/all"} element={<BookList/>}/>
          </Routes>
          <Footer/>
      </div>
    </Fragment>
  );
}

export default App;
