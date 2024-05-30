import React, { useContext, useEffect, useRef, useState } from "react";
import FormInput from "../../Input/FormInput";
import Input from "../../Input/Input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import Location from "../../Input/Location";
import { useNavigate } from "react-router-dom";
import "../../../stylesheets/Employer.css";
import axiosInstance from "../../../services/api/axiosInstance";
import toast from "react-hot-toast";
import CommonContext from "../../../hooks/CommonContext";



const EmployerSignupForm = ({
  timeLeft,
  setTimeLeft,
  visibleResendLink,
  setVisibleResendLink,
  resendMailAccessToken,
  setResendMailAccessToken,
  emailIdForResendEmail,
  setEmailIdForResendEmail
}) => {





  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);

  const [allFieldsEmpty, setAllFieldsEmpty] = useState(false)

  const pageNavigate = useNavigate();





  const [employerSignupInputValues, setEmployerSignupInputValues] = useState({
    firstName: "",
    lastName: "",
    nameOfOrganization: "",
    title: "",
    typeOfOrganization: "",
    industrySector: "",
    officialEmail: "",
    website: "",
    countryCode: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [countryCode, setCountryCode] = useState('us')
  const [dialCode, setDialCode] = useState("")

  const [location, setLocation] = useState({
    city: "",
    country: "",
  });

  const formRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const employerSignupInputFields = [
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
      name: "nameOfOrganization",
      type: "text",
      placeholder: "Organization Name",
      label: "Organization Name",
      errorMessage: "Please enter the organization",
      required: true,
      // pattern: "^[A-Za-z]{1,16}$",
      className: "form-control",
      dataTestid: "nameOfOrganization",
      alt: "nameOfOrganization",
    },
    {
      id: 4,
      name: "title",
      type: "text",
      placeholder: "Title",
      label: "Title",
      errorMessage: "Please enter the title",
      required: true,
      // pattern: "^[A-Za-z0-9]{1,16}$",
      className: "form-control",
      dataTestid: "title",
      alt: "title",
    },
    {
      id: 5,
      name: "typeOfOrganization",
      type: "text",
      placeholder: "Organization Type",
      label: "Organization Type",
      errorMessage: "Please enter type of organization",
      required: true,
      pattern: "^[A-Za-z0-9]{1,16}$",
      className: "form-control",
      dataTestid: "typeOfOrganization",
      alt: "typeOfOrganization",
    },
    {
      id: 6,
      name: "industrySector",
      type: "text",
      placeholder: "Industry Sector",
      label: "Industry Sector",
      errorMessage: "Please enter industry sector",
      required: true,
      pattern: "^[A-Za-z0-9]{1,16}$",
      className: "form-control",
      dataTestid: "industrySector",
      alt: "industrySector",
    },
    {
      id: 7,
      name: "officialEmail",
      type: "email",
      placeholder: "Official email",
      label: "Official email",
      errorMessage: "Please enter an official email ",
      required: true,
      pattern: "\b[\w\.-]+@((?!gmail|googlemail|yahoo|hotmail).)[\w\.-]+\.\w{2,4}\b",
      className: "form-control",
      alt: "officialEmail",
      dataTestid: "officialEmail",
    },
    {
      id: 8,
      name: "website",
      type: "text",
      placeholder: "Website",
      label: "Website",
      errorMessage: "Please enter the website",
      required: true,
      pattern:
        "^https://([a-z]+.)?(?:[a-z]+.(?:in|co.in)|[a-z]+.(?:[a-z]+.)?[a-z]+)/?$",
      className: "form-control",
      dataTestid: "website",
      alt: "website",
    },
    {
      id: 9,
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
    {
      id: 10,
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
      id: 11,
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
      id: 12,
      name: "confirmPassword",
      type: showConfirmPassword ? "text" : "password",
      placeholder: "Confirm Password",
      label: "Confirm Password",
      required: true,
      className: "form-control",
      errorMessage: "Confirm password must match the password field",
      pattern: employerSignupInputValues.password,
      alt: "confirmPassword",

    },
  ];

  const typesOfOrganization = [
    {
      id: 1,
      type: "Large (5000+ employees)",
    },
    {
      id: 2,
      type: "Medium (1001 - 5000 employees)",
    },
    {
      id: 3,
      type: "Small (0-1000 employees)",
    },
    {
      id: 4,
      type: "Startup",
    },
    {
      id: 5,
      type: "Non-profit",
    },
  ];

  const industrySectors = [
    {
      id: 1,
      industry: "Agriculture and Natural resources",
    },
    {
      id: 2,
      industry: "Arts, Media, Entertainment",
    },
    {
      id: 3,
      industry: "Building and Contruction",
    },
    {
      id: 4,
      industry: "Business and Finance",
    },
    {
      id: 5,
      industry: "Defence and Armed forces",
    },
    {
      id: 6,
      industry: "Education, Child development and Family services",
    },
    {
      id: 7,
      industry: "Energy, Environment and Utilities",
    },
    {
      id: 8,
      industry: "Engineering and Architecture",
    },
    {
      id: 9,
      industry: "Fashion and Interior Design",
    },
    {
      id: 10,
      industry: "Health science and Medical technology ",
    },
    {
      id: 11,
      industry: "Hospitality, Tourism and Recreation",
    },
    {
      id: 12,
      industry: "Information and Communication technology",
    },
    {
      id: 13,
      industry: "Manufacturing and Product development",
    },
    {
      id: 14,
      industry: "Marketing, Sales and Services",
    },
    {
      id: 15,
      industry: "Public services",
    },
    {
      id: 16,
      industry: "Transportation",
    },
    {
      id: 17,
      industry: "Non-profit",
    },
    {
      id: 18,
      industry: "Others",
    },
  ];

  const handlePhoneInput = (e, phone, contactno) => {
    setEmployerSignupInputValues({
      ...employerSignupInputValues,
      mobileNumber: e.slice(phone.dialCode.length),
      countryCode: phone.dialCode,
    });

    setCountryCode(phone.dialCode)
    setDialCode(phone.dialCode)
  };

  const handleTypeOfOrganization = (type) => {
    setEmployerSignupInputValues((prevState) => ({
      ...prevState,
      typeOfOrganization: type,
    }));
  };

  const handleIndustrySector = (industry) => {
    setEmployerSignupInputValues((prevState) => ({
      ...prevState,
      industrySector: industry,
    }));
  };

  const handleLocation = (selectedLocation) => {
    if (selectedLocation) {
      setLocation({
        city: selectedLocation[0].long_name,
        country: selectedLocation[selectedLocation.length - 1].long_name,
      });
    }
  };


  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(null);
    }

    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);





  const handleCreateAccount = async (e) => {
    e.preventDefault();

    if (
      employerSignupInputValues.typeOfOrganization === "" ||
      employerSignupInputValues.industrySector === ""
    ) {
      toast.error("Please fill the required fields");
      setLoading(false);
      return;
    }

    const employerRegisterParameters = {
      first_name: employerSignupInputValues.firstName,
      last_name: employerSignupInputValues.lastName,
      organization_name: employerSignupInputValues.nameOfOrganization,
      title: employerSignupInputValues.title,
      organization_type: employerSignupInputValues.typeOfOrganization,
      sector: employerSignupInputValues.industrySector,
      email_id: employerSignupInputValues.officialEmail,
      website: employerSignupInputValues.website,
      country: location.country,
      country_code: countryCode,
      contact_number : employerSignupInputValues.mobileNumber,
      city: location.city,
      user_pwd: employerSignupInputValues.confirmPassword,
    };

    try {

      setLoading(true);

      const response = await axiosInstance.post(
        "/employer_register",
        employerRegisterParameters
      );

      if (response.data.error_code === 0) {

        setEmployerSignupInputValues({
          mobileNumber: null,
        });
    
        setCountryCode('us')
        setDialCode('us')

        formRef.current.reset();

        setEmployerSignupInputValues({
          firstName: "",
          lastName: "",
          typeOfOrganization: "",
          industrySector: "",
        })

        setLocation({
          city: "",
          country: "",
        })
        setAllFieldsEmpty(true)


        setTimeLeft(90)
        setVisibleResendLink(true)
        setResendMailAccessToken(response.data.data.access_token)
        setEmailIdForResendEmail(employerSignupInputValues.officialEmail)

        
        toast.success(response.data.message, {
          duration: 4000
        });



      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };


  const onChange = (e) => {
    setEmployerSignupInputValues({
      ...employerSignupInputValues,
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
    <>
      <form
        className="row signup-forms"
        ref={formRef}
        onSubmit={handleCreateAccount}
      >
        {employerSignupInputFields.map((inputField) => {
          return (
            <React.Fragment key={inputField.id}>
              {inputField.name === "mobileNumber" ? (
                <div className="col-md-6 mt-2 ">
                  <div className="form-floating">
                    {/* <PhoneInput
                      id="floatingInput"
                      specialLabel="Mobile Number"
                      country={"us"}
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
                        required: true,
                        // maxLength:5
                      }}
                    /> */}

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
                      value={`${dialCode}${employerSignupInputValues.mobileNumber}`}
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
                    {inputField.errorMessage}
                  </div>
                </div>
              ) :
                inputField.name === "typeOfOrganization" ? (
                  <div className="col-md-6 mt-2 typeOfOrganization-field ">
                    <div className="form-floating">
                      <div className="dropdown custom-dropdown">
                        <button
                          className="btn btn-secondary  dropdown-toggle w-100 p-3"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {employerSignupInputValues.typeOfOrganization === "" ? (
                            <span className="text-custom-black">
                              Select your organization
                            </span>
                          ) : (
                            <span className="text-custom-black">
                              {employerSignupInputValues.typeOfOrganization.length > 20 ? `${employerSignupInputValues.typeOfOrganization.slice(0,20)}..` : employerSignupInputValues.typeOfOrganization}
                            </span>
                          )}
                        </button>
                        <ul className="dropdown-menu">
                          {typesOfOrganization.map((type) => {
                            return (
                              <React.Fragment key={type.id}>
                                <li
                                  onClick={() =>
                                    handleTypeOfOrganization(type.type)
                                  }
                                >
                                  <a className="dropdown-item text-custom-black text-wrap">
                                    {type.type}
                                  </a>
                                </li>
                              </React.Fragment>
                            );
                          })}
                        </ul>
                        <label className="special-label ">
                          Organization Type
                        </label>
                      </div>
                    </div>
                  </div>
                ) : 
                inputField.name === "industrySector" ? (
                  <div className="col-md-6 mt-2 typeOfOrganization-field">
                    <div className="form-floating">
                      <div className="dropdown custom-dropdown">
                        <button
                          className="btn btn-secondary dropdown-toggle w-100 p-3"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {employerSignupInputValues.industrySector === "" ? (
                            <span className="text-custom-black">
                              Select your industry
                            </span>
                          ) : (
                            <span className="text-custom-black">
                              {employerSignupInputValues.industrySector.length > 25 ? `${employerSignupInputValues.industrySector.slice(0, 25)}..` : `${employerSignupInputValues.industrySector}`}

                            </span>
                          )}
                        </button>
                        <ul className="dropdown-menu">
                          {industrySectors.map((industry) => {
                            return (
                              <React.Fragment key={industry.id}>
                                <li
                                  onClick={() =>
                                    handleIndustrySector(industry.industry)
                                  }
                                >
                                  <a className="dropdown-item text-custom-black text-wrap">
                                    {industry.industry}
                                  </a>
                                </li>
                              </React.Fragment>
                            );
                          })}
                        </ul>
                        <label className="special-label">Industry Sector</label>
                      </div>
                    </div>
                  </div>
                ) : 
                inputField.name === "location" ? (
                  <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-2 location-field-container mb-3">
                    <div className="form-floating">
                    <Location
                      location={location}
                      setLocation={setLocation}
                      handleLocation={handleLocation}
                      pattern={inputField.pattern}
                      submitted={submitted}
                      formInputFieldError={
                        (location.country.length && location.city.length) >= 3
                          ? ""
                          : inputField.errorMessage
                      }
                      allFieldsEmpty={allFieldsEmpty}
                      setAllFieldsEmpty={setAllFieldsEmpty}
                    />
                  </div>
                  </div>
                ) :
                   (
                    <FormInput
                      formInputDivClassName={
                        inputField.name === "officialEmail"
                          ? "col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-2"
                          : "col-md-6 mt-2"
                      }
                      formInputType={inputField.type}
                      formInputId={inputField.name}
                      formAriaLabel={inputField.name}
                      formFieldName={inputField.label}
                      formInputFieldError={inputField.errorMessage}
                      formFieldRequired={true}
                      nameFromProfessionalSignup={inputField.name}
                      valueFromProfessionalSignup={
                        employerSignupInputValues[inputField.name]
                      }
                      onChange={onChange}
                      errorMessage={inputField.errorMessage}
                      pattern={inputField.pattern}
                      dataTestid={inputField.dataTestid}
                      role={inputField.role}
                      alt={inputField.alt}
                      handleEyeClick={
                        inputField.name === "password"
                          ? onClickOne
                          : null || inputField.name === "confirmPassword"
                            ? onClickTwo
                            : null
                      }
                      showPassword={
                        inputField.name === "password"
                          ? showPassword
                          : null || inputField.name === "confirmPassword"
                            ? showConfirmPassword
                            : null
                      }
                      submitted={submitted}
                      setSubmitted={setSubmitted}
                      allFieldsEmpty={allFieldsEmpty}
                      setAllFieldsEmpty={setAllFieldsEmpty}
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
              consentText={
                <>
                  I agree to all the&nbsp;
                  <a href="#" className="text-decoration-none">
                    Terms&nbsp;
                  </a>
                  and&nbsp;
                  <a href="#" className="text-decoration-none">
                    Privacy policy
                  </a>
                </>
              }
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






    </>
  );
};

export default EmployerSignupForm;
