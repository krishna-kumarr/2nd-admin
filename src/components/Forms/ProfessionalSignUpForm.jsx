import React, { useContext, useEffect, useRef, useState } from "react";
import FormInput from "../Input/FormInput";
import Input from "../Input/Input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import DateofBirth from "../Input/DateofBirth";
import toast from "react-hot-toast";
import axios from "axios";
import Location from "../Input/Location";
import AuthContext from "../../hooks/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfessionalSignUpForm = ({
  professionalVisibleResendLink,
  setProfessionalVisibleResendLink,
  professionalTimeLeft,
  setProfessionalTimeLeft,
  professionalResendMailAccessToken,
  setProfessionalResendMailAccessToken,
  professionalEmailIdForResendEmail,
  setProfessionalEmailIdForResendEmail,
}) => {
  const [submitted, setSubmitted] = useState(false);

  const { clearCacheData } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const pageNavigate = useNavigate();

  const [ageVerified, setAgeVerified] = useState(false)

  const [professionalSignupInputValues, setProfessionalSignupInputValues] =
    useState({
      firstName: "",
      lastName: "",
      emailID: "",
      mobileNumber: "",
      dateOfBirth: "",
      location: {
        city: "",
        country: "",
      },
      password: "",
      confirmPassword: "",
    });

    const [countryCode, setCountryCode] = useState('us')
    const [dialCode, setDialCode] = useState("")

  const formRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const professionalSignupInputs = [
    {
      id: 1,
      name: "firstName",
      type: "text",
      placeholder: "First Name",
      label: "First Name",
      errorMessage: "Please enter a valid first name",
      required: true,
      // pattern: "^[A-Za-z0-9]{3,}$",
      className: "form-control",
      dataTestid: "firstName",
      role: "firstName",
      alt: "firstName",
    },
    {
      id: 2,
      name: "lastName",
      type: "text",
      placeholder: "Lastname",
      label: "Last Name",
      errorMessage: "Please enter a valid last name",
      required: true,
      // pattern: "^[A-Za-z0-9]{1,16}$",
      className: "form-control",
      dataTestid: "lastName",
      alt: "lastName",
    },
    {
      id: 3,
      name: "emailID",
      type: "email",
      placeholder: "Email",
      label: "Email",
      errorMessage: "Please enter a valid email",
      required: true,
      pattern: "^[-a-zA-Z0-9-()]+(\s+[-a-zA-Z0-9-()]+)*$",
      className: "form-control",
      alt: "emailID",
      dataTestid: "emailID",
    },
    {
      id: 4,
      name: "mobileNumber",
      type: "number",
      placeholder: "Mobile Number",
      label: "Mobile Number",
      required: true,
      className: "form-control",
      errorMessage: "Please enter a valid phone number",
      alt: "mobileNumber",
      pattern: "^([+]d{2})?d{10}$",
      dataTestid: "mobileNumber",
    },
    // {
    //   id: 5,
    //   name: "dateOfBirth",
    //   type: "date",
    //   placeholder: "Date of Birth",
    //   label: "Date of Birth",
    //   required: true,
    //   className: "form-control",
    //   alt: "dateOfBirth",
    //   dataTestid: "dateOfBirth",
    //   errorMessage: "Date of Birth should be selected",
    // },
    // {
    // id: 6,
    // name: "country",
    // type: "text",
    // placeholder: "Country",
    // label: "Country",
    // required: true,
    // className: "form-control",
    // errorMessage: "Please select a country",
    // alt: "country",
    // pattern: "^[A-Za-z0-9]{4,30}$",
    // dataTestid: "country",
    // },
    // {
    // id: 7,
    // name: "city",
    // type: "text",
    // placeholder: "City",
    // label: "City",
    // required: true,
    // className: "form-control",
    // errorMessage: "Please select a city",
    // pattern: "^[A-Za-z0-9]{4,30}$",
    // alt: "city",
    // dataTestid: "city",
    // },
    {
      id: 6,
      name: "location",
      type: "text",
      placeholder: "Location",
      label: "Location",
      required: true,
      className: "form-control",
      errorMessage: "Please enter a location",
      pattern: "^.{4,}",
      alt: "location",
      dataTestid: "location",
    },
    {
      id: 7,
      name: "password",
      type: showPassword ? "text" : "password",
      placeholder: "Password",
      label: "Password",
      required: true,
      className: "form-control",
      errorMessage:
        "Password must be between 8 and 20 characters long, and include at least one letter, one number, and one special character",
      pattern: "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$",
      alt: "password",
      dataTestid: "password",
    },
    {
      id: 8,
      name: "confirmPassword",
      type: showConfirmPassword ? "text" : "password",
      placeholder: "Confirm Password",
      label: "Confirm Password",
      required: true,
      className: "form-control",
      errorMessage: "Confirm password must match the password field",
      pattern: professionalSignupInputValues.password,
      alt: "confirmPassword",
    },
  ];

  const handlePhoneInput = (e, phone, contactno) => {
    setProfessionalSignupInputValues({
      ...professionalSignupInputValues,
      mobileNumber: e.slice(phone.dialCode.length),
      countryCode: phone.dialCode,
    });

    setCountryCode(phone.dialCode)
    setDialCode(phone.dialCode)
  };

  const [location, setLocation] = useState({
    city: "",
    country: "",
  });

  const handleLocation = (selectedLocation) => {
    if (selectedLocation) {
      setLocation({
        city: selectedLocation[0].long_name,
        country: selectedLocation[selectedLocation.length-1].long_name,
    });
    }
  };




  useEffect(() => {
    if (professionalTimeLeft === 0) {
      setProfessionalTimeLeft(null);
    }

    if (!professionalTimeLeft) return;

    const intervalId = setInterval(() => {
      setProfessionalTimeLeft(professionalTimeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [professionalTimeLeft]);


  const handleCreateAccount = async (e) => {


    e.preventDefault();
    



    setLoading(true);
    const profileRegisterParameters = {
      first_name: professionalSignupInputValues.firstName,
      last_name: professionalSignupInputValues.lastName,
      contact_number: professionalSignupInputValues.mobileNumber,
      city: location.city,
      country: location.country,
      country_code: countryCode,
      is_age_verified : ageVerified ? "Y" : "N",
      email_id: professionalSignupInputValues.emailID,
      user_pwd: professionalSignupInputValues.confirmPassword,
    };



    try {

      await axios
        .post(
          "https://devapi.2ndcareers.com/professional_register",
          profileRegisterParameters
        )
        .then((response) => {
          setLoading(false);
          if (response.data.error_code === 0) {     
            
            setProfessionalTimeLeft(90)
            setProfessionalVisibleResendLink(true)
            setProfessionalResendMailAccessToken(response.data.data.access_token)
            setProfessionalEmailIdForResendEmail(professionalSignupInputValues.emailID)

            setProfessionalSignupInputValues({
              mobileNumber: null,
            });
        
            setCountryCode('us')
            setDialCode('us')

            setSubmitted(true);
            formRef.current.reset();

            toast.success(response.data.message,{
              duration : 4000
            });
            // toast.success("You will be redirected to the login page");

            // setTimeout(() => {
            //   pageNavigate("/", { replace: true });
            // }, 3000);
          } else {
            toast.error(response.data.message);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = (e) => {
    setProfessionalSignupInputValues({
      ...professionalSignupInputValues,
      [e.target.name]: e.target.value,
    });
  };

  const onClickOne = () => {
    setShowPassword(!showPassword);
  };

  const onClickTwo = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <form
      className="row signup-forms"
      ref={formRef}
      onSubmit={handleCreateAccount}
    >
      {professionalSignupInputs.map((professionalSignupInput) => {
        return (
          <React.Fragment key={professionalSignupInput.id}>
            {professionalSignupInput.name === "mobileNumber" ? (
              <div className="col-md-6 mt-2 ">
                <div className="form-floating">
                  <PhoneInput
                    id="floatingInput"
                    specialLabel="Mobile Number"
                    country={dialCode === "" ? "us" : dialCode}
                    dataTestid="mobileNumber"
                    countryCodeEditable={false}
                    enableSearch
                    onChange={(e, phone) =>
                      handlePhoneInput(e, phone, "contactno")
                    }
                    value={`${dialCode}${professionalSignupInputValues.mobileNumber}`}
                    inputProps={{
                      alt: "mobileNumber",
                      type: "tel",
                      placeholder: "Mobile Number",
                      required: true,
                    }}
                  />
                </div>

                <div
                  id="signup-error-message"
                  className="text-danger mt-2 signup-error-message professional-signup-error-message"
                >
                  {professionalSignupInput.errorMessage}
                </div>
              </div>
            ) : 
            professionalSignupInput.name === "location" ? (
              <div className="col-md-12 col-lg-12 col-xl-12 col-xxl-12 mt-2 location-field-container mb-3">
                <div className="form-floating">
                  <Location
                    location={location}
                    setLocation={setLocation}
                    handleLocation={handleLocation}
                    pattern={professionalSignupInput.pattern}
                    submitted={submitted}
                    formInputFieldError={
                      (location.country.length && location.city.length) >= 3
                        ? ""
                        : professionalSignupInput.errorMessage
                    }
                  />
                </div>
                
              </div>
            ) : 
            (
              <FormInput
                formInputDivClassName={
                  professionalSignupInput.name === "emailID"
                    ? "col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-2"
                    : "col-md-6 mt-2"
                }
                formInputType={professionalSignupInput.type}
                formInputId={professionalSignupInput.name}
                formAriaLabel={professionalSignupInput.name}
                formFieldName={professionalSignupInput.label}
                formInputFieldError={professionalSignupInput.errorMessage}
                formFieldRequired={true}
                nameFromProfessionalSignup={professionalSignupInput.name}
                valueFromProfessionalSignup={
                  professionalSignupInputValues[professionalSignupInput.name]
                }
                onChange={onChange}
                errorMessage={professionalSignupInput.errorMessage}
                pattern={professionalSignupInput.pattern}
                dataTestid={professionalSignupInput.dataTestid}
                role={professionalSignupInput.role}
                alt={professionalSignupInput.alt}
                handleEyeClick={
                  professionalSignupInput.name === "password"
                    ? onClickOne
                    : null || professionalSignupInput.name === "confirmPassword"
                    ? onClickTwo
                    : null
                }
                showPassword={
                  professionalSignupInput.name === "password"
                    ? showPassword
                    : null || professionalSignupInput.name === "confirmPassword"
                    ? showConfirmPassword
                    : null
                }
                submitted={submitted}
                setSubmitted={setSubmitted}
              />
            ) 

            }
          </React.Fragment>
        );
      })}

      <div className="col-12 mt-2">
        <div className="form-check">
          
          <Input
            className="form-check-input"
            type="checkbox"
            id="termsAndCondition"
            required={true}
            alt="checkbox"
            consentText = {<>I agree to all the&nbsp;<a href="#" className="text-decoration-none">Terms&nbsp;</a> and&nbsp;
            <a href="#" className="text-decoration-none"> Privacy policy</a></>}
          />

        </div>
      </div>
      <div className="col-12 mt-2">
        <div className="form-check">
          
          <Input
            className="form-check-input"
            type="checkbox"
            id="ageVerification"
            required={true}
            alt="checkbox"
            functionOnchange={(e) => setAgeVerified(e.target.checked)}
            consentText = {<>I confirm that I am over 50 years of age</>}
          />

        </div>
      </div>
    

      <div className="d-grid mt-2">
        <button
          type="submit"
          className="btn btn-brand-color"
          disabled={loading}
        >
          {loading ? "Loading..." : "Create Account"}
        </button>
      </div>
    </form>
  );
};

export default ProfessionalSignUpForm;
