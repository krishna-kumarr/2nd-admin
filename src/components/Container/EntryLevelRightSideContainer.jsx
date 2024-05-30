import React, { useContext, useEffect, useState } from "react";
import EntryLevelNavbar from "../Navbar/EntryLevelNavbar.jsx";
import SocialMediaContainer from "./SocialMediaContainer.jsx";
import FormFooter from "./FormFooter.jsx";
import Label from "../Label/Label.jsx";
import { Link } from "react-router-dom";
import RoleSelection from "../../views/common/RoleSelection.jsx";
import axiosInstance from "../../services/api/axiosInstance.js";
import CommonContext from "../../hooks/CommonContext.jsx";
import toast from "react-hot-toast";

const EntryLevelRightSideContainer = ({
  loginMode,
  formTitle,
  form,
  formName,
  formWidth,
  formHeaderClassName,
  formFooterQuestion,
  footerNavigationLink,
  footerNavigationTestId,
  footerNavigateLinkContent,
  selectionType,
  buttonId,
  visibleResendLink,
  timeLeft,
  setTimeLeft,
  resendMailAccessToken,
  setResendMailAccessToken,
  emailIdForResendEmail,
  setEmailIdForResendEmail,

  professionalVisibleResendLink,
  setProfessionalVisibleResendLink,
  professionalTimeLeft,
  setProfessionalTimeLeft,
  professionalResendMailAccessToken,
  setProfessionalResendMailAccessToken,
  professionalEmailIdForResendEmail,
  setProfessionalEmailIdForResendEmail,
}) => {




  const handleProfessionalResendEmailClick = async () => {

    toast.success("Email has been resent successfully")
    setProfessionalTimeLeft(90)

    const requiredParams = {
      email_id: professionalEmailIdForResendEmail
    }

    try {


      const response = await axiosInstance.post(
        "/resend_email", requiredParams, {
        headers: {
          Authorization: `Bearer ${professionalResendMailAccessToken}`
        }
      }
      );

    } catch (err) {
      console.log(err);
    }
  }


  const handleResendEmailClick = async () => {

    toast.success("Email has been resent successfully")
    setTimeLeft(90)

    const requiredParams = {
      email_id: emailIdForResendEmail
    }

    try {


      const response = await axiosInstance.post(
        "/resend_email", requiredParams, {
        headers: {
          Authorization: `Bearer ${resendMailAccessToken}`
        }
      }
      );

    } catch (err) {
      console.log(err);
    }
  }



  return (
    <div className="col-md-8 col-lg-7">
      <EntryLevelNavbar />
      <div className="login d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="login-content-container">
              <div className={`${formWidth} mx-auto`}>
                <h4 className={`${formHeaderClassName} `}>{formTitle}</h4>
                {form}

                {selectionType}

                {formName === "login" ? <SocialMediaContainer loginMode={loginMode} /> : null}

                <div className="text-center mt-3" >
                  {formFooterQuestion}
                  <Link
                    to={footerNavigationLink}
                    data-testid={footerNavigationTestId}
                    id={buttonId}
                  >
                    <Label
                      className="brand-color ms-1 signup-link"
                      title={footerNavigateLinkContent}
                    />
                  </Link>
                </div>

                {
                  visibleResendLink ?
                    <p className="my-2 text-center">
                      Didn't receive verification email?
                      <a onClick={handleResendEmailClick} className={timeLeft === null ? 'd-inline resend-email' : 'pe-none opacity-50 text-grey'}> Resend email</a>
                      <span className={timeLeft === null ? "d-none" : "d-inline"}> in {timeLeft} seconds</span>
                    </p>
                    :
                    null
                }

                {
                  professionalVisibleResendLink ?
                    <p className="my-2 text-center">
                      Didn't receive verification email?
                      <a onClick={handleProfessionalResendEmailClick} className={professionalTimeLeft === null ? 'd-inline resend-email' : 'pe-none opacity-50 text-grey'}> Resend email</a>
                      <span className={professionalTimeLeft === null ? "d-none" : "d-inline"}> in {professionalTimeLeft} seconds</span>
                    </p>
                    :
                    null
                }



              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryLevelRightSideContainer;
