import * as React from "react";
import styled from 'styled-components';
import image1 from "./../../assets/images/ex1.png";

const DivStyle1 = styled.div`
    width: 100%;
    max-height: 769px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    padding-bottom: 100px;
//    background-color: #002C45;
`

const DivStyle2 = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`

const DivStyle3 = styled.div`
    width: 25%;
    display: flex;
    flex-wrap: wrap;
//    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    padding: 30px;
`

const TextStyle1 = styled.h2`
    font-size: 40px;
    padding-bottom: 40px;
//    color: #BDF2FF;
`

const TextStyle2 = styled.h3`
    font-size: 30px;
    padding-top: 20px;
//    color: #FFFFFF;
`

let SectionBox2 = () => {
    return (
        <>
            <DivStyle1>
                <TextStyle1>다양한 템플릿 기능</TextStyle1>
                <DivStyle2>
                    <DivStyle3>
                        <img src={image1} alt="기능 1 이미지" style={{ width: "95%"}} />
                        <TextStyle2>MEMO</TextStyle2>
                    </DivStyle3>

                    <DivStyle3>
                        <img src={image1} alt="기능 1 이미지" style={{ width: "95%"}} />
                        <TextStyle2>CALENDAL</TextStyle2>
                    </DivStyle3>

                    <DivStyle3>
                        <img src={image1} alt="기능 1 이미지" style={{ width: "95%"}} />
                        <TextStyle2>TO-DO LIST</TextStyle2>
                    </DivStyle3>
                </DivStyle2>
            </DivStyle1>
        </>
    )
}
export default SectionBox2;