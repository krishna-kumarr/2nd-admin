import React, { useContext, useEffect, useState } from 'react';
import FormPageThree from './MultiStepPages/FormPageThree';
import FormPageFour from './MultiStepPages/FormPageFour';
import FormPageTwo from './MultiStepPages/FormPageTwo';
import FormPageOne from './MultiStepPages/FormPageOne';
import bootstrap from 'bootstrap/dist/js/bootstrap.min.js';
import axiosInstance from '../../services/api/axiosInstance';
import FormReview from './MultiStepPages/FormReview';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import employerContext from '../../hooks/employerContext';
import { IoIosInformationCircleOutline } from 'react-icons/io';


const MultiStepForm = () => {
    const { handleGetJobApi, getJobApi, setGetJobApi,
        pageOneLoading, setPageOneLoading,
        createJobId, setCreateJobId,
        existingTemplate, setExistingTemplate,
        pageTwoJobDetails, setPageTwoJobDetails,
        jobLocation, setJobLocation,
        pageThreeJobDetails, setPageThreeJobDetails,
        pageFourJobDetails, setPageFourJobDetails,
        showReview, setShowReview,
        showFieldOne, setShowFieldOne,
        showFieldTwo, setShowFieldTwo,
        showFieldThree, setShowFieldThree,
        showFieldFour, setShowFieldFour,
        showProgressBar, setShowProgressBar,
        displayStep, progressBarHide, setProgressBarHide,
        editingJobFromHome, setEditingJobFromHome,
        selctedTemplateCard, setSelectedTemplateCard,
        txtdurations, settxtDurations,
        showingJobLocation,
        setShowingJobLocation,
        editCompanyLocation,
        setEditCompanyLocation,
        postDraftTemplate, setPostDraftTemplate
    } = useContext(employerContext);


    const pageRender = useNavigate();




    const handleJobLocation = (selectedLocation) => {
        // if (selectedLocation) {
        //     setJobLocation({
        //         city: selectedLocation[0].long_name,
        //         country: selectedLocation[selectedLocation.length - 1].long_name,
        //     });
        // }

        if (selectedLocation.length === 5) {
            setEditCompanyLocation({
                city: selectedLocation[0].long_name,
                country: selectedLocation[selectedLocation.length - 2].long_name,
            });
            setShowingJobLocation(`${selectedLocation[0].long_name} , ${selectedLocation[selectedLocation.length - 2].long_name}`)
        } else if (selectedLocation) {
            setEditCompanyLocation({
                city: selectedLocation[0].long_name,
                country: selectedLocation[selectedLocation.length - 1].long_name,
            });
            setShowingJobLocation(`${selectedLocation[0].long_name} , ${selectedLocation[selectedLocation.length - 1].long_name}`)
        }

    };

    const handlePage2Click = (e) => {
        setPageTwoJobDetails({ ...pageTwoJobDetails, duration: `${txtdurations.count}-${txtdurations.format}` })

        if (pageTwoJobDetails.workplaceType === "Remote") {
            if (pageTwoJobDetails.jobTitle === "" || pageTwoJobDetails.jobOverview === "" || pageTwoJobDetails.workplaceType === "Select" || pageTwoJobDetails.timeCommitment === "Select" || pageTwoJobDetails.timeZone === "Select" || pageTwoJobDetails.jobType === "Select" || txtdurations.count === 0 || txtdurations.format === "Select" || pageTwoJobDetails.schedule === "Select" || pageTwoJobDetails.compensation === "") {
                toast("Please fill all the details", {
                    icon: (
                        <IoIosInformationCircleOutline className="fs-1 brand-color me-1" />
                    ),
                });
            } else {
                displayStep(3);
            }
        } else {
            if (pageTwoJobDetails.jobTitle === "" || pageTwoJobDetails.jobOverview === "" || pageTwoJobDetails.workplaceType === "Select" || pageTwoJobDetails.timeCommitment === "Select" || showingJobLocation === "" || pageTwoJobDetails.timeZone === "Select" || pageTwoJobDetails.jobType === "Select" || txtdurations.count === 0 || txtdurations.format === "Select" || pageTwoJobDetails.schedule === "Select" || pageTwoJobDetails.compensation === "") {
                toast("Please fill all the details", {
                    icon: (
                        <IoIosInformationCircleOutline className="fs-1 brand-color me-1" />
                    ),
                });
            }
            else {
                displayStep(3);
            }
        }
    }

    const handlePage3Click = (e) => {
        if (pageThreeJobDetails.specialization === "" || pageThreeJobDetails.skills.length === 0 || pageThreeJobDetails.jobDescription === null) {
            toast("Please fill all the details", {
                icon: (
                    <IoIosInformationCircleOutline className="fs-1 brand-color me-1" />
                ),
            });
        } else {
            displayStep(4)
        }
    }

    const handlePage4ReviewClick = (e) => {


        if (pageFourJobDetails.resume === "" || pageFourJobDetails.coverLetter === "" || pageFourJobDetails.hiring === "") {
            toast("Please fill all the details", {
                icon: (
                    <IoIosInformationCircleOutline className="fs-1 brand-color me-1" />
                ),
            });
        } else {
            setShowReview(false)
            setProgressBarHide(true)
        }
    }

    const handlePostJobBackButton = (e) => {
        setShowReview(true)
        setProgressBarHide(false)
    }



    const handleWorkplaceType = (type) => {
        // setWorkplaceType(type)
        setPageTwoJobDetails((prevState) => ({ ...prevState, workplaceType: type }))
    }
    const handleLocation = (type) => {
        // setWorkplaceType(type)
        setPageTwoJobDetails((prevState) => ({ ...prevState, location: type }))
    }
    const handleJobTitle = (e) => {
        // setWorkplaceType(type)
        setPageTwoJobDetails((prevState) => ({ ...prevState, jobTitle: e.target.value }))
    }
    const handleJobOverview = (e) => {
        setPageTwoJobDetails((prevState) => ({ ...prevState, jobOverview: e.target.value }))
    }

    const handlejobType = (type) => {
        // setJobType(type)
        setPageTwoJobDetails((prevState) => ({ ...prevState, jobType: type }))
    }

    const handleTimeCommitment = (value) => {
        // setTimeCommitment(value)
        setPageTwoJobDetails((prevState) => ({ ...prevState, timeCommitment: value }))
    }

    const handleTimeZone = (value) => {
        // setTimeZone(value)
        setPageTwoJobDetails((prevState) => ({ ...prevState, timeZone: value }))
    }

    const handleDuration = (value) => {
        // setDuration(value)
        setPageTwoJobDetails((prevState) => ({ ...prevState, duration: value }))
    }
    const handleSchedule = (value) => {
        // setSchedule(value)
        setPageTwoJobDetails((prevState) => ({ ...prevState, schedule: value }))
    }

    const handleCompensation = (e) => {
        // setCompensation(e.target.value)
        setPageTwoJobDetails((prevState) => ({ ...prevState, compensation: e.target.value }))

    }


    // Page Three===================================================================================================

    // Page Four===================================================================================================



    const [singleQuestion, setSingleQuestion] = useState("")
    const [multipleQuestionsArray, setmultipleQuestionsArray] = useState([])

    const [uiDisplayQuestion, setUiDisplayQuestion] = useState([])
    const handleSingleQuestion = e => {
        setSingleQuestion(e.target.value)
    }

    const addSingleQuestionToArray = (e) => {
        if (uiDisplayQuestion.length <= 2 && singleQuestion !== "") {
            setmultipleQuestionsArray(prevState => [...prevState, { singleQuestion: singleQuestion }])
            setUiDisplayQuestion((prevState) => [...prevState, singleQuestion])
        }

        setSingleQuestion("")
    }
    useEffect(() => {
        setPageFourJobDetails({ ...pageFourJobDetails, questions: multipleQuestionsArray })
    }, [multipleQuestionsArray])



    const handleJobDescription = (e) => {
        setPageThreeJobDetails((prevState) => ({ ...prevState, jobDescription: e }))
    }
    // const handleEmpJobQuestions = (e) => {
    //     setPageFourJobDetails((prevState) => ({ ...prevState, questions: e.target.value }))
    // }

    const handleSkills = (e, skill) => {
        const result = e.map((v, i) => {
            return v.label
        })
        setPageThreeJobDetails((prevState) => ({ ...prevState, skills: result }))
    }

    const handleSpecialization = (special) => {
        setPageThreeJobDetails((prevState) => ({ ...prevState, specialization: special }))
    }


    // Radios
    const handleResume = (e) => {
        setPageFourJobDetails((prevState) => ({ ...prevState, resume: e.target.value }))
    }

    const handleCoverLetter = (e) => {
        setPageFourJobDetails((prevState) => ({ ...prevState, coverLetter: e.target.value }))
    }
    const handleBgCheck = (e) => {
        setPageFourJobDetails((prevState) => ({ ...prevState, bgCheck: e.target.value }))
    }
    const handleHiring = (e) => {
        setPageFourJobDetails((prevState) => ({ ...prevState, hiring: e.target.value }))
    }



    // PageOne State
    const [newJobPost, setNewJobPost] = useState(false)
    // Api states
    const handleSearchByJob = (e) => {
        console.log(e.target.value)
    }

    //  search filter
    const [searchGetJob, setSearchGetJob] = useState("")

    // display page either page 2 or pageReview
    const [displayPageNumber, setDisplayPageNumber] = useState(null);



    const [jobPostStatus, setJobPostStatus] = useState('Start with a new job post')

    const handleNewJobPost = (e) => {
        setJobPostStatus(e.target.value)
        if (e.target.value === 'Use a previous job as template') {
            setNewJobPost(true)
            handleGetJobApi("getPreviousJobTemplates")
        }
        else if (e.target.value === 'Use draft as template') {
            setNewJobPost(true)
            handleGetJobApi("getDraftTemplates")
        }
        else {
            setNewJobPost(false)
        }
    }



    // APi hitting*******************************************************************************************************************************
    const handlePostJobApi = async () => {
        var customQuestion = pageFourJobDetails.questions.map((v) => {
            return { "custom_pre_screen_ques": v.singleQuestion, "id": 0 }
        })
        var convertSkillsToString = pageThreeJobDetails.skills.join(",")

        var cityData = pageTwoJobDetails.workplaceType === "Remote" ? "" : editCompanyLocation.city
        var countryData = pageTwoJobDetails.workplaceType === "Remote" ? "" : editCompanyLocation.country


        if (editingJobFromHome || postDraftTemplate) {
            var postJobParams = {
                "key_id": createJobId.id,
                "job_title": pageTwoJobDetails.jobTitle,
                "job_type": pageTwoJobDetails.jobType,
                "work_schedule": pageTwoJobDetails.schedule,
                "workplace_type": pageTwoJobDetails.workplaceType,
                "country": countryData,
                "city": cityData,
                "job_overview": pageTwoJobDetails.jobOverview,
                "specialisation": pageThreeJobDetails.specialization,
                "required_subcontract": pageFourJobDetails.hiring,
                "skills": convertSkillsToString,
                "time_zone": pageTwoJobDetails.timeZone,
                "job_desc": pageThreeJobDetails.jobDescription,
                "required_resume": pageFourJobDetails.resume,
                "required_cover_letter": pageFourJobDetails.coverLetter,
                "required_background_check": pageFourJobDetails.bgCheck,
                "time_commitment": pageTwoJobDetails.timeCommitment,
                "duration": pageTwoJobDetails.duration,
                "job_status": "opened",
                "is_paid": pageTwoJobDetails.compensation,
                "is_active": "Y",
                "pre_screen_ques": customQuestion
            }

        } else {
            var postJobParams = {
                "job_title": pageTwoJobDetails.jobTitle,
                "job_type": pageTwoJobDetails.jobType,
                "work_schedule": pageTwoJobDetails.schedule,
                "workplace_type": pageTwoJobDetails.workplaceType,
                "country": countryData,
                "city": cityData,
                "job_overview": pageTwoJobDetails.jobOverview,
                "specialisation": pageThreeJobDetails.specialization,
                "required_subcontract": pageFourJobDetails.hiring,
                "skills": convertSkillsToString,
                "time_zone": pageTwoJobDetails.timeZone,
                "job_desc": pageThreeJobDetails.jobDescription,
                "required_resume": pageFourJobDetails.resume,
                "required_cover_letter": pageFourJobDetails.coverLetter,
                "required_background_check": pageFourJobDetails.bgCheck,
                "time_commitment": pageTwoJobDetails.timeCommitment,
                "duration": pageTwoJobDetails.duration,
                "job_status": "opened",
                "is_paid": pageTwoJobDetails.compensation,
                "is_active": "Y",
                "pre_screen_ques": customQuestion
            }
        }


        try {
            const response = await axiosInstance.post("/employer_job_post", postJobParams)
            if (response.data.error_code === 0) {
                pageRender('/employer_dashboard/home')
                setEditingJobFromHome(false)
                setPostDraftTemplate(false)
            } else {
                setEditingJobFromHome(false)
                setPostDraftTemplate(false)
            }
        }
        catch (err) {
            console.log(err)
        }
    }


    const handleDraft = async () => {
        var customQuestion = pageFourJobDetails.questions.map((v) => {
            return { "custom_pre_screen_ques": v.singleQuestion, "id": 0 }
        })
        var convertSkillsToString = pageThreeJobDetails.skills.join(",")

        var cityData = pageTwoJobDetails.workplaceType === "Remote" ? "" : editCompanyLocation.city
        var countryData = pageTwoJobDetails.workplaceType === "Remote" ? "" : editCompanyLocation.country

        var draftJobParams = {
            "key_id": 0,
            "job_title": pageTwoJobDetails.jobTitle,
            "job_type": pageTwoJobDetails.jobType,
            "work_schedule": pageTwoJobDetails.schedule,
            "workplace_type": pageTwoJobDetails.workplaceType,
            "country": countryData,
            "city": cityData,
            "job_overview": pageTwoJobDetails.jobOverview,
            "specialisation": pageThreeJobDetails.specialization,
            "required_subcontract": pageFourJobDetails.hiring,
            "skills": convertSkillsToString,
            "time_zone": pageTwoJobDetails.timeZone,
            "job_desc": pageThreeJobDetails.jobDescription,
            "required_resume": pageFourJobDetails.resume,
            "required_cover_letter": pageFourJobDetails.coverLetter,
            "required_background_check": pageFourJobDetails.bgCheck,
            "time_commitment": pageTwoJobDetails.timeCommitment,
            "duration": pageTwoJobDetails.duration,
            "job_status": "drafted",
            "is_paid": pageTwoJobDetails.compensation,
            "is_active": "Y",
            "pre_screen_ques": customQuestion
        }

        try {
            const response = await axiosInstance.post("/draft_job_post", draftJobParams)
            if (response.data.error_code === 0) {

                pageRender('/employer_dashboard/home')
                setPostDraftTemplate(false)
                setEditingJobFromHome(false)
            } else {
                setEditingJobFromHome(false)
            }
        }
        catch (err) {
            console.log(err)
        }
    }





    const [selectedJobRadio, setSelectedJobRadio] = useState('')

    // const [previousTemplate,setPreviousTemplate] = useState('')

    const handleCreateJob = (pageNumber) => {
        if (pageNumber === 2) {

            setPageTwoJobDetails({
                jobTitle: "",
                createdAt: "",
                jobOverview: "",
                workplaceType: "Select",
                // location: "Select",
                jobType: "Select",
                timeCommitment: "Select",
                timeZone: "Select",
                schedule: "Select",
                duration: "0-Select",
                compensation: "Select"
            })

            setShowingJobLocation("")

            setPageThreeJobDetails({
                jobDescription: null,
                skills: [],
                specialization: "",
            })

            setPageFourJobDetails({
                resume: "",
                coverLetter: "",
                bgCheck: "",
                hiring: "",
                questions: []
            })

            displayStep(2)
        }
        else {
            if (existingTemplate || selctedTemplateCard) {
                if (jobPostStatus === 'Use draft as template') {
                    setPostDraftTemplate(true)
                }

                setShowReview(false)
                displayStep(4)
            } else {
                toast("Select any template", {
                    icon: (
                        <IoIosInformationCircleOutline className="fs-1 brand-color me-1" />
                    ),
                });

            }

        }
    }




    return (
        <>
            <div className="container-fluid min-vh-100 community-page-bg pt-3">

                {showProgressBar ?
                    <div id="container" className={`container pt-4 ${progressBarHide === true ? "d-none" : "d-block"}`}>
                        <div className="progress px-1" style={{ height: '7px' }}>
                            <div className="progress-bar bg-brand-color" role="progressbar" style={{ width: "0%" }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <div className={`step-container d-flex justify-content-between `}>
                            <div className="step-circle">1</div>
                            <div className="step-circle">2</div>
                            <div className="step-circle">3</div>
                            <div className="step-circle">4</div>
                        </div>
                    </div>
                    :
                    null
                }

                {/* Step 1*/}
                <form id="multi-step-form needs-validation" >
                    <div className={`step step-1 ${showFieldOne === true ? "d-block" : "d-none"}`}>
                        <div className="">
                            <FormPageOne
                                newJobPost={newJobPost}
                                setNewJobPost={setNewJobPost}
                                handleNewJobPost={handleNewJobPost}
                                handleSearchByJob={handleSearchByJob}
                                pageOneLoading={pageOneLoading}
                                getJobApi={getJobApi}
                                setGetJobApi={setGetJobApi}
                                searchGetJob={searchGetJob}
                                setSearchGetJob={setSearchGetJob}
                                handleCreateJob={handleCreateJob}
                                createJobId={createJobId}
                                setCreateJobId={setCreateJobId}
                                setExistingTemplate={setExistingTemplate}
                                displayPageNumber={displayPageNumber}
                                setDisplayPageNumber={setDisplayPageNumber}
                                setSelectedJobRadio={setSelectedJobRadio}
                                selctedTemplateCard={selctedTemplateCard}
                                setSelectedTemplateCard={setSelectedTemplateCard}

                            />
                        </div>

                        <div className="container-fluid pb-3">
                            <div className="col-lg-7 col-md-9 col-sm-12 col-12 mx-auto">
                                <div className="d-flex align-items-center justify-content-end">
                                    <button type="button" className={"btn btn-brand-color next-step me-4 postButtonTextSize"} onClick={
                                        jobPostStatus == "Start with a new job post" ?
                                            () => handleCreateJob(2)
                                            :
                                            () => {
                                                handleCreateJob(4)
                                                setProgressBarHide(true)
                                            }}
                                    >Create a Job</button>
                                </div>
                            </div>
                        </div>


                    </div>

                    {/* Step 2*/}
                    <div className={`step step-2 ${showFieldTwo === true ? "d-block" : "d-none"}`}>
                        <div className="">
                            <FormPageTwo
                                pageTwoJobDetails={pageTwoJobDetails}
                                setPageTwoJobDetails={setPageTwoJobDetails}
                                handleWorkplaceType={handleWorkplaceType}
                                handleLocation={handleLocation}
                                handleJobTitle={handleJobTitle}
                                handleJobOverview={handleJobOverview}
                                handlejobType={handlejobType}
                                handleTimeCommitment={handleTimeCommitment}
                                handleTimeZone={handleTimeZone}
                                handleDuration={handleDuration}
                                handleSchedule={handleSchedule}
                                handleCompensation={handleCompensation}
                                jobLocation={jobLocation}
                                setJobLocation={setJobLocation}
                                handleJobLocation={handleJobLocation}
                                txtdurations={txtdurations}
                                settxtDurations={settxtDurations}
                            />


                            <div className="container-fluid pb-4">
                                <div className="col-lg-7 col-md-9 col-sm-10 col-12 mx-auto  pb-2" >
                                    <div className="d-flex align-items-center justify-content-end">
                                        {/* <button type="button" className="btn btn-outline-dark prev-step w-25" onClick={handleDraft}>Draft</button> */}
                                        <button type="button" className="btn btn-brand-color next-step me-4 w-25 postButtonTextSize" onClick={(e) => handlePage2Click(e)}>Next</button>                                </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    {/* Step 3*/}
                    <div className={`step step-3 ${showFieldThree === true ? "d-block" : "d-none"} container-fluid`}>
                        <div className="mb-3">
                            <FormPageThree
                                pageThreeJobDetails={pageThreeJobDetails}
                                setPageThreeJobDetails={setPageThreeJobDetails}
                                handleJobDescription={handleJobDescription}
                                handleSkills={handleSkills}
                                handleSpecialization={handleSpecialization}

                            />
                        </div>

                        <div className="container-fluid  pb-4">
                            <div className="col-lg-7 col-md-9 col-sm-12 col-12 mx-auto">
                                <div className="d-flex align-items-center justify-content-end">
                                    <button type="button" className="btn fw-bold btn-outline-dark prev-step w-25 postButtonTextSize" onClick={() => displayStep(2)}>Previous</button>
                                    <button type="button" className="btn fw-bold btn-brand-color prev-step w-25  ms-3 me-4 postButtonTextSize" onClick={() => {
                                        setShowReview(true);
                                        handlePage3Click()
                                    }}>Next</button>
                                    {/*
                                    <button type="submit" className="btn fw-bold btn-brand-color ms-3 px-3 w-25" onClick={handlePostJobApi}>Post a job</button> */}
                                </div>
                            </div>
                        </div>
                    </div>



                    {/* Step 4*/}
                    <div className={`step step-4 ${showFieldFour === true ? "d-block" : "d-none"} container-fluid`}>
                        <div className="mb-3">
                            {showReview ?
                                <FormPageFour
                                    handleResume={handleResume}
                                    handleCoverLetter={handleCoverLetter}
                                    handleBgCheck={handleBgCheck}
                                    handleHiring={handleHiring}
                                    pageFourJobDetails={pageFourJobDetails}
                                    setPageFourJobDetails={setPageFourJobDetails}
                                    uiDisplayquestion={uiDisplayQuestion}
                                    setUiDisplayQuestion={setUiDisplayQuestion}
                                    singleQuestion={singleQuestion}
                                    setSingleQuestion={setSingleQuestion}
                                    multipleQuestionsArray={multipleQuestionsArray}
                                    setmultipleQuestionsArray={setmultipleQuestionsArray}
                                    handleSingleQuestion={handleSingleQuestion}
                                    addSingleQuestionToArray={addSingleQuestionToArray}

                                />
                                :
                                <FormReview
                                    jobTitle={pageTwoJobDetails.jobTitle}
                                    jobSummary={pageTwoJobDetails.jobOverview}
                                    responsibilities={[]}
                                    skills={pageThreeJobDetails.skills}
                                    additionalInfo={[]}
                                    compensation={pageTwoJobDetails.compensation}
                                    job_type={pageTwoJobDetails.jobType}
                                    work_schedule={pageTwoJobDetails.schedule}
                                    workplace_type={pageTwoJobDetails.workplaceType}
                                    country={jobLocation.country}
                                    city={jobLocation.city}
                                    specialisation={pageThreeJobDetails.specialization}
                                    required_subcontract={pageFourJobDetails.hiring}
                                    time_zone={pageTwoJobDetails.timeZone}
                                    job_desc={pageThreeJobDetails.jobDescription}
                                    required_resume={pageFourJobDetails.resume}
                                    required_cover_letter={pageFourJobDetails.coverLetter}
                                    required_background_check={pageFourJobDetails.bgCheck}
                                    time_commitment={pageTwoJobDetails.timeCommitment}
                                    duration={pageTwoJobDetails.duration}
                                    job_status={"opened"}
                                    is_active={"Y"}
                                    pre_screen_ques={pageFourJobDetails.questions}
                                    // previous job Template
                                    createJobId={createJobId}
                                    setCreateJobId={setCreateJobId}
                                    setmultipleQuestionsArray={setmultipleQuestionsArray}
                                    setUiDisplayQuestion={setUiDisplayQuestion}
                                    pageThreeJobDetails={pageThreeJobDetails}
                                    setPageThreeJobDetails={setPageThreeJobDetails}
                                    pageFourJobDetails={pageFourJobDetails}
                                    setPageFourJobDetails={setPageFourJobDetails}
                                    pageTwoJobDetails={pageTwoJobDetails}
                                    setPageTwoJobDetails={setPageTwoJobDetails}
                                    displayStep={displayStep}
                                    setShowReview={setShowReview}
                                    existingTemplate={existingTemplate}
                                    setExistingTemplate={setExistingTemplate}
                                />
                            }
                        </div>

                        <div className="container-fluid">
                            <div className="col-lg-7 col-md-9 col-sm-12 col-12 mx-auto pb-3">
                                {showProgressBar ?
                                    <div className="d-flex align-items-center justify-content-between">

                                        {
                                            showReview ?

                                                <React.Fragment>
                                                    <button type="button" className="btn fw-bold btn-outline-dark prev-step w-25 ms-3 postButtonTextSize" onClick={() => displayStep(3)}>Previous</button>
                                                    <button type="button" className="btn fw-bold btn-outline-dark prev-step w-25 ms-3 postButtonTextSize" onClick={handleDraft}>Draft</button>
                                                    <button type="button" className="btn fw-bold btn-brand-color prev-step ms-2 me-3 w-25 postButtonTextSize" onClick={() => handlePage4ReviewClick()}>Review</button>
                                                </React.Fragment>
                                                :
                                                null
                                        }

                                        {
                                            showReview ?

                                                null
                                                :
                                                <React.Fragment>
                                                    <button type="button" className="btn fw-bold btn-outline-dark prev-step w-25 ms-2 postButtonTextSize" onClick={() => handlePostJobBackButton()}>Previous</button>
                                                    {editingJobFromHome ?
                                                        <button type="button" className="btn fw-bold btn-brand-color prev-step ms-2 me-3 w-25 postButtonTextSize" onClick={handlePostJobApi}>Update job</button>
                                                        :
                                                        <button type="button" className="btn fw-bold btn-brand-color prev-step ms-2 me-4 w-25 postButtonTextSize" onClick={handlePostJobApi}>Post a Job</button>
                                                    }
                                                </React.Fragment>
                                        }
                                    </div>
                                    :
                                    <div className="d-flex align-items-center justify-content-end">
                                        <button type="button" className="btn fw-bold btn-outline-dark prev-step w-25" onClick={() => pageRender('/employer_dashboard/home')}>Back to Home</button>
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                </form>

            </div>

        </>
    );
};

export default MultiStepForm;
