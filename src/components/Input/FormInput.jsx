import React from "react";
import FormLabel from "../Label/FormLabel";
import Input from "./Input";
import InputGroup from "./InputGroup";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const FormInput = ({
  socialLoginMode,
  formInputDivClassName,
  formFieldName,
  formInputFieldError,
  formInputType,
  formInputId,
  formAriaLabel,
  handleEyeClick,
  nameFromProfessionalSignup,
  onChange,
  pattern,
  dataTestid,
  role,
  alt,
  valueFromProfessionalSignup,
  showPassword,
  submitted,
  allFieldsEmpty,
  setAllFieldsEmpty
}) => {



  return (
    <div className={`${formInputDivClassName} user-form-group`}>
      <FormLabel labelFieldName={formFieldName} />
      <div className={(formFieldName === "Password" || formFieldName === "Confirm Password") ? "input-group" : "input-group "}>
        <Input
          type={formInputType}
          className={(formFieldName === "Password" || formFieldName === "Confirm Password") ? "form-control" : "form-control w-100"}
          id={formInputId}
          ariaLabel={formAriaLabel}
          required={true}
          name={nameFromProfessionalSignup}
          functionOnchange={onChange}
          pattern={pattern}
          testId={dataTestid}
          role={role}
          alt={alt}
          value={valueFromProfessionalSignup}
          formFieldName={formFieldName}
          submitted={submitted}
          socialLoginMode={socialLoginMode}
        />
        {(formFieldName !== "Password" && formFieldName !== "Confirm Password") ?
          <span
            id={`${formInputId}_error`}
            className="text-danger mt-2 signup-error-message professional-signup-error-message"
          >
            {allFieldsEmpty ? null : formInputFieldError}
          </span>
          :
          <React.Fragment>
            <InputGroup
              className="input-group-text bg-white"
              formInputFieldError={formInputFieldError}
              id={formFieldName == "Password" ? 
                showPassword ? "Passwordvisibe" : "Password-not-visibe-icon"
                :  showPassword ? "ConfirmPasswordvisibe-icon" : "ConfirmPassword-not-visibe-icon"
              }
              formInputErrorId={`${formInputId}_error`}
              allFieldsEmpty={allFieldsEmpty}
              setAllFieldsEmpty={setAllFieldsEmpty}
              reIcons={showPassword ? 
                <FaEye className="visible-eye" onClick={handleEyeClick} /> :
                <FaEyeSlash className="visible-eye" onClick={handleEyeClick} />
              }
            />
          </React.Fragment>
        }
      </div>

    </div>
  );
};

export default FormInput;