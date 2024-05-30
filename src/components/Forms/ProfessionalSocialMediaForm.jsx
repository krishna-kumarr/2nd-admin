import React, { useEffect, useRef, useState } from "react";
import FormInput from "../Input/FormInput";
import Input from "../Input/Input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import DateofBirth from "../Input/DateofBirth";
import toast from "react-hot-toast";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Location from "../Input/Location";
import { useContext } from "react";
import AuthContext, { AuthProvider } from "../../hooks/AuthContext";
import axiosInstance from "../../services/api/axiosInstance";

const ProfessionalSocialMediaForm = () => {
  const { setLoginType } = useContext(AuthContext);

  const navigate = useNavigate();

  const from = "/professional/home/all_jobs";

  const [submitted, setSubmitted] = useState(false);

  const [ageVerified, setAgeVerified] = useState(false);

  const [loading, setLoading] = useState(false);

  const [professionalSignupInputValues, setProfessionalSignupInputValues] =
    useState({
      firstName: "",
      lastName: "",
      emailID: "",
      countryCode: "",
      mobileNumber: "",
      dateOfBirth: "",
      country: "",
      city: "",
    });

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
      pattern: "^[A-Za-z0-9]{3,16}$",
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
      pattern: "^[A-Za-z0-9]{1,16}$",
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
      pattern: "^[-a-zA-Z0-9-()]+(s+[-a-zA-Z0-9-()]+)*$",
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
      errorMessage: "Please select a location",
      pattern: "^.{4,}",
      alt: "location",
      dataTestid: "location",
    },
  ];

  const handlePhoneInput = (e, phone, contactno) => {
    setProfessionalSignupInputValues({
      ...professionalSignupInputValues,
      mobileNumber: e.slice(phone.dialCode.length),
      countryCode: phone.dialCode,
    });
  };

  const [location, setLocation] = useState({
    city: "",
    country: "",
  });

  const handleLocation = (selectedLocation) => {
    if (selectedLocation) {
      setLocation((prevState) => ({
        ...prevState,
        city: selectedLocation[0].long_name,
        country: selectedLocation[selectedLocation.length - 1].long_name,
      }));
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setLoading(true);
    const profileRegisterParameters = {
      first_name: professionalSignupInputValues.firstName,
      last_name: professionalSignupInputValues.lastName,
      contact_number: professionalSignupInputValues.mobileNumber,
      city: location.city,
      country: location.country,
      is_age_verified: ageVerified ? "Y" : "N",
      email_id: professionalSignupInputValues.emailID,
    };


    try {
      // await axios
      //   .post(
      //     "https://devapi.2ndcareers.com/",
      //     profileRegisterParameters
      //   )
      // .then((response) => {
          const response = await axiosInstance.post("/store_signup_details",profileRegisterParameters)

          setLoading(false);
          if (response.data.error_code === 0) {
            localStorage.setItem("pToken", response.data.data.access_token);
            // <Navigate to=""/>
            // window.location.href = "https://devapp.2ndcareers.com/professional/home/all_jobs"
            navigate(from, { replace: true });
            setSubmitted(true);
            formRef.current.reset();
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }
        // });
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

  useEffect(() => {
    const getUserData = async (gToken) => {
      try {
        await axios
          .get("https://devapi.2ndcareers.com/get_social_media_account_info", {
            headers: {
              Authorization: `Bearer ${gToken}`,
            },
          })
          .then((response) => {
            if (response.data.error_code === 0) {
            
              setProfessionalSignupInputValues({
                firstName: response.data.data[0].first_name,
                lastName: response.data.data[0].last_name,
                emailID: response.data.data[0].email_id,
              });
              setLoginType(response.data.data[0].login_mode);
              toast.success(response.data.message);
            } else if (response.data.error_code === 409) {
              toast.error(response.data.message);
              navigate("/");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {
        console.log(err);
      }
    };

    const queryParams = new URLSearchParams(window.location.search);
    const errorMessage = queryParams.get("message");
    const authenticationToken = queryParams.get("token");

    if (errorMessage !== null || authenticationToken !== null) {
      
      var uri = window.location.toString();
      if (uri.indexOf("?") > 0) {
        var clean_uri = uri.substring(0, uri.indexOf("?"));
        window.history.replaceState({}, document.title, clean_uri);
      }

      if (errorMessage) {
        setTimeout(() => {
          toast.error(errorMessage);
        }, 1000);
      } else if (authenticationToken) {
        getUserData(authenticationToken);
      }
    }
  }, []);

  // const getUserData = async (gToken) => {
  //   try {
  //     await axios
  //       .get("https://devapi.2ndcareers.com/get_social_media_account_info", {
  //         headers: {
  //           Authorization: `Bearer ${gToken}`,
  //         },
  //       })
  //       .then((response) => {
  //         if (response.data.error_code === 0) {
  //           setProfessionalSignupInputValues({
  //             firstName:response.data.data[0].first_name,
  //             lastName:response.data.data[0].last_name,
  //             emailID: response.data.data[0].email_id,
  //           });
  //           setLoginType(response.data.data[0].login_mode);
  //           toast.success(response.data.message);
  //         } else if (response.data.error_code === 409) {
  //           toast.error(response.data.message);
  //           navigate("/");
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const queryParams = new URLSearchParams(window.location.search);
  // const authenticationToken = queryParams.get("token");

  // if (authenticationToken !== null) {
  //   var uri = window.location.toString();
  //   if (uri.indexOf("?") > 0) {
  //     var clean_uri = uri.substring(0, uri.indexOf("?"));
  //     window.history.replaceState({}, document.title, clean_uri);
  //   }

  //   getUserData(authenticationToken);
  // }

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
              <div className="col-md-6 mt-2  ">
                <div className="form-floating">
                  <PhoneInput
                    id="floatingInput"
                    specialLabel="Mobile Number"
                    country={"in"}
                    dataTestid="mobileNumber"
                    countryCodeEditable={false}
                    enableSearch
                    onChange={(e, phone) =>
                      handlePhoneInput(e, phone, "contactno")
                    }
                    inputProps={{
                      alt: "mobileNumber",
                      type: "tel",
                      placeholder: "Mobile Number",
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
            ) : professionalSignupInput.name === "dateOfBirth" ? (
              <div className="col-md-6 mt-2 ">
                <DateofBirth
                  professionalSignupInputValues={professionalSignupInputValues}
                  setProfessionalSignupInputValues={
                    setProfessionalSignupInputValues
                  }
                />
              </div>
            ) : professionalSignupInput.name === "location" ? (
              <div className="col-md-12 col-lg-12 col-xl-12 col-xxl-12 mt-2 location-field-container mb-3">
                <div className="form-floating">
                  <Location
                    location={location}
                    setLocation={setLocation}
                    handleLocation={handleLocation}
                    pattern={professionalSignupInput.pattern}
                    submitted={submitted}
                    // formInputType={professionalSignupInput.type}
                    // formInputId={professionalSignupInput.name}
                    // formAriaLabel={professionalSignupInput.name}
                    // formFieldName={professionalSignupInput.label}
                    formInputFieldError={
                      (location.country.length && location.city.length) >= 3
                        ? ""
                        : professionalSignupInput.errorMessage
                    }
                    // formFieldRequired={true}
                    // nameFromProfessionalSignup={professionalSignupInput.name}
                    // valueFromProfessionalSignup={
                    // professionalSignupInputValues[professionalSignupInput.name]
                    // }
                    // errorMessage={professionalSignupInput.errorMessage}
                    // pattern={professionalSignupInput.pattern}
                  />
                </div>
              </div>
            ) : (
              <FormInput
                socialLoginMode={professionalSignupInputValues.emailID}
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
                  professionalSignupInput.name === "pasemailIDsword"
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
            )}
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
          />

          <label className="form-check-label" htmlFor="invalidCheck">
            I agree to all the&nbsp;
            <a href="#" className="text-decoration-none">
              Terms&nbsp;
            </a>{" "}
            and&nbsp;
            <a href="#" className="text-decoration-none">
              {" "}
              Privacy policy
            </a>
          </label>
          {/* <div className="text-danger signup-error-message">You must agree before submitting.</div> */}
        </div>
      </div>
      <div className="col-12 mt-2">
        <div className="form-check">
          <Input
            className="form-check-input"
            type="checkbox"
            id="termsAndCondition"
            required={true}
            functionOnchange={(e) => setAgeVerified(e.target.checked)}
            alt="checkbox"
          />

          <label className="form-check-label" htmlFor="invalidCheck">
            I confirm that I am over 50 years of age
          </label>
          {/* <div className="text-danger signup-error-message">You must agree before submitting.</div> */}
        </div>
      </div>

      <div className="d-grid mt-2">
        <button
          type="submit"
          className="btn btn-brand-color"
          id="createSocialAccount"
          disabled={loading}
        >
          {loading ? "Loading..." : "Create Account"}
        </button>
      </div>
    </form>
  );
};

export default ProfessionalSocialMediaForm;
