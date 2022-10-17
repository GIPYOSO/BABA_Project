import * as React from "react";
import styled from 'styled-components'
import logo from "./../../assets/images/BADA_logo_full.png";

const DivStyle1 = styled.div`
    width: 100%;
    min-height: 309px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #C9C9C9;
`;

const TextStyle = styled.h1`
    font-size: 20px;
    color: #FFFFFF; 
`

let Footer = () => {
    return (
        <>
            <footer>
                <DivStyle1>
                    <h1>
                        <img src={logo} alt="로고" style={{width: "200px"}} />
                    </h1>
                    <TextStyle>Copyright © 2022. BADA. All rights reserved.</TextStyle>
                </DivStyle1>
            </footer>
        </>
    )
}
export default Footer;