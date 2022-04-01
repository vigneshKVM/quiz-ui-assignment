import React from "react";
import { InputContainer, CustomInput } from "./input.styles";

const Input = ({ value, id, inputContainerStyle, ...props }) => {
  return (
    <InputContainer style={inputContainerStyle} data-testid='input-container'>
      <CustomInput value={value} id={id} {...props} data-testid='input'/>
    </InputContainer>
  );
};

export default Input;
