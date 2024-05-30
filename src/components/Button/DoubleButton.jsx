import React, { useContext, useEffect, useState } from "react";
// import bootstrapMin from 'bootstrap/dist/js/bootstrap.min.js';
import bootstrap from "bootstrap/dist/js/bootstrap.min.js";
import { NavLink, useNavigate } from "react-router-dom";
import RadioForm from "../../views/employer/MultiStepPages/RadioForm";
import Select from "react-dropdown-select";
import employerContext from "../../hooks/employerContext";

const DoubleButton = ({
  firstButtonName,
  secondButtonName,
  cardIcon,
  firstCardColorclassName,
  secondCardColorclassName,
  rightLearnUrl,
  leftCommUrl,
  leftLearnUrl,
  dropDownName,
  handleOpen,
  handlePause,
  handleClose,
  jobId,
  handleCandidateRadioButton,
  candidateDetails,
  setCandidateDetails,
  radioValue,
  setRadioValue,
  candidateName,
  setcandidateName,
  handleCandidateName,
  candidateFeedbackDb,
  setCandidateFeedback,
  handleCandidateFeedbackDb,
  appliedCandidates,
  setAppliedCandidates,
  setClosingCandidateDetails,
  openValue,
  setSendingCandidate,
  setJobListContent,
  setRoleStatus,
  handleRedirectToCandidate
}) => {
  const [selectBoxCandidates, setSelectBoxCandidates] = useState([]);
  const pageRender = useNavigate();

  useEffect(() => {
    if (appliedCandidates !== undefined) {
      var convertAppliedData = appliedCandidates.map((v, i) => {
        return { value: v.id, label: `${v.first_name} ${v.last_name}` };
      });

      setSelectBoxCandidates(convertAppliedData);
    }
  }, [appliedCandidates]);

  const handleButtonDropDown = (drop) => {
    if (drop === "Close") {
      const closeModal = new bootstrap.Modal(`#closeModal${jobId}`);
      closeModal.show();
    }

    if (drop === "Open") {
      const openModal = new bootstrap.Modal(`#openModal${jobId}`);
      openModal.show();
    }

    if (drop === "Pause") {
      const pauseModal = new bootstrap.Modal(`#pauseModal${jobId}`);
      pauseModal.show();
    }
  };

  const handleModalCancelButton = (e,drop) =>{
    if (drop === "Close") {
    setRadioValue('N')
    setCandidateDetails(false)
    }
    };

  return (
    <div className="d-grid gap-2 d-md-flex justify-content-md-center mb-2 mx-1">
      {firstButtonName === "Join Community" ? (
        <a
          href={`${leftCommUrl}`}
          role="button"
          target="_blank"
          className={`btn btn-${firstCardColorclassName} me-md-2 w-100`}
        >
          {cardIcon}
          {firstButtonName}
        </a>
      ) : firstButtonName === "Open" ? (
        <div className="dropdown custom-dropdown w-100">
          {
            openValue !== "closed" ?
              <>
                <button
                  className="btn btn-secondary dropdown-toggle rounded-3 me-md-2 w-100 mx-auto"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {" "}
                  <span className="px-3">
                    {dropDownName !== "" ? dropDownName === 'opened' ? 'Open' : dropDownName==='paused' ? 'Paused' : 'Closed': firstButtonName}
                  </span>
                </button>
                <ul className="dropdown-menu border-0 shadow">
                  {
                    openValue !== "opened" ?
                      <>
                        <li 
                          onClick={() => {
                            handleButtonDropDown("Open");
                          }}
                        >
                          <a className="dropdown-item fw-medium">Open</a>
                        </li>
                        <hr className="m-0 mx-3 buttonLineColor" />
                      </>
                      :
                      null
                  }


                  <li 
                    onClick={() => {
                      handleButtonDropDown("Close");
                    }}
                  >
                    <a className="dropdown-item fw-medium">Close</a>
                  </li>
                  <hr className="m-0 mx-3 buttonLineColor" />

                  {
                    openValue !== "paused" ?
                      <>
                        <li 
                          onClick={() => {
                            handleButtonDropDown("Pause");
                          }}
                        >
                          <a className="dropdown-item fw-medium">Pause</a>
                        </li>
                      </>
                      :
                      null
                  }
                </ul>
              </>
              :
              <button
                className="btn btn-transparent border pe-none  rounded-3 me-md-2 w-100 mx-auto"
                type="button"
              >
                Closed
              </button>
          }
        </div>
      ) : (
        <a
          href={`https://cdn.2ndcareers.com/${leftLearnUrl}`}
          tcloseModatarget="_blank"
          download
          className={`btn btn-${firstCardColorclassName}  me-md-2 w-100`}
          type="button"
        >
          {cardIcon}
          {firstButtonName}
        </a>
      )}

      {secondButtonName === "Share" ? (
        <button
          className={`btn btn-${secondCardColorclassName} w-100`}
          type="button"
          onClick={() => (secondButtonName === "Share" ? "" : "")}
          data-bs-toggle="modal"
          data-bs-target={secondButtonName === "Share" ? "#shareModal" : ""}
        >
          {secondButtonName}
        </button>
      ) : secondButtonName === "View" ? (
        <button type="button" className={`btn btn-${secondCardColorclassName} w-100`} onClick={() => handleRedirectToCandidate(jobId)}>View</button>
        // <NavLink
        //   to="/employer_dashboard/candidates"
        //   className={`btn btn-${secondCardColorclassName} w-100`}
        // >
        //   {/* <a href={`${rightLearnUrl}`} role='button' target='_blank' className={`btn btn-${secondCardColorclassName} w-100`}>
        //                     {secondButtonName}
        //                 </a> */}{" "}
        //   View
        // </NavLink>
      ) : (
        <a
          href={`${rightLearnUrl}`}
          role="button"
          target="_blank"
          className={`btn btn-${secondCardColorclassName} w-100`}
        >
          {secondButtonName}
        </a>
      )}

      {/* Open Modal */}
      <div
        className="modal fade"
        id={`openModal${jobId}`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content p-3">
            <div className="modal-body">
              <form>
                {/* <div className="d-flex align-items-center justify-content-center"> */}
                <div>
                  <span className="yesOrNoText">
                    Click submit to open this job ?
                  </span>
                  {/* </div> */}

                  {/* <div className="yesOrNo">
                                        <div className="d-flex align-items-center justify-content-start">

                                            <div className="d-flex justify-content-between pe-3">
                                                <div><input className="form-check-input yesOrNoRadioButtonColor" type="radio" value="Yes" name="yesOrNo" id="flexRadioDefault1"
                                                    onChange={handleCandidateForm} /></div>
                                                <div className=''><label htmlFor="flexRadioDefault1">Yes</label></div>
                                            </div>

                                            <div className="d-flex justify-content-center">
                                                <div></div><input className="form-check-input yesOrNoRadioButtonColor " type="radio" value="No" name="yesOrNo" id="flexRadioDefault2"
                                                    onChange={handleCandidateForm} />
                                                <div><label htmlFor="flexRadioDefault2">No</label></div>
                                            </div>

                                        </div>
                                    </div> */}
                </div>
              </form>
            </div>
            <div className="modal-footer border-0 bg-transparent pb-2">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-brand-color ms-3"
                data-bs-dismiss="modal"
                onClick={(e) => handleOpen(e, jobId, openValue)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pause button Modal*/}
      <div
        className="modal fade"
        id={`pauseModal${jobId}`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content p-3">
            <div className="modal-body">
              <form>
                {/* <div className=""> */}
                <div className="">
                  <label
                    htmlFor="recipient-name"
                    className="col-form-label col"
                  >
                    Are you sure you want to pause this job ?
                  </label>
                </div>

                {/* <div className="yesOrNo">
                                        <div className="d-flex align-items-center align-self-end  w-100 mx-0">

                                            <div className="form-check col mx-auto flex-fill me-2">
                                                <input className="form-check-input yesOrNoRadioButtonColor me-1" type="radio" value="Yes" name="yesOrNo" id="flexRadioDefault1"
                                                    onChange={handleCandidateForm} />
                                                <span className="" htmlFor="flexRadioDefault1">Yes</span>
                                            </div>

                                            <div className="form-check col mx-auto flex-fill">
                                                <input className="form-check-input yesOrNoRadioButtonColor me-1" type="radio" value="No" name="yesOrNo" id="flexRadioDefault2"
                                                    onChange={handleCandidateForm} />
                                                <span htmlFor="flexRadioDefault2">No</span>
                                            </div>

                                        </div>
                                    </div> */}

                {/* </div> */}
              </form>
            </div>
            <div className="modal-footer border-0 bg-transparent pb-2">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-brand-color ms-3"
                data-bs-dismiss="modal"
                onClick={(e) => handlePause(e, jobId, openValue)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Close button Modal */}
      <div
        className="modal fade"
        id={`closeModal${jobId}`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content p-3">

            <div className="modal-header border-0">
              <button type="button" className="btn-close" data-bs-dismiss="modal" id={`closeModal-${jobId}`} onClick={(e)=> handleModalCancelButton(e,'Close')}></button>
            </div>

            <div className="modal-body">
              <form>
                <div className=" row align-items-center w-100">
                  {/* <RadioForm
                    radioText="Were you able to fill this role through 2nd Careers ?"
                    radioTextId={"fillThisRole"}
                    firstRadioTitle="Yes"
                    secondRadioTitle="No"
                    defaultCheckSecond="N"
                    firstRadioId="fillThisRoleOne"
                    secondRadioId="fillThisRoleTwo"
                    firstRadioValue="Y"
                    secondRadioValue="N"
                    radiocommonName="fillThisRole"
                    handleRadioButton={(e) =>
                      handleCandidateRadioButton(e, jobId)
                    }
                    pageFourRadio={false}
                  /> */}
                  <div className=" d-flex align-items-center justify-content-between  w-100">
                    <div className={`textWithRadio col-9`} id={"fillThisRole"}>
                      <label htmlFor={"fillThisRole"} className="col-form-label col">{"Were you able to fill this role through 2nd Careers ?"}</label>
                    </div>

                    <div className="yesOrNo col-3">
                      <div className="d-flex align-items-center w-100">
                        <div className=" col mx-auto flex-fill me-2">
                          <input className="form-check-input yesOrNoRadioButtonColor me-1" type="radio" value={"Y"} name={"radiocommonName"}  id={`roleOne${jobId+'abytr'}`}
                            onChange={(e) => handleCandidateRadioButton(e, jobId)} />
                          <label htmlFor={`roleOne${jobId+'abytr'}`}>Yes</label>
                        </div>

                        <div className=" col mx-auto flex-fill">
                          <input className="form-check-input yesOrNoRadioButtonColor me-1" type="radio" value={"N"} name={"radiocommonName"} defaultChecked id={`roleTwo${jobId+'qbra'}`}
                            onChange={(e) => handleCandidateRadioButton(e, jobId)} />
                          <label htmlFor={`roleTwo${jobId+'qbra'}`}>No</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>

                    {candidateDetails ? (
                      <React.Fragment>
                        <div className="mb-3">
                          <label
                            htmlFor="recipient-name"
                            className="col-form-label"
                          >
                            Please select the hired candidate
                          </label>
                        
                          <Select
                            multi
                            color="#ffa32d"
                            style={{ fontSize: ".9rem" }}
                            className="rounded-1"
                            options={selectBoxCandidates}
                            onChange={(values) => setClosingCandidateDetails(values)}
                          />
                       
                        </div>
                        <div>
                          <label htmlFor="message-text" className="col-form-label">
                            Feedback regarding the hiring process through 2nd
                            Careers platform
                          </label>
                          <textarea
                            className="form-control"
                            id="message-text"
                            value={candidateFeedbackDb}
                            onChange={(e) => handleCandidateFeedbackDb(e)}
                          ></textarea>
                        </div>
                      </React.Fragment>
                    ) : null}
                  
                  </form>
                </div>
                <div className="modal-footer border-0 bg-transparent pb-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    data-bs-dismiss="modal"
                    onClick={(e)=> handleModalCancelButton(e,'Close')}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-brand-color ms-3"
                    // data-bs-dismiss="modal"
                    onClick={(e) =>
                      handleClose(
                        e,
                        radioValue,
                        candidateName,
                        candidateFeedbackDb,
                        jobId
                      )
                    }
                  >
                    Submit
                  </button>
                </div>
            </div>
          </div>
        </div>
      </div>
      );
};

      export default DoubleButton;
