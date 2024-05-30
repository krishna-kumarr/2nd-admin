import React, { useEffect, useRef, useState } from 'react'
import InfoEditCard from '../../components/Cards/InfoEditCard'
import InfoAddCard from '../../components/Cards/InfoAddCard'
import { FaGraduationCap, FaUserTie } from 'react-icons/fa'
import { PiBagFill } from 'react-icons/pi'
import { HiLightBulb } from 'react-icons/hi'
import axiosInstance from '../../services/api/axiosInstance'
import toast from 'react-hot-toast';
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import CandidateProfile from './CandidateProfile'
import { MdAddToPhotos, MdAppRegistration } from 'react-icons/md'
import { RiVideoFill } from 'react-icons/ri'
import VideoPlayer from '../../components/VideoJS/VideoPlayer'
import { IoLanguage, IoSearchOutline } from 'react-icons/io5'
import Joyride from 'react-joyride';






const EmployerPool = () => {

  const [pageContentLoaded, setPageContentLoaded] = useState(false)
  const [pageRefresh, setPageRefresh] = useState(false)
  const [aboutContent, setAboutContent] = useState("");
  const [preferenceContent, setPreferenceContent] = useState("");
  const [experienceArrayData, setExperienceArrayData] = useState([]);
  const [educationArrayData, setEducationArrayData] = useState([]);
  const [skillsArrayData, setSkillsArrayData] = useState([]);
  const [languagesArrayData, setLanguagesArrayData] = useState([]);
  const [additionalInformationArrayData, setAdditionalInformationArrayData] = useState([])
  const [allArrayData, setAllArrayData] = useState([])
  const [allArrayDataCopy, setAllArrayDataCopy] = useState([])
  const [searchArrayData, setSearchArrayData] = useState([])
  const [totalNoOfRecords, setTotalNoOfRecords] = useState(null)
  const [loadMoreLoading, setLoadMoreLoading] = useState(false)
  const [professionalId, setProfessionalId] = useState(null)
  // const [jobId, setJobId] = useState(null)


  const [uploadedVideoFile, setUploadedVideoFile] = useState("");
  const [isVideoUploaded, setIsVideoUploaded] = useState(false)
  const [videoUploadedPlaceholder, setVideoUploadedPlaceholder] = useState(true)
  const [videoFullyUploaded, setVideoFullyUploaded] = useState(false)



  // scroll to top 

  const [isVisible, setIsVisible] = useState(false);

  // Function to handle scroll event
  const handleScroll = () => {
    if (window.pageYOffset > 200) { // Adjust this value according to your needs
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Optional: smooth scrolling animation
    });
  };

  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);

  



  const steps = [
    {
      // title: "create page",
      target: '#searchInputField',
      content: 'Search candidate by skills,education,experience',
      placement: "top"
    },
    {
      // title: "create page",
      target: '#clickToSeeProfile2',
      content: 'Tap here to see the full details of the candidate',
      placement: "left"
    },
    {
      // title: "create page",
      target: '#scroll-to-top-icon',
      content: 'Tap here to scroll to the page top',
      placement: "top"
      
    },
  ];
  const [run, setRun] = useState(false);

  useEffect(() => {
    setRun(true);
    
  }, []);




  const [poolSearch, setPoolSearch] = useState("")

  const handlePoolSearch = (e) => {
    setPoolSearch(e.target.value)

    //search by skills
    var l = [];
    for (var i = 0; i < searchArrayData.length; i++) {
      var skillArray = searchArrayData[i].skills
      var c = 0
      for (var j = 0; j < skillArray.length; j++) {
        if (searchArrayData[i].skills[j].skill_name.toLowerCase().includes(e.target.value.toLowerCase()) === true) {
          c++
        }
      }

      if (c > 0) {
        l[l.length] = searchArrayData[i]
      }
      c = 0
    }

    //search by experience
    var experienceArr = searchArrayData.filter((v, i) => {
      if (v.experience.job_title !== undefined) {
        return v.experience.job_title.toLowerCase().includes(e.target.value.toLowerCase())
      }
    })


    //search by education
    var educationArr = searchArrayData.filter((v, i) => {
      if (v.education.degree_level !== undefined) {
        return v.education.degree_level.toLowerCase().includes(e.target.value.toLowerCase())
      }
    })



    if (e.target.value !== '') {
      var finalResults = [...l, ...experienceArr, ...educationArr]
      //deleting duplicate objects
      const unique = finalResults.filter((obj, index) => {
        return index === finalResults.findIndex(o => obj.professional_id === o.professional_id);
      });
      setAllArrayDataCopy(unique);
    } else {
      setAllArrayDataCopy(searchArrayData);
    }
  }





  useEffect(() => {

    const getPoolPageResponse = async () => {

      const requiredParams = {
        id: 0
      }

      try {

        const response = await axiosInstance.post("/pool_dashboard_view", requiredParams)

        if (response.data.error_code === 0) {
          setPageContentLoaded(true);
          setAllArrayData(response.data.data.final_result)
          setAllArrayDataCopy(response.data.data.final_result)
          setSearchArrayData(response.data.data.final_result)

          setSkillsArrayData(response.data.data.skills);
          setTotalNoOfRecords(response.data.data.total_professionals)
        }


      } catch (err) {
        console.log(err);
      }
    };

    (async () => getPoolPageResponse())();

  }, [pageRefresh]);




  const handleLoadMore = async (e, nextArrayFromId) => {

    const requiredParams = {
      id: nextArrayFromId
    }

    try {

      setLoadMoreLoading(true)
      const response = await axiosInstance.post("/pool_dashboard_view", requiredParams)

      if (response.data.error_code === 0) {
        setPageContentLoaded(true);
        setAllArrayDataCopy(allArrayData => ([
          ...allArrayData, ...response.data.data.final_result
        ]))
        setSearchArrayData(allArrayData => ([
          ...allArrayData, ...response.data.data.final_result
        ]))


      }
      setLoadMoreLoading(false)

    } catch (err) {
      console.log(err);
    }
  }




  const handleViewFullProfile = async (e, professionalId) => {
    setProfessionalId(professionalId)
  }





  return (
    <>


      <div className="employer-pool ">
        

        <div className={`container-fluid px-5 ${allArrayDataCopy.length < 1 ? "vh-80" : ""}`}>
          <div id="section-1"></div>
          <div className='row pt-3'>
            <div className="col-lg-6">
              {/* <div className="position-relative align-items-lg-center searchJobSpace">
                        <input
                          type="text"
                          className="form-control shadow rounded px-5 search-field ms-3"
                          placeholder="Search by job title"
                        />
                        <span className='fs-5 search-icon'><IoSearchOutline /></span>

                      </div> */}
            </div>
            <div className="col-lg-6">
              <div className={pageContentLoaded ? "position-relative align-items-lg-center searchJobSpace p-2" : "position-relative align-items-lg-center searchJobSpace  d-none"}>
                <input
                  type="text"                  
                  id="searchInputField"
                  className="form-control shadow rounded px-5 search-field ms-3"
                  placeholder="Search by skills, experience, education"
                  value={poolSearch}
                  onChange={(e) => handlePoolSearch(e)}

                />
                <span className='fs-5 search-icon ms-3'><IoSearchOutline /></span>

              </div>
            </div>
          </div>

          {
            allArrayDataCopy.length > 0 ?
              allArrayDataCopy.map((value, i) => {
                return (
                  <React.Fragment key={value.id}>
                    <div className="card border-0 shadow-sm px-5 py-3 my-4 placeholder-glow h-100">
                      <div className="row">
                        <div className="col-lg-6 col-md-12">

                          <InfoEditCard
                            pageContentLoaded={pageContentLoaded}
                            cardHeadingIcon={<FaUserTie className={pageContentLoaded ? "me-4 brand-color fs-4" : "me-4  fs-4 placeholder rounded-2"} />}
                            cardHeading="About"
                            id="pageTop"
                            placeholder="Provide a brief description about yourself"
                            cardContent={value.about.length > 200 ? `${value.about.slice(0, 250)}..` : `${value.about}`} />
                        </div>
                        <div className="col-lg-6 col-md-12">
                          <InfoAddCard
                            pageContentLoaded={pageContentLoaded}
                            cardHeadingIcon={<PiBagFill className={pageContentLoaded ? "me-4 brand-color fs-4" : "me-4  fs-4 placeholder rounded-2"} />}
                            cardHeading="Experience"
                            placeholder="Your experience details will be displayed here"
                            arrayContent={value.experience}
                            currentPage="employerPool"
                          />
                        </div>
                      </div>


                      <div className="row">
                        <div className="col-lg-6 col-md-12">
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
                                  {
                                    value.skills.length === 0 ?
                                      <p
                                        className={
                                          pageContentLoaded
                                            ? "mt-0 word-space-content px-0 ms-1"
                                            : "placeholder px-3 py-2 mt-0 rounded-1"
                                        }
                                      >
                                        Your skills will be displayed here
                                      </p>
                                      :
                                      value.skills.slice(0, 10).
                                        map((skill, id) => {
                                          return (
                                            <React.Fragment key={skill.id}>
                                              <div className="col mt-0">
                                                <div className={pageContentLoaded ? "border rounded-2 p-2 fw-bold mb-4" : "border rounded-2 p-2 fw-bold mb-4 placeholder"}>
                                                  {skill.skill_name} -{" "}
                                                  <span className="fw-normal">
                                                    {skill.skill_level}
                                                  </span>
                                                </div>
                                              </div>
                                            </React.Fragment>
                                          )
                                        })
                                  }
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-12">
                          <InfoAddCard
                            pageContentLoaded={pageContentLoaded}
                            cardHeadingIcon={<FaGraduationCap className={pageContentLoaded ? "me-4 brand-color fs-4" : "me-4  fs-4 placeholder rounded-2"} />}
                            cardHeading="Education"
                            placeholder="Your education details will be displayed here"
                            arrayContent={value.education}
                            currentPage="employerPool"

                          />
                        </div>
                      </div>

                      <div className="mt-4 text-end" >

                        <button id={`${i === 0 ? "clickToSeeProfile2" : ""}`} className={pageContentLoaded ? `btn btn-brand-color ${i === 0 ? "" : ""}` : 'btn  placeholder rounded-2'} data-bs-toggle="modal"
                          data-bs-target="#fullProfileModal" onClick={(e) => handleViewFullProfile(e, value.professional_id)}>
                          View full profile
                        </button>
                      </div>
                    </div>

                    {/* <button id='btn1'>button</button> */}
        {/* <div id="joyride-btn">
          <Joyride
            
            styles={{
              buttonNext: {
                background: '#e38212',
                outline: 'none'
              },
              buttonBack: {
                color: '#212529',
              }
            }}
            scrollOffset={100}
            continuous
            hideCloseButton
            showProgress
            steps={steps}
            run={run}
            
          />
        </div> */}
                  </React.Fragment>
                )
              })
              :
              pageContentLoaded ?
                <div className="card mt-4 p-4 border-0 h-100 d-flex justify-content-center align-items-center">
                  <h3 className={pageContentLoaded ? "" : "placeholder rounded-2 w-25"}>No data found</h3>
                </div>
                :


                //  placeholding loading content

                <>

                  <div className="card border-0 shadow-sm px-5 py-3 my-4 placeholder-glow ">
                    <div className="row">
                      <div className="col-lg-6 col-md-12">
                        <InfoEditCard
                          pageContentLoaded={pageContentLoaded}
                          cardHeadingIcon={<FaUserTie className={pageContentLoaded ? "me-4 brand-color fs-4" : "me-4  fs-4 placeholder rounded-2"} />}
                          cardHeading="About"
                          id="pageTop"
                          placeholder="Provide a brief description about yourself"
                          cardContent="about content" />
                      </div>
                      <div className="col-lg-6 col-md-12">
                        <InfoEditCard
                          pageContentLoaded={pageContentLoaded}
                          cardHeadingIcon={<FaUserTie className={pageContentLoaded ? "me-4 brand-color fs-4" : "me-4  fs-4 placeholder rounded-2"} />}
                          cardHeading="About"
                          id="pageTop"
                          placeholder="Provide a brief description about yourself"
                          cardContent="about content" />
                      </div>
                    </div>


                    <div className="row">
                      <div className="col-lg-6 col-md-12">
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

                                <p
                                  className={
                                    pageContentLoaded
                                      ? "mt-0 word-space-content px-0 ms-1"
                                      : "placeholder px-3 py-2 mt-0 rounded-1"
                                  }
                                >
                                  Your skills will be displayed here
                                </p>


                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12">
                        <InfoEditCard
                          pageContentLoaded={pageContentLoaded}
                          cardHeadingIcon={<FaUserTie className={pageContentLoaded ? "me-4 brand-color fs-4" : "me-4  fs-4 placeholder rounded-2"} />}
                          cardHeading="About"
                          id="pageTop"
                          placeholder="Provide a brief description about yourself"
                          cardContent="about content" />
                      </div>
                    </div>


                    <div className="mt-4 text-end">
                      <button className={pageContentLoaded ? 'btn btn-brand-color' : 'btn  placeholder rounded-2'} data-bs-toggle="modal"
                        data-bs-target="#fullProfileModal">
                        Click here to see full profile
                      </button>
                    </div>
                  </div>
                  <div className="card border-0 shadow-sm px-5 py-3 my-4 placeholder-glow ">
                    <div className="row">
                      <div className="col-lg-6 col-md-12">
                        <InfoEditCard
                          pageContentLoaded={pageContentLoaded}
                          cardHeadingIcon={<FaUserTie className={pageContentLoaded ? "me-4 brand-color fs-4" : "me-4  fs-4 placeholder rounded-2"} />}
                          cardHeading="About"
                          id="pageTop"
                          placeholder="Provide a brief description about yourself"
                          cardContent="about content" />
                      </div>
                      <div className="col-lg-6 col-md-12">
                        <InfoEditCard
                          pageContentLoaded={pageContentLoaded}
                          cardHeadingIcon={<FaUserTie className={pageContentLoaded ? "me-4 brand-color fs-4" : "me-4  fs-4 placeholder rounded-2"} />}
                          cardHeading="About"
                          id="pageTop"
                          placeholder="Provide a brief description about yourself"
                          cardContent="about content" />
                      </div>
                    </div>


                    <div className="row">
                      <div className="col-lg-6 col-md-12">
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

                                <p
                                  className={
                                    pageContentLoaded
                                      ? "mt-0 word-space-content px-0 ms-1"
                                      : "placeholder px-3 py-2 mt-0 rounded-1"
                                  }
                                >
                                  Your skills will be displayed here
                                </p>


                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12">
                        <InfoEditCard
                          pageContentLoaded={pageContentLoaded}
                          cardHeadingIcon={<FaUserTie className={pageContentLoaded ? "me-4 brand-color fs-4" : "me-4  fs-4 placeholder rounded-2"} />}
                          cardHeading="About"
                          id="pageTop"
                          placeholder="Provide a brief description about yourself"
                          cardContent="about content" />
                      </div>
                    </div>


                    <div className="mt-4 text-end">
                      <button className={pageContentLoaded ? 'btn btn-brand-color' : 'btn  placeholder rounded-2'} data-bs-toggle="modal"
                        data-bs-target="#fullProfileModal">
                        Click here to see full profile
                      </button>
                    </div>
                  </div>
                </>
          }
        </div>


        <div className="container-fluid load-more-button-container">
          {
            loadMoreLoading === true ?
              <div className="d-flex justify-content-center " >
                <div
                  className="spinner-border brand-color"
                  role="status"
                >
                  <span className="visually-hidden ">
                    Loading...
                  </span>
                </div>
              </div>
              :

              pageContentLoaded === true ?
                allArrayDataCopy.length === totalNoOfRecords || allArrayDataCopy.length === 0 ?
                  null :
                  <div className="my-4 text-end">
                    <button className='btn btn-brand-color' onClick={(e) => handleLoadMore(e, allArrayDataCopy[allArrayDataCopy.length - 1].id)}>
                      Load more
                    </button>
                  </div>
                : null
          }
        </div>



        {/* scroll to top */}
        <div
          className="scroll-to-top-icon"
          id="scroll-to-top-icon"
          onClick={scrollToTop}
          title="Scroll to top"
          style={{ display: isVisible ? 'block' : 'none' }} // Show/hide button based on visibility state
        >
          <BsFillArrowUpCircleFill className='fs-1 brand-color' />
        </div>
      </div>



      <div
        className="modal fade"
        id="fullProfileModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content p-2">
            <div className="modal-header border-bottom-0">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Candidate full profile
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body border-bottom-0">
              <div className="container">
                {
                  professionalId !== null ?
                    <CandidateProfile
                      professionalId={professionalId} /> : null
                }
              </div>
            </div>
            <div className="modal-footer border-top-0">
              <div className="container">
                <div className="row float-end">
                  <div className="col-lg-12 ">

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>








    </>
  )
}

export default EmployerPool






