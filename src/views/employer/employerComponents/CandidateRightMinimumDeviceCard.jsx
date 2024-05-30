import React, { useContext } from "react";
import CandidateRightContent from "./CandidateRightContent";
import employerContext from "../../../hooks/employerContext";
import { IoChevronBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const CandidateRightMinimumDeviceCard = () => {
  const {
    keepNotes,
    setKeepNotes,
    rightSideContent,
    professionalId,
    jobId,
    role,
    appStatus,
    jobStatus,
    selectedProfessionalDetails,
    handleCategoryStatus,
    token,
    initialGlow,
    cardSelectedGlow,
    categorySelectedGlow,
    candidatesList
  } = useContext(employerContext);

  const pageRender = useNavigate();

  return (
    <>
      <div className="homePage-backgroundColor overflow-hidden">
        <div className="container-fluid">
          <div className="py-4">
            <button
              className="btn btn-outline-secondary d-flex align-items-center gap-2 ms-3"
              onClick={() => {
                pageRender("/employer_dashboard/candidates");
              }}
            >
              <IoChevronBackCircle className="fs-5" /> Back
            </button>
          </div>
          
          {rightSideContent.professional_id!==undefined || initialGlow || categorySelectedGlow || cardSelectedGlow ?
            <div className= "card h-100 border-0">
              <div className="card-body h-100 overflow-scroll p-0 row">
                <CandidateRightContent
                  initialGlow={initialGlow}
                  cardSelectedGlow={cardSelectedGlow}
                  categorySelectedGlow={categorySelectedGlow}
                  rightSideContent={rightSideContent}
                  role={role}
                  professionalId={professionalId}
                  jobId={jobId}
                  token={token}
                  keepNotes={keepNotes}
                  setKeepNotes={setKeepNotes}
                  appStatus={appStatus}
                  jobStatus={jobStatus}
                  selectedProfessionalDetails={selectedProfessionalDetails}
                  handleCategoryStatus={handleCategoryStatus}
                />
              </div>
            </div>
            
            :
            <div className= "setting-employer-noData-available-height">
              <div className="row align-items-center h-100">
                <p className="text-center">Oops! No Data Available</p>
              </div>
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default CandidateRightMinimumDeviceCard;
