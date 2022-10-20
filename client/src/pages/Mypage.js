import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "./../components/Common/Input/FormInput";
import SubmitBtn from "./../components/Common/Button/SubmitBtn";
import OutlineBtn from "../components/Common/Button/OutlineBtn";
import styled from "styled-components";
import { fontSize } from "@mui/system";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import UBox from "../components/Mypage/UBox";
import SBox from "../components/Mypage/SBox";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

import Aside from "./../components/Common/Aside/aside";
import Nabvar from "./../components/Common/Nav/NavVar"
import axios from "axios";


const Divstyle1 = styled.div`
  width: 1520px;
  height: 800px;
  border: 1px solid #d9d9d9;
  float: right;
  padding: 30px;
  bottom: 0px;
  position: relative;
`;

const Divstyle2 = styled.div`
  width: 460px;
  height: 340px;
  border: 1px solid #d9d9d9;
  display: inline-block;
  float: left;
  padding: 30px;
  bottom: 0px;
  text-align: center;
`;

const Divstyle3 = styled.div`
  width: 460px;
  height: 210px;
  border: 1px solid #d9d9d9;
  position: absolute;
  float: left;
  padding: 30px;
  bottom: 50px;
`;

const DivStyle4 = styled.div`
  width: 940px;
  height: 680px;
  border: 1px solid #d9d9d9;
  float: right;
  margin-right: 30px;
  display: inline-block;
`;

const NavStyle = styled.div`
width: 78.5%;
float : right;
`

const TextStyle = styled.h1`
  font-size: 36px;
  color: #504d4d;
`;

const BtnStyle = styled.button`
  font-size: 20px;
  color: #3e80bd;
  border: none;
  background: none;
  cursor: pointer;
  font-weight: 400;
`;

// const MyButton = styled(Button)({
//   variant: "outlined",
//   height: 60,
//   width: 460,
//   marginBottom: 20,
//   fontSize: 18,

// });

let ppp = async() => {
  return await axios.post("http://localhost:8080/user/mypage", )
};

let pageLoad = () => {
  window.location.reload();
};

let Mypage = () => {



  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [change, setChange] = useState("");
  const [userData , setUserData] = useState({
    user_id : cookies.token.user_id,
    name : cookies.token.name,
    password : "",
    nickName : "",
  })


  useEffect(() => {
    console.log("cookie", cookies);
    if (cookies.token === undefined) {
      alert("로그인이 필요합니다.");
      navigate("../login");
    }
  }, []);

  
  let changeState = (name) => {
    console.log(name);
    console.log(cookies);
    setChange(name);
    return;
  };

  let state = (name) => {
    changeState(name);
    switch (name) {
      case "user":
        return <UBox></UBox>;
    }
  };

  return (
    <>
      <Aside></Aside>
      <NavStyle>
        <Nabvar></Nabvar>
      </NavStyle>
      <Divstyle1>
        <TextStyle>마이페이지</TextStyle>
        <Divstyle2>
          <hr
            style={{
              background: "#D9D9D9",
              height: 1.05,
              border: 0,
              marginBottom: 20,
            }}
          />

          <div style={{ width: 450, height: 250, margin: 10, border: "solid" }}>
            photo
          </div>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input hidden accept="image/*" type="file" />
            <PhotoCamera />
          </IconButton>
        </Divstyle2>
        <Divstyle3>
          <BtnStyle
            onClick={() => {
              changeState("user");
            }}
          >
            {" "}
            회원관리 및 수정
          </BtnStyle>
          <BtnStyle
            onClick={() => {
              changeState("bookmark");
            }}
            
          >
            {" "}
            북마크
          </BtnStyle>
          <BtnStyle
            onClick={() => {
              changeState("secession");
            }}
          >
            {" "}
            회원탈퇴{" "}
          </BtnStyle>
        </Divstyle3>
        <DivStyle4>
          <div style={{ margin: "30px" }}>
            {change === "user" ? (
              <UBox userData={userData}/>
            ) : change === "bookmark" ? (
              <p>아직 안만든 북마크</p>
            ) : change === "secession" ? (
              <SBox />
            ) : (
              <UBox userData={userData} />
            )}
          </div>
        </DivStyle4>
      </Divstyle1>
    </>
  );
};
export default Mypage;
