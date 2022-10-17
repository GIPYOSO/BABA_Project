import * as React from "react";
import styled from 'styled-components'
import homeImg from "./../../assets/images/homeimg1.jpg"
import Button from '@mui/material/Button';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const DivStyle1 = styled.div`
    width: 100%;
    min-height: 893px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`

const DivStyle2 = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
`

const TextStyle = styled.h2`
    font-size: 60px;
    color: #BDF2FF;
`

let Jumbotron = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const navigate = useNavigate();

    //로그인 상태가 아니면->로그인 페이지, 로그인 상태이면->회의록 페이지
    let onClickBtn = () => {
        //console.log(cookies.token);
        cookies.token === undefined ? navigate("/login") : navigate("/record")
    }
    return (
        <>
            <DivStyle1>
                <img src={homeImg} alt="대문 이미지" style={{ width: "100%", height: "893px", filter: "brightness(50%)"}} />
                <DivStyle2>
                    <div>
                        <TextStyle>UPGRADE YOUR MEETINGS</TextStyle>
                    </div>
                    <div>
                        <Button variant="outlined" size="large" style={{width: "150px", height: "60px", borderRadius: "15px", border: "1px solid #BDF2FF", color: "#BDF2FF", fontSize: "30px", margin: "60px"}}
                            onClick={onClickBtn}>START</Button>
                    </div>
                </DivStyle2>
            </DivStyle1>
        </>
    )
}
export default Jumbotron;