import React, { useContext, useEffect, useState } from 'react'
import { FaRegCalendarAlt } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import { FaShoppingBag } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { IoTimeSharp } from "react-icons/io5";
import { FaWallet } from "react-icons/fa6";
import { RiTimeZoneFill } from "react-icons/ri";
import { Ri24HoursLine } from "react-icons/ri";
import { BiCategory } from "react-icons/bi";
import { SiAwsorganizations } from "react-icons/si";
import { GoOrganization } from "react-icons/go";
import employerContext from '../../../hooks/employerContext';
import axiosInstance from '../../../services/api/axiosInstance';




const FormReview = ({
    jobTitle,
    jobSummary,
    skills,
    compensation,
    job_type,
    specialisation,
    job_desc,
    time_commitment,
    pre_screen_ques,
    setmultipleQuestionsArray,
    setUiDisplayQuestion,
    displayStep,
    setShowReview,

}) => {
    const { handleGetJobApi, getJobApi, setGetJobApi,
        pageOneLoading, setPageOneLoading,
        createJobId, setCreateJobId,
        existingTemplate, setExistingTemplate,
        pageTwoJobDetails, setPageTwoJobDetails,
        jobLocation, setJobLocation,
        pageThreeJobDetails, setPageThreeJobDetails,
        pageFourJobDetails, setPageFourJobDetails,
        showProgressBar, setProgressBarHide,
        settxtDurations,
        showingJobLocation,
        setShowingJobLocation,
        editCompanyLocation,
        setEditCompanyLocation,
    } = useContext(employerContext);


    const [profilePageData, setProfilePageData] = useState({
        sector: "",
        organizationType: "",
        companyDescription: ""
    })


    useEffect(() => {
        const getReviewFormData = async () => {
            try {
                const response = await axiosInstance.get("/employer_profile_dashboard");
                if (response.data.error_code === 0) {
                    setProfilePageData({
                        sector: response.data.data.sector,
                        organizationType: response.data.data.org_type,
                        companyDescription: response.data.data.company_description,
                    })
                }
            } catch (err) {
                console.log(err);
            }
        };

        (async () => getReviewFormData())();
    }, [])


    useEffect(() => {
        if (existingTemplate) {
            //form- two
            var splitDurations = createJobId.duration.split('-')
            if (splitDurations.length === 2) {
                settxtDurations({
                    count: splitDurations[0],
                    format: splitDurations[1]
                })

                var updatePageTwo = {
                    ...pageTwoJobDetails,
                    jobTitle: createJobId.job_title,
                    createdAt: createJobId.created_at,
                    jobOverview: createJobId.job_overview,
                    workplaceType: createJobId.workplace_type,
                    // location: "Select",
                    jobType: createJobId.job_type,
                    timeCommitment: createJobId.time_commitment,
                    timeZone: createJobId.timezone,
                    schedule: createJobId.work_schedule,
                    duration: `${splitDurations[0]}-${splitDurations[1]}`,
                    compensation: createJobId.is_paid
                }
            } else {
                settxtDurations({
                    count: 0,
                    format: 'Select'
                })

                var updatePageTwo = {
                    ...pageTwoJobDetails,
                    jobTitle: createJobId.job_title,
                    createdAt: createJobId.created_at,
                    jobOverview: createJobId.job_overview,
                    workplaceType: createJobId.workplace_type,
                    // location: "Select",
                    jobType: createJobId.job_type,
                    timeCommitment: createJobId.time_commitment,
                    timeZone: createJobId.timezone,
                    schedule: createJobId.work_schedule,
                    duration: '0-Select',
                    compensation: createJobId.is_paid
                }
            }
            setPageTwoJobDetails(updatePageTwo)


            //form - three 
            if (createJobId.skills !== '') {
                var splittedSkills = createJobId.skills.split(',')
            } else {
                var splittedSkills = []
            }
            var updatePageThree = {
                ...pageThreeJobDetails,
                jobDescription: createJobId.job_desc,
                skills: splittedSkills,
                specialization: createJobId.specialisation,
            }
            setPageThreeJobDetails(updatePageThree)


            //form - four
            var questionArray = createJobId.question_list.map((v) => {
                return v.custom_pre_screen_ques
            })

            var singleQues = createJobId.question_list.map((v) => {
                return { singleQuestion: v.custom_pre_screen_ques }
            })
            var updatePageFour = {
                ...pageFourJobDetails,
                questions: questionArray,
                resume: createJobId.required_resume,
                coverLetter: createJobId.required_cover_letter,
                bgCheck: createJobId.required_background_check,
                hiring: createJobId.required_subcontract
            }
            setPageFourJobDetails(updatePageFour)
            setUiDisplayQuestion(questionArray)
            setmultipleQuestionsArray(singleQues)

            setExistingTemplate(false)
        }
    }, [createJobId])


    return (
        <div className="container-fluid ">
            <div className="col-lg-7 col-md-9 col-sm-12 col-12 mx-auto pt-4">
                <div className="card shadow-sm border-0 rounded-4 h-100 employerHomePadding py-2">
                    <div className="card-body">
                        <div>
                            <div className="d-flex align-items-start justify-content-between w-100">
                                <div>
                                    <div className='mb-3'> <h4 className=" pt-2 job-heading "> {pageTwoJobDetails.jobTitle}  </h4></div>
                                    <p className={` job-posted-on ${pageTwoJobDetails.createdAt !== '' ? 'd-inline' : 'd-none '}`}>Created at {pageTwoJobDetails.createdAt}</p>
                                </div>

                                {
                                    showProgressBar ?
                                        <div><p><MdModeEdit className='brand-color fs-5 cursorPointer' onClick={() => {
                                            setShowReview(true)
                                            setProgressBarHide(false)
                                            displayStep(2)
                                        }} /></p>
                                        </div>
                                        :
                                        null
                                }
                            </div>
                        </div>
                        <hr className='mb-4' />
                        <div className='mb-3'>
                            <div className='about-Company'>
                                <h5 className="job-title-weight pt-2">About Company </h5>
                                <p className='card-text'>{profilePageData.companyDescription}</p>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-lg-6">
                                <div>
                                    <label className="company-details-icon ">
                                        <GoOrganization className="me-2" />
                                        {profilePageData.sector}
                                    </label>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div>
                                    <label className="company-details-icon">
                                        <SiAwsorganizations className="me-2" />
                                        {profilePageData.organizationType}
                                    </label>
                                </div>
                            </div>
                        </div>



                        <div className="mt-4">
                            <div className="d-flex align-items-center justify-content-between w-100">
                                <div><h5 className="job-title-weight">Job Description</h5></div>
                                {
                                    showProgressBar ?
                                        <div><p><MdModeEdit className='brand-color fs-5 cursorPointer' onClick={() => {
                                            setShowReview(true)
                                            setProgressBarHide(false)
                                            displayStep(3)
                                        }} /></p>
                                        </div>
                                        :
                                        null
                                }
                            </div>
                            <div className='card-text' dangerouslySetInnerHTML={{ __html: pageThreeJobDetails.jobDescription }}></div>

                        </div>



                        <div className='mt-4'>
                            <div className="d-flex align-items-center justify-content-between w-100 ">
                                <div><h5 className="job-title-weight">Additional Job details</h5></div>
                                {
                                    showProgressBar ?
                                        <div><p><MdModeEdit className='brand-color fs-5 cursorPointer' onClick={() => {
                                            setShowReview(true)
                                            setProgressBarHide(false)
                                            displayStep(2)
                                        }} /></p>
                                        </div>
                                        :
                                        null
                                }
                            </div>
                            <div>
                                <div className="row mb-2">
                                    <div className="col-lg-6">
                                        <div>
                                            <label className="company-details-icon">
                                                <FaLocationDot className="me-2" />
                                                {pageTwoJobDetails.workplaceType}{editCompanyLocation.city === '' ? null : ` - ${editCompanyLocation.city} , ${editCompanyLocation.country} `}
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div>
                                            <label className="company-details-icon">
                                                <Ri24HoursLine className="me-2" />
                                                {pageTwoJobDetails.timeCommitment}
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-2">
                                    <div className="col-lg-6">
                                        <div>
                                            <label className="company-details-icon">
                                                <RiTimeZoneFill className="me-2" />
                                                {pageTwoJobDetails.timeZone}
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div>
                                            <label className="company-details-icon">
                                                <IoTimeSharp className="me-2" />
                                                {pageTwoJobDetails.jobType}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-lg-6">
                                        <div>
                                            <label className="company-details-icon">
                                                <FaRegCalendarAlt className="me-2" />
                                                {pageTwoJobDetails.duration}
                                            </label>

                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div>
                                            <label className="company-details-icon">
                                                <FaShoppingBag className="me-2" />
                                                {pageTwoJobDetails.schedule}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-lg-6">
                                        <div>
                                            <label className="company-details-icon ">
                                                <FaWallet className="me-2" />
                                                {pageTwoJobDetails.compensation === 'Y' ? 'Paid' : 'Volunteer'}
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div>
                                            <label className="company-details-icon">
                                                <BiCategory className="me-2" />
                                                {pageThreeJobDetails.specialization}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div className="mt-4">
                            <div className="d-flex align-items-center justify-content-between w-100">
                                <div><h5 className="job-title-weight">Skills</h5></div>
                                {
                                    showProgressBar ?
                                        <div>
                                            <p><MdModeEdit className='brand-color fs-5 cursorPointer' onClick={() => {
                                                setShowReview(true)
                                                setProgressBarHide(false)
                                                displayStep(3)
                                            }} /></p>
                                        </div>
                                        :
                                        null
                                }
                            </div>
                            <ul className="ms-2 dashboard-skills-ul">
                                {skills.map((v, i) => {
                                    return <li className='card-text' key={i}>{v}</li>;
                                })}
                            </ul>
                        </div>

                        <div className="row mt-2">

                            <div><h5 className="job-title-weight">Required Documents/Details</h5></div>
                            <div className="col-lg-6 card-text">
                                <ol className='ms-2'>
                                    {pageFourJobDetails.resume !== '' ?
                                        <li>
                                            <label className="company-details-icon">
                                                {
                                                    pageFourJobDetails.resume === 'Y' ?
                                                        'Resume required'
                                                        :
                                                        'Resume not required'
                                                }
                                            </label>
                                        </li>
                                        :
                                        null
                                    }

                                    {pageFourJobDetails.coverLetter !== '' ?
                                        <li>
                                            <label className="company-details-icon">
                                                {
                                                    pageFourJobDetails.coverLetter === 'Y' ?
                                                        'Cover letter required'
                                                        :
                                                        'Cover letter not required'
                                                }
                                            </label>
                                        </li>
                                        :
                                        null
                                    }

                                    {/* {
                                        pageFourJobDetails.bgCheck !== '' ?
                                        <li>
                                            <label className="company-details-icon py-2">
                                                {
                                                    pageFourJobDetails.bgCheck === 'Y' ?
                                                    'Background check required' 
                                                    : 
                                                    'Background check not required'                                                
                                                }
                                            </label>
                                        </li>
                                        :
                                        null
                                    } */}
                                    {
                                        pageFourJobDetails.hiring !== '' ?
                                            <li>
                                                <label className="company-details-icon">
                                                    {
                                                        pageFourJobDetails.hiring === 'Y' ?
                                                            'Hiring subcontract required'
                                                            :
                                                            'Hiring subcontract not required'
                                                    }
                                                </label>
                                            </li>
                                            :
                                            null
                                    }
                                </ol>
                            </div>

                        </div>



                        {
                            pageFourJobDetails.questions.length > 0 ?
                                <div className="mt-3">
                                    <div className="d-flex align-items-center justify-content-between w-100">
                                        <div><h5 className="job-title-weight">Additional Questions</h5></div>
                                        {
                                            showProgressBar ?
                                                <div><p><MdModeEdit className='brand-color fs-5 cursorPointer' onClick={() => {
                                                    setShowReview(true)
                                                    setProgressBarHide(false)
                                                    displayStep(4)
                                                }} /></p>
                                                </div>
                                                :
                                                null
                                        }
                                    </div>
                                    <ol className="ms-2 dashboard-additional-information-ul">
                                        {pageFourJobDetails.questions.map((v, i) => {
                                            return <li className='card-text mb-2' key={i}>{v.singleQuestion}</li>;
                                        })}
                                    </ol>
                                </div>
                                :
                                null
                        }




                    </div>
                </div>
            </div ></div >

    )
}

export default FormReview