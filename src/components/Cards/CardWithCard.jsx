import React, { useContext, useState } from "react";
import DoubleButton from "../Button/DoubleButton";
import { PiUploadBold } from "react-icons/pi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TbNotes } from "react-icons/tb";
import { BsFilePerson } from "react-icons/bs";
import { FiUserCheck } from "react-icons/fi";
import employerContext from "../../hooks/employerContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";




const CardWithCard = ({
    cardTitle,
    cardDate,
    cardDateClassName,
    cardParaTestId,
    firstButton_Name,
    secondButton_Name,
    icon,
    firstCardColor,
    secondCardColor,
    cardTitleStyle,
    cardKey,
    anotherPageUrl,
    viewed,
    applied,
    notReviewed,
    shortlisted,
    jobId,
    dropDownName,
    handleOpenJob,
    handleCloseJob,
    handlePauseJob,
    searchJob,
    // handleRadioYesApiClick,
    // handleRadioNoApiClick,
    handleCandidateSearchRadioButton,
    candidateDetailsDb,
    setCandidateDetailsDb,
    radioValueDb,
    setRadioValueDb,
    candidateNameDb,
    setcandidateNameDb,
    handleCandidateNameDb,
    candidateFeedbackDb,
    setCandidateFeedbackDb,
    handleCandidateFeedbackDb,
    appliedCandidates,
    setAppliedCandidates,
    setClosingCandidateDetails,
    openValue,
    handleJobDelete

}) => {
    const { getJobApi, setHomeResponseReview, setCreateJobId, setExistingTemplate, displayStep, setShowReview, setShowProgressBar, setShowFieldOne, setShowFieldTwo, setShowFieldThree, setShowFieldFour,
        progressBarHide,
        setProgressBarHide,
        setEditingJobFromHome, getCandidateDatas, setSendingCandidate, setJobListContent, setRoleStatus } = useContext(employerContext);

    const pageRender = useNavigate();

    const handleRedirectToReview = (id) => {
        var redirectingValue = getJobApi.filter((v) => {
            return v.id === id
        })
        if (redirectingValue.length > 0) {
            setShowProgressBar(false)
            setExistingTemplate(true)
            setHomeResponseReview(true)
            setCreateJobId(...redirectingValue)

            pageRender("/employer_dashboard/multistepForm")
            setShowReview(false)
            setShowFieldOne(false);
            setShowFieldTwo(false);
            setShowFieldThree(false);
            setShowFieldFour(true);
        } else {
            toast.error("Data not found")
        }
    }

    const handleRedirectToEditAndReview = (id) => {
        var redirectingValue = getJobApi.filter((v) => {
            return v.id === id
        })
        if (redirectingValue.length > 0) {
            setEditingJobFromHome(true)
            setShowProgressBar(true)
            setExistingTemplate(true)
            setHomeResponseReview(true)
            setCreateJobId(...redirectingValue)
            setShowReview(false)
            setProgressBarHide(true)
            pageRender("/employer_dashboard/multistepForm")
            displayStep(4)
        } else {
            toast.error("Data not found")
        }
    }

    const handleRedirectToCandidate = (id) => {
        setSendingCandidate(true)
        var roleValue = openValue[0].toUpperCase() + openValue.slice(1);

        getCandidateDatas(id, "changeRole", undefined, roleValue)
        pageRender('/employer_dashboard/candidates')
    }



    return (
        <div
            className="card shadow-md bg-body rounded-4 border-0 overflow-hidden employer-job-details pb-3"
            key={cardKey} id={jobId}
        >
            {/* <div className=" "> */}
                <div className="body-head card-header bg-transparent border-0 p-0 pt-4 px-4">
                    <div className="employer-details-head pt-2">
                        <h5
                            className={`card-title ${cardTitleStyle} fw-bold ps-2 pe-4`}
                            data-testid="cardHeadingTestId">  {cardTitle.length > 32 ? `${cardTitle.slice(0,32)}..` : cardTitle }
                        </h5>

                        <p className="cursorPointer threeDotsMenu" data-bs-toggle="dropdown" aria-expanded="false"><BsThreeDotsVertical /></p>


                        <div className="dropdown custom-dropdown w-50 ">
                            <ul className="dropdown-menu w-100 border-0 shadow">
                                <li onClick={() => handleRedirectToReview(jobId)}><a className="dropdown-item fw-medium" >View job details </a></li>
                                <hr className='m-0 mx-3 buttonLineColor' />
                                {
                                    openValue === "closed" ?

                                        <li onClick={(e) => handleJobDelete(e, jobId)}><a className="dropdown-item fw-medium" >Delete job post </a></li>
                                        :
                                        <li onClick={() => handleRedirectToEditAndReview(jobId)}><a className="dropdown-item fw-medium" >Edit job post </a></li>
                                }
                            </ul>
                        </div>
                    </div>
                    <p
                        className={`card-date-text ${cardDateClassName} ps-2`}
                        data-testid={cardParaTestId} >Posted on {cardDate} </p>
                {/* </div> */}
            </div>
            <div className="card-body p-4">
                {/* Applied viewed notReviewed and shortlisted */}
                <div className="body-content">
                    <div className="row row-cols-1 row-cols-md-2 g-2">
                        <Fourcards empIcon={<PiUploadBold />} profNum={viewed} empReview={"Viewed"} />
                        <Fourcards empIcon={<TbNotes />} profNum={applied} empReview={"Applied"} />
                        <Fourcards empIcon={<BsFilePerson />} profNum={notReviewed} empReview={"Not Reviewed"} />
                        <Fourcards empIcon={<FiUserCheck />} profNum={shortlisted} empReview={"Shortlisted"} />
                    </div>
                </div>
                <hr className="mt-4 mb-1" />
            </div>
            <div className="card-footer bg-transparent border-0 p-0 mx-4 mb-2">
                <DoubleButton
                    firstButtonName={firstButton_Name}
                    secondButtonName={secondButton_Name}
                    cardIcon={icon}
                    firstCardColorclassName={firstCardColor}
                    secondCardColorclassName={secondCardColor}
                    rightCommUrl={anotherPageUrl}
                    dropDownName={dropDownName}
                    handlePause={handlePauseJob}
                    handleOpen={handleOpenJob}
                    handleClose={handleCloseJob}
                    jobId={jobId}
                    handleCandidateRadioButton={handleCandidateSearchRadioButton}
                    candidateDetails={candidateDetailsDb}
                    setCandidateDetails={setCandidateDetailsDb}
                    radioValue={radioValueDb}
                    setRadioValue={setRadioValueDb}
                    candidateName={candidateNameDb}
                    setcandidateName={setcandidateNameDb}
                    handleCandidateName={handleCandidateNameDb}
                    candidateFeedbackDb={candidateFeedbackDb}
                    setCandidateFeedback={setCandidateFeedbackDb}
                    handleCandidateFeedbackDb={handleCandidateFeedbackDb}
                    appliedCandidates={appliedCandidates}
                    setAppliedCandidates={setAppliedCandidates}
                    setClosingCandidateDetails={setClosingCandidateDetails}
                    openValue={openValue}
                    getCandidateDatas={getCandidateDatas}
                    setSendingCandidate={setSendingCandidate}
                    setJobListContent={setJobListContent}
                    setRoleStatus={setRoleStatus}
                    handleRedirectToCandidate={handleRedirectToCandidate}
                />
            </div>
        </div >
    );
};

export default CardWithCard;



export const Fourcards = ({
    empIcon,
    profNum,
    empReview
}) => {
    return (
        <div className=" p-2 ">
            <div className="card rounded-2 py-3">
                {empReview === 'Viewed' || empReview === 'Applied' ?
                    <span className=" px-1 translate-middle badge empText nameColor fw-bold">
                        {empReview}
                    </span>
                    : null}
                {empReview === 'Not Reviewed' ?
                    <span className="px-1 translate-middle badge empTextNotReviewed nameColor fw-bold">
                        {empReview}
                    </span> : null

                }
                {empReview === 'Shortlisted' ?
                    <p className="px-1 translate-middle badge empTextShorlisted nameColor fw-bold">
                        {empReview}
                    </p> : null

                }

                <div className="d-flex w-100 align-items-center justify-content-evenly my-2 ">
                    <div className="empIcon d-flex align-items-center justify-content-center">
                        <span className="fs-4 z-2 ">{empIcon}</span>
                    </div>
                    <div>
                        <h5 className="card-title icon-number fw-normal m-0">{profNum}</h5>
                    </div>
                </div>

            </div>
        </div>
    )
}
