import {Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import HomeNav from "../components/HomeNav";
import {useTop} from "../util/commonEvent";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {useDispatch, useSelector} from "react-redux";

export default function Layout() {
  useTop();
  const [isDark, setIsDark] = useState(false);


  return (
    <div className="wrap">
      <Header></Header>
      <div className={`content ${isDark ? 'dark' : ''}`}>
        <Outlet></Outlet>
        <HomeNav type="sub"></HomeNav>
      </div>
      <Footer></Footer>
    </div>
  )
}