import React, { useContext, useEffect, useState } from "react";
import { FaRegCalendarAlt, FaShoppingBag, FaWallet } from "react-icons/fa";
import CommonContext from "../../hooks/CommonContext";
import { GoOrganization } from "react-icons/go";
import { SiAwsorganizations } from "react-icons/si";
import { IoTimeSharp } from "react-icons/io5";
import { Ri24HoursLine, RiTimeZoneFill } from "react-icons/ri";
import { MdModeEdit } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { BiCategory } from "react-icons/bi";

const JobDescription = ({ deviceResolution }) => {
  const { gettingResponse, selectedSkeleton, selectedCardData, applyFilterResponse } = useContext(CommonContext);
  const [abouCompany, setAboutCompany] = useState("");
  const [jobSummary, setJobSummary] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    if (selectedCardData.length > 0) {
      if (selectedCardData[0].job_overview !== undefined) {
        setAboutCompany(selectedCardData[0].job_overview);
      }
      if (selectedCardData[0].job_desc !== undefined) {
        setJobSummary(selectedCardData[0].job_desc);
      }
      if (selectedCardData[0].skills !== undefined) {
        var splitSkills = selectedCardData[0].skills.split(",");
        setSkills(splitSkills);
      }
    }
  }, [selectedCardData]);


  console.log(selectedCardData)

  return (
    <>
      <div id="professionalHomeJobDescriptionScroll" className={deviceResolution === "smallDevice" ? "p-4 pb-0 bg-white rounded-bottom-4" : "p-4 pb-0 bg-white rounded-4 jobDescription-height overflow-scroll"}>
        <div>
          {gettingResponse === false || selectedSkeleton || applyFilterResponse ? (
            <>
              <h5 className="job-title-weight placeholder rounded col-4 py-3"></h5>
              <p className="job-description placeholder rounded skeleton-jobParagraph-medium col-12"></p>
            </>
          ) : (
            <>
              <h5 className="job-title-weight">About Company</h5>
              <p className="job-description">{abouCompany}</p>
            </>
          )}
        </div>
        <div className="d-flex justify-content-around mt-4">
          {gettingResponse === false || selectedSkeleton || applyFilterResponse ? (
            <>
              <label className="company-details-icon placeholder rounded col-2 py-2 pt-3"></label>
              <label className="company-details-icon placeholder rounded col-2 py-2 pt-3"></label>
            </>
          ) : (
            <>
              <label className="company-details-icon ">
                <GoOrganization className="me-2 text-success" />
                {selectedCardData[0].employer_type}
              </label>
              <label className="company-details-icon">
                <SiAwsorganizations className="me-2 text-warning" />
                {selectedCardData[0].sector}
              </label>
            </>
          )}
        </div>

        {gettingResponse === false || selectedSkeleton || applyFilterResponse ? (
          <div className="mt-4">
            <h1 className="job-title-weight placeholder rounded col-4 py-3"></h1>
            <p className="job-description placeholder rounded col-12 skeleton-jobParagraph-medium"></p>
            <p className="job-description placeholder rounded col-12 skeleton-jobParagraph-medium"></p>
          </div>
        ) : (
          <>
            <div className="mt-4">
              <h5 className="job-title-weight">Job Summary</h5>

              <div className="job-description" dangerouslySetInnerHTML={{ __html: jobSummary }}></div>
            </div>

            <div className="row justify-content-around mt-4 dashboard-job-post-icons">
              <h5 className="job-title-weight">Additional Job details</h5>
              <div className="col-6 p-2 ps-2 ps-md-5">
                <label className="company-details-icon">
                  <FaLocationDot className="me-2 text-success" />
                  {selectedCardData[0].workplace_type}
                </label>
              </div>
              <div className="col-6 p-2 ps-2 ps-md-5">
                <label className="company-details-icon">
                  <Ri24HoursLine className="me-2 text-primary" />
                  {selectedCardData[0].time_commitment}
                </label>
              </div>
              <div className="col-6 p-2 ps-2 ps-md-5">
                <label className="company-details-icon">
                  <RiTimeZoneFill className="me-2 text-primary" />
                  {selectedCardData[0].timezone}
                </label>
              </div>
              <div className="col-6 p-2 ps-2 ps-md-5">
                <label className="company-details-icon">
                  <IoTimeSharp className="me-2 text-warning" />
                  {selectedCardData[0].job_type}
                </label>
              </div>
              <div className="col-6 p-2 ps-2 ps-md-5">
                <label className="company-details-icon">
                  <FaRegCalendarAlt className="me-2 text-warning" />
                  {selectedCardData[0].duration}
                </label>
              </div>
              
              <div className="col-6 p-2 ps-2 ps-md-5">
                <label className="company-details-icon">
                  <FaShoppingBag className="me-2 text-primary" />
                  {selectedCardData[0].work_schedule}
                </label>
              </div>
              <div className="col-6 p-2 ps-2 ps-md-5">
                <label className="company-details-icon">
                  <FaWallet className="me-2 text-success" />
                  {selectedCardData[0].is_paid === "Y" ? "Paid" : "Volunteer"}
                </label>
              </div>
              <div className="col-6 p-2 ps-2 ps-md-5">
                <label className="company-details-icon">
                  <BiCategory className="me-2 text-warning" />
                  {selectedCardData[0].specialisation}
                </label>
              </div>
            </div>

            <div className="py-4">
              <h5 className="job-title-weight">Skills / Competencies</h5>
              <ul className="ms-5 dashboard-skills-ul">
                {skills.map((v, i) => {
                  return v !== '' ? <li key={i}>{v}</li> : null;
                })}
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default JobDescription;
