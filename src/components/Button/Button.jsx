import React from "react";

const Button = ({ className, title, testId ,id, buttonType, functionOnchange,btnKeyDown, disable}) => {
  return (
    <button className={className} id={id} type={buttonType} onClick={functionOnchange} onKeyDown={btnKeyDown} data-testid={testId} disabled={disable===true ? "disabled" : null}>
      {title}
    </button>
  );
};

export default Button;
