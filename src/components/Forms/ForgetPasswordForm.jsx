import React, { useState } from "react";
import Button from "../Button/Button";
import Label from "../Label/Label";
import InputGroup from "../Input/InputGroup";
import Input from "../Input/Input";
import { PiEnvelopeSimpleOpenThin } from "react-icons/pi";
import { CiLock } from "react-icons/ci";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { PiEyeLight } from "react-icons/pi";
import axios from "axios";
import toast from "react-hot-toast";

const ForgetPasswordForm = () => {
  const pageNavigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [professionalsEmailID, setProfessionalsEmailID] = useState("Email ID");
  const [Loading, setLoading] = useState(false)
  const [resetPass, setResetPass] = useState({
    password: "",
    confirmPassword: "",
  });

  const handlekeydown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmitData(e)
    }
  };

  const getEmailID = async (forgetPasswordToken) => {
    try {
      await axios
        .get("https://devapi.2ndcareers.com/get_token_email", {
          headers: {
            Authorization: `Bearer ${forgetPasswordToken}`,
          },
        })
        .then((response) => {
         
          setProfessionalsEmailID(response.data.data.email);
          if (response.data.error_code === 0) {
            setProfessionalsEmailID(response.data.data.email);
          } else {
            toast.error("Error Fetching in Token");
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const queryParams = new URLSearchParams(window.location.search);
  const forgetPasswordToken = queryParams.get("token");

  if (forgetPasswordToken !== null) {
    
    var uri = window.location.toString();
    if (uri.indexOf("?") > 0) {
      var clean_uri = uri.substring(0, uri.indexOf("?"));
      window.history.replaceState({}, document.title, clean_uri);
    }

    getEmailID(forgetPasswordToken);
  }

  const handleSubmitData = async (e) => {
    e.preventDefault();
    setErrors({});
    let newErrors = {};

    // Validate password
    if (resetPass.password !== "") {
      if (
        !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/.test(
          resetPass.password
        )
      ) {
        newErrors.password =
          "Password should contain 8-20 characters and it should have 1 letter,1 number and 1 special character";
      }
    } else {
      newErrors.password = "password is required.";
    }

    //validate confirm password
    if (!resetPass.confirmPassword) {
      newErrors.confirmPassword = "confirm password is required.";
    }

    if (resetPass.password && resetPass.confirmPassword) {
      if (resetPass.password !== resetPass.confirmPassword) {
        newErrors.notMatching =
          "Confirm Password must match the Password field.";
      }
    }

    // on submit
    if (Object.keys(newErrors).length === 0) {
      setLoading(true)
      const forgetPasswordParameters = {
        email_id: professionalsEmailID,
        user_pwd: resetPass.confirmPassword,
      };

      try {
        await axios
          .post(
            "https://devapi.2ndcareers.com/update_password",
            forgetPasswordParameters
          )
          .then((response) => {
            if (response.data.error_code === 0) {
              toast.success(response.data.message);
              setTimeout(() => {
                pageNavigate("/");
              }, 2000);
            } else {
              toast.success(response.data.message);
            }
            
          }).catch((error)=>{
            console.log(error)
          })
          .finally(()=>{
            setLoading(false)
          })
      } catch (err) {}
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmitData}>
      <div className="input-group mb-3 login-form">
        <InputGroup
          className="login-input-group-text input-group-text border border-0"
          id="basic-addon1"
          reIcons={<PiEnvelopeSimpleOpenThin className="fs-3" />}
        />
        <Input
          type="email"
          className="form-control login-input border border-0 rounded-3"
          ariaLabel="email"
          id="forgot-email"
          testId="forgot-email"
          placeHolder={professionalsEmailID}
          disabled={true}
        />
      </div>

      <div className="input-group mb-3 login-form ">
        <InputGroup
          className="login-input-group-text input-group-text border border-0"
          id="basic-addon2"
          reIcons={<CiLock className="fs-3" />}
        />
        <Input
          type={showPassword ? "text" : "password"}
          className="form-control login-input border-start-0 border-top-0 border-bottom-0 rounded-3 password-field-focus"
          placeHolder="New Password"
          ariaLabel="password"
          id="forgot-password"
          testId="forgot-password"
          functionOnchange={(e) =>
            setResetPass({ ...resetPass, [e.target.name]: e.target.value })
          }
          functionOnkeyDown={handlekeydown}
          name="password"
        />
        <InputGroup
          className="login-input-group-text input-group-text border-end-0 border-top-0 border-bottom-0"
          id="basic-addon3 PasswordId"
          reIcons={
            showPassword ? (
              <PiEyeLight className="fs-3 visible-eye" />
            ) : (
              <BsFillEyeSlashFill className="fs-3 visible-eye" />
            )
          }
          onClick={() => setShowPassword(!showPassword)}
        />

        {errors.password && (
          <Label className="py-2 text-danger col-12" id="password" title={errors.password} />
        )}
      </div>

      <div className="input-group mb-3 login-form ">
        <InputGroup
          className="login-input-group-text input-group-text border border-0"
          id="basic-addon2"
          reIcons={<CiLock className="fs-3" />}
        />
        <Input
          type={showConfPassword ? "text" : "password"}
          className="form-control login-input border-start-0 border-top-0 border-bottom-0 rounded-3 password-field-focus"
          placeHolder="Confirm Password"
          ariaLabel="password"
          id="forgot-confirm-password"
          testId="forgot-confirm-password"
          functionOnchange={(e) =>
            setResetPass({ ...resetPass, [e.target.name]: e.target.value })
          }
          name="confirmPassword"
        />
        <InputGroup
          className="login-input-group-text input-group-text border-end-0 border-top-0 border-bottom-0"
          id="basic-addon3 confirmPasswordId"
          reIcons={
            showConfPassword ? (
              <PiEyeLight className="fs-3 visible-eye" />
            ) : (
              <BsFillEyeSlashFill className="fs-3 visible-eye" />
            )
          }
          onClick={() => setShowConfPassword(!showConfPassword)}
        />
        {errors.confirmPassword && (
          <Label
            className="py-2 text-danger col-12"
            title={errors.confirmPassword}
            id="confirm-password"
          />
        )}
        {errors.notMatching && (
          <Label
            className="py-2 text-danger col-12"
            title={errors.notMatching}
            id="not-matching"
          />
        )}
      </div>

      <div className="d-grid mt-3">
        <Button
          className="btn btn-lg btn-login fw-bold mb-2"
          title="Submit"
          id="forgot-submit-button"
          testId="forgot-submit-button"
          buttonType="submit"
          disable={Loading}
          btnKeyDown={handlekeydown}
        />
      </div>
    </form>
  );
};

export default ForgetPasswordForm;
