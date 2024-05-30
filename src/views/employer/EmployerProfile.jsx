import React, { useCallback, useContext, useEffect, useState } from "react";
import axiosInstance from "../../services/api/axiosInstance";
import "../../stylesheets/Employer.css";





import { FaEnvelope, FaPhone } from 'react-icons/fa'
import { IoLocationSharp } from 'react-icons/io5'
import { MdAddAPhoto, MdModeEditOutline, MdOutlineLocationOn, MdSave } from 'react-icons/md'
import { PiBagFill } from 'react-icons/pi'
import { SlGlobe } from "react-icons/sl";
import { SiAwsorganizations } from "react-icons/si";
import { GoOrganization } from "react-icons/go";
import axios from 'axios'
import toast from 'react-hot-toast'

import Autocomplete from "react-google-autocomplete";
import { IoIosInformationCircleOutline } from 'react-icons/io'


import ProfileInfoEditCard from "../../components/Cards/ProfileInfoEditCard";
import { FaUserTie } from "react-icons/fa";
import { MdAddBox, } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";
import { BiEnvelope } from "react-icons/bi";
import { TbPhone } from "react-icons/tb";
import PhoneInput from "react-phone-input-2";
import employerContext from "../../hooks/employerContext";



const EmployerProfile = () => {





  const {setProfilePicture} = useContext(employerContext)
  // Left container

  const [employerProfilePageResponse, setEmployerProfilePageResponse] =
    useState(false);
  const [employerProfilePageRefresh, setEmployerProfilePageRefresh] =
    useState(false);
  const [companyPicture, setCompanyPicture] = useState("");
  const [companyName, setCompanyName] = useState("")

  const [companyDetails, setCompanyDetails] = useState({
    website: "",
    organization: "",
    industrySector: "",
  });

  const [companyLocation, setCompanyLocation] = useState({
    city: "",
    country: "",
  });

  const [editCompanyLocation, setEditCompanyLocation] = useState({
    city: "",
    country: "",
  });

  const [editCompanyDetails, setEditCompanyDetails] = useState({
    website: "",
    organization: "",
    industrySector: "",
  });






  // left container datas

  const [editClick, setEditClick] = useState(false);
  const [saveClick, setSaveClick] = useState(false);

  const [isPictureUploading, setIsPictureUploading] = useState(false)
  const [isPictureDeleting, setIsPictureDeleting] = useState(false)
  const [isCompanyPictureUploaded, setIsCompanyPictureUploaded] =
    useState(false);




  const handleLocation = (selectedLocation) => {
    if (selectedLocation.length === 5) {
      setEditCompanyLocation({
        city: selectedLocation[0].long_name,
        country: selectedLocation[selectedLocation.length - 2].long_name,
      });
      setShowingLocation(`${selectedLocation[0].long_name} , ${selectedLocation[selectedLocation.length - 2].long_name}`)
    } else if (selectedLocation) {
      setEditCompanyLocation({
        city: selectedLocation[0].long_name,
        country: selectedLocation[selectedLocation.length - 1].long_name,
      });
      setShowingLocation(`${selectedLocation[0].long_name} , ${selectedLocation[selectedLocation.length - 1].long_name}`)
    }
  };





  // Edit company details

  const [showingLocation, setShowingLocation] = useState("")

  const handleEditClick = () => {
    setEditClick(true)
    setEditCompanyLocation({
      city: companyLocation.city,
      country: companyLocation.country,
    });
    setShowingLocation(`${companyLocation.city} , ${companyLocation.country}`)
  }


  const handleSaveClick = async () => {

    if (
      companyDetails.website === "" ||
      companyDetails.designation === "" ||
      companyDetails.contact_number === "" ||
      showingLocation === ""
    ) {
      toast("Please fill all the details", {
        icon: (
          <IoIosInformationCircleOutline className="fs-1 brand-color me-1" />
        ),
      });
      return;
    }

    const companyDetailsParams = {
      website_url: companyDetails.website,
      sector: companyDetails.industrySector,
      org_type: companyDetails.organization,
      country: editCompanyLocation.country,
      city: editCompanyLocation.city
    };

    try {

      setEditClick(false)

      const response = await axiosInstance.post("/update_company_details", companyDetailsParams)

      if (response.data.error_code === 0) {
        setEditClick(false)
        setEmployerProfilePageRefresh(!employerProfilePageRefresh);
      }

    } catch (err) {
      console.log(err);
    }


  }




  const handleEditCompanyDetails = (e, type, industry) => {


    if (e.target.name === "website") {
      setCompanyDetails((prevState) => ({
        ...prevState, website: e.target.value
      }))
      return
    }


    if (type !== null) {
      setCompanyDetails(prevState => ({
        ...prevState, organization: type
      }))
    }
    if (industry !== null) {
      setCompanyDetails(prevState => ({
        ...prevState, industrySector: industry
      }))
    }

    // setEditCompanyDetails(prevState => ({
    //     ...prevState,
    // }))

  }




  //  company profile photo upload

  const handleCompanyPictureUpload = async (e) => {


    try {
      setIsPictureUploading(true);

      const file = e.target.files[0];

      if (
        file.name.includes(".png") ||
        file.name.includes(".jpeg") ||
        file.name.includes(".jpg") ||
        file.name.includes(".HEIC")
      ) {
        const formData = new FormData();
        formData.append("profile_pic", file);
        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };

        const response = await axiosInstance.post("/upload_user_profile_pic", formData, config)

        if (response.data.error_code === 0) {
          setCompanyPicture(`${process.env.REACT_APP_SECOND_CAREERS_CDN}${response.data.data.picture_name}`);
          setProfilePicture(`${process.env.REACT_APP_SECOND_CAREERS_CDN}${response.data.data.picture_name}`)
          setIsPictureUploading(false);
          setIsCompanyPictureUploaded(true)
        } else {
          setIsPictureUploading(false);
          setIsCompanyPictureUploaded(false)
        }

      } else {
        toast.error(
          "Unsupported file format. Please upload .jpeg, .jpg, .png, .HEIC files only."
        );
        setIsPictureUploading(false);
        setIsCompanyPictureUploaded(false)
      }
    } catch (err) {
      console.log(err);
      setIsPictureUploading(true);


    }
  };


  // handle delete company picture

  const handleDeleteCompanyPicture = async () => {


    try {
      setIsPictureDeleting(true)

      const response = await axiosInstance.post("/delete_user_profile_pic", null)

      if (response.data.error_code === 0) {
        document.getElementById("deleteProfilePhotoModalConfirmationModal").click();
        setEmployerProfilePageRefresh(!employerProfilePageRefresh)
        setCompanyPicture("https://cdn.2ndcareers.com/professional/profile-pic/default_profile_picture.png")
        setProfilePicture("https://cdn.2ndcareers.com/professional/profile-pic/default_profile_picture.png")
        setIsCompanyPictureUploaded(false)
        setIsPictureDeleting(false)

      } else {
        setIsCompanyPictureUploaded(false)
        setIsPictureDeleting(false)

      }


    } catch (err) {
      console.log(err);
    }
  };



  const typesOfOrganization = [
    {
      id: 1,
      type: "Large business (5000+ employees)",
    },
    {
      id: 2,
      type: "Medium business (1001 - 5000 employees)",
    },
    {
      id: 3,
      type: "Small business (0-1000 employees)",
    },
    {
      id: 4,
      type: "Startup",
    },
    {
      id: 5,
      type: "Non-profit Organization",
    },
  ]

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
      industry: "Non-profit Organization",
    },
    {
      id: 18,
      industry: "Others",
    },
  ]
















  // Right container

  const [organizationAboutContent, setOrganizationAboutContent] = useState("");

  const [hiringTeamArray, setHiringTeamArray] = useState({
    id: null,
    firstName: "",
    lastName: "",
    designation: "",
    contactNumber: "",
    emailId: "",
  });




  useEffect(() => {
    const getEmployerPageData = async () => {
      try {
        const response = await axiosInstance.get("/employer_profile_dashboard");
        if (response.data.error_code === 0) {
          setEmployerProfilePageResponse(true)
          setHiringTeamArray({
            id: response.data.data.hiring_team[0].hiring_id,
            firstName: response.data.data.hiring_team[0].first_name,
            lastName: response.data.data.hiring_team[0].last_name,
            designation: response.data.data.hiring_team[0].designation,
            contactNumber: response.data.data.hiring_team[0].contact_number,
            emailId: response.data.data.hiring_team[0].email_id,
          });
          setCompanyDetails({
            website: response.data.data.website_url,
            organization: response.data.data.org_type,
            industrySector: response.data.data.sector,
          });
          setCompanyLocation({
            city: response.data.data.city,
            country: response.data.data.country,
          });
          setCompanyPicture(
            `${process.env.REACT_APP_SECOND_CAREERS_CDN}${response.data.data.profile_image}`
          );
          setCompanyName(response.data.data.company_name)
          setOrganizationAboutContent(response.data.data.company_description);
        }
      } catch (err) {
        console.log(err);
      }
    };

    (async () => getEmployerPageData())();
  }, [employerProfilePageRefresh]);



  // right side datas



  const [editIconClicked, setEditIconClicked] = useState(false);

  const [editHiringTeamInputValues, setEditHiringTeamInputValues] = useState({
    empId: "",
    firstName: "",
    lastName: "",
    designation: "",
    contactNumber: "",
  });

  const handleEditHiringTeamInputValues = (e) => {


    if (e.target.name === "contactNumber") {
      if (isNaN(e.target.value)) {
        toast("Only numbers are allowed ", {
          icon: (
            <IoIosInformationCircleOutline className="fs-1 brand-color me-1" />
          ),
        });
      } else {
        setEditHiringTeamInputValues((prevState) => ({
          ...prevState,
          contactNumber: e.target.value,
        }));
      }

    } else {
      setEditHiringTeamInputValues((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }


  };

  // edit hiring team



  const [countryCode, setCountryCode] = useState('us')
  const [dialCode, setDialCode] = useState("")

  const handlePhoneInput = (e, phone, contactno) => {

    setEditHiringTeamInputValues((prevState) => ({
      ...prevState,
      contactNumber: e.slice(phone.dialCode.length),
      countryCode: phone.dialCode,
    }));


    setCountryCode(phone.dialCode)
    setDialCode(phone.dialCode)

  };


  const handleEditHiringTeam = async (e, empId) => {

    setEditHiringTeamInputValues({
      firstName: hiringTeamArray.firstName,
      lastName: hiringTeamArray.lastName,
      designation: hiringTeamArray.designation,
      contactNumber: hiringTeamArray.contactNumber,
    });
  };

  // update hiring team

  const handleUpdateHiringTeam = async (e, saveClick) => {
    if (
      editHiringTeamInputValues.firstName === "" ||
      editHiringTeamInputValues.lastName === "" ||
      editHiringTeamInputValues.designation === "" ||
      editHiringTeamInputValues.contactNumber === ""
    ) {
      toast("Please fill all the details", {
        icon: (
          <IoIosInformationCircleOutline className="fs-1 brand-color me-1" />
        ),
      });
      return;
    } else {

      const updateHiringTeamParams = {
        emp_id: hiringTeamArray.id,
        first_name: editHiringTeamInputValues.firstName,
        last_name: editHiringTeamInputValues.lastName,
        designation: editHiringTeamInputValues.designation,
        contact_number: editHiringTeamInputValues.contactNumber,
      };

      try {

        const response = await axiosInstance.post(
          "/update_hiring_team_details",
          updateHiringTeamParams
        );
        if (response.data.error_code === 0) {
          if (saveClick === "Save") {
            document.getElementById("updateExperienceClose").click();
          }
          setEmployerProfilePageRefresh(!employerProfilePageRefresh);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleAboutEditOrSaveIcon = () => {
    setEditIconClicked(true);
  };

  const handleAboutSaveClick = async () => {
    if (
      organizationAboutContent.trim() === "" ||
      organizationAboutContent === ""
    ) {
      toast("Please enter text before saving.", {
        icon: (
          <IoIosInformationCircleOutline className="fs-1 brand-color me-1" />
        ),
      });
      return;
    } else {

      const aboutParams = {
        org_desc: organizationAboutContent,
      };

      try {

        const response = await axiosInstance.post("/update_org_description", aboutParams)
        if (response.data.error_code === 0) {
          setEditIconClicked(false);
          setEmployerProfilePageRefresh(!employerProfilePageRefresh);
        } else {
          setEditIconClicked(true);
        }


      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleOrganizationAboutContentChange = (e) => {
    setOrganizationAboutContent(e.target.value);
  };


  return (
    <section className="employer-profile min-vh-100">
      {/* <div className="container-fluid ">
          <div className="row">
            <div className="col-lg-4 col-sm-12 p-3">
              <EmployerLeftSideContainer
                employerProfilePageResponse={employerProfilePageResponse}
                setEmployerProfilePageResponse={setEmployerProfilePageResponse}
                employerProfilePageRefresh={employerProfilePageRefresh}
                setEmployerProfilePageRefresh={setEmployerProfilePageRefresh}
                companyDetails={companyDetails}
                setCompanyDetails={setCompanyDetails}
                companyLocation={companyLocation}
                setCompanyLocation={setCompanyLocation}
                editCompanyDetails={editCompanyDetails}
                setEditCompanyDetails={setEditCompanyDetails}
                editCompanyLocation={editCompanyLocation}
                setEditCompanyLocation={setEditCompanyLocation}
                companyPicture={companyPicture}
                setCompanyPicture={setCompanyPicture}
              />
            </div>
            <div className="col-lg-8 col-sm-12">
              <EmployerRightSideContainer
                employerProfilePageResponse={employerProfilePageResponse}
                setEmployerProfilePageResponse={setEmployerProfilePageResponse}
                employerProfilePageRefresh={employerProfilePageRefresh}
                setEmployerProfilePageRefresh={setEmployerProfilePageRefresh}
                organizationAboutContent={organizationAboutContent}
                setOrganizationAboutContent={setOrganizationAboutContent}
                hiringTeamArray={hiringTeamArray}
                setHiringTeamArray={setHiringTeamArray}
              />
            </div>
          </div>
        </div> */}







      {/* top content*/}

      <div className="">
        <div className="container-fluid pt-5">
          <div className="row px-5">
            <div className="col-lg-4">
              <div className="card shadow-sm rounded-4 border-0 py-5 h-100">
                <div className="card-body d-flex align-items-center justify-content-center pt-1">
                  <div className="w-100 ">
                    <div className="row justify-content-center p-0">
                      <div className="pic-holder mb-0  w-75">
                        {employerProfilePageResponse ? (
                          isPictureUploading || isPictureDeleting ? (
                            <div className="d-flex justify-content-center">
                              <div
                                className="spinner-border brand-color"
                                role="status"
                              >
                                <span className="visually-hidden ">
                                  Loading...
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="company-logo-container rounded-0">
                              <img
                                id="profilePic"
                                name="profile_pic"
                                src={companyPicture}


                              />
                            </div>
                          )
                        ) : (
                          <div className="placeholder rounded-2 ">
                            <img
                              id="profilePic"
                              src=""
                              width={150}
                              height={150}
                              className="rounded-circle"
                            />
                          </div>
                        )}

                        <label
                          htmlFor="newProfilePhoto"
                          className={
                            employerProfilePageResponse
                              ? `upload-file-block ${isPictureUploading || isPictureDeleting ? "pe-none" : null} `
                              : "upload-file-block "
                          }
                          data-bs-toggle="modal"
                          data-bs-target="#profilePhotoModal"
                        >
                          <div className="text-center">
                            <MdAddAPhoto className="fs-5 mb-3" />
                            <div className="">
                              Upload <br /> Company Logo
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className={employerProfilePageResponse ? 'text-center company-name fw-bold mt-3 ' : 'text-center fw-bold placeholder mx-3  rounded-3'}>{companyName}</h3>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card shadow-sm border-0 h-100  px-4">
                <div className="d-flex justify-content-between my-3 pe-3">
                  <label className="profile-side-headers d-flex align-items-center placeholder-glow">
                    <PiBagFill
                      className={
                        employerProfilePageResponse
                          ? "me-3 brand-color fs-3"
                          : "me-3 fs-1 placeholder rounded-2"
                      }
                    />
                    <span
                      className={
                        employerProfilePageResponse
                          ? "company-details"
                          : "placeholder ps-3 w-100 py-1  rounded-1"
                      }
                    >
                      Company Details
                    </span>
                  </label>
                  {editClick === false ?

                    <button
                      type="button"
                      title="Edit company details"
                      className={
                        employerProfilePageResponse
                          ? "btn btn-sm btn-outline-custom-color px-3 d-flex align-items-center gap-2"
                          : "btn px-3 d-flex align-items-center gap-2 placeholder rounded-2"
                      }
                      onClick={() => handleEditClick()}
                    >
                      <MdModeEditOutline /> Edit
                    </button>


                    :
                    <>
                      <button
                        type="button"
                        title="Save company details"
                        className={
                          employerProfilePageResponse
                            ? "btn btn-sm btn-outline-custom-color px-3 d-flex align-items-center gap-2"
                            : "btn px-3 d-flex align-items-center gap-2 placeholder rounded-2"
                        }
                        onClick={() => handleSaveClick()}
                      >
                        <MdSave /> Save
                      </button>
                    </>
                  }
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="card border-0">
                      <div className="card-body ">





                        <div className="mt-2">
                          <ul className="list-group list-group-flush placeholder-glow">
                            <div>
                              <li className="list-group-item py-3 border-0 d-flex align-items-center">
                                <SlGlobe
                                  className={
                                    employerProfilePageResponse
                                      ? "me-3"
                                      : "me-3 placeholder rounded-2"
                                  }
                                />
                                <span
                                  className={
                                    employerProfilePageResponse
                                      ? "company-heading"
                                      : "placeholder px-3 w-75 py-3 rounded-1 "
                                  }
                                >
                                  Website
                                </span>
                              </li>
                              {
                                editClick === true ?
                                  <input
                                    className="personal-detail-input ms-5 w-75 py-2"
                                    type="text"
                                    name="website"
                                    value={companyDetails.website}
                                    onChange={(e) => handleEditCompanyDetails(e)}
                                  /> : <li className={employerProfilePageResponse ? 'list-unstyled ms-5' : 'list-unstyled ms-5 placeholder rounded-2 w-75'}>{companyDetails.website}</li>
                              }

                            </div>
                            <hr />
                            <div>
                              <li className="list-group-item py-3 border-0 d-flex align-items-center">
                                <MdOutlineLocationOn
                                  className={
                                    employerProfilePageResponse
                                      ? "me-3"
                                      : "me-3 placeholder rounded-2"
                                  }
                                />
                                <span
                                  className={
                                    employerProfilePageResponse
                                      ? "company-heading"
                                      : "placeholder px-3 w-75 py-3 rounded-1"
                                  }
                                >
                                  Location
                                </span>
                              </li>
                              {
                                editClick === true ?
                                  // <input
                                  //   className="personal-detail-input ms-5"
                                  //   type="text"
                                  //   name="website"
                                  //   value={`${companyLocation.city} , ${companyLocation.country}`}
                                  //   onChange={handleEditCompanyDetails}
                                  // />
                                  <Autocomplete
                                    className="employer-profile location-input ms-5 w-75 bg-transparent py-2"
                                    apiKey={process.env.REACT_APP_GOOGLE_PLACES_KEY}
                                    onPlaceSelected={(place) => {
                                      if (place) {
                                        handleLocation(place.address_components);
                                      }
                                    }}
                                    style={{ width: "100%", border: 'none', borderBottom: '2px solid #e381129f' }}
                                    required
                                    value={showingLocation}
                                    onChange={(e) => setShowingLocation(e.target.value)}

                                  />
                                  : <li className={employerProfilePageResponse ? 'list-unstyled ms-5' : 'list-unstyled ms-5 placeholder rounded-2'}>{`${companyLocation.city} , ${companyLocation.country}`}</li>
                              }


                            </div>
                            <hr />

                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="card border-0">
                      <div className="card-body">
                        <div className="mt-2">
                          <ul className="list-group list-group-flush placeholder-glow">
                            <div>
                              <li className="list-group-item py-3 border-0 d-flex align-items-center">
                                <SiAwsorganizations
                                  className={
                                    employerProfilePageResponse
                                      ? "me-3"
                                      : "me-3 placeholder rounded-2"
                                  }
                                />
                                <span
                                  className={
                                    employerProfilePageResponse
                                      ? "company-heading"
                                      : "placeholder px-3 w-75 py-3 rounded-1"
                                  }
                                >
                                  Organization Type
                                </span>
                              </li>
                              {
                                editClick === true ?
                                  // <input
                                  //   className="personal-detail-input ms-5"
                                  //   type="text"
                                  //   name="website"
                                  //   value={companyDetails.organization}
                                  //   onChange={handleEditCompanyDetails}
                                  // /> 
                                  <div className="dropdown custom-dropdown ms-5">
                                    <button
                                      className="btn btn-secondary dropdown-toggle w-100 p-2"
                                      type="button"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      {editCompanyDetails.organization === ""
                                        ? <span className="text-custom-black">{companyDetails.organization.length > 20 ? `${companyDetails.organization.slice(0, 20)}..` : companyDetails.organization}</span>
                                        : <span className="text-custom-black">{editCompanyDetails.organization.length ? `${editCompanyDetails.organization.slice(0, 20)}` : editCompanyDetails.organization}</span>}


                                    </button>
                                    <ul className="dropdown-menu">
                                      {typesOfOrganization.map((type) => {
                                        return (
                                          <React.Fragment key={type.id}>
                                            <li
                                              onClick={(e) => handleEditCompanyDetails(e, type.type, null)}
                                            >
                                              <a className="dropdown-item text-custom-black text-wrap ">
                                                {type.type}
                                              </a>
                                            </li>
                                          </React.Fragment>
                                        );
                                      })}
                                    </ul>

                                  </div>
                                  : <li className={employerProfilePageResponse ? 'list-unstyled ms-5' : 'list-unstyled ms-5 placeholder rounded-2 '}>{companyDetails.organization.length > 20 ? `${companyDetails.organization.slice(0, 20)}..` : companyDetails.organization}</li>
                              }

                            </div>
                            <hr />
                            <div>
                              <li className="list-group-item py-3 border-0 d-flex align-items-center">
                                <GoOrganization
                                  className={
                                    employerProfilePageResponse
                                      ? "me-3"
                                      : "me-3 placeholder rounded-2"
                                  }
                                />
                                <span
                                  className={
                                    employerProfilePageResponse
                                      ? "company-heading"
                                      : "placeholder px-3 w-75 py-3 rounded-1"
                                  }
                                >
                                  Industry Sector
                                </span>
                              </li>
                              {
                                editClick === true ?
                                  <div className="dropdown custom-dropdown ms-5">
                                    <button
                                      className="btn btn-secondary dropdown-toggle w-100 p-2"
                                      type="button"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      {editCompanyDetails.industrySector === ""
                                        ? <span className="text-custom-black text-wrap">{companyDetails.industrySector.length > 20 ? `${companyDetails.industrySector.slice(0, 20)}..` : companyDetails.industrySector}</span>
                                        : <span className="text-custom-black text-wrap">{editCompanyDetails.industrySector.length > 20 ? `${editCompanyDetails.industrySector.slice(0, 20)}..` : editCompanyDetails.industrySector}</span>}


                                    </button>
                                    <ul className="dropdown-menu">
                                      {industrySectors.map((industry) => {
                                        return (
                                          <React.Fragment key={industry.id}>
                                            <li
                                              onClick={(e) => handleEditCompanyDetails(e, null, industry.industry)}
                                            >
                                              <a className="dropdown-item text-custom-black text-wrap">
                                                {industry.industry}
                                              </a>
                                            </li>
                                          </React.Fragment>
                                        );
                                      })}
                                    </ul>

                                  </div>
                                  : <li className={employerProfilePageResponse ? 'list-unstyled ms-5' : 'list-unstyled ms-5 placeholder rounded-2'}>{companyDetails.industrySector.length > 20 ? `${companyDetails.industrySector.slice(0, 20)}..` : companyDetails.industrySector}</li>
                              }
                              <hr />
                            </div>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Photo upload Modal */}

        <div
          className="modal fade"
          id="profilePhotoModal"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel"
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalToggleLabel">
                  Company Photo Upload
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="card border-0 h-100 rounded-4">
                  <div className="card-body d-flex align-items-center justify-content-center">


                    <div className="w-100">


                      <div className="w-100 ">
                        <div className="row justify-content-center p-0">
                          <div className="pic-holder mb-0  w-75">

                            <div className="company-logo-container rounded-0">
                              <img
                                id="profilePic"
                                name="profile_pic"
                                src={companyPicture}


                              />
                            </div>

                          </div>
                        </div>
                      </div>

                      {/* <div className="text-center position-relative">
                        <img
                          src={companyPicture}
                          className="avatar-xxl rounded-circle"
                          alt=""
                          width={150}
                          height={150}
                        />
                      </div> */}
                      <div className="mt-3">
                        <p className="text-center  image-format-text">(Only  .png, .jpeg, .jpg formats are supported)</p>
                      </div>
                      <div className="text-center pt-4">
                        <button
                          type="button"
                          htmlFor="fileInput"
                          className="btn btn-brand-color mx-3 upload-btn"
                          data-bs-dismiss="modal"
                          onClick={() =>
                            document.getElementById("company-photo").click()
                          }
                        >
                          {/* <HiOutlineUpload className="me-2 fs-4" /> */}

                          {/* <form action="/file_upload" method="POST" encType="multipart/form-data">
                              <input type="file" name="profile_pic" id="company-photo"  className="form-control" onChange={handleCompanyPhotoUpload} />
                              <input type="submit"  />
                            </form> */}

                          <input
                            type="file"
                            name="profile_pic"
                            id="company-photo"
                            hidden
                            className="form-control"
                            onChange={handleCompanyPictureUpload}
                          />

                          <span>Upload Photo</span>
                        </button>
                        {
                          isCompanyPictureUploaded === true || !companyPicture.includes('default_profile_picture.png') ?
                            <button
                              type="button"
                              className={`btn btn-outline-secondary profile-picture-delete-button`}
                              data-bs-toggle="modal"
                              data-bs-target="#deletePhotoModal"
                            >
                              {/* <MdDelete className="me-2 fs-4" /> */}
                              <span>Delete Photo</span>
                            </button> : null
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="deletePhotoModal"
          aria-hidden="true"
          aria-labelledby="deletePhotoModal"
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="deletePhotoModal">
                  Delete Company Photo
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  id="deleteProfilePhotoModalConfirmationModal"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body text-center pb-4">
                Are you sure you want to delete this photo?
                <div className="text-center pt-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    data-bs-dismiss="modal"
                  >
                    {/* <ImCancelCircle className="me-2 fs-4" /> */}

                    <span>Cancel</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-brand-color mx-3 upload-btn"
                  >
                    {/* <MdDelete className="me-2 fs-4" /> */}
                    <label
                      className="custom-file-label upload-btn"
                      onClick={handleDeleteCompanyPicture}
                    >
                      Delete
                    </label>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>





      {/* bottom  content */}


      <div className="p-5 py-3 ">
        <div className="card mt-3 border-0 shadow-sm rounded-4 employer-about-card mb-3">
          <div className="card-body ">
            <div className="d-flex justify-content-between ms-1">
              <label className="profile-side-headers d-flex align-items-center placeholder-glow">
                <FaUserTie
                  className={
                    employerProfilePageResponse
                      ? "me-3 brand-color fs-4"
                      : "me-3  fs-4 placeholder rounded-2"
                  }
                />
                <span
                  className={
                    employerProfilePageResponse
                      ? ""
                      : "placeholder px-3 w-100 py-1  rounded-1"
                  }
                >
                  About the Organization
                </span>
              </label>

              {editIconClicked ? (
                <span
                  className={
                    employerProfilePageResponse ? "" : "placeholder rounded-2"
                  }
                >
                  {/* <MdSave
                                        className={`icon edit-icon fs-3 ${organizationAboutContent.trim() === "" ? "text-muted" : "brand-color"
                                            }`}
                                        title="Save About"
                                        onClick={(e) => handleAboutEditOrSaveIcon(e, "Save")}
                                    /> */}

                  <button
                    type="button"
                    title="Save about"
                    className={
                      employerProfilePageResponse
                        ? "btn btn-sm btn-outline-custom-color px-3 d-flex align-items-center gap-2 "
                        : "btn px-3 d-flex align-items-center gap-2 placeholder rounded-2"
                    }
                    onClick={() => handleAboutSaveClick()}
                  >
                    <MdSave /> Save
                  </button>
                </span>
              ) : (
                <span
                  className={
                    employerProfilePageResponse ? "" : "placeholder rounded-2 "
                  }
                >
                  <button
                    type="button"
                    title="Edit about"
                    className={
                      employerProfilePageResponse
                        ? "btn btn-sm btn-outline-custom-color px-3 d-flex align-items-center gap-2"
                        : "btn px-3 d-flex align-items-center gap-2 placeholder rounded-2"
                    }
                    onClick={handleAboutEditOrSaveIcon}
                  >
                    <MdModeEditOutline /> Edit
                  </button>
                </span>
              )}
            </div>

            {editIconClicked ? (
              <>
                <div className="ps-5">
                  <textarea
                    className={
                      employerProfilePageResponse
                        ? "w-100 p-3 textarea mb-3 mt-4 "
                        : "placeholder px-3 w-100 py-1  rounded-2"
                    }
                    value={organizationAboutContent}
                    rows={4}
                    placeholder={
                      employerProfilePageResponse ? "About content" : ""
                    }
                    onChange={handleOrganizationAboutContentChange}
                    maxLength="600"
                  ></textarea>
                </div>
              </>
            ) : (
              <p
                className={
                  employerProfilePageResponse
                    ? "text-grey text-break px-5 py-3 mt-2 "
                    : "text-break  mt-4 placeholder rounded-2 w-100"
                }
              >
                {organizationAboutContent
                  ? organizationAboutContent
                  : "About placeholder"}
              </p>
            )}
          </div>
        </div>

        <div className="card mt-3 border-0 shadow-sm rounded-4 placeholder-glow">
          <div className="card-body">
            <div className="d-flex justify-content-between ms-1">
              <label className="profile-side-headers d-flex align-items-center">
                <RiTeamFill
                  className={
                    employerProfilePageResponse
                      ? "me-3 brand-color fs-4"
                      : "me-3  fs-4 placeholder rounded-2"
                  }
                />

                <span
                  className={
                    employerProfilePageResponse
                      ? ""
                      : "placeholder px-3 w-100 py-1  rounded-1"
                  }
                >
                  Employer Details
                </span>
              </label>

              <button
                type="button"
                title="Employer Details"
                className={
                  employerProfilePageResponse
                    ? "btn btn-sm btn-outline-custom-color px-3 d-flex align-items-center gap-2"
                    : "btn px-3 d-flex align-items-center gap-2 placeholder rounded-2"
                }
                data-bs-toggle="modal"
                data-bs-target="#editHiringTeamModal"
                onClick={(e) => handleEditHiringTeam(e, hiringTeamArray.id)}
              >
                <MdModeEditOutline /> Edit
              </button>

              {/* <button type="button" title="Add Experience" className={employerProfilePageResponse ? "btn btn-brand-color px-3 d-flex align-items-center gap-2" : "btn px-3 d-flex align-items-center gap-2 placeholder rounded-2"} data-bs-toggle="modal" data-bs-target="#addExperienceModal">
                            <MdAddBox /> Add
                        </button> */}
            </div>

            {hiringTeamArray && !hiringTeamArray.length === 0 ? (
              <p
                className={
                  employerProfilePageResponse
                    ? "text-grey ms-5 mt-3 "
                    : "placeholder px-3 w-50 py-1 ms-5 mt-3 rounded-1"
                }
              >
                Your experience details will be displayed here
              </p>
            ) : (
              <div className="ms-5">
                <div className="d-flex justify-content-between mt-3 ">
                  <label className="text-grey profile-inner-headers placeholder-glow d-inline-block w-75">
                    <span className="">
                      <span className={employerProfilePageResponse ? "text-black me-1" : "text-black me-1 placeholder rounded-2"}>
                        {hiringTeamArray.firstName}
                      </span>
                      <span className={employerProfilePageResponse ? "text-black" : "text-black placeholder rounded-2 me-2"}>
                        {hiringTeamArray.lastName}
                      </span>
                      <span className={employerProfilePageResponse ? "" : "placeholder rounded-2"}>&nbsp;&nbsp;|</span> <span className={employerProfilePageResponse ? "" : "placeholder rounded-2"}>{hiringTeamArray.designation}</span>
                    </span>
                  </label>
                  {/* <MdModeEditOutline className="icon edit-icon fs-4 brand-color" title="Edit record" data-bs-toggle="modal" data-bs-target="#editHiringTeamModal" onClick={(e) => handleEditHiringTeam(e,hiringTeamArray.id)} /> */}


                </div>

                <label className="profile-descriptions mt-2">
                  <span className={employerProfilePageResponse ? "d-flex align-items-center gap-2 me-3" : "d-flex align-items-center gap-2 me-3 placeholder rounded-2"}>
                    <TbPhone className="" /> {`+${dialCode} ${hiringTeamArray.contactNumber}`}
                  </span>
                  <span className={employerProfilePageResponse ? "d-flex align-items-center gap-2" : "d-flex align-items-center gap-2 placeholder rounded-2"}>
                    <BiEnvelope /> {hiringTeamArray.emailId}
                  </span>
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Edit hiring team Modal */}

        <div
          className="modal fade"
          id="editHiringTeamModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content p-2">
              <div className="modal-header border-bottom-0">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Employer Details
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  id="updateExperienceClose"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body border-bottom-0">
                <div className="container">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="firstName" className="form-label">
                        First name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        id="firstName"
                        aria-describedby="firstName"
                        placeholder="Enter your first name"
                        value={editHiringTeamInputValues.firstName}
                        onChange={(e) => handleEditHiringTeamInputValues(e)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="lastName" className="form-label">
                        Last name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        id="lastName"
                        aria-describedby="lastName"
                        placeholder="Enter your last name"
                        value={editHiringTeamInputValues.lastName}
                        onChange={(e) => handleEditHiringTeamInputValues(e)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="designation" className="form-label">
                        Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="designation"
                        id="designation"
                        aria-describedby="designation"
                        placeholder="Enter your designation"
                        value={editHiringTeamInputValues.designation}
                        onChange={(e) => handleEditHiringTeamInputValues(e)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="contactNumber" className="form-label">
                        Contact number
                      </label>
                      {/* <input
                        type="text"
                        className="form-control"
                        name="contactNumber"
                        id="contactNumber"
                        aria-describedby="contactNumber"
                        placeholder="Enter your contact number"
                        value={editHiringTeamInputValues.contactNumber}
                        onChange={(e) => handleEditHiringTeamInputValues(e)}
                      /> */}

                      <PhoneInput
                        id="floatingInput"
                        specialLabel=""
                        country={dialCode === "" ? "us" : dialCode}
                        dataTestid="mobileNumber"
                        countryCodeEditable={false}
                        enableSearch
                        onChange={(e, phone) =>
                          handlePhoneInput(e, phone, "contactno")
                        }
                        value={`${dialCode}${editHiringTeamInputValues.contactNumber}`}

                        inputProps={{
                          alt: "mobileNumber",
                          type: "tel",
                          placeholder: "Mobile Number",
                          required: true,
                        }}
                      />
                    </div>
                  </form>
                </div>
              </div>
              <div className="modal-footer  border-top-0 me-2">
                <button
                  type="submit"
                  className="btn btn-brand-color px-3"
                  onClick={(e) => handleUpdateHiringTeam(e, "Save")}
                >
                  Save
                </button>
                {/* <button
                                type="button"
                                className="btn btn-outline-secondary mx-2 my-2 opacity-25"
                                data-bs-toggle="modal"
                                data-bs-target="#deleteExperienceModal"
                                disabled
                            >
                                Delete
                            </button> */}
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="deleteExperienceModal"
          aria-hidden="true"
          aria-labelledby="deleteExperienceModal"
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="deleteExperienceModal">
                  Delete Experience
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body text-center pb-4">
                Are you sure you want to delete this information?
                <div className="text-center pt-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    data-bs-dismiss="modal"
                  >
                    {/* <ImCancelCircle className="me-2 fs-4" /> */}

                    <span>Cancel</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-brand-color mx-3 upload-btn"
                    data-bs-dismiss="modal"
                  >
                    {/* <MdDelete className="me-2 fs-4" /> */}
                    <label
                      className="custom-file-label upload-btn"
                    // onClick={(e) =>
                    //     handleDeleteHiringTeam(e, editExperienceData.id)
                    // }
                    >
                      Delete
                    </label>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default EmployerProfile;
