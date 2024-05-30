import React, { useEffect, useState } from 'react'
import InfoEditCard from '../../components/Cards/InfoEditCard'
import { FaGraduationCap, FaUserTie } from 'react-icons/fa'
import { MdAddToPhotos, MdAppRegistration } from 'react-icons/md'
import { PiBagFill } from 'react-icons/pi'
import InfoAddCard from '../../components/Cards/InfoAddCard'
import axios from 'axios'
import { HiLightBulb } from 'react-icons/hi'
import { RiVideoFill } from 'react-icons/ri'
import VideoPlayer from '../../components/VideoJS/VideoPlayer'
import { IoLanguage } from 'react-icons/io5'
import axiosInstance from '../../services/api/axiosInstance'

const CandidateProfile = ({professionalId}) => {


  
  const [pageContentLoaded, setPageContentLoaded] = useState(!false)
  const [pageRefresh, setPageRefresh] = useState(false)
  const [aboutContent, setAboutContent] = useState("");
  const [preferenceContent, setPreferenceContent] = useState("");
  const [experienceArrayData, setExperienceArrayData] = useState([]);
  const [educationArrayData, setEducationArrayData] = useState([]);
  const [skillsArrayData, setSkillsArrayData] = useState([]);
  const [languagesArrayData, setLanguagesArrayData] = useState([]);
  const [additionalInformationArrayData,setAdditionalInformationArrayData] = useState([])



  const [uploadedVideoFile, setUploadedVideoFile] = useState("");
  const [isVideoUploaded, setIsVideoUploaded] = useState(false)
  const [videoUploadedPlaceholder, setVideoUploadedPlaceholder] = useState(true)
  const [videoFullyUploaded, setVideoFullyUploaded] = useState(false)




  useEffect(() => {


    const getSelectedProfessionalDetails = async (e) => {

      if(professionalId === null) {
        return
      }else{
        let requiredParams = {
          professional_id: professionalId
        }
  
        
  
        try {

          const response = await axiosInstance.post("/on_click_load_more", requiredParams)
      
          if (response.data.error_code === 0) {
            setPageRefresh(!pageRefresh)
            setPageContentLoaded(true);
            setAboutContent(response.data.data.about)
            setPreferenceContent(response.data.data.preferences)
            setExperienceArrayData(response.data.data.experience);
            setEducationArrayData(response.data.data.education);
            setLanguagesArrayData(response.data.data.languages);
            setSkillsArrayData(response.data.data.skills);
            setAdditionalInformationArrayData(response.data.data.additional_info)
          }
    
    
        } catch (err) {
          console.log(err);
        }
      }
      
    };

    (async () => getSelectedProfessionalDetails())();

  }, [professionalId]);


  


  return (
    <>
      <InfoEditCard
        pageContentLoaded={pageContentLoaded}
        cardHeadingIcon={<FaUserTie className={pageContentLoaded ? "me-4 brand-color fs-4" : "me-4  fs-4 placeholder rounded-2"} />}
        cardHeading="About"
        placeholder="About placeholder"
        cardContent={aboutContent}
      />

      <InfoAddCard
        pageContentLoaded={pageContentLoaded}
        cardHeadingIcon={<PiBagFill className={pageContentLoaded ? "me-4 brand-color fs-4" : "me-4  fs-4 placeholder rounded-2"} />}
        cardHeading="Experience"
        placeholder="Experience placeholder"
        arrayContent={experienceArrayData}
        currentPage="candidateProfile"
      />

      <InfoAddCard
        pageContentLoaded={pageContentLoaded}
        cardHeadingIcon={<FaGraduationCap className={pageContentLoaded ? "me-4 brand-color fs-4" : "me-4  fs-4 placeholder rounded-2"} />}
        cardHeading="Education"
        placeholder="Education placeholder"
        arrayContent={educationArrayData}
        currentPage="candidateProfile"
      />


      <div className="card mt-3 border-0 shadow-sm rounded-4">
        <div className="card-body">
          <div className="d-flex justify-content-between ms-1">
            <label className="profile-side-headers d-flex align-items-center placeholder-glow">
              <HiLightBulb
                className={
                  pageContentLoaded
                    ? "me-4 brand-color fs-4"
                    : "me-4  fs-3 placeholder rounded-2"
                }
              />
              <span
                className={
                  pageContentLoaded
                    ? ""
                    : "placeholder px-3 w-100 py-1  rounded-1"
                }
              >
                Skills
              </span>
            </label>

          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div className="row row-cols-auto ms-5 g-3 profile-descriptions mt-3">
              {skillsArrayData.length === 0 ? (
                <p
                  className={
                    pageContentLoaded
                      ? "mt-0 word-space-content px-0 ms-1"
                      : "placeholder px-3 py-2 mt-0 rounded-1"
                  }
                >
                  Your skills will be displayed here
                </p>
              ) : (
                skillsArrayData.map((skill, index) => {
                  return (
                    <React.Fragment key={skill.id}>
                      <div className="col mt-0">
                        <div className="border rounded-2 p-2 fw-bold mb-4">
                          {skill.skill_name} -{" "}
                          <span className="fw-normal">
                            {skill.skill_level}
                          </span>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })
              )}
            </div>
          </div>

        </div>
      </div>

      <InfoEditCard
        pageContentLoaded={pageContentLoaded}
        cardHeadingIcon={<MdAppRegistration className={pageContentLoaded ? "me-4 brand-color fs-4" : "me-4  fs-4 placeholder rounded-2"} />}
        cardHeading="Preference"
        placeholder="Preference placeholder"
        cardContent={preferenceContent}
      />

      <div className="row mt-2 g-3 placeholder-glow">
        {/* <div className="col-12 col-md-6 mb-3 mb-sm-0">
          <div className="card h-100 border-0 shadow-sm rounded-4 ">
            <div className="card-body">
              <div className={`d-flex justify-content-between ms-1 ${videoFullyUploaded || uploadedVideoFile.includes('.mp4') ? "mb-2" : ""}`}>
                <label className="profile-side-headers d-flex align-items-center">
                  <RiVideoFill
                    className={
                      pageContentLoaded
                        ? "me-4 brand-color fs-3"
                        : "me-4 fs-1 placeholder rounded-2"
                    }
                  />
                  <span
                    className={
                      pageContentLoaded
                        ? ""
                        : "placeholder px-3 w-100 py-1  rounded-1"
                    }
                  >
                    Video
                  </span>
                </label>

              </div>

              {
                videoUploadedPlaceholder === true && !uploadedVideoFile.includes('.mp4') ?
                  <div
                    className={
                      pageContentLoaded
                        ? "mt-3 d-flex justify-content-center align-items-center h-75 p-5 pt-3 text-grey ms-2"
                        : "mt-3 d-flex justify-content-center align-items-center h-75 p-5 pt-3 text-grey placeholder mb-5 ms-5 rounded-2"
                    }
                  >
                    Share a video introducing more about yourself, your
                    experiences, and anything else that might not come
                    across as effectively in writing. Please refrain from
                    sharing any content that incites violence or spreads
                    hate against individuals or groups.
                  </div> :
                    <div className="d-flex justify-content-center mb-4">
                      <VideoPlayer
                        uploadedVideoFile={uploadedVideoFile}
                        isVideoUploaded={isVideoUploaded}
                      />
                    </div>

              }
            </div>
          </div>
        </div> */}

        <div className="col-12 col-md-6 placeholder-glow">
          <div className="card h-100 border-0 shadow-sm rounded-4">
            <div className="card-body">
              <div className="d-flex justify-content-between ms-1">
                <label className="profile-side-headers d-flex align-items-center">
                  <IoLanguage
                    className={
                      pageContentLoaded
                        ? "me-4 brand-color fs-4"
                        : "me-4 fs-4 placeholder rounded-2"
                    }
                  />
                  <span
                    className={
                      pageContentLoaded
                        ? ""
                        : "placeholder px-3 w-100 py-1  rounded-1"
                    }
                  >
                    Languages
                  </span>
                </label>
              </div>
              <div className="ms-5 mt-3 ">
                {languagesArrayData.length === 0 ? (
                  <p
                    className={
                      pageContentLoaded
                        ? "mt-1 profile-descriptions ms-1"
                        : "mt-1 profile-descriptions placeholder rounded-2"
                    }
                  >
                    Looking to make your profile stand out? Don't forget
                    to add your language skills!
                  </p>
                ) : (
                  languagesArrayData.map((language) => {
                    return (
                      <React.Fragment key={language.id}>
                        <div className="d-flex justify-content-between">
                          <label className="profile-inner-headers">
                            {language.language_known}
                          </label>
                        </div>
                        <p className="mt-1 profile-descriptions">
                          {language.language_level}
                        </p>
                        <hr />
                      </React.Fragment>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="card mt-3 border-0 shadow-sm rounded-4 placeholder-glow">
              <div className="card-body ">
                <div className="d-flex justify-content-between ms-1">
                  <label className="profile-side-headers d-flex align-items-center">
                    <MdAddToPhotos
                      className={
                        pageContentLoaded
                          ? "me-4 brand-color fs-4"
                          : "me-4 fs-4 placeholder rounded-2"
                      }
                    />
                    <span
                      className={
                        pageContentLoaded
                          ? ""
                          : "placeholder px-3 w-100 py-1  rounded-1"
                      }
                    >
                      Additional Information
                    </span>
                  </label>
                </div>

                <div className="ms-5 mt-3">
                  {additionalInformationArrayData.length === 0 ? (
                    <p
                      className={
                        pageContentLoaded
                          ? "text-grey ms-1"
                          : "text-grey placeholder rounded-2"
                      }
                    >
                      Add other information such as board positions,
                      volunteering roles, certifications, awards, etc.
                    </p>
                  ) : (
                    additionalInformationArrayData.map((info, index) => {
                      return (
                        <React.Fragment key={index}>
                          <div className="additional-information">
                            <div className="d-flex justify-content-between ">
                              <label className="profile-inner-headers ">
                                {info.title}
                              </label>
                            </div>
                            <ul className="mt-1 profile-descriptions">
                              <li>{info.description}</li>
                            </ul>
                          </div>
                        </React.Fragment>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
    </>
  )
}

export default CandidateProfile
