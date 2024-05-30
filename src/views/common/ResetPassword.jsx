import React from "react";
import EntryLevelLeftSideContainer from "../../components/Container/EntryLevelLeftSideContainer";
import EntryLevelRightSideContainer from "../../components/Container/EntryLevelRightSideContainer";
import ResetPasswordForm from "../../components/Forms/ResetPasswordForm";
import ForgetPasswordForm from "../../components/Forms/ForgetPasswordForm";


const ResetPassword = () => {
  return (
    <div className="container-fluid ps-md-0">
      <div className="row g-0">        
        <EntryLevelLeftSideContainer bgImage="reset-password-bg-image" />
        <EntryLevelRightSideContainer
          formTitle="Change your Password"
          formWidth="col-md-6 col-lg-6"
          formHeaderClassName="login-heading mb-5"
          form={<ForgetPasswordForm />}
          formFooterQuestion="Already have an account"
          footerNavigationLink="/"
          footerNavigationTestId="sign-link"
          footerNavigateLinkContent="Sign in"
          buttonId="reset-sign-in"
        />
      </div>
    </div>
  );
};

export default ResetPassword;
