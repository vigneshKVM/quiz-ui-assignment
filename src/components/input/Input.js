import React from "react";
import { InputContainer, CustomInput } from "./input.styles";

const Input = ({ value, id, inputContainerStyle, ...props }) => {
  return (
    <InputContainer style={inputContainerStyle}>
      <CustomInput value={value} id={id} {...props} />
    </InputContainer>
  );
};

export default Input;
