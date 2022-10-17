import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const MyButton = styled(Button)({
  background: "#569EE1",
  borderRadius: 5,
  boxShadow: "0 3px 5px 2px rgba(0, 105, 135, .3)",
  color: "white",
  height: 50,
  width: 160,
  fontSize: 20,
  "&:hover": {
    background: "#3D85C9",
  },
});

export default function StyledComponents(props) {
  return <MyButton>{props.label}</MyButton>;
}
