
import React, { useContext, useEffect, useState } from "react";
import Button from "../../../components/Button/Button";
import Pdf from "./Pdf";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineDone } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import EmployerCandidateProfile from "../EmployerCandidateProfile";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { IoIosInformationCircleOutline } from "react-icons/io";
import ReactQuill from "react-quill";
import employerContext from "../../../hooks/employerContext";
import axiosInstance from "../../../services/api/axiosInstance";

const CandidateRightContent = ({
  rightSideContent,
  role,
  professionalId,
  jobId,
  token,
  keepNotes,
  setKeepNotes,
  appStatus,
  selectedProfessionalDetails,
  jobStatus,
  handleCategoryStatus,
  initialGlow,
  cardSelectedGlow,
  categorySelectedGlow,
  getCandidateDatas,
}) => {
  const {
    jobListContent,
    contentForEmail
  } = useContext(employerContext);

  const [quesAndAns, setQuesAndAns] = useState([]);
  const [isButtonOneContent, setIsButtonOneContent] = useState(true);
  const [modalOneERR, setmodalOneERR] = useState(false);
  const [modalTwoERR, setmodalTwoERR] = useState(false);
  const [modalSubject, setModalSubject] = useState('')
  const [modalLink, setModalLink] = useState("")
  const [modalOneMsg, setmodalOneMsg] = useState("");
  const [modalTwoMsg, setmodalTwoMsg] = useState("");


  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
  ];


  useEffect(() => {
    if (rightSideContent.question_answers !== undefined) {
      setQuesAndAns(rightSideContent.question_answers);
    }
  }, [rightSideContent]);

  const handleupdateNotes = async () => {
    var trimmedNotes = keepNotes.trim();
    var obj = {
      job_id: jobId,
      professional_id: professionalId,
      custom_notes: trimmedNotes,
    };

    try {
      const res = await axiosInstance.post("/update_custom_notes", obj)
      if (res.data.error_code === 0) {
        if (jobStatus === "All") {
          getCandidateDatas(jobId, true, "notesUpdate");
        } else {
          handleCategoryStatus(jobStatus, jobStatus, "updateNotes");
        }

        document.getElementById("closeApplyModal").click();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleApplicationStatus = (applicationStatus) => {
    var obj = { job_id: 0, professional_id: '', status: '' }
    //SHORTLIST OR REJECT CANDIDATE
    if (applicationStatus === "Shortlisted") {
      obj = {
        ...obj,
        job_id: jobId,
        professional_id: professionalId,
        status: "shortlisted",
      };

      handleApplicationStatusApi(obj)
    } else if (applicationStatus === "Rejected") {
      obj = {
        ...obj,
        job_id: jobId,
        professional_id: professionalId,
        status: "rejected",
      };

      handleApplicationStatusApi(obj)
    } else {
      obj = {
        ...obj,
        job_id: jobId,
        professional_id: professionalId,
        status: "not reviewed",
      };

      handleApplicationStatusApi(obj)
    }


  };

  const handleApplicationStatusApi = async (obj) => {
    try {
      const res = await axiosInstance.post("/update_application_status", obj)
      if (res.data.error_code === 0) {
        switch (jobStatus) {
          case "All":
            selectedProfessionalDetails(jobId, professionalId, "recalling");
            break;
          case "Applied":
            handleCategoryStatus("Applied", "Applied");
            break;

          case "Not Reviewed":
            handleCategoryStatus("Not Reviewed", "Not Reviewed");
            break;

          case "Shortlisted":
            handleCategoryStatus("Shortlisted", "Shortlisted");
            break;

          case "Rejected":
            handleCategoryStatus("Rejected", "Shortlisted");
            break;

          case "Contacted":
            handleCategoryStatus("Contacted", "recalling");
            break;

          case "Hired":
            handleCategoryStatus("Hired", "recalling");
            break;

          case "Recommended":
            handleCategoryStatus("Recommended", "Recommended");
            break;
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }


  const handleInviteForInterviewSettingModalData = () => {
    setIsButtonOneContent(true);
    setmodalOneERR(false);
    setmodalTwoERR(false);
    setModalSubject('')
    setModalLink('')

    setmodalOneMsg(`
        <h4>Dear ${rightSideContent.first_name} ${rightSideContent.last_name
      },</h4><br/>

        <p>I hope this email finds you well. I'm pleased to inform you that you've been selected to proceed to the next stage of our hiring process for the ${jobListContent.job_title} role at ${contentForEmail.company_name}.
         Congratulations!
        </p><br/>
        
        <p>To move forward, we'd like to invite you to an online interview. Please use the following link to access my calendar and select a time slot that works best for you: ${modalLink === '' ? "[Paste your link (Calendly, Google appointment schedule, etc)]" : modalLink}.</p> 
        <p>Feel free to choose a time that suits your schedule.</p><br/>

        <p>If you have any questions or require further information ahead of our meeting, please reach out to me at ${contentForEmail.email_id}.</p><br/>

        <p>Looking forward to speaking with you soon!</p><br/>

        <p>Best regards,</p><br/>

        <p>${contentForEmail.first_name} ${contentForEmail.last_name}</p>
        <p>${contentForEmail.designation}</p>
         ${contentForEmail.company_name}`);


    setmodalTwoMsg(`<h4>Dear ${rightSideContent.first_name} ${rightSideContent.last_name},</h4><br/>

      <p>I hope this email finds you well. I'm pleased to inform you that you've been selected to proceed to the next stage of our hiring process for the ${jobListContent.job_title} role at  ${jobListContent.company_name}. Congratulations!</p></br>
      
      <p>To move forward, we'd like to invite you to an online interview. Below are some available time slots for the interview:</p>
      <p>[25-may-2024]</p>
      <p>[26-may-2024]</p>
      <p>[27-may-2024]</p><br/>
      
      <p>Please let me know which of these options works best for you, and we'll schedule the interview accordingly.</p>
      
      <p>If you have any questions or require further information ahead of our meeting, please reach out to me at ${contentForEmail.email_id}.</p>
      
      <p>Looking forward to speaking with you soon!<p></br>
      
      <p>Best regards,</p><br/>
      <p>${contentForEmail.first_name} ${contentForEmail.last_name}</p>
      <p>${contentForEmail.designation}</p>
      <p>${contentForEmail.company_name}</p>`)
  }

  const handleModalLinks = (e) => {
    setModalLink(e.target.value)

    setmodalOneMsg(`
        <h4>Dear ${rightSideContent.first_name} ${rightSideContent.last_name
      },</h4><br/>

        <p>I hope this email finds you well. I'm pleased to inform you that you've been selected to proceed to the next stage of our hiring process for the ${jobListContent.job_title !== undefined ? jobListContent.job_title : ''
      } role at ${contentForEmail.company_name}. Congratulations!
        </p><br/>
        
        <p>To move forward, we'd like to invite you to an online interview. Please use the following link to access my calendar and select a time slot that works best for you: ${e.target.value === "" ? "[Paste your link (Calendly, Google appointment schedule, etc)]" : e.target.value}. </p>
        <p>Feel free to choose a time that suits your schedule.</p><br/>

        <p>If you have any questions or require further information ahead of our meeting, please reach out to me at ${contentForEmail.email_id}.</p><br/>

        <p>Looking forward to speaking with you soon!</p><br/>

        <p>Best regards,</p><br/>
        <p>${contentForEmail.first_name} ${contentForEmail.last_name}</p>
        <p>${contentForEmail.designation}</p>
        <p> ${contentForEmail.company_name}</p>`);


    setmodalTwoMsg(`<h4>Dear ${rightSideContent.first_name} ${rightSideContent.last_name},</h4><br/>

      <p>I hope this email finds you well. I'm pleased to inform you that you've been selected to proceed to the next stage of our hiring process for the ${jobListContent.job_title} role at ${contentForEmail.company_name}. Congratulations!</p></br>
      
      <p>To move forward, we'd like to invite you to an online interview. Below are some available time slots for the interview:</p>
      <p>[25-may-2024]</p>
      <p>[26-may-2024]</p>
      <p>[27-may-2024]</p><br/>
      
      <p>Please let me know which of these options works best for you, and we'll schedule the interview accordingly.</p>
      
      <p>If you have any questions or require further information ahead of our meeting, please reach out to me at ${contentForEmail.email_id}.</p>
      
      <p>Looking forward to speaking with you soon!<p></br>
      
      <p>Best regards,</p><br/>
      <p>${contentForEmail.first_name} ${contentForEmail.last_name}</p>
      <p>${contentForEmail.designation}</p>
      <p> ${contentForEmail.company_name}</p>`)
  };


  const handleInviteForInterview = async () => {
    if (isButtonOneContent) {
      // INVITE TO INTERVIEW isButtonOneContent==TRUE
      if (
        modalSubject === "" ||
        modalLink === "" ||
        modalOneMsg === ""
      ) {
        setmodalOneERR(true);
        toast("Please fill all the details", {
          icon: (
            <IoIosInformationCircleOutline className="fs-1 brand-color me-1" />
          ),
        });
      } else {
        var obj = {
          job_id: jobId,
          professional_id: professionalId,
          subject: modalSubject,
          message: modalOneMsg,
          email_id: rightSideContent.email_id,
        };
        setmodalOneERR(false);

        try {
          const res = await axiosInstance.post("/update_interview_status", obj)
          if (res.data.error_code === 0) {
            document.getElementById('closeInterviewModalbox').click();

            switch (jobStatus) {
              case "All":
                selectedProfessionalDetails(
                  jobId,
                  professionalId,
                  "recalling"
                );
                break;
              case "Applied":
                handleCategoryStatus("Applied", "Applied");
                break;

              case "Not Reviewed":
                handleCategoryStatus("Not Reviewed", "Not Reviewed");
                break;

              case "Shortlisted":
                handleCategoryStatus("Shortlisted", "Shortlisted");
                break;

              case "Rejected":
                handleCategoryStatus("Rejected", "Shortlisted");
                break;

              case "Contacted":
                handleCategoryStatus("Contacted", "recalling");
                break;

              case "Hired":
                handleCategoryStatus("Hired", "recalling");
                break;

              case "Recommended":
                handleCategoryStatus("Recommended", "Recommended");
                break;
            }
            setModalSubject("")
            setModalLink("")
          } else {
            toast.error(res.data.message);
          }
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      // INVITE TO INTERVIEW isButtonOneContent==FALSE
      if (
        modalSubject === "" ||
        modalTwoMsg === ""
      ) {
        setmodalTwoERR(true);
        toast("Please fill all the details", {
          icon: (
            <IoIosInformationCircleOutline className="fs-1 brand-color me-1" />
          ),
        });
      } else {
        var obj = {
          job_id: jobId,
          professional_id: professionalId,
          subject: modalSubject,
          message: modalTwoMsg,
          email_id: rightSideContent.email_id,
        };
        setmodalTwoERR(false);

        try {
          const res = await axiosInstance.post("/update_interview_status", obj)
          if (res.data.error_code === 0) {
            document.getElementById('closeInterviewModalbox').click();

            switch (jobStatus) {
              case "All":
                selectedProfessionalDetails(
                  jobId,
                  professionalId,
                  "recalling"
                );
                break;
              case "Applied":
                handleCategoryStatus("Applied", "Applied");
                break;

              case "Not Reviewed":
                handleCategoryStatus("Not Reviewed", "Not Reviewed");
                break;

              case "Shortlisted":
                handleCategoryStatus("Shortlisted", "Shortlisted");
                break;

              case "Rejected":
                handleCategoryStatus("Rejected", "Shortlisted");
                break;

              case "Contacted":
                handleCategoryStatus("Contacted", "recalling");
                break;

              case "Hired":
                handleCategoryStatus("Hired", "recalling");
                break;

              case "Recommended":
                handleCategoryStatus("Recommended", "Recommended");
                break;
            }
            setModalSubject("")
            setModalLink("")
          } else {
            toast.error(res.data.message);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  return (
    <>
      {initialGlow || cardSelectedGlow || categorySelectedGlow ? (
        <div className="card h-100 border-0">
          <div className="card-body h-100 overflow-scroll p-lg-4 px-lg-2 row">
            <div className="col-12">
              <div className="container-fluid">
                <div className="row border-bottom border-3 py-3">
                  <div className="col-2 text-center">
                    <img
                      src={""}
                      alt="..."
                      width={100}
                      height={100}
                      className="pe-none placeholder rounded-circle"
                    />
                  </div>

                  <div className="col-10">
                    <div className="row">
                      <div className="col-lg-6 col-xxl-8">
                        <h1 className="employer-card-candidate-name mb-0 d-inline-block pe-3 border-end border-dark placeholder w-50 py-3 rounded-1 me-2"></h1>
                        <h1 className="employer-card-candidate-role mb-0 d-inline-block ps-3 placeholder w-25 py-3 rounded-1"></h1>
                      </div>
                      <div className="col-lg-6 col-xxl-4">
                        <button
                          type="button"
                          className="btn btn-sm px-5 border py-2 me-1 placeholder"
                        ></button>
                        <button
                          type="button"
                          className="btn btn-sm px-5 border py-2 placeholder"
                        ></button>
                      </div>
                      <div className="col-12 pt-4 row">
                        <div className="col-5">
                          <p className="employer-card-candidate-role placeholder pt-3 pb-2 w-100 rounded-1"></p>
                        </div>
                        <div className="col-4">
                          <p className="employer-card-candidate-role placeholder pt-3 pb-2 w-75 rounded-1"></p>
                        </div>
                        <div className="col-3">
                          <p className="employer-card-candidate-role placeholder pt-3 pb-2 w-75 rounded-1"></p>
                        </div>
                      </div>
                      <div className="col-12">
                        <button
                          buttonType="button"
                          className="btn col-2 me-4 py-1 placeholder"
                        ></button>
                        <button
                          buttonType="button"
                          className="btn col-1 py-1 placeholder"
                        ></button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 border-bottom border-3 py-4">
                  <EmployerCandidateProfile
                    rightSideContent={rightSideContent}
                    initialGlow={initialGlow}
                    categorySelectedGlow={categorySelectedGlow}
                    cardSelectedGlow={cardSelectedGlow}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="col-12 p-3">
          <div className="container-fluid">
            <div className="d-flex flex-wrap border-bottom border-3 py-5">
              <div className="col-12 col-sm-3 col-xl-2 text-center">
                <img
                  src={`${process.env.REACT_APP_SECOND_CAREERS_CDN}${rightSideContent.profile_image}`}
                  alt=""
                  width={100}
                  height={100}
                  className="rounded-circle"
                />
              </div>

              <div className="col-12 col-sm-9 col-xl-10 pt-4 pt-sm-0 ">
                <div className="d-flex flex-wrap align-items-center">
                  <div
                    className={
                      window.location.pathname ===
                        "/employer_dashboard/candidates/full_details"
                        ? "col-12 col-md-6 col-xxl-8 d-flex flex-wrap align-items-center text-center text-md-start"
                        : "col-lg-12 col-xl-8 d-flex flex-wrap align-items-center"
                    }
                  >
                    <h1 className="employer-card-candidate-name mb-0 d-inline-block pe-3 ">
                      <span className="border-end border-dark pe-3">
                        {rightSideContent.first_name}{" "}
                        {rightSideContent.last_name}
                      </span>

                      <span className="employer-card-candidate-role mb-0 d-inline-block ps-3 ">
                        {role}
                      </span>
                    </h1>
                  </div>

                  {jobListContent.job_status !== "Closed" ?
                    rightSideContent.invite_to_interview !== "Y" ? (
                      <div
                        className={
                          window.location.pathname ===
                            "/employer_dashboard/candidates/full_details"
                            ? "col-12 col-sm-4 col-md-6 col-xxl-4 pt-3 pt-md-0 pt-4 pt-sm-0 text-center text-md-start"
                            : "col-lg-6 col-xl-4 pt-3 pt-md-0 pt-4 pt-sm-0 pt-lg-3 pt-xl-0"
                        }
                      >
                        <div className="d-flex flex-wrap justify-content-end">
                          <div className="col-6 col-sm-12 col-md-6 text-md-end">
                            <button
                              type="button"
                              className={
                                rightSideContent.application_status === "Shortlisted"
                                  ? "btn btn-sm px-5 px-xl-4 px-xxl-5 border shortlisted-candidate me-1"
                                  : "btn btn-sm px-5 px-xl-4 px-xxl-5 border select-candidate me-1"
                              }
                              title={
                                rightSideContent.application_status ===
                                  "Shortlisted"
                                  ? "Undo Shortlist"
                                  : "Shortlist"
                              }
                              onClick={
                                () => handleApplicationStatus(rightSideContent.application_status !== "Shortlisted" ? "Shortlisted" : "not reviewed")
                              }
                            >
                              <MdOutlineDone className="fs-5" />
                            </button>
                          </div>

                          <div className="col-6 col-sm-12 col-md-6 mt-sm-4 mt-md-0 text-md-start">
                            <button
                              type="button"
                              className={
                                rightSideContent.application_status ===
                                  "Rejected"
                                  ? "btn btn-sm px-5 px-xl-4 px-xxl-5 border reject-candidate-thick"
                                  : "btn btn-sm px-5 px-xl-4 px-xxl-5 border reject-candidate"
                              }
                              title={
                                rightSideContent.application_status ===
                                  "Rejected"
                                  ? "undo Rejected"
                                  : "Rejected"
                              }
                              onClick={
                                () => handleApplicationStatus(rightSideContent.application_status !== "Rejected" ? "Rejected" : "not reviewed")
                              }
                            >
                              <RxCross2 className="fs-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : null
                    : null
                  }

                  <div className="col-12 col-sm-8 col-md-12 pt-4 d-flex flex-wrap">
                    <div
                      className={
                        window.location.pathname ===
                          "/employer_dashboard/candidates/full_details"
                          ? "col-12 col-md-8 col-lg-5"
                          : "col-12 col-md-8 col-lg-12 col-xl-5"
                      }
                    >
                      <p className="employer-card-candidate-role ">
                        <strong className="pe-2">Email :</strong>
                        <span>{rightSideContent.email_id}</span>
                      </p>
                    </div>
                    <div
                      className={
                        window.location.pathname ===
                          "/employer_dashboard/candidates/full_details"
                          ? "col-12 col-md-8 col-lg-5"
                          : "col-12 col-md-8 col-lg-12 col-xl-4"
                      }
                    >
                      <p className="employer-card-candidate-role">
                        <strong className="pe-2">Location :</strong>
                        <span>{rightSideContent.city}</span>
                      </p>
                    </div>
                    <div
                      className={
                        window.location.pathname ===
                          "/employer_dashboard/candidates/full_details"
                          ? "col-12 col-md-8 col-lg-5"
                          : "col-12 col-md-8 col-lg-12 col-xl-3"
                      }
                    >
                      <p className="employer-card-candidate-role">
                        <strong className="pe-2">Phone :</strong>
                        {rightSideContent.contact_number}
                      </p>
                    </div>
                  </div>

                  <div className="col-12 pt-3">
                    <button
                      type={"button"}
                      className={
                        rightSideContent.application_status === "Rejected"
                          ? "btn btn-transparent border btn-brand-color candidate-right-side-btn not-allowed"
                          : rightSideContent.invite_to_interview === "Y"
                            ? "btn btn-transparent border btn-brand-color candidate-right-side-btn pe-none"
                            : "btn btn-transparent border btn-brand-color candidate-right-side-btn"
                      }
                      data-bs-toggle={
                        rightSideContent.application_status === "Rejected"
                          ? ""
                          : "modal"
                      }
                      data-bs-target="#scheduleInterview"
                      onClick={handleInviteForInterviewSettingModalData}
                    >
                      {rightSideContent.invite_to_interview === "Y"
                        ? "Invited"
                        : "Invite to Interview"}
                    </button>

                    <button
                      buttonType={"button"}
                      className={"btn btn-transparent border border-brand-color ms-4 candidate-right-side-btn"}
                      data-bs-toggle={"modal"}
                      data-bs-target="#takeNotesModal"
                    >
                      {rightSideContent.custom_notes === null ||
                        rightSideContent.custom_notes === ""
                        ? "Take Notes"
                        : "Noted"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 border-bottom border-3 py-4">
            <EmployerCandidateProfile rightSideContent={rightSideContent} />
          </div>

          {rightSideContent.resume_name !== "professional/resume/" ? (
            <div className="col-12 pt-5">
              <div className="container-fluid">
                <div className="row align-items-center">
                  <div className="col-6">
                    <h1 className="employer-card-Content-heading">Resume</h1>
                  </div>
                  <div className="col-6 text-end">
                    <button type="button" className="btn btn-transparent border btn-brand-color candidate-right-side-btn">
                      <a href={`${process.env.REACT_APP_SECOND_CAREERS_CDN}${rightSideContent.resume_name}`} className="text-light text-decoration-none" download>Download</a>
                    </button>
                  </div>
                </div>
                <Pdf
                  pdfUrl={`${process.env.REACT_APP_SECOND_CAREERS_CDN}${rightSideContent.resume_name}`}
                />
              </div>
            </div>
          ) : null}

          {rightSideContent.cover_letter_name !== "professional/cover-letter/" ? (
            <div className="col-12 pt-5">
              <div className="container-fluid">
                <div className="row align-items-center">
                  <div className="col-6">
                    <h1 className="employer-card-Content-heading">Cover letter</h1>
                  </div>
                  <div className="col-6 text-end">
                    <button type="button" className="btn btn-transparent border btn-brand-color candidate-right-side-btn">
                      <a href={`${process.env.REACT_APP_SECOND_CAREERS_CDN}${rightSideContent.cover_letter_name}`} className="text-light text-decoration-none" download>Download</a>
                    </button>
                  </div>
                </div>
                <Pdf
                  pdfUrl={`${process.env.REACT_APP_SECOND_CAREERS_CDN}${rightSideContent.cover_letter_name}`}
                />
              </div>
            </div>
          ) : null}

          <div className="col-12 pt-5">
            <div className="container">
              <h1 className="employer-card-Content-heading">
                Additional Questions
              </h1>

              {quesAndAns.map((v, i) => {
                return (
                  <div className="col-12">
                    <p className="employer-card-Content">
                      <span className="pe-2">{i + 1}.</span>
                      {v.custom_pre_screen_ques}
                    </p>
                    <div className="px-4">
                      <textarea
                        className="p-3 rounded-3 mb-3 form-control outline-none pe-none employer-card-Content"
                        minLength={25}
                        maxLength={10000}
                        rows={4}
                        value={v.custom_pre_screen_ans}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* take notes modal box  */}
      <div
        className="modal fade"
        id="takeNotesModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg vh-50">
          <div className="modal-content p-2">
            <div className="modal-header border-bottom-0">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Take notes
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="closeApplyModal"
              ></button>
            </div>
            <div className="modal-body border-bottom-0">
              <div className="container">
                <div className="row">
                  <textarea
                    className="p-3 rounded-3 mb-3 form-control outline-none"
                    minLength={25}
                    maxLength={10000}
                    rows={4}
                    placeholder=""
                    value={keepNotes}
                    onChange={(e) => setKeepNotes(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer border-top-0">
              <div className="container">
                <div className="row float-end">
                  <div className="col-lg-12 ">
                    <button
                      type="submit"
                      className="btn btn-brand-color my-2 px-5"
                      onClick={handleupdateNotes}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* invite to interview modal */}
      <div
        className="modal fade"
        id="scheduleInterview"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h5 className="modal-title" id="staticBackdropLabel">
                Schedule the Interview
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="closeInterviewModalbox"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container">
                <form>
                  <div className="mb-3 position-relative">
                    <input
                      type="email"
                      className="form-control pt-4 pb-2"
                      placeholder="(email of the professional)"
                      value={rightSideContent.email_id}
                      disabled
                    />
                    <span className="interview-modal-span">To</span>
                  </div>
                  <div className="mb-3 position-relative">
                    <input
                      type="text"
                      className="form-control interview-modal-inputs"
                      placeholder="(subject of the interview)"
                      value={modalSubject}
                      onChange={(e) => setModalSubject(e.target.value)}
                    />

                    <span className="interview-modal-span">Subject</span>
                  </div>
                </form>
              </div>

              <div>
                <h5 className="modal-title mb-3">Schedule Options</h5>
                <div className="container">
                  <div className="row g-2 align-items-stretch">
                    <div className="col d-inline-flex">
                      <button
                        type="button"
                        className={`btn border px-2 py-4 w-100 ${isButtonOneContent ? "btn-brand-color" : ""
                          }`}
                        onClick={() => {
                          setIsButtonOneContent(true);
                          setmodalOneERR(false);
                        }}
                      >
                        Please use the following link to book a convenient time with me
                      </button>
                    </div>

                    <div className="col d-inline-flex">
                      <button
                        type="button"
                        className={`btn border px-2 py-4 w-100 ${isButtonOneContent ? "" : "btn-brand-color"
                          }`}
                        onClick={() => {
                          setIsButtonOneContent(false);
                          setmodalTwoERR(false);
                        }}
                      >
                        I don’t have a link with my availability
                      </button>
                    </div>
                  </div>
                  {isButtonOneContent ? (
                    <div className="mt-3 ">
                      <div className="border rounded">
                        <form className="px-4 pt-3">
                          <div className="mb-3">
                            <label
                              htmlFor="buttonOneMeetingLink"
                              className="form-label"
                            >
                              Meeting link
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              id="buttonOneMeetingLink"
                              placeholder="Paste your link (Calendly, Google appointment schedule, etc)"
                              value={modalLink}
                              onChange={handleModalLinks}
                            />
                          </div>

                          <div className="mb-3">
                            <label htmlFor="buttonOneMessage" className="form-label">
                              Message
                            </label>
                            <ReactQuill
                              style={{
                                height: "200px",
                                marginBottom: "3rem",
                                height: "20rem",
                                borderRadius: "2rem",
                              }}
                              theme="snow"
                              modules={modules}
                              formats={formats}
                              value={modalOneMsg}
                              onChange={(e) => setmodalOneMsg(e)}
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3 ">
                      <div className="border rounded">
                        <form className="px-4 pt-3">
                          <div className="mb-3">
                            <label htmlFor="buttonTwoMessage" className="form-label">
                              Message
                            </label>
                            <ReactQuill
                              style={{
                                height: "200px",
                                marginBottom: "3rem",
                                height: "20rem",
                                borderRadius: "2rem",
                              }}
                              theme="snow"
                              modules={modules}
                              formats={formats}
                              value={modalTwoMsg}
                              onChange={(e) => setmodalTwoMsg(e)}
                            />

                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-transparent border border-brand-color candidate-right-side-btn"
                data-bs-dismiss="modal"
              >
                Close
              </button>

              <button
                type="button"
                className="btn btn-brand-color"
                onClick={() => handleInviteForInterview()}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CandidateRightContent;
