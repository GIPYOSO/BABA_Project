import * as React from "react";
import styled from "styled-components";
import logo from "./../../assets/images/BADA_logo_full.png";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

const DivStyle1 = styled.div`
  width: 100%;
  max-height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DivStyle2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 30px;
`;

const BtnStyle = styled.button`
  border: none;
  background-color: transparent;
  text-decoration-line: none;
  font-size: 28px;
  color: #324c7a;
`;

let Header = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  let logOutBtn = () => {
    removeCookie("token", { path: "/" });
    navigate("/");
  };

  return (
    <>
      <DivStyle1>
        <h1 style={{ paddingLeft: "30px" }}>
          <img src={logo} alt="로고" width="190px" />
        </h1>
        <DivStyle2>
          {
            //로그인이 되어 있지 않으면 Login SignUp, 로그인이 되어 있으면 LogOut
            cookies.token === undefined ? (
              <>
                <Link to="/login">
                  <BtnStyle>Login</BtnStyle>
                </Link>
                <Link to="/signUp">
                  <BtnStyle>Signup</BtnStyle>
                </Link>
              </>
            ) : (
              <BtnStyle onClick={logOutBtn}>Logout</BtnStyle>
            )
          }
        </DivStyle2>
      </DivStyle1>
    </>
  );
};
export default Header;
