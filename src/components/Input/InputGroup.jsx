import React from "react";

const InputGroup = ({ className, id, reIcons,formInputFieldError,onClick ,formInputErrorId,  allFieldsEmpty,setAllFieldsEmpty }) => {
  return (

    <>
      <span className={className} id={id} onClick={onClick}>
        {reIcons}
      </span>

      <span
        id={formInputErrorId}
        className="text-danger w-100 mt-2 signup-error-message professional-signup-error-message"
      >
        {allFieldsEmpty ? null : formInputFieldError}

      </span>
    </>


  );
};

export default InputGroup;
