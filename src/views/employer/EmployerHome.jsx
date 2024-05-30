import React, { useContext, useEffect, useState } from 'react'
import { MdArrowDropDown } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import CardWithCard from '../../components/Cards/CardWithCard';
import Button from '../../components/Button/Button';
import axiosInstance from '../../services/api/axiosInstance';
import employerContext from '../../hooks/employerContext';
import { IoIosInformationCircleOutline } from "react-icons/io";
import Image from "../../utils/images";


const EmployerHome = () => {
  const { handleGetJobApi,
    getJobApi,
    setGetJobApi,
    pageOneLoading,
    setPageOneLoading,
    setShowProgressBar,
    setShowFieldOne,
    setShowFieldTwo,
    setShowFieldThree,
    setShowFieldFour,
    setPageTwoJobDetails,
    setPageThreeJobDetails,
    setPageFourJobDetails,
    progressBarHide,
    setProgressBarHide,
    setEditingJobFromHome,
    settxtDurations
  } = useContext(employerContext);

  useEffect(() => {
    handleGetJobApi('getPreviousJobTemplates');
  }, [])

  const [closingCandidateDetails, setClosingCandidateDetails] = useState([])

  // Card repetition array for temporary
  const count = ['1', '2', '3', '4', '5', '6']

  const pageRender = useNavigate();



  // state for api loading
  const [cardWithCardLoading, setCardWithCardLoading] = useState(true)


  // state for functionality
  const [sortByValue, setSortByValue] = useState('--default--')

  const [openValue, setOpenValue] = useState('opened')



  //  search filter

  const [searchJob, setSearchJob] = useState("")



  const handleOpenDropDown = (drop) => {
    setOpenValue(drop);
  }

  // state for api
  const [employerCardDetails, setEmployerCardDetails] = useState([]);
  const [employerCardDetailsDuplicate, setEmployerCardDetailsDuplicate] = useState([]);





  // Api handling with button click

  const handlePauseJobApi = (e, cardJobId, cardJobStatus) => {
    postEmployerJobPauseDetails(cardJobId, cardJobStatus)

  }

  const handleJobDelete = (e, cardJobId) => {
    postEmployerJobDelete(cardJobId)
  }

  const handleCloseJobApi = (e, radioValue, candidateName, candidateFeedback, cardJobId) => {
    postEmployerJobCloseDetails(cardJobId, radioValue, candidateName, candidateFeedback)
  }

  const handleOpenPauseJobApi = (e, cardJobId, cardJobStatus) => {
    postOpenPausedJob(cardJobId, cardJobStatus)
  }
  // =================================Double Button States======================================================================================

  const [appliedCandidates, setAppliedCandidates] = useState()


  const [candidateDetailsDb, setCandidateDetailsDb] = useState(false);


  const [radioValueDb, setRadioValueDb] = useState('N')

  const [candidateNameDb, setcandidateNameDb] = useState('')
  const [candidateFeedbackDb, setCandidateFeedbackDb] = useState('')



  const handleCandidateSearchRadioButton = (e, cardJobId) => {
    // setRadioValue(e.target.value)
    if (e.target.value === 'Y') {
      setCandidateDetailsDb(true)
      getAppliedCandidateSearch(cardJobId)
      setRadioValueDb('Y')
    }
    else {
      setCandidateDetailsDb(false)
      setRadioValueDb('N')
    }
  }


  const handleCandidateNameDb = (e) => {
    setcandidateNameDb(e.target.value)
  }
  const handleCandidateFeedbackDb = (e) => {
    setCandidateFeedbackDb(e.target.value)
  }




  // ===================================================================================================================




  // Api hitting

  // Employer Home Open,Close,Pause
  const getEmployerHomePageDetails = async () => {
    setCardWithCardLoading(false)
    const homeParams = {
      "job_status": openValue
    }
    try {
      const response = await axiosInstance.post("/get_home_dashboard", homeParams)
      setCardWithCardLoading(true)
      if (response.data.error_code === 0) {

        setEmployerCardDetails(response.data.data)
        setEmployerCardDetailsDuplicate(response.data.data)
      }

    }
    catch (error) {
      console.log('response error', error)
    }
  }

  useEffect(() => {
    getEmployerHomePageDetails()
  }, [openValue])


  // applied candidates search
  const getAppliedCandidateSearch = async (cardJobId) => {
    const appliedCloseJobParams = {
      "job_id": cardJobId
    }

    try {

      const response = await axiosInstance.post("/get_applied_close_job", appliedCloseJobParams)
      if (response.data.error_code === 0) {
        setAppliedCandidates(response.data.data)
        // setEmployerCardDetails(response.data.data)
        // if (response.data.data === '')
        // setTimeout(() => {
        //   getEmployerHomePageDetails()
        // }, 3000)
      }
    }
    catch (catchError) {
      console.log("try catch error", catchError)
    }
  }






  // Job Close
  const postEmployerJobCloseDetails = async (cardJobId, radioValue, candidateName, candidateFeedback) => {
    if (radioValue === "N") {
      var closeJobParams = {
        "is_role_filled": radioValue,
        "candidate_id": '',
        "feedback": '',
        "job_id": cardJobId
      }

      var hitApi = true
    } else {
      if (closingCandidateDetails.length > 0) {
        var candidatesIds=closingCandidateDetails.map((v)=>{
          return v.value
        })

        var closeJobParams = {
          "is_role_filled": radioValue,
          "candidate_id": candidatesIds,
          "feedback": candidateFeedback,
          "job_id": cardJobId
        }

        var hitApi = true
      } else {
        var hitApi = false
      }
    }
    if (hitApi && (candidateFeedback!==''|| radioValue=='N' )){
      try {
        const response = await axiosInstance.post("/close_job", closeJobParams)
        if (response.data.error_code === 0) {
          document.getElementById(`closeModal-${cardJobId}`).click()

          setTimeout(() => {
            getEmployerHomePageDetails()
          }, 2000)

        }
      }
      catch (catchError) {
        console.log("try catch error", catchError)
      }
    } else {
      toast("Please fill all the details", {
        icon: (
          <IoIosInformationCircleOutline className="fs-1 brand-color me-1" />
        ),
      });
    }
  }



  // Job Pause
  const postEmployerJobPauseDetails = async (cardJobId, cardJobStatus) => {
    cardJobStatus === 'paused' ? cardJobStatus = 'opened' : cardJobStatus = 'paused';
    const pauseJobParams = {
      "job_id": cardJobId,
      "job_status": cardJobStatus
    }

    try {

      const response = await axiosInstance.post("/update_status_job_post", pauseJobParams)

      if (response.data.error_code === 0) {
        setTimeout(() => {
          getEmployerHomePageDetails()
        }, 2000)

      }
    }
    catch (catchError) {
      console.log("try catch error", catchError)
    }
  }

  // Job Delete
  const postEmployerJobDelete = async (cardJobId) => {
    const deleteJobParams = {
      "job_id": cardJobId
    }

    try {

      const response = await axiosInstance.post("/delete_job_post", deleteJobParams)

      if (response.data.error_code === 0) {
        setTimeout(() => {
          getEmployerHomePageDetails()
        }, 2000)

      }
    }
    catch (catchError) {
      console.log("try catch error", catchError)
    }
  }

  // Open paused Job
  const postOpenPausedJob = async (cardJobId, cardJobStatus) => {
    cardJobStatus === 'opened' ? cardJobStatus = 'paused' : cardJobStatus = 'opened';
    const openPausedJobParams = {
      "job_id": cardJobId,
      "job_status": cardJobStatus,
    }

    try {

      const response = await axiosInstance.post("/update_status_job_post", openPausedJobParams)

      if (response.data.error_code === 0) {
        setTimeout(() => {
          getEmployerHomePageDetails()
        }, 2000)

      }
    }
    catch (catchError) {
      console.log("try catch error", catchError)
    }
  }


  // const [sortBy,setSortBy]=useState('');


  // Sorting with dateposted, a-z , z-a

  const handleSortByDropDown = (sortValue) => {
    setSortByValue(sortValue)

    if (employerCardDetails.length > 0) {
      switch (sortValue) {
        case "DatePosted":
          setSortByValue("Date Posted")
          // var reverseDate = employerCardDetails.map((v) => {
          //   var copyObj = { ...v }
          //   var changeFormat = v.posted_on.split('-')
          //   var newFormat = `${changeFormat[2]}-${changeFormat[1]}-${changeFormat[0]}`

          //   copyObj.posted_on = newFormat
          //   return copyObj
          // })
          var sorting = employerCardDetails.sort(function (a, b) {

            let d1 = new Date(a.posted_on),
              d2 = new Date(b.posted_on)
            if (d1 > d2) {
              return -1;
            }
          })
          setEmployerCardDetailsDuplicate(sorting)
          
          break;

        case "NameAscending":
          setSortByValue("A - Z")
          var sorting = employerCardDetails.sort(function (a, b) {
            if (a.job_title.toLowerCase() < b.job_title.toLowerCase()) {
              return -1;
            }
          })
          setEmployerCardDetailsDuplicate(sorting)

          break;

        case "NameDescending":
          setSortByValue("Z - A")
          var sorting = employerCardDetails.sort(function (a, b) {
            if (b.job_title.toLowerCase() < a.job_title.toLowerCase()) {
              return -1;
            }
          })
          setEmployerCardDetailsDuplicate(sorting)

          break;
        default:
          break;
      }
    }

  }


  // handle Search

  const handleSearchJob = (e) => {
    setSearchJob(e.target.value)
    var searchResults = employerCardDetails.filter((employee) => {
      return employee.job_title.toLowerCase().includes(e.target.value.toLowerCase())
    })

    setEmployerCardDetailsDuplicate(searchResults)
  }


  const handlePostJobButton = () => {
    setPageTwoJobDetails({
      jobTitle: "",
      jobOverview: "",
      workplaceType: "Select",
      // location: "Select",
      jobType: "Select",
      timeCommitment: "Select",
      timeZone: "Select",
      schedule: "Select",
      duration: "Select",
      compensation: "Select"
    });

    setPageThreeJobDetails({
      jobDescription: null,
      skills: [],
      specialization: ""
    })

    setPageFourJobDetails({
      resume: "",
      coverLetter: "",
      bgCheck: "",
      hiring: "",
      questions: []
    })

    settxtDurations({
      count:0,
      format:'Select'
    })

    setShowFieldOne(true);
    setShowFieldTwo(false);
    setShowFieldThree(false);
    setShowFieldFour(false);
    setShowProgressBar(true)
    setProgressBarHide(false)
    setEditingJobFromHome(false)
    pageRender("/employer_dashboard/multistepForm")
  }


  return (
    <>
      <div className="container-fluid community-page-bg h-100 employer-home-page pt-4 py-2">
        <div className="row row-cols-lg-2 row-cols-md-2  flex-lg-wrap-reverse
                 align-items-lg-center justify-content-lg-between align-items-md-center justify-content-md-evenly employerHomePadding">
          <div className="col-lg-5 col-sm-12 col-md-12 ">


            <div className="row align-items-lg-center justify-content-lg-between align-items-md-center justify-content-md-between">

              {cardWithCardLoading ?

                <div className='col-lg-7 col-sm-7 col-md-7'>
                  <div className="dropdown employer-custom-dropdown">
                    <button
                      className="btn dropdown-toggle rounded py-2 w-100 buttonMarginBottom"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    ><span className='fw-semibold'>Sort by : </span><span>{sortByValue}</span></button>

                    <ul className="dropdown-menu employer-custom-dropdown border-0 shadow ">

                      <li><a className="dropdown-item fw-medium  ps-4" onClick={() => handleSortByDropDown('DatePosted')}>Date Posted</a></li>
                      <hr className='m-0 mx-4 buttonLineColor' />
                      <li><a className="dropdown-item fw-medium  ps-4" onClick={() => handleSortByDropDown('NameAscending')}>A - Z</a></li>
                      <hr className='m-0 mx-4 buttonLineColor' />
                      <li><a className="dropdown-item fw-medium  ps-4" onClick={() => handleSortByDropDown('NameDescending')}>Z - A</a></li>
                    </ul>
                  </div>

                </div>
                :
                <div className='col-lg-7 col-sm-7 col-md-7'>
                  <h5 className="card-title">
                    <span className="placeholder col-9 py-3 rounded-3"></span>
                  </h5>
                </div>
              }

              {cardWithCardLoading ?
                <div className='col-lg-5 col-sm-5 col-md-5'>

                  <div className="dropdown employer-custom-dropdown">
                    <button
                      className="btn dropdown-toggle border-0 w-100 px-2 py-2 buttonMarginBottom
                      .6269+"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    ><span className='fw-semibold'>Status : </span><span>{openValue==='opened' ? 'Open' : openValue==='paused' ? 'Paused' : openValue==='closed' ? 'Closed': openValue}</span></button>
  
                    <ul className="dropdown-menu border-0 shadow ">
                      <li><a className="dropdown-item fw-medium ps-4" onClick={() => handleOpenDropDown('opened')}>Open </a></li>
                      <hr className='m-0 mx-4 buttonLineColor ' />
                      <li><a className="dropdown-item fw-medium  ps-4" onClick={() => handleOpenDropDown('closed')}>Closed </a></li>
                      <hr className='m-0 mx-4 buttonLineColor ' />
                      <li><a className="dropdown-item fw-medium ps-4" onClick={() => handleOpenDropDown('paused')}>Paused </a></li>
                    </ul>
                  </div>

                </div>
                :
                <div className='col-lg-5 col-sm-5 col-md-5'>
                  <h5 className="card-title ">
                    <span className="placeholder col-9 py-3 rounded-3"></span>
                  </h5>
                </div>
              }


            </div>
          </div>
          <div className="col-lg-7 col-md-12 col-sm-12">
            {cardWithCardLoading ?
              <div className="d-lg-flex align-items-lg-center justify-content-lg-between d-md-flex  d-sm-flex align-items-md-center justify-content-md-between
                            justify-content-sm-between align-items-sm-center ">
                <div className="position-relative align-items-center searchJobSpace">
                  <input
                    type="text"
                    className="form-control shadow rounded px-5 search-field buttonMarginBottom"
                    placeholder="Search by job role"
                    onChange={(e) => handleSearchJob(e)}
                  />
                  <span className='fs-5 search-icon'><IoSearchOutline /></span>
                </div>

                <div className='align-items-center'>
                  <Button className='btn btn-brand-color postButtonTextSize fw-bold buttonMarginBottom' functionOnchange={handlePostJobButton}
                    title="&#43; Post a job" />
                </div>

              </div>
              :

              <div className='row align-items-lg-center justify-content-between'>
                <div className='col-lg-6 col-sm-8 col-md-7'>
                  <h5 className="card-title ">
                    <span className="placeholder col-9 py-3 rounded-3"></span>
                  </h5>
                </div>
                <div className='col-lg-4 col-sm-8 col-md-7 ms-5'>
                  <h5 className="card-title ">
                    <span className="placeholder col-9 py-3 rounded-3"></span>
                  </h5>
                </div>
              </div>

            }


          </div>
        </div>

        <hr className='mx-5' />

        <div className="eHome-body-page-height mt-4 overflow-scroll employerHomePadding employerHomeMediumPadding">
          <div className="col-lg-12 h-100">

            {cardWithCardLoading ?
              (
                <div className="container-fluid">
                  <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-3 g-3">


                    {
                      employerCardDetailsDuplicate.length > 0 ?

                        employerCardDetailsDuplicate.map((employerCard, index) => {
                          return (

                            <div className="col mb-3" key={index}>
                              <CardWithCard
                                cardKey={index}
                                jobId={employerCard.job_id}
                                cardTitle={employerCard.job_title}
                                cardDate={employerCard.posted_on}
                                viewed={employerCard.view_count}
                                applied={employerCard.applied_count}
                                notReviewed={employerCard.not_reviewed_count}
                                shortlisted={employerCard.shortlisted_count}
                                firstButton_Name="Open"
                                secondButton_Name="View"
                                firstCardColor="secondary"
                                secondCardColor="brand-color"
                                openValue={openValue}
                                icon={<MdArrowDropDown />}
                                // dropDownButtonName={openValue}
                                dropDownName={openValue !== '' ? openValue : null}
                                handleCloseJob={handleCloseJobApi}
                                handlePauseJob={handlePauseJobApi}
                                handleOpenJob={handleOpenPauseJobApi}
                                searchJob={searchJob}
                                // handleRadioYesApiClick={handleRadioYesApiClick}
                                // handleRadioNoApiClick={handleRadioNoApiClick}
                                handleCandidateSearchRadioButton={handleCandidateSearchRadioButton}

                                // Double Button 
                                candidateDetailsDb={candidateDetailsDb}
                                setCandidateDetailsDb={setCandidateDetailsDb}
                                radioValueDb={radioValueDb}
                                setRadioValueDb={setRadioValueDb}
                                candidateNameDb={candidateNameDb}
                                setcandidateNameDb={setcandidateNameDb}
                                handleCandidateNameDb={handleCandidateNameDb}
                                candidateFeedbackDb={candidateFeedbackDb}
                                setCandidateFeedbackDb={setCandidateFeedbackDb}
                                handleCandidateFeedbackDb={handleCandidateFeedbackDb}
                                appliedCandidates={appliedCandidates}
                                setAppliedCandidates={setAppliedCandidates}
                                setClosingCandidateDetails={setClosingCandidateDetails}

                                // job delete
                                handleJobDelete={handleJobDelete}
                              />
                            </div>
                          )
                        })

                        :
                        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                          <div className='d-flex  justify-content-center h-100'>
                          <img src={Image.noRecordsFound} width={250} height={250}/>
                          </div>
                        </div>
                    }


                  </div>
                </div>
              )

              :
              // Placeholder Loading
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-3 g-4 mb-4">
                {

                  count.map((c, i) => {
                    return (
                      <div className="col-12 col-md-6 col-lg-4" key={i}>


                        <div
                          className="card border-0 p-0 rounded-3 overflow-hidden placeholder-glow"
                          aria-hidden="true"
                          key={i}
                        >
                          <div className="card-body p-0">
                            <div className="p-3 py-3">
                              <h5 className="card-title ">
                                <span className="placeholder col-9 py-3 rounded-3"></span>
                              </h5>
                              <p className="card-text">
                                <span className="placeholder col-5 py-3 rounded"></span>
                              </p>
                            </div>

                            <div className="col-12 px-4 pb-4">
                              <div className="row align-items-center">
                                <div className="col-6 pe-0">
                                  <h5 className="card-title "><span className="placeholder col-10 py-5 rounded-3"></span></h5>
                                </div>
                                <div className="col-6 pe-0">
                                  <h5 className="card-title "><span className="placeholder col-10 py-5 rounded-3"></span> </h5>
                                </div>
                                <div className="col-6 pe-0">
                                  <h5 className="card-title "><span className="placeholder col-10 py-5 rounded-3"></span></h5>
                                </div>
                                <div className="col-6 pe-0">
                                  <h5 className="card-title "><span className="placeholder col-10 py-5 rounded-3"></span> </h5>
                                </div>
                              </div>
                            </div>

                            <div className="card-footer d-flex justify-content-between">
                              <button className="btn btn-outline-secondary placeholder col-5"></button>
                              <button className="btn btn-outline-secondary placeholder col-5"></button>
                            </div>
                          </div>
                        </div>
                      </div>

                    )
                  })

                }
              </div>
            }

          </div>
        </div>
      </div>
    </>
  )
}

export default EmployerHome