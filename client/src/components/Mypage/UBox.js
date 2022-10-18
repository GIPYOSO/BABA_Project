import styled from "styled-components";
import FormInput from "../Common/Input/FormInput";
import SubmitBtn from "../Common/Button/SubmitBtn";


const TextStyle = styled.h1`
font-size: 36px;
color: #504d4d;
`;

let UBox = () => {
    

    return(
      <>
      <TextStyle> 회원관리 및 수정 </TextStyle>

      <hr
        style={{
          background: "#D9D9D9",
          height: 1.05,
          border: 0,
          bottom: 20,
        }}
      />
      <FormInput
        id={"email"}
        label={"Email"}
        defaultValue={"bada@gmail.com"}
        InputProps={{ readOnly: true }}
      />
      <FormInput
        id={"name"}
        label={"Name"}
        defaultValue={"바다"}
        InputProps={{ readOnly: true }}
      />
      <FormInput
        id={"password"}
        type="password"
        label={"Password"}
        defaultValue={"password"}
        InputProps={{ readOnly: true }}
      />
      <FormInput
        id={"nickName"}
        label={"Nickname"}
        defaultValue={"바다"}
        InputProps={{ readOnly: true }}
      />
      <div style={{ textAlign: "right" }}>
        <SubmitBtn label={"수정"} />
      </div>
    </>
    )

}
export default UBox
