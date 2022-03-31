import React from "react";
import { CustomButton } from "./button.styles";

const Button = ({ src, alt, buttonContainerStyle, ...props }) => {
  return (
    <div style={buttonContainerStyle} data-testid="button-container">
      <CustomButton src={src} alt={alt} {...props} data-testid="button">
        {props.children}
      </CustomButton>
    </div>
  );
};

export default Button;
