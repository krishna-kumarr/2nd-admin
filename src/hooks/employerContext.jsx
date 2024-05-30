import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../services/api/axiosInstance";

const employerContext = createContext();

export const DataProvider = ({ children }) => {
  const token = localStorage.getItem("Token");
  const [profile, setProfilePicture] = useState("");
  const [openWidget, setOpenWidget] = useState(false);
  const [smallDevice, setSmallDevice] = useState(false);
  const [candidatesList, setCandidatesList] = useState([]);
  const [candidatesListDuplicate, setCandidatesListDuplicate] = useState([]);
  const [jobRole, setJobRole] = useState([]);
  const [keepNotes, setKeepNotes] = useState("");
  const [rightSideContent, setRightSideContent] = useState({});
  const [filterSkills, setFilterSkills] = useState([]);
  const [filterLocation, setFilterLocation] = useState([]);
  const [professionalId, setProfessionalId] = useState(0);
  const [jobId, setJobId] = useState(0);
  const [role, setRole] = useState("");
  const [appStatus, setAppStatus] = useState("");
  const [initialGlow, setInitialGlow] = useState(false);
  const [cardSelectedGlow, setCardSelectedGlow] = useState(false);
  const [categorySelectedGlow, setCategorySelectedGlow] = useState(false);
  const [roleStatus,setRoleStatus] = useState("Opened")
  const [jobStatus, setJobStatus] = useState("All");
  const [mellieSearchSkills, setMellieSearchSkills] = useState([]);
  const [mellieSearchLocations, setMellieSearchLocations] = useState([]);
  const [jobListContent, setJobListContent] = useState({
    id: 0,
    job_title: "",
    posted_on: "",
    company_name:"",
    job_status:""
  });

  const [contentForEmail, setContentForEmail] = useState({
    id: 0,
    job_title: "",
    posted_on: "",
    company_name:"",
    job_status:"",
    designation:"",
    first_name:"",
    last_name:"",
    email_id:""
  });



  //home page states
  const [postDraftTemplate,setPostDraftTemplate] = useState(false);
  const [existingTemplate, setExistingTemplate] = useState(false);
  const [selctedTemplateCard,setSelectedTemplateCard]= useState(false)
  const [pageOneLoading, setPageOneLoading] = useState(true);
  const [homeResponseReview, setHomeResponseReview] = useState(false);
  const [getJobApi, setGetJobApi] = useState([]);
  const [createJobId, setCreateJobId] = useState({
    key_id: 0,
    job_title: "",
    job_type: "",
    work_schedule: "",
    workplace_type: "",
    country: "",
    city: "",
    job_overview: "",
    specialisation: "",
    required_subcontract: "",
    skills: "",
    time_zone: null,
    job_desc: "",
    required_resume: "",
    required_cover_letter: "",
    required_background_check: "",
    time_commitment: "",
    duration: "",
    job_status: "",
    is_paid: "",
    is_active: "",
    pre_screen_ques: [],
  });

  const [pageTwoJobDetails, setPageTwoJobDetails] = useState({
    jobTitle: "",
    jobOverview: "",
    workplaceType: "Select",
    // location: "Select",
    jobType: "Select",
    timeCommitment: "Select",
    timeZone: "",
    schedule: "Select",
    duration: "0-Select",
    compensation: "Select",
  });

  const [jobLocation, setJobLocation] = useState({
    city: "",
    country: "",
  });
  const [pageThreeJobDetails, setPageThreeJobDetails] = useState({
    jobDescription: null,
    skills: [],
    specialization: "Select",
  });

  const [showingJobLocation, setShowingJobLocation] = useState("")
  const [editCompanyLocation, setEditCompanyLocation] = useState({
  city: "",
  country: "",
  });


  const [pageFourJobDetails, setPageFourJobDetails] = useState({
    resume: "",
    coverLetter: "",
    bgCheck: "",
    hiring: "",
    questions: [],
  });
  const [txtdurations,settxtDurations]=useState({
    count:0,
    format:'Select'
  })
  
  const [showReview, setShowReview] = useState(true)
  const [showFieldOne, setShowFieldOne] = useState(true)
  const [showFieldTwo, setShowFieldTwo] = useState(false)
  const [showFieldThree, setShowFieldThree] = useState(false)
  const [showFieldFour, setShowFieldFour] = useState(false)

  const [showProgressBar,setShowProgressBar] = useState(true);
  const [editingJobFromHome,setEditingJobFromHome] = useState(false);

  var currentStep = 1;
  var updateProgressBar;

  const [progressBarHide, setProgressBarHide] = useState(false)
  const [sendingCandidate, setSendingCandidate] = useState(false);

  const getCandidateDatas = async (jobIdProps,changeRole,notesUpdate,sendingCandidateIdFromHome) => {
    setFilterSkills([]);
    setFilterLocation([]);

    if (notesUpdate === undefined) {
        if(changeRole===true){
          setCategorySelectedGlow(true)
        }else{
          setInitialGlow(true);
          setMellieSearchSkills([]);
          setMellieSearchLocations([]); 
        }        
    }
   
      if(jobIdProps===undefined && changeRole===false){
        var obj = {
          job_id: 0,
          job_status: roleStatus,
        }; 
      }
      else if(jobIdProps!==undefined && changeRole===true){
        var obj = {
          job_id: jobIdProps,
          job_status: roleStatus,
        }; 
      }
      else if(changeRole==="changeRole"){
        var obj = {
          job_id: jobIdProps,
          job_status: sendingCandidateIdFromHome,
        }; 
        setRoleStatus(sendingCandidateIdFromHome)
      }
      else if(changeRole==="filterchangeRole"){
        var obj = {
          job_id: '',
          job_status: sendingCandidateIdFromHome,
        }; 
        setRoleStatus(sendingCandidateIdFromHome)
      }
      else{
        var obj = {
          job_id: '',
          job_status: roleStatus,
        }; 
      }

   
    try {
      const res = await axiosInstance.post("/candidates_dashboard_view",obj)
      console.log(res,"response")

      if (res.data.error_code === 0) {
        if (res.data.data.professional_id !== undefined) {
          if (notesUpdate === undefined) {

            if(jobIdProps===undefined && changeRole===false){
              if(res.data.data.job_list.length > 0){
                setJobListContent({
                  ...jobListContent,
                  id: res.data.data.job_list[0].id,
                  job_title: res.data.data.job_list[0].job_title,
                  posted_on: res.data.data.job_list[0].posted_on,
                  company_name: res.data.data.job_list[0].company_name,
                  job_status: res.data.data.job_list[0].job_status
                });

                setContentForEmail({
                  ...contentForEmail,
                  id: res.data.data.job_list[0].id,
                  job_title: res.data.data.job_list[0].job_title,
                  posted_on: res.data.data.job_list[0].posted_on,
                  company_name: res.data.data.job_list[0].company_name,
                  job_status: res.data.data.job_list[0].job_status,
                  designation:res.data.data.job_list[0].designation,
                  first_name:res.data.data.job_list[0].first_name,
                  last_name:res.data.data.job_list[0].last_name,
                  email_id:res.data.data.job_list[0].email_id
                })
                
              }else{
                setJobListContent({
                  ...jobListContent,
                  id: 0,
                  job_title: 'No Data Found',
                  posted_on:'',
                  company_name: '',
                  job_status:'' 
                });

                setContentForEmail({
                  ...contentForEmail,
                  id: 0,
                  job_title: 'No Data Found',
                  posted_on:'',
                  company_name: '',
                  job_status:'' ,
                  designation:'',
                  first_name:'',
                  last_name:'',
                  email_id:''
                })
              }
            }
            else if(jobIdProps!==undefined && changeRole===true){
              var filterGettingJobId = res.data.data.job_list.filter(
                (v) => {
                  return v.id === jobIdProps;
                }
              );
              if(filterGettingJobId.length > 0){
                setJobListContent({
                  ...jobListContent,
                  id: filterGettingJobId[0].id,
                  job_title: filterGettingJobId[0].job_title,
                  posted_on: filterGettingJobId[0].posted_on,
                  company_name: filterGettingJobId[0].company_name,
                  job_status: filterGettingJobId[0].job_status
                });

                setContentForEmail({
                  ...contentForEmail,
                  id: filterGettingJobId[0].id,
                  job_title: filterGettingJobId[0].job_title,
                  posted_on: filterGettingJobId[0].posted_on,
                  company_name: filterGettingJobId[0].company_name,
                  job_status: filterGettingJobId[0].job_status,
                  designation:filterGettingJobId[0].designation,
                  first_name:filterGettingJobId[0].first_name,
                  last_name:filterGettingJobId[0].last_name,
                  email_id:filterGettingJobId[0].email_id
                })
              }else{
                setJobListContent({
                  ...jobListContent,
                  id: 0,
                  job_title: 'No Data Found',
                  posted_on:'',
                  company_name: '',
                  job_status:'' 
                });

                setContentForEmail({
                  ...contentForEmail,
                  id: 0,
                  job_title: 'No Data Found',
                  posted_on:'',
                  company_name: '',
                  job_status:'' ,
                  designation:'',
                  first_name:'',
                  last_name:'',
                  email_id:''
                })
              }                 
            }
            else if(changeRole==="changeRole"){
              var filterGettingJobId = res.data.data.job_list.filter(
                (v) => {
                  return v.id === jobIdProps;
                }
              );
              if(filterGettingJobId.length > 0){
                setJobListContent({
                  ...jobListContent,
                  id: filterGettingJobId[0].id,
                  job_title: filterGettingJobId[0].job_title,
                  posted_on: filterGettingJobId[0].posted_on,
                  company_name: filterGettingJobId[0].company_name,
                  job_status: filterGettingJobId[0].job_status
                });

                setContentForEmail({
                  ...contentForEmail,
                  id: filterGettingJobId[0].id,
                  job_title: filterGettingJobId[0].job_title,
                  posted_on: filterGettingJobId[0].posted_on,
                  company_name: filterGettingJobId[0].company_name,
                  job_status: filterGettingJobId[0].job_status,
                  designation:filterGettingJobId[0].designation,
                  first_name:filterGettingJobId[0].first_name,
                  last_name:filterGettingJobId[0].last_name,
                  email_id:filterGettingJobId[0].email_id
                })
              }else{
                setJobListContent({
                  ...jobListContent,
                  id: 0,
                  job_title: 'No Data Found',
                  posted_on:'',
                  company_name: '',
                  job_status:'' 
                });

                setContentForEmail({
                  ...contentForEmail,
                  id: 0,
                  job_title: 'No Data Found',
                  posted_on:'',
                  company_name: '',
                  job_status:'' ,
                  designation:'',
                  first_name:'',
                  last_name:'',
                  email_id:''
                })
              }
              
            }
            else{
              if(res.data.data.job_list.length > 0){
                setJobListContent({
                  ...jobListContent,
                  id: res.data.data.job_list[0].id,
                  job_title: res.data.data.job_list[0].job_title,
                  posted_on: res.data.data.job_list[0].posted_on,
                  company_name: res.data.data.job_list[0].company_name,
                  job_status: res.data.data.job_list[0].job_status
                });

                setContentForEmail({
                  ...contentForEmail,
                  id: res.data.data.job_list[0].id,
                  job_title: res.data.data.job_list[0].job_title,
                  posted_on: res.data.data.job_list[0].posted_on,
                  company_name: res.data.data.job_list[0].company_name,
                  job_status: res.data.data.job_list[0].job_status,
                  designation:res.data.data.job_list[0].designation,
                  first_name:res.data.data.job_list[0].first_name,
                  last_name:res.data.data.job_list[0].last_name,
                  email_id:res.data.data.job_list[0].email_id
                })
              }else{
                setJobListContent({
                  ...jobListContent,
                  id: 0,
                  job_title: 'No Data Found',
                  posted_on:'',
                  company_name: '',
                  job_status:'' 
                });

                setContentForEmail({
                  ...contentForEmail,
                  id: 0,
                  job_title: 'No Data Found',
                  posted_on:'',
                  company_name: '',
                  job_status:'' ,
                  designation:'',
                  first_name:'',
                  last_name:'',
                  email_id:''
                })
              }
            }

            setInitialGlow(false);
            setCategorySelectedGlow(false);
            setCandidatesList(res.data.data.candidates_short_desc);
            setCandidatesListDuplicate(res.data.data.candidates_short_desc);
            
            setJobId(res.data.data.job_id);
            setAppStatus(res.data.data.application_status);
            setRightSideContent(res.data.data);
            setJobRole(res.data.data.job_list);
            
            
            
            if (res.data.data.candidates_short_desc.length > 0) {
              setRole(res.data.data.candidates_short_desc[0].job_title);
            }

            if(res.data.data.professional_id!==""){
              setProfessionalId(res.data.data.professional_id);
            }else{
              setProfessionalId(0);
            }

            setKeepNotes(
              res.data.data.custom_notes === null
                ? ""
                : res.data.data.custom_notes
            );

            //skills data for filter
            res.data.data.filter_parameters.skill.map((v, i) => {
              return i >= 0
                ? setFilterSkills((prevState) => [
                    ...prevState,
                    {
                      value: i + 1,
                      label: v,
                    },
                  ])
                : null;
            });

            //Location data for filter
            res.data.data.filter_parameters.location.map((v, i) => {
              return i >= 0
                ? setFilterLocation((prevState) => [
                    ...prevState,
                    {
                      value: i + 1,
                      label: v,
                    },
                  ])
                : null;
            });
          } else {
            setCandidatesList(res.data.data.candidates_short_desc);
            setCandidatesListDuplicate(res.data.data.candidates_short_desc);
            selectedProfessionalDetails(jobId, professionalId, "recalling");
          }

        } else {
          toast.error(res.data.message);
          setSendingCandidate(false);
          setRightSideContent({});
          setCandidatesList([]);
          setCandidatesListDuplicate([]);
        }
      }else{
        setInitialGlow(false);
        setCategorySelectedGlow(false);
        setRightSideContent({});
        setCandidatesList([]);
        setCandidatesListDuplicate([]);
      }
      setSendingCandidate(false)
    } catch (err) {
      console.log(err);
    }
  };


  const selectedProfessionalDetails = async (job_id,professional_id,recall) => {
    if (recall === "recalling") {
      setCardSelectedGlow(false);
    } else {
      setCardSelectedGlow(true);
    }

    var obj = {
      job_id: job_id,
      professional_id: professional_id,
    };

    try {
      const res = await axiosInstance.post("/get_selected_professional_detail",obj)
      if (res.data.error_code === 0) {
        setCardSelectedGlow(false);
        setRightSideContent(res.data.data);
        setProfessionalId(res.data.data.professional_id);
        setJobId(res.data.data.job_id);
        setAppStatus(res.data.data.application_status);
        if (res.data.data.experience.length > 0) {
          setRole(res.data.data.experience[0].job_title);
        }
        setKeepNotes(
          res.data.data.custom_notes === null
            ? ""
            : res.data.data.custom_notes
        );
      }else{
        setCardSelectedGlow(false);
        setRightSideContent({});
      }
    } catch (err) {
      console.log(err);
    }
  };

 
  const handleCategoryStatus = async (jobStatus, recall, updateNotes) => {
    setJobStatus(jobStatus);

    if (jobStatus !== "All") {
      if (recall === "Applied" ||recall === "Not Reviewed" ||recall === "Shortlisted" ||recall === "Recommended" ) {
        setCategorySelectedGlow(false);
      } else {
        setCategorySelectedGlow(true);
      }

      var obj = {
        job_id: jobId,
        status: jobStatus,
      };

      try {
        const res = await axiosInstance.post("/filter_by_application_status",obj)
        if (res.data.error_code == 0) {
          setCategorySelectedGlow(false);
          if (res.data.data.job_id !== undefined) {

            setAppStatus(res.data.data.application_status);
            setCandidatesList(res.data.data.candidates_short_desc);
            setCandidatesListDuplicate(res.data.data.candidates_short_desc);

            if (recall === "Applied") {
              selectedProfessionalDetails(
                jobId,
                professionalId,
                "recalling"
              );
            } else if (recall === "Not Reviewed") {
              if (updateNotes === "updateNotes") {
                selectedProfessionalDetails(
                  jobId,
                  professionalId,
                  "recalling"
                );
              } else {
                setRightSideContent(res.data.data);
                setProfessionalId(res.data.data.professional_id);
                if (res.data.data.experience.length > 0) {
                  setRole(res.data.data.experience[0].job_title);
                }
              }
            } else if (recall === "Shortlisted") {
              if (updateNotes === "updateNotes") {
                selectedProfessionalDetails(
                  jobId,
                  professionalId,
                  "recalling"
                );
              } else {
                setRightSideContent(res.data.data);
                setProfessionalId(res.data.data.professional_id);
                if (res.data.data.experience.length > 0) {
                  setRole(res.data.data.experience[0].job_title);
                }
              }
            } else if (recall === "Recommended") {
              selectedProfessionalDetails(
                jobId,
                professionalId,
                "recalling"
              );
            } else {
              if (updateNotes === "updateNotes") {
                selectedProfessionalDetails(
                  jobId,
                  professionalId,
                  "recalling"
                );
              } else {
                setRightSideContent(res.data.data);
                setProfessionalId(res.data.data.professional_id);
                if (res.data.data.experience.length > 0) {
                  setRole(res.data.data.experience[0].job_title);
                }
              }
            }
          } else {
            setRightSideContent({});
            setCandidatesList([]);
            setCandidatesListDuplicate([]);
          }
        }else{
          setCategorySelectedGlow(false);
          setRightSideContent({});
          setCandidatesList([]);
          setCandidatesListDuplicate([]);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      getCandidateDatas(jobId, true);
    }
  };

  const handleMellieSearch = async (filterType) => {
    var sendSkills = mellieSearchSkills.map((v) => {
      return v.label;
    });

    var sendLocations = mellieSearchLocations.map((v) => {
      var split = v.label.split(",");
      var join = split.join("&&&&&");
      return join;
    });

    var obj = {
      job_id: jobId,
      skills: sendSkills,
      location: sendLocations,
    };

    if (filterType === "ApplyFilter") {
      if (sendSkills.length > 0 || sendLocations.length > 0) {
        setCategorySelectedGlow(true);
        try {
          const res = await axiosInstance.post("/filter_professionals",obj)
          setCategorySelectedGlow(false);
          if (res.data.error_code === 0) {
            if (res.data.data.professional_id !== undefined) {
              setCategorySelectedGlow(false);
              setCandidatesList(res.data.data.candidates_short_desc);
              setCandidatesListDuplicate(
                res.data.data.candidates_short_desc
              );
              setProfessionalId(res.data.data.professional_id);
              setJobId(res.data.data.job_id);
              setAppStatus(res.data.data.application_status);
              setRightSideContent(res.data.data);
              if (res.data.data.candidates_short_desc.length > 0) {
                setRole(res.data.data.candidates_short_desc[0].job_title);
              }
              setKeepNotes(
                res.data.data.custom_notes === null
                  ? ""
                  : res.data.data.custom_notes
              );
            } else {
              toast.error(res.data.message);
              setRightSideContent({});
              setCandidatesList([]);
              setCandidatesListDuplicate([]);
            }
          }else{
            setRightSideContent({});
            setCandidatesList([]);
            setCandidatesListDuplicate([]);
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        toast.error("nothing selected");
      }
    } else {
      getCandidateDatas(jobId, true);
      setJobStatus("All");
    }
  };

 
  //home page functions
  const displayStep = (stepNumber) => {

    if (stepNumber === 1) {
      setExistingTemplate(false);
      setCreateJobId({
        job_title: "",
        job_type: "",
        work_schedule: "",
        workplace_type: "",
        country: "",
        city: "",
        job_overview: "",
        specialisation: "",
        required_subcontract: "",
        skills: "",
        time_zone: null,
        job_desc: "",
        required_resume: "",
        required_cover_letter: "",
        required_background_check: "",
        time_commitment: "",
        duration: "",
        job_status: "",
        is_paid: "",
        is_active: "",
        question_list: [],
      });
      setShowFieldOne(true);
      setShowFieldTwo(false);
      setShowFieldThree(false);
      setShowFieldFour(false);
    } else if (stepNumber === 2) {
      setShowFieldOne(false);
      setShowFieldTwo(true);
      setShowFieldThree(false);
      setShowFieldFour(false);
    } else if (stepNumber === 3) {
      setShowFieldOne(false);
      setShowFieldTwo(false);
      setShowFieldThree(true);
      setShowFieldFour(false);
    } else if (stepNumber === 4) {
      setShowFieldOne(false);
      setShowFieldTwo(false);
      setShowFieldThree(false);
      setShowFieldFour(true);
    }

        setTimeout(()=>{
        if (stepNumber >= 1 && stepNumber <= 4) {
          document.querySelector(".step-" + currentStep).style.visibility =
            "hidden";
          document.querySelector(".step-" + stepNumber).style.visibility =
            "visible";
          currentStep = stepNumber;
          updateProgressBar();
        }
      },0)
  };

    updateProgressBar = function () {
      var progressPercentage = ((currentStep - 1) / 3) * 100;
      document.querySelector(".progress-bar").style.width =
        progressPercentage + "%";
    };

    document.addEventListener("DOMContentLoaded", function () {
      var multiStepForm = document.getElementById("multi-step-form");
      var steps = multiStepForm.querySelectorAll(".step");
      for (var i = 1; i < steps.length; i++) {
        steps[i].style.display = "none";
      }

      var nextButtons = document.querySelectorAll(".next-step");
      nextButtons.forEach(function (button) {

        button.addEventListener("click", function () {

          if (currentStep < 4) {
            document
              .querySelector(".step-" + currentStep)
              .classList.add("animate__animated", "animate__fadeOutLeft");
            currentStep++;
            setTimeout(function () {
              var steps = document.querySelectorAll(".step");
              steps.forEach(function (step) {
                step.classList.remove(
                  "animate__animated",
                  "animate__fadeOutLeft"
                );
                step.style.display = "none";
              });
              document.querySelector(".step-" + currentStep).style.display =
                "block";
              document
                .querySelector(".step-" + currentStep)
                .classList.add("animate__animated", "animate__fadeInRight");
              updateProgressBar();
            }, 500);
          }
        });
      });

      var prevButtons = document.querySelectorAll(".prev-step");
      prevButtons.forEach(function (button) {
        button.addEventListener("click", function () {
          if (currentStep > 1) {
            document
              .querySelector(".step-" + currentStep)
              .classList.add("animate__animated", "animate__fadeOutRight");
            currentStep--;
            setTimeout(function () {
              var steps = document.querySelectorAll(".step");
              steps.forEach(function (step) {
                step.classList.remove(
                  "animate__animated",
                  "animate__fadeOutRight"
                );
                step.style.display = "none";
              });
              document.querySelector(".step-" + currentStep).style.display =
                "block";
              document
                .querySelector(".step-" + currentStep)
                .classList.add("animate__animated", "animate__fadeInLeft");
              updateProgressBar();
            }, 500);
          }
        });
      });
    });


  // Get Job Api
  const handleGetJobApi = async (templateName) => {
    setPageOneLoading(false);

    //for getting previous job templates
    if(templateName === 'getPreviousJobTemplates'){
      var obj={
        job_status:''
      }
      try {
        // const response = await axiosInstance.post("/get_job_post",obj);

        const response = await axiosInstance.post("/get_job_post",obj);
        if (response.data.error_code === 0) {
          if (response.data.data.length > 0) {
            setGetJobApi(response.data.data);
          } else {
            setGetJobApi([]);
          }
          setPageOneLoading(true);
        }
      } catch (err) {
        console.log(err);
      }
    }

    //for getting draft templates
    else{
      var obj={
        job_status:'drafted'
      }
      try {
        const response = await axiosInstance.post("/get_job_post",obj);
        if (response.data.error_code === 0) {
          if (response.data.data.length > 0) {
            setGetJobApi(response.data.data);
          } else {
            setGetJobApi([]);
          }
          setPageOneLoading(true);
        }
      } catch (err) {
        console.log(err);
      }
    }
   
  };

  return (
    <employerContext.Provider
      value={{
        profile, setProfilePicture,
        openWidget,
        setOpenWidget,
        smallDevice,
        setSmallDevice,
        candidatesList,
        setCandidatesList,
        candidatesListDuplicate,
        setCandidatesListDuplicate,
        jobRole,
        setJobRole,
        keepNotes,
        setKeepNotes,
        rightSideContent,
        setRightSideContent,
        filterSkills,
        setFilterSkills,
        filterLocation,
        setFilterLocation,
        professionalId,
        setProfessionalId,
        jobId,
        setJobId,
        role,
        setRole,
        appStatus,
        setAppStatus,
        initialGlow,
        setInitialGlow,
        cardSelectedGlow,
        setCardSelectedGlow,
        categorySelectedGlow,
        setCategorySelectedGlow,
        jobStatus,
        setJobStatus,
        roleStatus,
        setRoleStatus,
        jobListContent,
        setJobListContent,
        getCandidateDatas,
        selectedProfessionalDetails,
        handleCategoryStatus,
        token,
        mellieSearchSkills,
        setMellieSearchSkills,
        mellieSearchLocations,
        setMellieSearchLocations,
        handleMellieSearch,
        sendingCandidate,
        setSendingCandidate,
        handleGetJobApi,
        pageOneLoading,
        setPageOneLoading,
        getJobApi,
        setGetJobApi,
        homeResponseReview,
        setHomeResponseReview,
        createJobId,
        setCreateJobId,
        existingTemplate,
        setExistingTemplate,
        pageTwoJobDetails,
        setPageTwoJobDetails,
        jobLocation,
        setJobLocation,
        pageThreeJobDetails,
        setPageThreeJobDetails,
        pageFourJobDetails,
        setPageFourJobDetails,
        showProgressBar,setShowProgressBar,
        showReview, setShowReview,
        showFieldOne, setShowFieldOne,
        showFieldTwo, setShowFieldTwo,
        showFieldThree, setShowFieldThree,
        showFieldFour, setShowFieldFour,
        displayStep,
        progressBarHide,
        setProgressBarHide,
        selctedTemplateCard,setSelectedTemplateCard,
        editingJobFromHome,setEditingJobFromHome,
        txtdurations,settxtDurations,
        showingJobLocation, setShowingJobLocation,
        editCompanyLocation, setEditCompanyLocation,
        postDraftTemplate,setPostDraftTemplate,
        contentForEmail, setContentForEmail
      }}
    >
      {children}
    </employerContext.Provider>
  );
};

export default employerContext;
