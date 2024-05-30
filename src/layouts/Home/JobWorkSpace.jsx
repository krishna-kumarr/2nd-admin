import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Outlet } from "react-router-dom";
import { LuUpload } from "react-icons/lu";
import CommonContext from "../../hooks/CommonContext";
import axios from "axios";
import toast from "react-hot-toast";
import { BsFiletypePdf } from "react-icons/bs";
import JobWorkSpaceRightContent from "./JobWorkSpaceRightContent";
import { useDropzone } from "react-dropzone";
import { IoIosInformationCircleOutline } from "react-icons/io";
import axiosInstance from "../../services/api/axiosInstance";

const JobWorkSpace = () => {
  const {
    setRecall,
    setRecallID,
    getRecommendedData,
    selectedCardPath,
    getHomeAll,
    isSmallDevice,
    setRefreshId,
    setRefreshAction,
    selectedCardData,
    answers,
    setAnswer,
    selectedCarrdLink,
    getSavedDatas,
    applyFilterCount,
    handleApplyFilter,
    filteringObject,
    setSelectedCardIndex, setFilterRefreshId,
    handleSelectedCardData, setSaveJobLoading,
    applyJobLoading, setApplyJobLoading
  } = useContext(CommonContext);

  const [questionModal, setQuestionModal] = useState(false);
  const [modalBoxErr, setModalBoxErr] = useState(false);
  const [resumeData, setResumeData] = useState([]);
  const [resumeSelected, setResumeSelected] = useState(false);
  const [coverLetterData, setCoverLetterData] = useState([]);
  const inputFile = useRef(null);
  const [modalApplyBtn, setmodalApplyBtn] = useState(false);


  const handleReset = () => {
    setResumeData([]);
    setCoverLetterData([]);
    setModalBoxErr(false);
    setmodalApplyBtn(false);
    setApplyJobLoading(false)
  };

  const handleCopytext = () => {
    navigator.clipboard.writeText(selectedCarrdLink);
    toast.success("Link copied");
  };

  const handleSaveJob = async (value) => {
    setSaveJobLoading(true)
    let jobSaveParams = { job_id: value };
    const response = await axiosInstance.post("/professional_job_save", jobSaveParams)
    if (response.data.error_code === 0) {
      setAnswer([])
      handleSelectedCardData(value, "job-Saving");

    }
    if (response.data.error_code === 403) {
      toast.error(response.data.message);
    }
  };

  const handleAnswer = (event, questionId) => {
    const editAnswer = answers.map((v) => {
      return v.question_id === questionId
        ? { ...v, answer: event.target.value }
        : v;
    });

    setAnswer(editAnswer);
  };

  const handleFormDataApplyJob = async (e) => {
    e.preventDefault();
    setApplyJobLoading(true)
    setmodalApplyBtn(true);
    const checkAnswers = answers.filter((v) => {
      return v.answer.length === 0;
    });

    if (
      checkAnswers.length === 0 &&
      ((resumeData.length > 0 && selectedCardData[0].required_resume === "Y") ||
        selectedCardData[0].required_resume === "N") &&
      ((coverLetterData.length > 0 &&
        selectedCardData[0].required_cover_letter === "Y") ||
        selectedCardData[0].required_cover_letter === "N")
    ) {
      setModalBoxErr(false);
      const fd = new FormData();
      fd.append(
        "resume",
        selectedCardData[0].required_resume === "Y" ? resumeData[0] : null
      );
      fd.append(
        "cover_letter",
        selectedCardData[0].required_cover_letter === "Y"
          ? coverLetterData[0]
          : null
      );
      fd.append("job_id", selectedCardData[0].id);

      if (answers.length > 0) {
        fd.append("status_questions_list", 1);
        answers.forEach((obj, index) => {
          Object.entries(obj).forEach(([key, value]) => {
            fd.append(`questions_list[${index}][${key}]`, value);
          });
        });
      } else {
        fd.append("status_questions_list", null);
      }


      try {
        const token = localStorage.getItem("pToken");
        await axios
          .post("https://devapi.2ndcareers.com/professional_job_apply", fd, {
            headers: {
              "content-type": "multipart/form-data",
              authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setAnswer([]);
            document.getElementById("closeApplyModal").click();
            if (res.data.error_code === 0) {
              toast.success(res.data.message);

              if (isSmallDevice) {
                setRefreshId(selectedCardData[0].id + 100);
                setRefreshAction(true);
                setQuestionModal(false);
                setmodalApplyBtn(false);
                setRecall(true);
                setRecallID(selectedCardData[0].id);
                if (selectedCardPath === "/professional/home/all_jobs") {
                  getHomeAll();
                }
                if (
                  selectedCardPath === "/professional/home/recommended_jobs"
                ) {
                  getRecommendedData();
                }
                if (selectedCardPath === "/professional/home/saved_jobs") {
                  getSavedDatas();
                }
              } else {
                if (selectedCardPath === "/professional/home/all_jobs") {
                  setQuestionModal(false);
                  setmodalApplyBtn(false);
                  setRecall(true);
                  setRecallID(selectedCardData[0].id);
                  if (applyFilterCount > 0) {
                    var object = filteringObject;
                    setFilterRefreshId(selectedCardData[0].id + 100)
                    handleApplyFilter({ object });
                  } else {
                    setRefreshId(selectedCardData[0].id + 100);
                    setRefreshAction(true);
                    setQuestionModal(false);
                    setmodalApplyBtn(false);
                    setRecall(true);
                    setRecallID(selectedCardData[0].id);
                    getHomeAll();
                  }
                } else {
                  setRefreshId(selectedCardData[0].id + 100);
                  setRefreshAction(true);
                  setQuestionModal(false);
                  setmodalApplyBtn(false);
                  setRecall(true);
                  setRecallID(selectedCardData[0].id);
                }
              }
            } else {
              toast.error(res.data.message);
            }
            setApplyJobLoading(false)
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    } else {
      setModalBoxErr(true);
      setApplyJobLoading(false);
      toast("Some fields are empty", {
        icon: (
          <IoIosInformationCircleOutline className="fs-1 brand-color me-1" />
        ),
      });
    }
    setmodalApplyBtn(false);
  };

  const handleNoRequirementsApplyJob = async () => {
    setApplyJobLoading(true)
    const fd = new FormData();
    fd.append("resume", null);
    fd.append("cover_letter", null);
    fd.append("job_id", selectedCardData[0].id);
    fd.append("status_questions_list", null);
    answers.forEach((obj, index) => {
      Object.entries(obj).forEach(([key, value]) => {
        fd.append(`questions_list[${index}][${key}]`, value);
      });
    });

    try {
      const token = localStorage.getItem("pToken");
      await axios
        .post("https://devapi.2ndcareers.com/professional_job_apply", fd, {
          headers: {
            "content-type": "multipart/form-data",
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setAnswer([]);
          if (res.data.error_code === 0) {
            toast.success(res.data.message);

            if (isSmallDevice) {
              setRefreshId(selectedCardData[0].id + 1000);
              setRefreshAction(true);
              setQuestionModal(false);
              setRecallID(selectedCardData[0].id);
              setRecall(true);
              if (selectedCardPath === "/professional/home/all_jobs") {
                getHomeAll();
              }
              if (selectedCardPath === "/professional/home/recommended_jobs") {
                getRecommendedData();
              }
              if (selectedCardPath === "/professional/home/saved_jobs") {
                getSavedDatas();
              }
            } else {
              setQuestionModal(false);
              setRecallID(selectedCardData[0].id);
              setRecall(true);
              if (selectedCardPath === "/professional/home/all_jobs") {
                if (applyFilterCount > 0) {
                  var object = filteringObject;
                  setFilterRefreshId(selectedCardData[0].id + 1000)
                  handleApplyFilter({ object });
                } else {
                  getHomeAll();
                }
              } else {
                setRefreshId(selectedCardData[0].id + 1000);
                setRefreshAction(true);
                setQuestionModal(false);
                setmodalApplyBtn(false);
                setRecall(true);
                setRecallID(selectedCardData[0].id);
              }
            }
          } else if (res.data.error_code === 201) {
            toast.error(res.data.message);
          } else {
            toast.error(res.data.message);
          }
          setApplyJobLoading(false);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  const onDropResume = useCallback((acceptedFiles) => {
    var fileSize = acceptedFiles[0].size
    if (fileSize <= 5242880) {
      setResumeData(acceptedFiles);
    } else {
      toast.error("Please ensure that the file size remains below 5MB")
    }
  }, []);

  const {
    getRootProps: getRootPropsResume,
    getInputProps: getInputPropsResume,
    isDragActive: isDragActiveResume,
  } = useDropzone({
    onDrop: onDropResume,
    maxFiles: 1,
    accept: {
      "application/pdf": [],
    },
  });

  const onDropCoverLetter = useCallback((acceptedFiles) => {
    var fileSize = acceptedFiles[0].size
    if (fileSize <= 5242880) {
      setCoverLetterData(acceptedFiles);
    } else {
      toast.error("Please ensure that the file size remains below 5MB")
    }
  }, []);

  const {
    getRootProps: getRootPropsCoverLetter,
    getInputProps: getInputPropsCoverLetter,
    isDragActive: isDragActiveCoverLetter,
  } = useDropzone({
    onDrop: onDropCoverLetter,
    maxFiles: 1,
    accept: {
      "application/pdf": [],
    },
  });

  return (
    <div className="container-fluid">
      <div
        className={
          !isSmallDevice
            ? "row mt-1 setting-row-height p-3 pt-0"
            : "setting-row-height-minimumDevice row mt-4"
        }
      >
        {!isSmallDevice ? (
          <div className="h-100 col-12 col-lg-6 overflow-scroll d-flex p-0">
            <Outlet />
          </div>
        ) : null}

        {!isSmallDevice ? (
          <JobWorkSpaceRightContent
            handleNoRequirementsApplyJob={handleNoRequirementsApplyJob}
            handleFormDataApplyJob={handleFormDataApplyJob}
            handleAnswer={handleAnswer}
            handleSaveJob={handleSaveJob}
            handleCopytext={handleCopytext}
            handleReset={handleReset}
            questionModal={questionModal}
            setQuestionModal={setQuestionModal}
            modalBoxErr={modalBoxErr}
            setModalBoxErr={setModalBoxErr}
            resumeData={resumeData}
            setResumeData={setResumeData}
            resumeSelected={resumeSelected}
            setResumeSelected={setResumeSelected}
            coverLetterData={coverLetterData}
            setCoverLetterData={setCoverLetterData}
            inputFile={inputFile}
          />
        ) : (
          <JobWorkSpaceRightContent
            handleNoRequirementsApplyJob={handleNoRequirementsApplyJob}
            handleFormDataApplyJob={handleFormDataApplyJob}
            handleAnswer={handleAnswer}
            handleSaveJob={handleSaveJob}
            handleCopytext={handleCopytext}
            handleReset={handleReset}
            questionModal={questionModal}
            setQuestionModal={setQuestionModal}
            modalBoxErr={modalBoxErr}
            setModalBoxErr={setModalBoxErr}
            resumeData={resumeData}
            setResumeData={setResumeData}
            resumeSelected={resumeSelected}
            setResumeSelected={setResumeSelected}
            coverLetterData={coverLetterData}
            setCoverLetterData={setCoverLetterData}
            inputFile={inputFile}
            deviceResolution={"smallDevice"}
          />
        )}
      </div>

      {/* apply job modal box  */}
      {window.location.pathname !== "/professional/home/applied_jobs" ? (
        <div
          className="modal fade"
          id="ApplyJobModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg vh-50">
            <div className="modal-content p-2">
              <form ref={inputFile} onSubmit={handleFormDataApplyJob}>
                <div className="modal-header border-bottom-0">
                  <h1 className="modal-title fs-5" id="staticBackdropLabel">
                    Apply for job
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
                    <div className="container pe-0">
                      {selectedCardData.length > 0 &&
                        selectedCardData[0] !== undefined ? (
                        <>
                          {selectedCardData[0].required_resume !== undefined ? (
                            selectedCardData[0].required_resume === "Y" ? (
                              <div className="col-12 my-3">
                                <div className="card border-0 h-100">
                                  {resumeData.length > 0 ? (
                                    <div className="card border-0 h-100 rounded-4 ">
                                      <div className="card-body border rounded-3 pt-4 ">
                                        <div className="d-flex justify-content-between align-items-center">
                                          <div className="p-1 uploaded-resume-container d-flex justify-content-between align-items-center">
                                            <div>
                                              <BsFiletypePdf className="pdf-icon me-3 fs-2" />
                                            </div>
                                            <div>
                                              <p className="resume-name m-0">
                                                {resumeData[0].name !==
                                                  undefined
                                                  ? resumeData[0].name
                                                  : null}
                                              </p>
                                            </div>
                                          </div>

                                          <div className="px-3 gap-3 mt-2 d-flex float-end align-items-center">
                                            <LuUpload
                                              className="upload-icon fs-4 brand-color"
                                              title="Upload New Resume"
                                              onClick={() => setResumeData([])}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div
                                      {...getRootPropsResume()}
                                      className="text-center cursorPointer"
                                    >
                                      <input {...getInputPropsResume()} />
                                      {isDragActiveResume ? (
                                        <div className="card-body d-flex align-items-center justify-content-center p-0">
                                          <div className="border rounded-4 w-100 py-5">
                                            <div className="fs-2">
                                              <LuUpload />
                                            </div>
                                            <p>Drop the files here ...</p>
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="card-body d-flex align-items-center justify-content-center p-0">
                                          <div className="border rounded-4 w-100 py-5">
                                            <div className="fs-2">
                                              <LuUpload />
                                            </div>
                                            <p>
                                              Drag and drop or click here to
                                              upload resume
                                              <p className="text-secondary"> (Only PDF format is supported)</p>
                                            </p>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>

                                {resumeData.length === 0 && modalBoxErr ? (
                                  <div className="col-12">
                                    <p className="text-danger mt-2">
                                      Resume required
                                    </p>
                                  </div>
                                ) : null}
                              </div>
                            ) : null
                          ) : null}

                          {selectedCardData[0].required_cover_letter !==
                            undefined ? (
                            selectedCardData[0].required_cover_letter ===
                              "Y" ? (
                              <div className="col-12 my-3">
                                <div className="card border-0 h-100">
                                  {coverLetterData.length > 0 ? (
                                    <div className="card border-0 h-100 rounded-4">
                                      <div className="card-body border rounded-3 pt-4 ">
                                        <div className="d-flex justify-content-between align-items-center pb-3 ">
                                          <div className="p-1 uploaded-resume-container d-flex justify-content-between align-items-center">
                                            <div>
                                              <BsFiletypePdf className="pdf-icon me-3 fs-2" />
                                            </div>
                                            <div>
                                              <p className="resume-name mb-0">
                                                {coverLetterData[0].name !==
                                                  undefined
                                                  ? coverLetterData[0].name
                                                  : null}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="px-3 gap-3 mt-2 d-flex float-end align-items-center">
                                            <LuUpload
                                              className="upload-icon fs-4 brand-color"
                                              title="Upload New Resume"
                                              onClick={() =>
                                                setCoverLetterData([])
                                              }
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div
                                      {...getRootPropsCoverLetter()}
                                      className="text-center cursorPointer"
                                    >
                                      <input {...getInputPropsCoverLetter()} />
                                      {isDragActiveCoverLetter ? (
                                        <div className="card-body d-flex align-items-center justify-content-center p-0">
                                          <div className="border rounded-4 w-100 py-5">
                                            <div className="fs-2">
                                              <LuUpload />
                                            </div>
                                            <p>Drop the files here ...</p>
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="card-body d-flex align-items-center justify-content-center p-0">
                                          <div className="border rounded-4 w-100 py-5">
                                            <div className="fs-2">
                                              <LuUpload />
                                            </div>
                                            <p>
                                              Drag and drop or click here to
                                              upload cover letter
                                              <p className="text-secondary"> (Only PDF format is supported)</p>

                                            </p>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>

                                {coverLetterData.length === 0 && modalBoxErr ? (
                                  <div className="col-12">
                                    <p className="text-danger mt-2">
                                      Cover Letter Required
                                    </p>
                                  </div>
                                ) : null}
                              </div>
                            ) : null
                          ) : null}

                          {answers.length > 0
                            ? selectedCardData[0].questions.map((v, i) => {
                              return (
                                <div key={i}>
                                  <div className="row mb-2 ">
                                    <div className="col-lg-12 d-flex justify-content-between">
                                      <h6 className="text-break">{v.custom_pre_screen_ques}</h6>
                                    </div>
                                  </div>
                                  <div className="container">
                                    <div className="row">
                                      <textarea
                                        className="p-3 rounded-3 mb-3"
                                        value={answers[i].answer}
                                        onChange={(e) =>
                                          handleAnswer(e, v.id)
                                        }
                                        required
                                        minLength={25}
                                        maxLength={10000}
                                        rows={4}
                                        placeholder="Enter your text here.."
                                      />

                                      {answers[i].answer === "" &&
                                        modalBoxErr ? (
                                        <div className="col-12">
                                          <p className="text-danger">
                                            fields are empty
                                          </p>
                                        </div>
                                      ) : null}
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                            : null}
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-top-0">
                  <div className="container">
                    <div className="row float-end">
                      <div className="col-lg-12 ">
                        {
                          applyJobLoading ?
                            <button className="btn btn-brand-color pe-none" type="button">
                              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                              <span className="ps-2 d-none d-lg-inline">Applying...</span>
                            </button>
                            :
                            <button
                              type="submit"
                              className="btn btn-brand-color my-2 px-5"
                              id="applyNowBtn"
                              disabled={modalApplyBtn}
                            >
                              Apply
                            </button>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}

      {/* Share Modal */}
      <div
        className="modal fade"
        id="shareModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Share
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body pb-0">
              {/* <div className="social-media">
                <p className="share-text">Share the link via</p>
                <ul className="row align-items-center justify-content-around w-100 list-unstyled">
                  <li className="col text-center"> <a href="#"><IoLogoWhatsapp className="fs-2 whastapp-color " /></a></li>
                  <li className="col text-center"> <a href="#"><FaFacebook className=" fs-2 facebook-color " /></a></li>
                  <li className="col text-center"><a href="#"><FaLinkedin className=" fs-2 linkedin-color " /></a></li>
                  <li className="col text-center"> <a href="#"><FaTelegram className=" fs-2 telegram-color " /></a></li>
                  <li className="col text-center"> <a href="#"><IoMailOpen className=" fs-2 mail-color " /></a></li>
                </ul>
              </div> */}
            </div>
            <div className="modal-body pt-0 ">
              <div className="mb-5 position-relative">
                <label htmlFor="message-text" className="col-form-label mb-2">
                  Copy link
                </label>
                <input
                  className="form-control  mx-auto mt-0 linkFieldSize"
                  id="message-text"
                  value={selectedCarrdLink}
                  readOnly
                />
                <button
                  type="button"
                  className="btn btn-brand-color button-position"
                  onClick={handleCopytext}
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobWorkSpace;
