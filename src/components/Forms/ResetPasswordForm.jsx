import React, { useRef, useState } from "react";
import Button from "../Button/Button";
import Label from "../Label/Label";
import InputGroup from "../Input/InputGroup";
import Input from "../Input/Input";
import { PiEnvelopeSimpleOpenThin } from "react-icons/pi";
import toast from "react-hot-toast";
import axiosInstance from "../../services/api/axiosInstance";

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const resetFormRef = useRef();
  const [loading, setLoading] = useState(false);

  const handlekeydown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    let newErrors = {};

    if (!email) {
      newErrors.email = "Email address is required.";
    } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      newErrors.email = "Invalid email format.";
    }

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      const forgetPasswordParameters = {
        email_id:email
      }
      try {
        const response = await axiosInstance.post("/forgot_password",forgetPasswordParameters);
        if (response.data.error_code === 0) {          
          resetFormRef.current.reset();
          resetFormRef.current.value = "";
          setEmail("");
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} ref={resetFormRef}>
      <div className="input-group mb-3 login-form">
        <InputGroup
          className="login-input-group-text input-group-text border border-0"
          id="basic-addon1"
          reIcons={<PiEnvelopeSimpleOpenThin className="fs-3" />}
        />
        <Input
          type="text"
          className="form-control login-input border border-0 rounded-3"
          placeHolder="Email ID"
          ariaLabel="email"
          id="reset-email"
          testId="reset-email"
          name="email_id"
          functionOnchange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <Label className="py-2 text-danger col-12" title={errors.email} />
        )}
      </div>

      <div className="d-grid mt-3">
        <Button
          className="btn btn-lg  btn-login fw-bold mb-2"
          title="Reset password"
          buttonType="submit"
          id="reset-button"
          testId="reset-button"
          disable={loading}
          btnKeyDown={handlekeydown}
        />
      </div>
    </form>
  );
};

export default ResetPasswordForm;
