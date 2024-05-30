import React, { useEffect, useState } from 'react'
import { FaGraduationCap, FaUserTie } from 'react-icons/fa'
import { MdAddToPhotos, MdAppRegistration } from 'react-icons/md'
import { PiBagFill } from 'react-icons/pi'
import CandidateInfoAddCard from '../../components/Cards/CandidateInfoAddCard'
import axios from 'axios'
import { HiLightBulb } from 'react-icons/hi'
import { RiVideoFill } from 'react-icons/ri'
import VideoPlayer from '../../components/VideoJS/VideoPlayer'
import { IoLanguage } from 'react-icons/io5'
import CandidateInfoEditCard from '../../components/Cards/CandidateInfoEditCard'

const EmployerCandidateProfile = ({ rightSideContent, initialGlow, categorySelectedGlow, cardSelectedGlow }) => {

  const [about, setAbout] = useState('');
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [preference, setPreference] = useState('');
  const [video, setVideo] = useState('');
  const [language, setLanguage] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [skills, setSkills] = useState([]);
  const dummyLanguage = [1, 2, 3];
  const dummyskills = [1, 2, 3, 4, 5, 6, 7, 8]
  const [pageContentLoaded, setPageContentLoaded] = useState(!initialGlow && !categorySelectedGlow && !cardSelectedGlow)


  useEffect(() => {
    if (pageContentLoaded) {
      if (rightSideContent.about !== undefined) {
        setAbout(rightSideContent.about);
      }
      if (rightSideContent.experience !== undefined) {
        setExperience(rightSideContent.experience);
      }
      if (rightSideContent.education !== undefined) {
        setEducation(rightSideContent.education);
      }
      if (rightSideContent.preference !== undefined) {
        setPreference(rightSideContent.preference);
      }
      if (rightSideContent.video_name !== undefined) {
        setVideo(`${process.env.REACT_APP_SECOND_CAREERS_CDN}${rightSideContent.video_name}`)
      }
      if (rightSideContent.languages !== undefined) {
        setLanguage(rightSideContent.languages)
      }
      if (rightSideContent.additional_info !== undefined) {
        setAdditionalInfo(rightSideContent.additional_info)
      }
      if (rightSideContent.skills !== undefined) {
        setSkills(rightSideContent.skills)
      }
    } else {
      setAbout('');
      setExperience([]);
      setEducation([]);
      setPreference('');
      setVideo('');
      setLanguage([]);
      setAdditionalInfo('');
      setSkills([]);
    }
  }, [rightSideContent])


  const [isVideoUploaded, setIsVideoUploaded] = useState(false)
  const [videoUploadedPlaceholder, setVideoUploadedPlaceholder] = useState(true)
  const [videoFullyUploaded, setVideoFullyUploaded] = useState(false)



  return (
    <>

      <CandidateInfoEditCard
        pageContentLoaded={pageContentLoaded}
        cardHeadingIcon={<FaUserTie className={pageContentLoaded ? "me-4 brand-color fs-4" : "me-3 fs-4 placeholder rounded-2 p-3"} />}
        cardHeading="About"
        placeholder="About placeholder"
        cardContent={about}
      />

      <CandidateInfoAddCard
        pageContentLoaded={pageContentLoaded}
        cardHeadingIcon={<PiBagFill className={pageContentLoaded ? "me-4 brand-color fs-4" : "me-3 fs-4 placeholder rounded-2 p-3"} />}
        cardHeading="Experience"
        placeholder="Experience placeholder"
        arrayContent={experience}
      />

      <CandidateInfoAddCard
        pageContentLoaded={pageContentLoaded}
        cardHeadingIcon={<FaGraduationCap className={pageContentLoaded ? "me-4 brand-color fs-4" : "me-3 fs-4 placeholder rounded-2 p-3"} />}
        cardHeading="Education"
        placeholder="Education placeholder"
        arrayContent={education}
      />


      <div className="card border-0">
        <div className="card-body">
          <div className="d-flex justify-content-between ms-1">
            <label className="profile-side-headers d-flex align-items-center placeholder-glow">
              <HiLightBulb
                className={
                  pageContentLoaded
                    ? "me-4 brand-color fs-4"
                    : "me-3 fs-3 placeholder rounded-2 p-3"
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
              {pageContentLoaded ?
                skills.length === 0 ? (
                  <p
                    className={"mt-0 word-space-content px-0 ms-1"}
                  >
                    Your skills will be displayed here
                  </p>
                ) : (
                  skills.map((skill, index) => {
                    return (
                      <React.Fragment key={skill.id}>
                        <div className="col mt-0">
                          <div className="employer-card-skills border rounded-2 p-2 fw-bold mb-4">
                            {skill.skill_name} -{" "}
                            <span className="fw-normal">
                              {skill.skill_level}
                            </span>
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })
                )
                :
                <>
                  {dummyskills.map((skill, index) => {
                    return (
                      <React.Fragment key={index}>
                        <div className="col mt-0">
                          <div className="employer-card-skills border rounded-2 p-2 fw-bold mb-4 px-5 py-1 placeholder">
                            <span className="px-3"></span>
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}
                </>
              }
            </div>
          </div>

        </div>
      </div>


      <CandidateInfoEditCard
        pageContentLoaded={pageContentLoaded}
        cardHeadingIcon={<MdAppRegistration className={pageContentLoaded ? "me-4 brand-color fs-4" : "me-3 p-3 fs-4 placeholder rounded-2"} />}
        cardHeading="Preference"
        placeholder="Preference placeholder"
        cardContent={preference}
      />


      {
        video !== "" ?
          <div className="row mt-2 g-3 ">
            <div className="col-12 col-md-6 mb-3 mb-sm-0">
              <div className="card border-0">
                <div className="card-body">
                  <div className={`d-flex justify-content-between ms-1 ${videoFullyUploaded || video.includes('.mp4') ? "mb-2" : ""}`}>
                    <label className="profile-side-headers d-flex align-items-center">
                      <RiVideoFill
                        className={
                          pageContentLoaded
                            ? "me-4 brand-color fs-3"
                            : "me-3 p-3 fs-1 placeholder rounded-2"
                        }
                      />
                      <span
                        className={
                          pageContentLoaded
                            ? ""
                            : "placeholder px-3 w-100 py-2  rounded-1"
                        }
                      >
                        Video
                      </span>
                    </label>

                  </div>

                  {pageContentLoaded ?
                    videoUploadedPlaceholder === true && !video.includes('.mp4') ?
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
                          uploadedVideoFile={video}
                          isVideoUploaded={isVideoUploaded}
                        />
                      </div>
                    :
                    <div className='placeholder py-5 mt-3 w-100 rounded-2'>
                      <div className="py-5">
                        <div className="py-4"></div>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>

            <div className="col col-md-6">
              <div className="card border-0">
                <div className="card-body">
                  <div className="d-flex justify-content-between ms-1">
                    <label className="profile-side-headers d-flex align-items-center">
                      <IoLanguage
                        className={
                          pageContentLoaded
                            ? "me-4 brand-color fs-4"
                            : "me-3 p-3 fs-4 placeholder rounded-2"
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
                    {pageContentLoaded ?
                      language.length === 0 ? (
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
                        language.map((language) => {
                          return (
                            <>
                              <div className="d-flex justify-content-between" key={language.id}>
                                <label className="profile-inner-headers">
                                  {language.language_known}
                                </label>
                              </div>
                              <p className="mt-1 profile-descriptions">
                                {language.language_level}
                              </p>
                              <hr />
                            </>
                          );
                        })
                      )
                      :
                      <div>
                        {dummyLanguage.map((language) => {
                          return (
                            <React.Fragment key={language.id}>
                              <div className="d-flex justify-content-between">
                                <label className="profile-inner-headers placeholder rounded-2 py-3 w-25"></label>
                              </div>
                              <p className="mt-1 profile-descriptions placeholder rounded-2 py-2 pb-3 w-100"></p>
                              <hr />
                            </React.Fragment>
                          );
                        })}
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          :
          null
      }


      {
        additionalInfo.length > 0 ?
          <div className="card border-0 mt-2">
            <div className="card-body ">
              <div className="d-flex justify-content-between ms-1">
                <label className="profile-side-headers d-flex align-items-center">
                  <MdAddToPhotos
                    className={
                      pageContentLoaded
                        ? "me-4 brand-color fs-4"
                        : "me-3 p-3 fs-4 placeholder rounded-2"
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
                {additionalInfo.length === 0 ? (
                  <p
                    className={
                      pageContentLoaded
                        ? "text-grey ms-1 employer-card-Content"
                        : "text-grey placeholder rounded-2"
                    }
                  >
                    Add other information such as board positions,
                    volunteering roles, certifications, awards, etc.
                  </p>
                ) : (
                  additionalInfo.map((info, index) => {
                    return (
                      <React.Fragment key={index}>
                        <div className="additional-information">
                          <div className="d-flex justify-content-between ">
                            <label className="profile-inner-headers ">
                              {info.title}
                            </label>
                          </div>
                          <ul className="mt-1 profile-descriptions">
                            <li>
                              <p className='text-break'>{info.description}</p>
                            </li>
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  })
                )}
              </div>
            </div>
          </div>
          :
          null
      }

    </>
  )
}

export default EmployerCandidateProfile;