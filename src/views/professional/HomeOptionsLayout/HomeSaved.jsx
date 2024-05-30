import React, { useContext, useEffect, useState } from "react";
import JobCard from "../../../layouts/Home/JobCard";
import CommonContext from "../../../hooks/CommonContext";
import axios from "axios";
import HomePagination from "./HomePagination";
import toast from "react-hot-toast";
import Image from "../../../utils/images";
import Sorting from "../../../layouts/Home/Sorting";
import axiosInstance from "../../../services/api/axiosInstance";

const HomeSaved = () => {
  const [filter, setFilter] = useState("");
  // pagination states
  const [firstIndexValue, SetFirstIndexValue] = useState(0);
  const RecordsPerPage = 10;
  //

  const {
    reCallId,
    setRecallID,
    reCall,
    setRecall,
    setAnswer,
    getSavedDatas,
    setSelectedCardPath,
    cardArrayDuplicateSearch,
    setCardArrayDuplicateSearch,
    setapplyFilterResponse,
    cardArrayDuplicate,
    setCardArrayDuplicate,
    cardArray,
    setCardArray,
    setSelectedCardData,
    gettingResponse,
    setGettingResponse,
    currentPage,
    setCurrentPage,
    selectedCardIndex,
    setSelectedCardIndex,setApplyFilterCount,
    sortBy, setSortBy,
    paginationpageCount
  } = useContext(CommonContext);
  const jobCards = [
    "dummy",
    "dummy",
    "dummy",
    "dummy",
    "dummy",
    "dummy",
    "dummy",
    "dummy",
    "dummy",
    "dummy",
    "dummy",
    "dummy",
  ];

  useEffect(() => {
    setApplyFilterCount(0)
    setAnswer([]);
    if (reCall === false) {
      setCardArray([]);
      setCardArrayDuplicate([]);
      setSelectedCardData([]);
      setGettingResponse(false);
      setapplyFilterResponse(false);
      setCardArrayDuplicateSearch([]);
      setSelectedCardIndex(0);
      setSelectedCardPath(window.location.pathname);
      setCurrentPage(0);
    }
 
    getSavedDatas();
  }, [reCallId]);

  const removeSavedJov = async (jobId) => {
    const removeJob = { job_id: jobId };
    const response = await axiosInstance.post("/unsave_job",removeJob)
    if (response.data.error_code === 0) { 
      setSelectedCardIndex(0);
      getSavedDatas();
    }    
  };

  return (
    <>
      <div className="col-12 h-100 overflow-scroll" id="professionalHomeSavedScroll">
        <div className="row justify-content-between p-2 align-items-center">
          <div className="col-12 col-sm-6">
            {gettingResponse === false ? (
              <label className="filter-results placeholder rounded py-3 w-50"></label>
            ) : (
              <label className="filter-results">
                Showing : {cardArrayDuplicate.length} saved results
              </label>
            )}
          </div>
          <Sorting
            sortBy={sortBy}
            setSortBy={setSortBy}
            filter={filter}
            setFilter={setFilter}
            setCurrentPage={setCurrentPage}
            RecordsPerPage={RecordsPerPage}
          />
        </div>

        {/* job card skeleton  */}
        {gettingResponse === false ? (
          jobCards.map((value, index) => {
            return (
              <div className="card w-100 mt-2 rounded-4 border-0" key={index}>
                <div className="card-body">
                  <div className="d-flex align-items-center my-2">
                    <div className="flex-shrink-0 placeholder rounded-circle pe-none">
                      <img
                        src={""}
                        width={52}
                        height={52}
                        className="opacity-0"
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <p className="job-card-posted-time placeholder col-5 rounded py-3"></p>
                      <h6 className="job-card-component-heading placeholder col-8 rounded py-2 pt-3"></h6>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between card-company-details-icon mt-4">
                    <label className="fs-7 card-inner-details col-3">
                      <span className="placeholder rounded py-2 pt-3 w-100"></span>
                    </label>
                    <label className="fs-7 card-inner-details col-2">
                      <span className="placeholder rounded py-2 pt-3 w-100">
                        {" "}
                      </span>
                    </label>
                    <label className="fs-7 card-inner-details col-2">
                      <span className="placeholder rounded py-2 pt-3 w-100">
                        {" "}
                      </span>
                    </label>
                    <label className="fs-7 card-inner-details col-2">
                      <span className="placeholder rounded py-2 pt-3 w-100"></span>
                    </label>
                  </div>
                  <p className="mt-4 job-card-description placeholder rounded skeleton-jobParagraph col-12">
                    {" "}
                  </p>
                </div>
              </div>
            );
          })
        ) : cardArrayDuplicateSearch.length > 0 ? (
          cardArrayDuplicateSearch.map((value, index) => {
            return (
              <div className="card w-100 mt-2 rounded-4 border-0" key={index}>
                <div className="card-body" id={`professionalSavedJob${index}Card`}>
                  <JobCard
                    cardHeading={value.job_title}
                    cardPostedOn={value.created_at}
                    cardWorkplace={value.workplace_type}
                    cardState={value.country}
                    cardSchedule={value.work_schedule}
                    cardJobType={value.job_type}
                    cardPayment={value.is_paid === "Y" ? "Paid" : "Volunteer"}
                    cardDes={value.job_overview}
                    cardId={value.id}
                    cardName="saved"                    
                    handleRemoveJob={removeSavedJov}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className="row align-items-center justify-content-center noRecordsFound-image-height">
            <div className="text-center">
              <img src={Image.noRecordsFound} className="w-50 h-50" />
            </div>
          </div>
        )}

      {
        paginationpageCount > 1 && cardArrayDuplicateSearch.length > 0?
          <div className="w-100 mt-3">
            <HomePagination />
          </div>
          :
          null
      } 
      </div>
    </>
  );
};

export default HomeSaved;
