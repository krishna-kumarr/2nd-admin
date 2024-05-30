import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/api/axiosInstance";

const CommonContext = createContext();

export const DataProvider = ({ children }) => {
  // home page states
  const RecordsPerPage = 10;
  const pageRender = useNavigate();
  const selectedcardlinkglobal=`${process.env.REACT_APP_SHARE_BASEURL}/professional/home/all_jobs?job_id=`
  const [currentPage, setCurrentPage] = useState(1);
  const [profilePicture, setProfilePicture] = useState(`${process.env.REACT_APP_SECOND_CAREERS_CDN}professional/profile-pic/default_profile_picture.png`);
  const [sortBy, setSortBy] = useState("");
  const [disableProfilePictureDelete, setDisableProfilePictureDelete] =useState(false);
  const [isProfilePictureUploaded, setIsProfilePictureUploaded] =useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [gettingResponse, setGettingResponse] = useState(false);
  const [FilterArray, setFilterArray] = useState({});
  const [cardArray, setCardArray] = useState([]);
  const [cardArrayDuplicate, setCardArrayDuplicate] = useState([]);
  const [cardArrayDuplicateSearch, setCardArrayDuplicateSearch] = useState([]);
  const [selectedCardData, setSelectedCardData] = useState([]);
  const [answers, setAnswer] = useState([]);
  const [selectedSkeleton, setSelectedSkeleton] = useState(false);
  const [refreshId, setRefreshId] = useState(0);
  const [refreshAction, setRefreshAction] = useState(false);
  const [applyFilterResponse, setapplyFilterResponse] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isSmallDevice, setIsSmallDevice] = useState(false);
  const [jobcardId, setJobcardId] = useState(0);
  const [selectedCardPath, setSelectedCardPath] = useState("");
  const [selectedCarrdLink, setSelectedCardLink] = useState("");
  const [reCall, setRecall] = useState(false);
  const [skillData, setSkillData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [sectorData, setSectorData] = useState([]);
  const [specialisationData, setSpecialisationData] = useState([]);
  const [reCallId, setRecallID] = useState(0);
  const [filterRefreshId, setFilterRefreshId] = useState(0);
  const [recommendedRefreshId, setRecommendedRefreshId] = useState(0);
  const [applyFilterCount, setApplyFilterCount] = useState(0);
  const [paginationpageCount, setPaginationpageCount] = useState(0);
  const [filteringObject, setFilteringObject] = useState({});
  const [saveJobLoading,setSaveJobLoading] = useState(false);
  const [applyJobLoading,setApplyJobLoading] = useState(false);
  const [editLocation, setEditLocation] = useState({
    city: "",
    country: "",
  });

  const getHomeAll = async (pagination,currentPageProps) => {
    setAnswer([]);
      if(pagination===undefined){
        var obj={
          page_number:1
        }
      }else{
        setapplyFilterResponse(true)
        var obj={
          page_number:currentPageProps
        }
      }

      const response = await axiosInstance.post("/professional_dashboard",obj)

          setRefreshAction(false);
          if (response.data.error_code === 0) {
            if(response.data.data.total_count>=10){
              var homeallPaginationCount=Math.ceil((response.data.data.total_count / 10))
              setPaginationpageCount(homeallPaginationCount)
            }else{
              setPaginationpageCount(1)
            }
           
            if(pagination===undefined){

              setFilterArray(response.data.data);
              
              //skill data
              response.data.data.skill.map((v, i) => {
                setSkillData((prevState) => [
                  ...prevState,
                  {
                    value: i + 1,
                    label: v,
                  },
                ]);
              });

              //location Data
              response.data.data.location.map((v, i) => {
                setLocationData((prevState) => [
                  ...prevState,
                  {
                    value: i + 1,
                    label: v,
                  },
                ]);
              });

              //location Data
              response.data.data.sector.map((v, i) => {
                setSectorData((prevState) => [
                  ...prevState,
                  {
                    value: i + 1,
                    label: v,
                  },
                ]);
              });

              //location Data
              response.data.data.specialisation.map((v, i) => {
                setSpecialisationData((prevState) => [
                  ...prevState,
                  {
                    value: i + 1,
                    label: v,
                  },
                ]);
              });
            }

            if (response.data.data.job_details.length > 0) {
              setSelectedCardLink(
                `${selectedcardlinkglobal}${btoa(
                  response.data.data.job_details[0].id
                )}`
              );

              //checking device resolution
              if (isSmallDevice) {
                var filterNotAppliedJobs = response.data.data.job_details.filter(
                  (v) => {
                    return v.id === jobcardId;
                  }
                );
                setSelectedCardData(filterNotAppliedJobs);
              } else {
              
                if (response.data.data.job_details.length > 0) {
                  setCardArray(response.data.data.job_details);

                  //checking local storage null or not
                  var getLocalStorageId = localStorage.getItem("job_id");
                  if (getLocalStorageId !== null) {
                    var filterLocalStorageId = response.data.data.job_details.filter(
                      (v) => {
                        return v.id == atob(getLocalStorageId);
                      }
                    );
                    setSelectedCardData(filterLocalStorageId);
                    setCardArrayDuplicate(response.data.data.job_details);
                    setCardArrayDuplicateSearch(response.data.data.job_details);
                    localStorage.removeItem("job_id");
                  } else {
                    //checking searching input has any values
                    if (searchInput === "") {
                      setCardArrayDuplicate(response.data.data.job_details);
                      
                      setCardArrayDuplicateSearch(response.data.data.job_details);
 
                        setSelectedCardData([response.data.data.job_details[0]]);
                        response.data.data.job_details[0].questions.map((v) => {
                          setAnswer((prevState) => [
                            ...prevState,
                            { question_id: v.id, answer: "" },
                          ]);
                        }); 
                    } else {
                      const searchJobs = response.data.data.job_details.filter((v, i) => {
                        return (
                          v.job_title
                            .toLowerCase()
                            .match(searchInput.toLowerCase()) ||
                          v.job_overview
                            .toLowerCase()
                            .match(searchInput.toLowerCase()) ||
                          v.country
                            .toLowerCase()
                            .match(searchInput.toLowerCase()) ||
                          v.city.toLowerCase().match(searchInput.toLowerCase())
                        );
                      });
                      if (searchJobs.length > 0) {
                        setCardArrayDuplicate(searchJobs);
                         
                        setCardArrayDuplicateSearch(searchJobs);

                          setSelectedCardData([searchJobs[0]]);
                          searchJobs[0].questions.map((v) => {
                            setAnswer((prevState) => [
                              ...prevState,
                              { question_id: v.id, answer: "" },
                            ]);
                          }); 
                      } else {
                        setCardArrayDuplicateSearch([]);
                        setSelectedCardData([]);
                      }
                    }
                  }
                } else {
                  setCardArray([]);
                  setAnswer([]);
                  setSelectedCardData([]);
                  setCardArrayDuplicate([]);
                  setCardArrayDuplicateSearch([]);
                  setGettingResponse(true);
                  setSelectedCardIndex(0);
                }
              }
              setapplyFilterResponse(false)
              setGettingResponse(true);
              setSelectedCardIndex(0);
            } else {
              setCardArray([]);
              setAnswer([]);
              setSelectedCardData([]);
              setCardArrayDuplicate([]);
              setCardArrayDuplicateSearch([]);
              setGettingResponse(true);
              setSelectedCardIndex(0);
            }
          } else {
            setSelectedCardIndex(0);
            toast.error(response.data.message);
          }
  };

  const getRecommendedData = async () => {
    const response = await axiosInstance.get("/professional_recommended")
    setRefreshAction(false);
    if (response.data.error_code === 0) {
      if (response.data.data.job_details!==undefined) {
        if(response.data.data.job_details.length > 0){

          setSelectedCardLink(
            `${selectedcardlinkglobal}${btoa(
              response.data.data.job_details[0].id
            )}`
          );

          if (isSmallDevice) {
            var filterNotAppliedJobs = response.data.data.job_details.filter(
              (v) => {
                return v.id === jobcardId;
              }
            );
            setSelectedCardData(filterNotAppliedJobs);
            setCardArray(response.data.data.job_details);
            setCardArrayDuplicate(response.data.data.job_details);
            setCardArrayDuplicateSearch(response.data.data.job_details);
          } else {
            var filterNotAppliedJobs = response.data.data.job_details.filter(
              (v) => {
                return v.applied_status === "not_applied";
              }
            );

            if (filterNotAppliedJobs.length > 0) {
              setCardArray(filterNotAppliedJobs);

              if (searchInput === "") {
                setCardArrayDuplicate(filterNotAppliedJobs);
                setCardArrayDuplicateSearch(filterNotAppliedJobs);

                // var refreshidd = refreshId - 10;
                // var findJob = filterNotAppliedJobs.filter((v) => {
                //   return v.id === refreshidd;
                // });

                // if (findJob.length > 0) {
                //   setSelectedCardData([
                //     filterNotAppliedJobs[selectedCardIndex],
                //   ]);

                //   filterNotAppliedJobs[selectedCardIndex].questions.map(
                //     (v) => {
                //       setAnswer((prevState) => [
                //         ...prevState,
                //         { question_id: v.id, answer: "" },
                //       ]);
                //     }
                //   );
                // } else {
                  setSelectedCardData([filterNotAppliedJobs[0]]);
                  filterNotAppliedJobs[0].questions.map((v) => {
                    setAnswer((prevState) => [
                      ...prevState,
                      { question_id: v.id, answer: "" },
                    ]);
                  });
                // }
              } else {
                const searchJobs = filterNotAppliedJobs.filter((v, i) => {
                  return (
                    v.job_title
                      .toLowerCase()
                      .match(searchInput.toLowerCase()) ||
                    v.job_overview
                      .toLowerCase()
                      .match(searchInput.toLowerCase()) ||
                    v.country
                      .toLowerCase()
                      .match(searchInput.toLowerCase()) ||
                    v.city.toLowerCase().match(searchInput.toLowerCase())
                  );
                });
                setCardArrayDuplicate(searchJobs);
                if (searchJobs.length > 0) {
                  setCardArrayDuplicateSearch(searchJobs);

                  // var refreshidd = refreshId - 10;

                  // var filterFindJob = filterNotAppliedJobs.filter((v) => {
                  //   return v.id === refreshidd;
                  // });
                  // console.log(
                  //   filterNotAppliedJobs[selectedCardIndex],
                  //   filterFindJob,
                  //   refreshId
                  // );
                  // if (filterFindJob.length > 0) {
                  //   setSelectedCardData([
                  //     filterNotAppliedJobs[selectedCardIndex],
                  //   ]);
                  //   filterNotAppliedJobs[selectedCardIndex].questions.map(
                  //     (v) => {
                  //       setAnswer((prevState) => [
                  //         ...prevState,
                  //         { question_id: v.id, answer: "" },
                  //       ]);
                  //     }
                  //   );
                  // } else {
                    setSelectedCardData([filterNotAppliedJobs[0]]);
                    filterNotAppliedJobs[0].questions.map((v) => {
                      setAnswer((prevState) => [
                        ...prevState,
                        { question_id: v.id, answer: "" },
                      ]);
                    });
                  // }
                } else {
                  setCardArrayDuplicateSearch([]);
                  setSelectedCardData([]);
                }
              }
            } else {
              setCardArray([]);
              setAnswer([]);
              setSelectedCardData([]);
              setCardArrayDuplicate([]);
              setCardArrayDuplicateSearch([]);
              setGettingResponse(true);
            }
          }
          setGettingResponse(true);
        }else {
          setCardArray([]);
          setAnswer([]);
          setSelectedCardData([]);
          setCardArrayDuplicate([]);
          setCardArrayDuplicateSearch([]);
          setGettingResponse(true);
        }             
      } else {
        setCardArray([]);
        setAnswer([]);
        setSelectedCardData([]);
        setCardArrayDuplicate([]);
        setCardArrayDuplicateSearch([]);
        setGettingResponse(true);
      }
      setSelectedCardIndex(0);
    } else {
      toast.error(response.data.message);
      setSelectedCardIndex(0);
      setCardArray([]);
      setAnswer([]);
      setSelectedCardData([]);
      setCardArrayDuplicate([]);
      setCardArrayDuplicateSearch([]);
      setGettingResponse(true);
    }    
  };

  const getAppliedDatas = async (pagination,currentPageProps) => {
    if(pagination===undefined){
      var obj={
        page_number:1
      }
    }else{
      var obj={
        page_number:currentPageProps
      }
      setapplyFilterResponse(true)
    }
    const response = await axiosInstance.post("/professional_applied_jobs",obj)
    setRefreshAction(false)
    setAnswer([])
    if (response.data.error_code === 0) {
      if (response.data.data.job_details.length > 0) {
        setSelectedCardLink(`${selectedcardlinkglobal}${btoa(response.data.data.job_details[0].id)}`)
        setCardArray(response.data.data.job_details)
        setCardArrayDuplicate(response.data.data.job_details)
        setSelectedCardData([response.data.data.job_details[0]])

        var appliedPaginationCount=Math.ceil((response.data.data.job_details[0].total_count/10))
        setPaginationpageCount(appliedPaginationCount)

        setCardArrayDuplicateSearch(response.data.data.job_details)

        setGettingResponse(true)
      }
      else {
        setCardArray([])
        setCardArrayDuplicate([])
        setSelectedCardData([])
        setCardArrayDuplicateSearch([])
        setGettingResponse(true);
      }
      setapplyFilterResponse(false)
    } else {
      toast.error(response.data.message)
      setapplyFilterResponse(false)
    }
  };


  const getSavedDatas = async (pagination,currentPageProps) => {
    if(pagination===undefined){
      var obj={
        page_number:1
      }
    }else{
      setapplyFilterResponse(true)
      var obj={
        page_number:currentPageProps
      }
    }
    const response = await axiosInstance.post("/professional_saved_jobs",obj)
    
    if (response.data.error_code === 0) {
      if (response.data.data.length > 0) {

        if(response.data.data[0].total_count > 10) {
          var savedPaginationCount=Math.ceil((response.data.data[0].total_count / 10))
          setPaginationpageCount(savedPaginationCount)
        }else{
          setPaginationpageCount(1)
        }
        

        if (isSmallDevice) {
          var applysavedJob = response.data.data.filter((v) => {
            return v.id === reCallId;
          });
          setSelectedCardData(applysavedJob);
        } else { 
          setCardArrayDuplicateSearch(response.data.data);

          if (reCall === false) {
            setCardArray(response.data.data);
            setCardArrayDuplicate(response.data.data);
            setSelectedCardData([response.data.data[0]]);
            response.data.data[0].questions.map((v) => {
              setAnswer((prevState) => [
                ...prevState,
                { question_id: v.id, answer: "" },
              ]);
            });
            
          } else {
            setCardArray(response.data.data);
            setCardArrayDuplicate(response.data.data);
            if (searchInput === "") {
              setCardArrayDuplicateSearch(response.data.data);

              var applysavedJob = response.data.data.filter((v) => {
                return v.id === reCallId;
              });
              setSelectedCardData(applysavedJob);
            } else {
              const searchJobs = response.data.data.filter((v, i) => {
                return (
                  v.job_title
                    .toLowerCase()
                    .match(searchInput.toLowerCase()) ||
                  v.job_overview
                    .toLowerCase()
                    .match(searchInput.toLowerCase()) ||
                  v.country
                    .toLowerCase()
                    .match(searchInput.toLowerCase()) ||
                  v.city.toLowerCase().match(searchInput.toLowerCase())
                );
              });
              setCardArrayDuplicate(searchJobs);

              if (searchJobs.length > 0) {
                setCardArrayDuplicateSearch(response.data.data);

                var applysavedJob = response.data.data.filter((v) => {
                  return v.id === reCallId;
                });
                setSelectedCardData(applysavedJob);
              } else {
                setCurrentPage(1);
                setCardArrayDuplicateSearch([]);
                setSelectedCardData([]);
              }
            }
          }

          setSelectedCardLink(
            `${selectedcardlinkglobal}${btoa(
              response.data.data[0].id
            )}`
          );
          setGettingResponse(true);
          setRecall(false);
        }
      } else {
        setCardArray([]);
        setCardArrayDuplicate([]);
        setCardArrayDuplicateSearch([]);
        setAnswer([]);
        setCurrentPage(1);
        setPaginationpageCount(1)
        setGettingResponse(true);
      }
      setapplyFilterResponse(false)
    } else {
      setapplyFilterResponse(false)
      toast.error(response.data.message);
    }
  };

  const handleApplyFilter = async ({ object }) => {
    var submitData = { ...object };
    if (object.location.length > 0) {
      var splitAndAddLocation = object.location.map((v) => {
        var splitLoc = v.split(",");
        var joinLoc = splitLoc.join("&&&&&");

        return joinLoc;
      });
      submitData.location = splitAndAddLocation;
    }


    const response = await axiosInstance.post("/fetch_filter_results",submitData)
    setGettingResponse(true);
    setapplyFilterResponse(false);
    if (response.data.error_code === 0) {
      if (response.data.data.job_details.length > 0) {
        var applyFilterPaginationCount=Math.ceil((response.data.data.total_count / 10))
        setPaginationpageCount(applyFilterPaginationCount)

        setCardArray(response.data.data.job_details);
        setCardArrayDuplicate(response.data.data.job_details);

        if (response.data.data.job_details.length > 0) {
          if (searchInput === "") {
            
            setCardArrayDuplicateSearch(response.data.data.job_details);

            
              setSelectedCardData([response.data.data.job_details[0]]);
              response.data.data.job_details[0].questions.map((v) => {
                setAnswer((prevState) => [
                  ...prevState,
                  { question_id: v.id, answer: "" },
                ]);
              }); 
          } else {
            const searchJobs = response.data.data.job_details.filter((v, i) => {
              return (
                v.job_title
                  .toLowerCase()
                  .match(searchInput.toLowerCase()) ||
                v.job_overview
                  .toLowerCase()
                  .match(searchInput.toLowerCase()) ||
                v.country
                  .toLowerCase()
                  .match(searchInput.toLowerCase()) ||
                v.city.toLowerCase().match(searchInput.toLowerCase())
              );
            });


            if (searchJobs.length > 0) {
              setCardArrayDuplicate(searchJobs);
                
              setCardArrayDuplicateSearch(response.data.data.job_details);
              setSelectedCardData([response.data.data.job_details[0]]);
              response.data.data.job_details[0].questions.map((v) => {
                setAnswer((prevState) => [
                  ...prevState,
                  { question_id: v.id, answer: "" },
                ]);
              }); 
            } else {
              setCardArrayDuplicateSearch([]);
              setSelectedCardData([]);
            }
          }
        } else {
          setCardArray([]);
          setCardArrayDuplicate([]);
          setSelectedCardData([]);
          setCardArrayDuplicateSearch([]);
        }
      } else {
        setCardArray([]);
        setCardArrayDuplicate([]);
        setSelectedCardData([]);
        setCardArrayDuplicateSearch([]);
      }
    } else {
      toast.error(response.data.message);
    } 
  };


  const handleSelectedCardData = async (cardId,isJobSaving) => {
    if (window.location.pathname === "/professional/home/all_jobs" || window.location.pathname === "/professional/home/recommended_jobs" || window.location.pathname === "/professional/home/saved_jobs" || window.location.pathname==="/professional/home/applied_jobs"){      
      setSelectedCardPath(window.location.pathname)
    }
    setAnswer([])

    //if i save job the isJobSaving="job-saving" otherwise it will be isJobSaving=undefined
    if(isJobSaving===undefined){
      setSelectedSkeleton(true)
      setSelectedCardData([])
    }
    

    setSelectedCardLink(`${selectedcardlinkglobal}${btoa(cardId)}`)

    if(window.innerWidth<=992){
      setIsSmallDevice(true)
      pageRender("/professional/home/job_Details")
    }else{
      setIsSmallDevice(false)
    }

    const token = localStorage.getItem("Token")
    let jobId = { job_id: cardId }
    const response = await axiosInstance.post("/selected_job_details",jobId)

    if (response.data.error_code === 0) {
      setSelectedCardData(response.data.data)
      setSelectedSkeleton(false)
      setJobcardId(cardId)
      response.data.data[0].questions.map((v) => {
        setAnswer((prevState) => [
          ...prevState,
          { question_id: v.id, answer: "" },
        ]);
      });
    }
    else {        
      setSelectedCardData([])    
      setSelectedSkeleton(false)
      toast.error(response.data.message)
    }
    setSaveJobLoading(false)
  }


  return (
    <CommonContext.Provider
      value={{
        cardArray,setCardArray,
        FilterArray,setFilterArray,
        selectedCardData,setSelectedCardData,
        gettingResponse,setGettingResponse,
        cardArrayDuplicate,setCardArrayDuplicate,
        sortBy, setSortBy,
        selectedSkeleton,setSelectedSkeleton,
        answers,setAnswer,
        refreshId,setRefreshId,
        refreshAction,setRefreshAction,
        applyFilterResponse,setapplyFilterResponse,
        cardArrayDuplicateSearch,setCardArrayDuplicateSearch,
        selectedCardIndex,setSelectedCardIndex,
        searchInput,setSearchInput,
        isSmallDevice,setIsSmallDevice,
        getHomeAll,getAppliedDatas,
        RecordsPerPage,
        jobcardId,setJobcardId,
        selectedCardPath,setSelectedCardPath,
        getRecommendedData,
        profilePicture,setProfilePicture,
        selectedcardlinkglobal,
        selectedCarrdLink,setSelectedCardLink,
        getSavedDatas,
        handleSelectedCardData,
        reCall,setRecall,
        skillData,setSkillData,
        locationData,setLocationData,
        sectorData,setSectorData,
        specialisationData,setSpecialisationData,
        disableProfilePictureDelete,setDisableProfilePictureDelete,
        currentPage,setCurrentPage,
        reCallId,setRecallID,
        isProfilePictureUploaded,setIsProfilePictureUploaded,
        editLocation,setEditLocation,
        applyFilterCount,setApplyFilterCount,
        handleApplyFilter,
        filteringObject,setFilteringObject,
        filterRefreshId,setFilterRefreshId,
        recommendedRefreshId,setRecommendedRefreshId,
        saveJobLoading,setSaveJobLoading,
        applyJobLoading,setApplyJobLoading,
        paginationpageCount, setPaginationpageCount
      }}
    >
      {children}
    </CommonContext.Provider>
  );
};

export default CommonContext;
