import React, { useContext, useEffect, useState } from "react";
import JobCard from "../../../layouts/Home/JobCard";
import CommonContext from "../../../hooks/CommonContext";
import axios from "axios";
import Image from "../../../utils/images";
import HomePagination from "./HomePagination";
import toast from "react-hot-toast";
import Sorting from "../../../layouts/Home/Sorting";
import axiosInstance from "../../../services/api/axiosInstance";

const HomeApplied = () => {
  const [filter, setFilter] = useState("");

  const {
    cardArrayDuplicateSearch,
    setCardArrayDuplicateSearch,
    cardArrayDuplicate,
    setCardArrayDuplicate,
    cardArray,
    setCardArray,
    setSelectedCardData,
    gettingResponse,
    setGettingResponse,
    setRefreshAction,
    refreshId,
    refreshAction,
    applyFilterResponse,
    setapplyFilterResponse,
    setSelectedCardLink,
    selectedcardlinkglobal,
    setAnswer,getAppliedDatas,
    setCurrentPage,setApplyFilterCount,
    paginationpageCount,
    sortBy, setSortBy
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
    "dummy"
  ];


  useEffect(() => {
    setApplyFilterCount(0)
    if (refreshAction === false) {
      setapplyFilterResponse(false)
      setGettingResponse(false);
      setCardArray([]);
      setCardArrayDuplicate([]);
      setSelectedCardData([]);
      setCardArrayDuplicateSearch([]);
      setCurrentPage(0);
    }

    getAppliedDatas();
  }, [refreshId]);




  return (
    <div className="col-12 h-100 overflow-scroll p-0" id="professionalHomeAppliedScroll">
      <div className="row justify-content-between p-2 align-items-center">
        <div className="col-12 col-sm-6">
          {gettingResponse === false || applyFilterResponse ? (
            <label className="filter-results placeholder rounded py-3 w-50"></label>
          ) : (
            <label className="filter-results">
              Showing : {cardArrayDuplicate.length} Applied results
            </label>
          )}
        </div>
        <Sorting sortBy={sortBy} setSortBy={setSortBy} filter={filter} setFilter={setFilter} />
      </div>

      {/* job card skeleton  */}
      {gettingResponse === false || applyFilterResponse ? (
        jobCards.map((value, index) => {
          return (
            <div className="card w-100 mt-2 rounded-4 border-0" key={index}>
              <div className="card-body">
                <div className="d-flex align-items-center my-2">
                  <div className="flex-shrink-0 placeholder rounded-circle pe-none">
                    <img src={''} width={52} height={52} className='opacity-0' />
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
                    <span className="placeholder rounded py-2 pt-3 w-100"></span>
                  </label>
                  <label className="fs-7 card-inner-details col-2">
                    <span className="placeholder rounded py-2 pt-3 w-100"></span>
                  </label>
                  <label className="fs-7 card-inner-details col-2">
                    <span className="placeholder rounded py-2 pt-3 w-100">
                      {" "}
                    </span>
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
              <div className="card-body position-relative pt-4" id={`professionalAppliedJob${index}Card`}>
                <JobCard
                  cardHeading={value.job_title}
                  cardPostedOn={value.created_at}
                  cardWorkplace={value.workplace_type}
                  cardState={value.country}
                  cardSchedule={value.work_schedule}
                  cardJobType={value.job_type}
                  cardPayment={value.is_paid === "Y" ? "Paid" : "Volunteer"}
                  applicationStatus={value.application_status}
                  cardType="applied"
                  cardId={value.id}
                  cardDes={value.job_overview}
                />
              </div>
            </div>
          );
        })
      ) : (
        <div className="row align-items-center justify-content-center noRecordsFound-image-height">
          <div className='text-center'>
            <img src={Image.noRecordsFound} className='w-50 h-50' />
          </div>
        </div>
      )}



      {
        paginationpageCount > 1 && cardArrayDuplicateSearch.length > 0  ?
          <div className="w-100 mt-3">
            <HomePagination />
          </div>
          :
          null
      } 
    </div>
  );
};

export default HomeApplied;
