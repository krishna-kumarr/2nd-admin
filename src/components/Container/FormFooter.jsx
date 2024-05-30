import React from "react";
import Label from "../Label/Label";

const FormFooter = ({footerQuestion, footerNavigateLink}) => {
  return (
    <div className="text-center mt-5">
     {footerQuestion}
      <Label className="brand-color ms-1 signup-link" title={footerNavigateLink} />
    </div>
  );
};

export default FormFooter;
