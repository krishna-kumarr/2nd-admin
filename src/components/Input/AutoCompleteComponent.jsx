import { useContext, useState } from "react";
import Autocomplete from "react-google-autocomplete";
import toast from "react-hot-toast";
import { IoIosInformationCircleOutline } from "react-icons/io";
import CommonContext from "../../hooks/CommonContext";

const AutoCompleteComponent = ({userEnteredCity,userEnteredCountry,editClick}) => {


  const [unfocused, setUnfocused] = useState(false);

  const { editLocation,
          setEditLocation
        } = useContext(CommonContext)


  const handleCityCountry = (selectedLocation) => {
    
    if (selectedLocation) {
      setEditLocation({
        city: selectedLocation[0].long_name,
        country: selectedLocation[selectedLocation.length-1].long_name,
    });
    }
  };

  // const handleChange = (e) => {
  //   handleCityCountry(e.target.value)
  // }


  return (
    <div>
      <Autocomplete
        className="location-input"
        apiKey={process.env.REACT_APP_GOOGLE_PLACES_KEY}
        onPlaceSelected={(place) => {
          if (place) {
            handleCityCountry(place.address_components);
          }
        }}
        style={{ width: "100%",border:'none',borderBottom:'2px solid #e381129f' }}
        required
        // value={editClick === true ? `${userEnteredCity} , ${userEnteredCountry}` : `${editLocation.city} ,${editLocation.address}`}
        // onChange={(e) => handleChange(e)}
        

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
    </div>
  );
};

export default AutoCompleteComponent;
