import styled from "styled-components";
import FormInput from "../Common/Input/FormInput";
import SubmitBtn from "../Common/Button/SubmitBtn";

const TextStyle = styled.h1`
  font-size: 36px;
  color: #504d4d;
`;

// const TextDiv = styled.div`
//   width: 20rem;
//   height: 50px;
//   background: black;
// `;

let UBox = (props) => {
  console.log(props.userData);

  return (
    <>
      <TextStyle>{props.userData.nickName}님의 회원정보 </TextStyle>

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
        defaultValue={props.userData.user_id}
        InputProps={{ readOnly: true }}
      />
      <FormInput
        id={"name"}
        label={"Name"}
        defaultValue={props.userData.name}
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
        defaultValue={props.userData.nickName}
        InputProps={{ readOnly: true }}
      />
      <div style={{ textAlign: "right" }}>
        <SubmitBtn label={"수정"} />
      </div>
    </>
  );
};
export default UBox;
