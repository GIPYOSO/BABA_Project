import * as React from "react";
import Aside from "../components/Common/Aside/Aside";
import Modal from "../components/Common/modal/Modal";
import MeMi from "../components/Common/MeetingMinutes/MeetingMinutes";
import "./../css/tabMenu.css";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom"; 


let RecordPage = () => {
  const [cookies, setCookie, reamoveCookie ] = useCookies(["token"]);
  const navigate = useNavigate();

  //로그인 되지 않은 경우 로그인 페이지로 전달
  useEffect(() => {
      console.log("cookie", cookies);
      if(cookies.token === undefined){
        alert("로그인이 필요합니다.");
        navigate("../login");
      }
  }, []);


  return (
    <>
      <Modal />
      <Aside />
      <MeMi />
    </>
  );
};
export default RecordPage;
