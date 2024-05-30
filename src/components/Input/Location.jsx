import { useState } from "react";
import Autocomplete from "react-google-autocomplete";
import toast from "react-hot-toast";
import { IoIosInformationCircleOutline } from "react-icons/io";

const Location = ({
  socialLoginMode,
  formInputDivClassName,
  formFieldName,
  formInputFieldError,
  formInputType,
  formInputId,
  formAriaLabel,
  handleEyeClick,
  nameFromProfessionalSignup,
  onChange,
  pattern,
  dataTestid,
  role,
  alt,
  valueFromProfessionalSignup,
  showPassword,
  submitted,
  location,
  setLocation,
  handleLocation,
  allFieldsEmpty,
  setAllFieldsEmpty
}) => {
  const [unfocused, setUnfocused] = useState(false);

  const handleUnfocused = (e) => {
    setUnfocused(true);
  };


  return (
    <div>
      <Autocomplete
        className="location-input"
        apiKey={process.env.REACT_APP_GOOGLE_PLACES_KEY}
        onPlaceSelected={(place) => {
          if (place) {
            handleLocation(place.address_components);
          }
        }}
        style={{ width: "100%" }}
        type={formInputType}
        required
        id="inputId"
        placeholder=""
        pattern={pattern}
        onBlur={handleUnfocused}
        focused={submitted ? null : unfocused.toString()}
        // dataTestid="location"
        // id={formInputId}
        // ariaLabel={formAriaLabel}
        // required={true}
        // name={nameFromProfessionalSignup}
        // testId={dataTestid}
        // role={role}
        // alt={alt}
        // formFieldName={formFieldName}
        // submitted={submitted}
        // socialLoginMode={socialLoginMode}
      />
      <label className="special-label">Location</label>
      <span
        id="signup-error-message"
        className="text-danger mt-2 signup-error-message professional-signup-error-message"
      >
        {allFieldsEmpty ? null : formInputFieldError}
      </span>
    </div>
  );
};

export default Location;
