import React from 'react'
import EntryLevelLeftSideContainer from '../../components/Container/EntryLevelLeftSideContainer'
import EntryLevelRightSideContainer from '../../components/Container/EntryLevelRightSideContainer'
import ProfessionalSocialMediaForm from '../../components/Forms/ProfessionalSocialMediaForm'


const ProfessionalGoogleSignUp = () => {
  return (
    <div className="container-fluid ps-md-0">
      <div className="row g-0">
        <EntryLevelLeftSideContainer bgImage="professional-bg-image" />
        <EntryLevelRightSideContainer  formTitle="Google Sign up" formWidth="col-lg-8 col-md-8 " formHeaderClassName="signup-heading" form={<ProfessionalSocialMediaForm/>} formFooterQuestion="Already have an account?" footerNavigationLink="/" footerNavigateLinkContent="Sign in" buttonId="google-sign-in"/>
      </div>
    </div>
  )
}

export default ProfessionalGoogleSignUp