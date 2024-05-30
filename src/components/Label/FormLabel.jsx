import React from "react";

const FormLabel = ({ labelFieldName, lableClassName, labelHtmlFor }) => {
  return (
    <label htmlFor={labelHtmlFor} className={lableClassName}>
      {labelFieldName} <span className="text-danger"></span>
    </label>
  );
};

export default FormLabel;
