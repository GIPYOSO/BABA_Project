import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";


let FormInput = (props) => {
  return (
    <Box
    component="form"
    sx={{
      "& .MuiTextField-root": { m: 1, width: "25em", height: "65px" },
    }}
    noValidate
    autoComplete="off"
  >
    <div>
      <TextField
        id={props.id}
        type={props.type}
        label={props.label}
        defaultValue={props.defaultValue}
        InputProps={props.InputProps} 

        
      
      />
     
    </div>
  </Box>
  );
};
export default FormInput;
