import styled from "styled-components";
import FormInput from "../Common/Input/FormInput";
import SubmitBtn from "../Common/Button/SubmitBtn";
import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Cookies, useCookies } from "react-cookie";

const TextStyle = styled.h1`
  font-size: 36px;
  color: #504d4d;
  margin-bottom: 10px;
`;


const Button = styled.button`
border: none;
height:60px;
border-radius: 5px;
  `

let SBox = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({
    user_id: cookies.token.user_id,
    password: "",
  });

  useEffect(() => {
    setUserData({
      user_id: cookies.token.user_id,
      password: password,
    });
    console.log("skskskssk", userData);
  }, [password]);

  let setBtn = () => {
    setUserData({
      user_id: cookies.token.user_id,
      password: password,
    });
    console.log("유저데이터", userData);
    getUserData();
  };

  let getUserData = async () => {
    await axios
      .post("http://localhost:8080/user/delete", userData)
      .then((res) => {
        console.log(res);
        if (res.data.status) {
          removeCookie("token", { path: "/" });
          alert("회원정보를 삭제했습니다");
          navigate("/");
        } else {
          alert(res.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <TextStyle> 회원탈퇴 </TextStyle>
      <hr
        style={{
          background: "#D9D9D9",
          height: 1.05,
          border: 0,
          bottom: 20,
        }}
      />
      <p>탈퇴를 원하신다면 비밀번호를 입력한 뒤 탈퇴버튼을 눌러주세요</p>
      <TextField
        id="password"
        name="password"
        type="password"
        label="Password"
        placeholder="Password"
        fullWidth
        margin="normal"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      {/* <input>dkdkdkd</input> */}
      <div style={{ textAlign: "right" }}>
        <Button>
        <button onClick={setBtn} 
        style={{ width: 160 ,height:50, backgroundColor:'#569EE1', color : 'white', fontSize:'20px', borderRadius: '5px', border:'none',  cursor: "pointer" }}>탈퇴</button>
        </Button>
        {/* <SubmitBtn  onClick={setBtn} label={"탈퇴"} /> */}
      </div>
    </>
  );
};
export default SBox;
