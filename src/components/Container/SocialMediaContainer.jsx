import React from "react";
import Image from "../Image/Image";
import Images from "../../utils/images";
import { Link } from "react-router-dom";

const SocialMediaContainer = ({ loginMode }) => {
  let LinkedSignupRedirectURL;
  let googleRedirectURl;

  if (loginMode === "signup") {
    LinkedSignupRedirectURL = "https://devapi.2ndcareers.com/linkedin_signup";
    googleRedirectURl = "https://devapi.2ndcareers.com/google_signup";
  } else if (loginMode === "signin") {
    googleRedirectURl = "https://devapi.2ndcareers.com/google_signin";
    LinkedSignupRedirectURL = "https://devapi.2ndcareers.com/linkedin_signin";
  }

  return (
    <>
      <div className="card my-4 position-relative">
        <span className="position-absolute top-0 start-50 translate-middle bg-white px-2">
          OR
          <span className="visually-hidden">unread messages</span>
        </span>
      </div>
      <div className="d-flex justify-content-evenly social-signup">
        <Link to={googleRedirectURl} data-testid="google-link" id="google-link">
          <div className="card px-4 ">
            <div className="card-body text-center">
              <Image
                src={Images.googleIcon}
                width={30}
                height={30}
                className="img-responsive"
                altText="google icon"
              />
            </div>
          </div>
        </Link>
        <Link
          to={LinkedSignupRedirectURL}
          data-testid="linkedIn-link"
          id="linkedIn-link"
        >
          <div className="card px-4 ">
            <div className="card-body text-center">
              <Image
                src={Images.linkedIcon}
                width={30}
                height={30}
                className="img-responsive"
                altText="LinkedIn Icon"
              />
            </div>
          </div>
        </Link>
     
          <div className="card px-4 ">
            <div className="card-body text-center">
              <Image
                src={Images.appleIcon}
                width={30}
                height={30}
                className="img-responsive"
                altText="apple Icon"
              />
            </div>
          </div>
        
      </div>
    </>
  );
};

export default SocialMediaContainer;
