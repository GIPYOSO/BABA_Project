import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import server from "./../config/server.json";

import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import UBox from "../components/Mypage/UBox";
import SBox from "../components/Mypage/SBox";
import Asid from "../components/Common/Aside/aside";

const Divstyle1 = styled.div`
  width: 75%;
  height: 800px;
  display: flex;
  /* flex-wrap: wrap; */
  /* flex-direction: column; */
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
  display: flex;
  float: left;
  padding: 30px;
  bottom: 0px;
  text-align: center;
  /* position: absolute; */
`;

const Divstyle3 = styled.div`
  width: 460px;
  height: 210px;
  display: flex;
  border: 1px solid #d9d9d9;
  position: absolute;
  float: left;
  padding: 30px;
  bottom: 50px;
`;

const DivStyle4 = styled.div`
  width: 940px;
  height: 680px;
  display: flex;
  border: 1px solid #d9d9d9;
  float: right;
  margin-right: 30px;
  display: inline-block;
`;

const TextStyle = styled.h1`
  width: 75%;
  height: 20px;
  font-size: 36px;
  color: #504d4d;
  position: absolute;
`;

const BtnStyle = styled.button`
  font-size: 20px;
  color: #3e80bd;
  border: none;
  background: none;
  cursor: pointer;
  font-weight: 400;
`;

let Mypage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [change, setChange] = useState("");
  const [userData, setUserData] = useState({
    user_id: cookies.token.user_id,
    password: "",
    name: cookies.token.name,
    profile_nick: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    console.log("내가 만든 쿠키", cookies);

    getUserData()
      .then((res) => {
        console.log(res);
        setUserData(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(userData);

  let changeState = (name) => {
    console.log(name);
    setChange(name);
    return;
  };

  // 유저 데이터를 가져오는 서버 요청 함수
  let getUserData = async () => {
    return await axios.post("http://localhost:8080/user/myPage", userData, {
      header: {
        accessToken: cookies.token.accessToken,
      },
    });
  };

  return (
    <>
      <Asid />
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
              <UBox />
            ) : change === "bookmark" ? (
              <p>아직 안만든 북마크</p>
            ) : change === "secession" ? (
              <SBox />
            ) : (
              <UBox />
            )}
          </div>
        </DivStyle4>
      </Divstyle1>
    </>
  );
};
export default Mypage;
