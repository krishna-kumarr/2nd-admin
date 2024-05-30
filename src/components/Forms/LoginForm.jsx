import React, { useState } from "react";
import Label from "../Label/Label";
import InputGroup from "../Input/InputGroup";
import Input from "../Input/Input";
import { PiEnvelopeSimpleOpenThin } from "react-icons/pi";
import { CiLock } from "react-icons/ci";
import Button from "../Button/Button";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { PiEyeLight } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../../services/api/axiosInstance";

const LoginForm = () => {
  const pageNavigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [LoginDetails, setLoginDetails] = useState({
    email_id: "",
    password: "",
  });

  const professionalHome = "/professional/home/all_jobs";
  const employerHome = "/employer_dashboard/home";

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

    // Validate email
    if (!LoginDetails.email_id) {
      newErrors.email = "Email is required";
    } else if (
      !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(
        LoginDetails.email_id
      )
    ) {
      newErrors.email = "Invalid email format";
    }

    // Validate password
    if (!LoginDetails.password) {
      newErrors.password = "Password is required";
    }

    // on submit
    if (Object.keys(newErrors).length === 0) {
      setSubmitLoading(true);

      try {
        await axiosInstance({
          method: "post",
          url: "/login",
          auth: {
            username: LoginDetails.email_id.trim(),
            password: LoginDetails.password.trim(),
          },
        })
          .then((response) => {
            if (response.data.error_code === 0) {
              switch (response.data.data.user_role) {
                case "professional":
                  localStorage.setItem("pToken",response.data.data.access_token);
                  pageNavigate(professionalHome, { replace: true });
                  break;
                case "employer":
                  pageNavigate(employerHome, { replace: true });
                  localStorage.setItem("eToken",response.data.data.access_token);
                  break;

                default:
                  break;
              }
            }
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setSubmitLoading(false);
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const queryParams = new URLSearchParams(window.location.search);
  const errorMessage = queryParams.get("message");
  const accessToken = queryParams.get("token");
  const userRole = queryParams.get("role");


  if (errorMessage !== null || accessToken !== null || userRole != null) {
    var uri = window.location.toString();
    if (uri.indexOf("?") > 0) {
      var clean_uri = uri.substring(0, uri.indexOf("?"));
      window.history.replaceState({}, document.title, clean_uri);
    }
    if (errorMessage) {
      setTimeout(() => {
        toast.error(errorMessage);
      }, 1000);
    } else if (accessToken && userRole) {
      if (userRole === "employer") {
        localStorage.setItem("eToken", accessToken);
        setTimeout(() => {
          pageNavigate(employerHome, { replace: true });
        }, 0);
        setTimeout(() => {
          toast.success("Sign in successful !");
        }, 0);
      } else {
        localStorage.setItem("pToken", accessToken);
        setTimeout(() => {
          pageNavigate(professionalHome, { replace: true });
        }, 0);
        setTimeout(() => {
          toast.success("Sign in successful !");
        }, 0);
      }
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="input-group mb-3 login-form">
        <InputGroup
          className="login-input-group-text input-group-text border border-0"
          id="basic-addon1"
          reIcons={<PiEnvelopeSimpleOpenThin className="fs-3" />}
        />
        <Input
          type="email"
          className="form-control login-input border border-0 rounded-3 "
          placeHolder="Email"
          ariaLabel="email"
          id="login-email-id"
          testId="login-email-id"
          name="email_id"
          functionOnchange={(e) =>
            setLoginDetails({
              ...LoginDetails,
              [e.target.name]: e.target.value,
            })
          }
          functionOnkeyDown={handlekeydown}
        />

        {errors.email && (
          <Label className="py-2 text-danger col-12" title={errors.email} />
        )}
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
          placeHolder="Password"
          ariaLabel="password"
          id="login-pass"
          testId="login-pass"
          functionOnchange={(e) =>
            setLoginDetails({
              ...LoginDetails,
              [e.target.name]: e.target.value,
            })
          }
          functionOnkeyDown={handlekeydown}
          name="password"
        />

        <InputGroup
          className="login-input-group-text input-group-text rounded-3 border-end-0 border-top-0 border-bottom-0"
          id="basic-addon3"
          onClick={() => setShowPassword(!showPassword)}
          reIcons={
            showPassword ? (
              <PiEyeLight className="fs-3 visible-eye" />
            ) : (
              <BsFillEyeSlashFill className="fs-3 visible-eye" />
            )
          }
        />
        {errors.password && (
          <Label className="py-2 text-danger col-12" title={errors.password} />
        )}
      </div>

      <div className="d-grid mt-3">
        {submitLoading ? (
          <Button
            className="btn btn-lg btn-login fw-bold mb-2"
            title="Loading...."
            buttonType="button"
            id="disable-login-button"
            testId="disable-login-button"
            disable={true}
          />
        ) : (
          <Button
            className="btn btn-lg btn-login fw-bold mb-2"
            title="Sign in"
            buttonType="submit"
            id="login-button"
            testId="login-button"
          />
        )}

        <div className="text-end">
          <Link
            className="small"
            to={"/forgot_password"}
            id="forgot-password"
            data-testid="forgot-password"
          >
            Forgot password?
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
// fklistfeat
// C1-00000054838544-C1