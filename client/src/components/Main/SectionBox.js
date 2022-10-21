import * as React from "react";
import styled from 'styled-components';
import image1 from "./../../assets/images/main_img1.png";
import image2 from "./../../assets/images/main_img2.png";
import image3 from "./../../assets/images/main_img3.png";


const DivStyle1 = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    padding-top: 100px;
    padding-bottom: 100px;
    
`

const DivStyle2 = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

`
const DivStyle3 = styled.div`
    width: 40%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: column;
    padding: 30px;
`
const DivStyle4 = styled.div`
    background-color: #002C45;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 100px;
`

const TextStyle1 = styled.h2`
    font-size: 40px;
    color: #004765;
    margin-bottom: 60px;
`

const TextStyle2 = styled.h3`
    font-size: 30px;
    margin-bottom: 60px;
    line-height: normal;
`
const TextStyle3 = styled.h4`
    font-size: 20px;
    line-height: normal;
`
const TextStyle4 = styled.h3`
    font-size: 30px;
    margin-bottom: 60px;
    color: #D6FDFF;
    line-height: normal;
`

const TextStyle5 = styled.h4`
    font-size: 20px;
    color: #D6FDFF;
    padding-bottom: 60px;
    line-height: normal;
`

const DivStyle5 = styled.div`
    width: 35%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: column;
    padding: 30px;
`



let SectionBox = () => {
    return (
        <>
            <DivStyle1>
                <TextStyle1>BADA 회의록 주요 기능</TextStyle1>
                <DivStyle2>
                    <img src={image1} alt="기능 1 이미지" style={{ width: "40%", padding: "30px", boxShadow: "-10px 5px 5px #d2d2d2", marginbottom: "60px"}} />
                    <DivStyle3 style={{padding: "30px 30px 30px 145px"}}>
                        <TextStyle2>녹음은 내가,<br/>회의록 작성은 AI가</TextStyle2>
                        <TextStyle3>녹음 파일을 올려보세요.<br/>
                            번거롭고 귀찮은 회의록 작성은 AI가 해줄게요.<br/>
                            생성된 회의록을 수정하고 파일로 내려받을 수 있어요.<br/>
                            회의 노트를 여러개 생성하고 관리해보세요.</TextStyle3>
                    </DivStyle3>
                </DivStyle2>

                <DivStyle2>
                    <DivStyle3 style={{padding: "30px 145px 30px 30px"}}>
                    <TextStyle2>쉽고 안전한 회의록 공유</TextStyle2>
                        <TextStyle3>링크를 통해 쉽게 회의록을 공유해보세요.<br/>
                            비밀번호를 설정해서 안전하게 회의 노트를 전달할 수 있어요.<br/></TextStyle3>
                    </DivStyle3>
                    <img src={image2} alt="기능 2 이미지" style={{ width: "40%", padding: "30px", boxShadow: "10px 5px 5px #d2d2d2", marginbottom: "60px"}} />
                </DivStyle2>
            </DivStyle1>
            <DivStyle4>
                    <img src={image3} alt="기능 3 이미지" style={{ width: "30%", padding: "30px"}} />
                    <DivStyle5>
                        <TextStyle4>오직 당신을 위한<br/>템플릿 기능</TextStyle4>
                        <TextStyle5>회의록 용도에 맞게 템플릿을 선택해보세요.<br/>
                            회의록을 보면서 메모를 하거나 일정과 할일을 정리할 수 있어요.<br/></TextStyle5>
                    </DivStyle5>
                </DivStyle4>
        </>
    )
}
export default SectionBox;