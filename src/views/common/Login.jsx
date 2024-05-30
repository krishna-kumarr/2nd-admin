import React from "react";
import EntryLevelLeftSideContainer from "../../components/Container/EntryLevelLeftSideContainer";
import EntryLevelRightSideContainer from "../../components/Container/EntryLevelRightSideContainer";
import LoginForm from "../../components/Forms/LoginForm";
import toast from "react-hot-toast";

const Login = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const authenticationMessage = queryParams.get("message");
  const jobID = queryParams.get("job_id");
  if (authenticationMessage !== null || jobID !== null) {
    var uri = window.location.toString();
    if (uri.indexOf("?") > 0) {
      var clean_uri = uri.substring(0, uri.indexOf("?"));
      window.history.replaceState({}, document.title, clean_uri);
    }

    if (authenticationMessage) {
      setTimeout(() => {
        toast.error(authenticationMessage);
      }, 1000);
    } else if (jobID) {
      localStorage.setItem("job_id", jobID);
    }
  }

  return (
    <div className="container-fluid ps-md-0">
      <div className="row g-0">
        <EntryLevelLeftSideContainer bgImage="bg-image" />
        <EntryLevelRightSideContainer
          formWidth="col-md-6 col-lg-6"
          formHeaderClassName="login-heading mb-5"
          formTitle="Sign in"
          form={<LoginForm />}
          formName="login"
          formFooterQuestion="Don't have an account?"
          footerNavigationLink="/role_selection"
          footerNavigationTestId="signup-link"
          footerNavigateLinkContent="Sign up"
          loginMode="signin"
          buttonId="sign-up-link"
        />
      </div>
    </div>
  );
};

export default Login;
