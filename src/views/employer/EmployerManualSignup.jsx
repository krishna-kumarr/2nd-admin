import React, { useState } from 'react'
import EntryLevelLeftSideContainer from '../../components/Container/EntryLevelLeftSideContainer'
import EntryLevelRightSideContainer from '../../components/Container/EntryLevelRightSideContainer'
import { Toaster } from 'react-hot-toast';
import EmployerSignupForm from '../../components/Forms/employer/EmployerSignupForm';


const EmployerManualSignup = () => {

  const [visibleResendLink,setVisibleResendLink] = useState(false)

  const [timeLeft, setTimeLeft] = useState(null);

  const [resendMailAccessToken, setResendMailAccessToken] = useState("")
  const [emailIdForResendEmail,setEmailIdForResendEmail] = useState("")



  return (
    <div className="container-fluid ps-md-0">
      <Toaster/>
      <div className="row g-0">
        <EntryLevelLeftSideContainer bgImage="employer-bg-image" />
        <EntryLevelRightSideContainer 
        visibleResendLink={visibleResendLink} 
        setVisibleResendLink={setVisibleResendLink} 
        timeLeft={timeLeft} 
        setTimeLeft={setTimeLeft} 
        resendMailAccessToken={resendMailAccessToken} 
        emailIdForResendEmail={emailIdForResendEmail}
        setResendMailAccessToken={setResendMailAccessToken} 
        formTitle="Create Account"  
        formWidth="col-lg-8 col-md-8"  
        formHeaderClassName="signup-heading" 
        form={<EmployerSignupForm 
              visibleResendLink={visibleResendLink} 
              setVisibleResendLink={setVisibleResendLink} 
              timeLeft={timeLeft} 
              setTimeLeft={setTimeLeft} 
              resendMailAccessToken={resendMailAccessToken} 
              setResendMailAccessToken={setResendMailAccessToken} 
              emailIdForResendEmail={emailIdForResendEmail} 
              setEmailIdForResendEmail={setEmailIdForResendEmail}/>} 
              formFooterQuestion="Already have an account?" 
              footerNavigationLink="/" 
              footerNavigationTestId="signin-link" 
              footerNavigateLinkContent="Sign in" 
              loginMode="signup" 
              id="manual-sign-in"/>
        
      </div>
    </div>
  )
}

export default EmployerManualSignup