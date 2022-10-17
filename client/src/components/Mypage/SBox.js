import styled from "styled-components";
import FormInput from "../Common/Input/FormInput";
import SubmitBtn from "../Common/Button/SubmitBtn";

const TextStyle = styled.h1`
  font-size: 36px;
  color: #504d4d;
`;

let SBox = () => {
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
      <FormInput
        id={"password"}
        type="password"
        label={"Password"}
        defaultValue={"password"}
        InputProps={{ readOnly: false }}
      />
      <div style={{ textAlign: "right" }}>
        <SubmitBtn label={"탈퇴"} />
      </div>
    </>
  );
};
export default SBox;
