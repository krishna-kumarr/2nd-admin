import React from "react";
import { GrLocation } from "react-icons/gr";
import { HiOutlineBriefcase } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { PiNotepadLight } from "react-icons/pi";

const CandidateCard = ({ jobId, professional_id, first_name, last_name, profile_image, job_title, city, applicationStatus, selectedProfessionalDetails, smallDevice,custom_notes}) => {
  const pageRender = useNavigate();

  const handleSelctCard = () => {
    if (smallDevice) {
      pageRender("full_details");
      selectedProfessionalDetails(jobId, professional_id);
    } else {
      selectedProfessionalDetails(jobId, professional_id);
    }
  }

  return (
    <div className="col-12 col-sm-6 col-lg-12 cursorPointer" onClick={handleSelctCard}>
      <div className="card border-0 rounded-3">
        <div className="card-body">
          <div className="row align-items-center pt-3">
            {/* card image  */}
            <div className="col-4">
              <img src={`${process.env.REACT_APP_SECOND_CAREERS_CDN}${profile_image}`} alt="" width={83} height={83} className="rounded-circle" />
            </div>
            
            {/* card content  */}
            <div className="col-8 px-1 pt-lg-3 pt-xl-0">
              <div className="col-12">
                <p className="mb-0 employer-card-candidate-name">
                  {first_name} {last_name}
                  {custom_notes !== '' ?
                    custom_notes !== "None" ?
                      <span className="notes-icon-color fs-5 ps-2"><PiNotepadLight /></span>
                      :
                      null
                    :
                    null
                  }
                </p>

                <div className="pt-2">
                  <p className="mb-0 employer-card-candidate-role">
                    <span className="pe-2"><HiOutlineBriefcase /></span>
                    {job_title}
                  </p>
                  <p className="mb-0 employer-card-candidate-location">
                    <span className="pe-2"><GrLocation /></span>
                    {city}
                  </p>
                </div>
              </div>
              <div className="appliedOrSaved col-7 col-md-8 col-xl-6 p-0">
                <div className={`py-1 px-3 employer-borderRadius
                ${applicationStatus === "AI recommended"
                    ? "job-shortlisted"
                    : null ||

                      applicationStatus === "2ndcareers-recommended"
                      ? "job-contacted"
                      : null
                  }`}
                >
                  <p className="m-0 employer-card-absolute-fs">
                    {applicationStatus === "2ndcareers-recommended"
                      ? "2ndcareers-recommended"
                      : null ||

                        applicationStatus === "AI recommended"
                        ? "AI Recommendation"
                        : null}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
