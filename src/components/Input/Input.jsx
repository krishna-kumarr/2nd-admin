import React, { useState } from "react";

const Input = ({
  socialLoginMode,
  submitted,
  type,
  className,
  id,
  placeHolder,
  formFieldName,
  ariaLabel,
  testId,
  required,
  name,
  functionOnchange,
  functionOnkeyDown,
  disabled,
  pattern,
  role,
  value,
  alt,
  consentText,
  
}) => {
  const [unfocused, setUnfocused] = useState(false);

  const handleUnfocused = (e) => {
    setUnfocused(true);
  };


  
  return (
    <>
      {socialLoginMode !== undefined ? (
        <input
          type={type}
          className={className}
          placeholder={placeHolder}
          aria-label={ariaLabel}
          data-testid={testId}
          id={id}
          required={required}
          onChange={functionOnchange}
          onKeyDown={functionOnkeyDown}
          name={name}
          disabled={type === "email" ? "disabled" : null}
          pattern={pattern}
          role={role}
          alt={alt}
          onBlur={handleUnfocused}
          focused={submitted ? null : unfocused.toString()}
          value={type === "email" ? socialLoginMode : name === "firstName" ? value : name === "lastName" ? value : null}
          // onCopy={type === "password" && name === "confirmPassword" ? (e) => preventCopyPaste(e) : null}
          // onPaste={type === "password" && name === "confirmPassword" ? (e) => preventCopyPaste(e) : null}
          // onCut={type === "password" && name === "confirmPassword"? (e) => preventCopyPaste(e) : null}
        />
      ) : (
        <input
          type={type}
          className={className}
          placeholder={placeHolder}
          aria-label={ariaLabel}
          data-testid={testId}
          id={id}
          required={required}
          onChange={functionOnchange}
          onKeyDown={functionOnkeyDown}
          name={name}
          disabled={disabled === true ? "disabled" : null}
          pattern={pattern}
          role={role}
          alt={alt}
          onBlur={handleUnfocused}
          onFocus={() => name === "confirmPassword" && setUnfocused(true)}
          focused={submitted ? null : unfocused.toString()}

        />
      )}

      {id === "termsAndCondition" || id === "ageVerification"  ?
        <label className="form-check-label" htmlFor={id}>
          {consentText}
        </label>
        :
        <label htmlFor={id} className="label-name ">
          {formFieldName}
        </label>

      }
    </>
  );
};

export default Input;