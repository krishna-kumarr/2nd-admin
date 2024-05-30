import React, { useContext, useEffect, useRef, useState } from "react";
import JobDescription from "./JobDescription";
import { FaSave } from "react-icons/fa";
import { FaShare } from "react-icons/fa6";
import { LuUpload } from "react-icons/lu";
import CommonContext from "../../hooks/CommonContext";
import axios from "axios";
import toast from "react-hot-toast";
import { BsFiletypePdf } from "react-icons/bs";
import images from "../../utils/images";
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";

const JobWorkSpaceRightContent = ({
    handleNoRequirementsApplyJob,
    handleSaveJob,
    handleReset,
    deviceResolution
}) => {

    const { isSmallDevice, applyFilterResponse,
        cardArray, selectedCardData,
        gettingResponse, selectedSkeleton,
        saveJobLoading,
        applyJobLoading } = useContext(CommonContext);


    return (
        <>
            <div className={`${isSmallDevice ? "col-12 h-100 overflow-scroll" : "col-12 col-lg-6 d-none d-lg-inline h-100 overflow-scroll"}`}>
                <div className="card w-100 border-0 bg-transparent h-100">
                    {
                        selectedCardData.length > 0 && cardArray.length > 0 && gettingResponse && !selectedSkeleton && !applyFilterResponse ?
                            <div className="card-body p-0">
                                <div className={deviceResolution === "smallDevice" ?
                                    "col-12 bg-white p-2 py-3 rounded-top-4"
                                    :
                                    "col-12 JobDescription-sticky-top-height bg-white rounded-4"}
                                >
                                    <div className="d-flex align-items-center my-2">
                                        <div className="flex-shrink-0 ms-2">
                                            <img src={images.companyLogo} alt="..." width={52} height={52} />
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <h3 className="job-heading text-break" data-testid='DataQualityManager'>{selectedCardData[0].job_title !== undefined ? selectedCardData[0].job_title : ''}</h3>
                                            <p className="job-posted-on m-0">Posted on {selectedCardData[0].created_at !== undefined ? selectedCardData[0].created_at : ''}</p>
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <div className="me-auto ms-5 p-2">
                                            {
                                                selectedCardData[0].applied_status === "applied" ?
                                                    <button className="btn btn-brand-color ms-3 pe-none">Applied</button>
                                                    :
                                                    selectedCardData[0].required_resume === "Y" || selectedCardData[0].required_cover_letter === "Y" || (selectedCardData[0].questions[0] !== null && selectedCardData[0].questions.length > 0) ?
                                                        <button id="jobApplyNowWithResumeButton" className="btn btn-brand-color ms-3 py-2" data-testid="ApplyNow" data-bs-toggle="modal" data-bs-target="#ApplyJobModal" onClick={handleReset}>Apply Now</button>
                                                        :
                                                        <button id="jobApplyNowWithoutResumeButton" className="btn btn-brand-color ms-3 py-2" onClick={handleNoRequirementsApplyJob}>Apply Now</button>
                                            }
                                        </div>


                                        <div className="p-2">
                                            {
                                                saveJobLoading ?

                                                    <button className="btn btn-secondary pe-none" type="button" disabled>
                                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                        <span className="ps-2 d-none d-lg-inline">Saving...</span>
                                                    </button>
                                                    :
                                                    selectedCardData[0].applied_status === "applied" ?
                                                        null
                                                        :
                                                        selectedCardData[0].saved_status !== undefined ?

                                                            selectedCardData[0].saved_status === "saved" ?
                                                                <button id="savedStatusSavedButton" type="button" className="btn btn-secondary pe-none d-flex align-items-center gap-2 py-2">
                                                                    <FaBookmark /> <span className="d-none d-lg-block">Saved</span>
                                                                </button>
                                                                :
                                                                <button id="savedStatusSaveButton" type="button" className="btn btn-outline-secondary d-flex align-items-center gap-2 py-2" data-testid="Save" onClick={() => handleSaveJob(selectedCardData[0].id)}>
                                                                    <FaRegBookmark /> <span className="d-none d-lg-block">Save</span>
                                                                </button>
                                                            :

                                                            <button id="undefinedSaveButton" type="button" className="btn btn-outline-secondary d-flex align-items-center gap-2 py-2" data-testid="Save" onClick={() => handleSaveJob(selectedCardData[0].id)}>
                                                                <FaRegBookmark /> <span className="d-none d-lg-block">Save</span>
                                                            </button>
                                            }
                                        </div>


                                        <div className="p-2">
                                            <button id="jobShareButton" type="button" className="btn btn-outline-secondary d-flex align-items-center gap-1 py-2" data-testid="Share" data-bs-toggle="modal" data-bs-target="#shareModal">
                                                <FaShare /> <span className="d-none d-lg-block">Share</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <JobDescription deviceResolution={deviceResolution} />
                            </div>
                            :
                            null
                    }

                    {
                        (selectedCardData.length === 0 && !selectedSkeleton && gettingResponse) || (cardArray.length === 0 && !selectedSkeleton && gettingResponse) ?
                            <div className="row align-content-center h-100 justify-content-center">
                                <p className="text-center">Oops! No Data Available</p>
                            </div>
                            :
                            null
                    }

                    {gettingResponse === false || selectedSkeleton || applyFilterResponse ?
                        <div className="card-body p-0">

                            <div className={deviceResolution === "smallDevice" ?
                                "col-12 bg-white p-2 py-3 rounded-top-4"
                                :
                                "col-12 JobDescription-sticky-top-height bg-white rounded-4"}>

                                <div className="d-flex align-items-center my-2">
                                    <div className="flex-shrink-0 ms-2 placeholder rounded-circle pe-none">
                                        <img src={images.companyLogo} alt="..." width={52} height={52} className='opacity-0' />
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <p className="job-posted-on placeholder rounded col-5 py-3"></p>
                                        <h3 className="job-heading placeholder rounded col-8"></h3>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="me-auto ms-5 p-2">
                                        <button className="btn btn-outline-secondary ms-3 placeholder px-5 pe-none"></button>
                                    </div>

                                    <div className="p-2">
                                        <button className="btn btn-outline-secondary placeholder px-5"></button>
                                    </div>


                                    <div className="p-2">
                                        <button className="btn btn-outline-secondary placeholder px-5"></button>
                                    </div>
                                </div>
                            </div>

                            <JobDescription />
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        </>
    )
}

export default JobWorkSpaceRightContent
