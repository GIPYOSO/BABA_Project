import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const MyButton = styled(Button)({
  variant: "outlined",
  height: 60,
  width: 460,
  marginBottom: 20,
  fontSize: 18,
  backgroundColor: "transparent",
});

let changeFunc = () => {
  console.log("눌렀다");
};

export default function OutlinedButtons(props) {
  const [change, setChange] = useState(false);

  return (
    <>
      <MyButton
        onClick={() => {
          setChange(!change);
        }}
        variant="outlined"
        href="#outlined-buttons"
      >
        {change ? changeFunc : <></>}
        {props.label}
      </MyButton>
    </>
  );
}
