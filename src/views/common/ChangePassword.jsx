import React from 'react'
import EntryLevelLeftSideContainer from '../../components/Container/EntryLevelLeftSideContainer'
import EntryLevelRightSideContainer from '../../components/Container/EntryLevelRightSideContainer'
import ResetPasswordForm from '../../components/Forms/ResetPasswordForm'
const ChangePassword = () => {
  return (
    <div className="container-fluid ps-md-0">
      <div className="row g-0">
        <EntryLevelLeftSideContainer bgImage="forget-password-bg-image" />
        <EntryLevelRightSideContainer formWidth="col-md-6 col-lg-6" formHeaderClassName="login-heading mb-5" formTitle="Forget your Password ?" form={<ResetPasswordForm/>} formFooterQuestion="Already have an account" footerNavigationLink="/" footerNavigationTestId="sign-link" footerNavigateLinkContent="Sign in" buttonId="forgot-sign-in"/>
      </div>
    </div>
  )
}

export default ChangePassword