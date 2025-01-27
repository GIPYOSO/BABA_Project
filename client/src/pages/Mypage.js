import * as React from "react";
import { useState } from "react";
import axios from "axios";
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
import { useNavigate } from "react-router-dom";
import Aside from "./../components/Common/Aside/aside";
import Nabvar from "./../components/Common/Nav/NavVar";
import userPhoto from "./../assets/images/user.png"

const Divstyle1 = styled.div`
  max-width: 1519px;
  width: 100%;
  height: 800px;
  /* border: 1px solid #d9d9d9; */
  float: right;
  bottom: 0px;
  padding: 30px;
  box-sizing: border-box;
  position: relative;
`;

const Divstyle2 = styled.div`
  width: 460px;
  height: 340px;
  border: 1px solid #d9d9d9;
  display: inline-block;
  padding: 30px;
  text-align: center;
`;

const Divstyle3 = styled.div`
  width: 460px;
  height: 200px;
  border: 1px solid #d9d9d9;
  position: absolute;
  padding: 30px;
  bottom: 35px;
`;

const DivStyle4 = styled.div`
  width: 900px;
  height: 680px;
  border: 1px solid #d9d9d9;
  box-sizing: border-box;
  float: right;
`;

const NavStyle = styled.div`
  width: 80%;
  float: right;
`;

const TextStyle = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
  color: #504d4d;
`;

const BtnStyle = styled.div`
  font-size: 20px;
  color: #3e80bd;
  border: 1px solid #3e80bd;
  /* background: black; */
  cursor: pointer;
  font-weight: 400;
  width: 29rem;
  height: 2.2rem;
  text-align: center;
  margin-bottom: 20px;
  padding-top: 15px;
`;

const TextDiv = styled.div`
  width: 20rem;
  height: 50px;
  background: black;
`;

// const MyButton = styled(Button)({
//   variant: "outlined",
//   height: 60,
//   width: 460,
//   marginBottom: 20,
//   fontSize: 18,

// });

let ppp = async () => {
  return await axios.post("http://localhost:8080/user/mypage");
};

let pageLoad = () => {
  window.location.reload();
};

let Mypage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [change, setChange] = useState("");
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    user_id: cookies.token.user_id,
    name: cookies.token.name,
    password: "",
    nickName: cookies.token.profile_nick,
  });

  let logOutBtn = () => {
    removeCookie("token", { path: "/" });
    navigate("/");
  };

  console.log("쿠키입니다", cookies.token);

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
         
            <img src={userPhoto} style={{width : 340, height : 340}}></img>
     
        </Divstyle2>
        <Divstyle3>
          <BtnStyle
            onClick={() => {
              changeState("user");
            }}
          >
            {" "}
            회원정보
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
              <UBox userData={userData} />
            ) : change === "bookmark" ? (
              <p>아직 안만든 북마크</p>
            ) : change === "secession" ? (
              <SBox userData={userData} />
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
