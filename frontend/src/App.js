import { Fragment } from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/main/Header";
import Footer from "./components/main/Footer";
import Home from "./components/main/Home";

function App() {
  return (
    <Fragment>
        <Router>
            <Header/>
            <div className="main_wrap">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                </Routes>
                <Footer/>
            </div>
        </Router>
    </Fragment>
  );
}

export default App;
