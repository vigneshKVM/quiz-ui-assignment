import React from "react";
import { CustomButton } from "./button.styles";

const Button = ({ src, alt, buttonContainerStyle, ...props }) => {
  return (
    <div style={buttonContainerStyle}>
      <CustomButton src={src} alt={alt} {...props}>
        {props.children}
      </CustomButton>
    </div>
  );
};

export default Button;
