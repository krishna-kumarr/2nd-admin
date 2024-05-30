import React, { useState } from 'react'
import EntryLevelLeftSideContainer from '../../components/Container/EntryLevelLeftSideContainer'
import EntryLevelRightSideContainer from '../../components/Container/EntryLevelRightSideContainer'
import ProfessionalSignUpForm from '../../components/Forms/ProfessionalSignUpForm'
import { Toaster } from 'react-hot-toast';


const ProfessionalManualSignup = () => {

  const [professionalVisibleResendLink, setProfessionalVisibleResendLink] = useState(false)

  const [professionalTimeLeft, setProfessionalTimeLeft] = useState(null);

  const [professionalResendMailAccessToken, setProfessionalResendMailAccessToken] = useState("")
  const [professionalEmailIdForResendEmail, setProfessionalEmailIdForResendEmail] = useState("")

  return (
    <div className="container-fluid ps-md-0">
      <Toaster />
      <div className="row g-0">
        <EntryLevelLeftSideContainer bgImage="professional-bg-image" />
        <EntryLevelRightSideContainer
          professionalVisibleResendLink={professionalVisibleResendLink}
          setProfessionalVisibleResendLink={setProfessionalVisibleResendLink}
          professionalTimeLeft={professionalTimeLeft}
          setProfessionalTimeLeft={setProfessionalTimeLeft}
          professionalResendMailAccessToken={professionalResendMailAccessToken}
          setProfessionalResendMailAccessToken={setProfessionalResendMailAccessToken}
          professionalEmailIdForResendEmail={professionalEmailIdForResendEmail}
          setProfessionalEmailIdForResendEmail={setProfessionalEmailIdForResendEmail}
          formTitle="Create Account"
          formWidth="col-lg-8 col-md-8"
          formName='login'
          formHeaderClassName="signup-heading"
          form={<ProfessionalSignUpForm
            professionalVisibleResendLink={professionalVisibleResendLink}
          setProfessionalVisibleResendLink={setProfessionalVisibleResendLink}
          professionalTimeLeft={professionalTimeLeft}
          setProfessionalTimeLeft={setProfessionalTimeLeft}
          professionalResendMailAccessToken={professionalResendMailAccessToken}
          setProfessionalResendMailAccessToken={setProfessionalResendMailAccessToken}
          professionalEmailIdForResendEmail={professionalEmailIdForResendEmail}
          setProfessionalEmailIdForResendEmail={setProfessionalEmailIdForResendEmail}
            />}
          formFooterQuestion="Already have an account?"
          footerNavigationLink="/"
          footerNavigationTestId="signin-link"
          footerNavigateLinkContent="Sign in"
          loginMode="signup"
          id="manual-sign-in" />
      </div>
    </div>
  )
}

export default ProfessionalManualSignup