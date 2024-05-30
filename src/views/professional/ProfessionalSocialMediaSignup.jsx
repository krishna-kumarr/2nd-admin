import React, { useContext } from 'react'
import EntryLevelLeftSideContainer from '../../components/Container/EntryLevelLeftSideContainer'
import EntryLevelRightSideContainer from '../../components/Container/EntryLevelRightSideContainer'
import ProfessionalSocialMediaForm from '../../components/Forms/ProfessionalSocialMediaForm'
import AuthContext from '../../hooks/AuthContext'


const ProfessionalSocialMediaSignup = () => {
  const {loginType} = useContext(AuthContext)
  return (
    <div className="container-fluid ps-md-0">
      <div className="row g-0">
        <EntryLevelLeftSideContainer bgImage="professional-bg-image" />
        <EntryLevelRightSideContainer  formTitle={`${loginType} Sign up`} formWidth="col-lg-8 col-md-8 " formHeaderClassName="signup-heading" form={<ProfessionalSocialMediaForm/>} formFooterQuestion="Already have an account?" footerNavigationLink="/" footerNavigateLinkContent="Sign in" buttonId="socialSignIn"/>
      </div>
    </div>
  )
}

export default ProfessionalSocialMediaSignup