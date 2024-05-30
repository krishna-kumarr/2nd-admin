import React, { useContext, useEffect, useState } from "react";
import JobFilter from "../../../layouts/Home/JobFilter";
import JobCard from "../../../layouts/Home/JobCard";
import CommonContext from "../../../hooks/CommonContext";
import axios from "axios";
import HomePagination from "./HomePagination";
import toast from "react-hot-toast";
import Sorting from "../../../layouts/Home/Sorting";
import Image from "../../../utils/images";

const HomeAll = () => {
  const [filter, setFilter] = useState("");
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
  const {
    setSpecialisationData,
    setSectorData,
    setLocationData,
    setSkillData,
    setSelectedCardPath,
    RecordsPerPage,
    getHomeAll,
    setAnswer,
    selectedCardIndex,
    setSelectedCardIndex,
    cardArrayDuplicateSearch,
    setCardArrayDuplicateSearch,
    setapplyFilterResponse,
    applyFilterResponse,
    refreshId,
    refreshAction,
    setRefreshAction,
    setCardArray,
    setFilterArray,
    setSelectedCardData,
    gettingResponse,
    setGettingResponse,
    cardArrayDuplicate,
    setCardArrayDuplicate,
    setCurrentPage,
    sortBy, setSortBy,
    setApplyFilterCount,paginationpageCount
  } = useContext(CommonContext);

  const queryParams = new URLSearchParams(window.location.search);
  const jobID = queryParams.get("job_id");
  if (jobID !== null) {
    localStorage.setItem("job_id", jobID);
    var uri = window.location.toString();
    if (uri.indexOf("?") > 0) {
      var clean_uri = uri.substring(0, uri.indexOf("?"));
      window.history.replaceState({}, document.title, clean_uri);
    }
  }

  useEffect(() => {
    if (refreshAction === false) {
      setLocationData([]);
      setSectorData([]);
      setSpecialisationData([]);
      setSkillData([]);
      setGettingResponse(false);
      setapplyFilterResponse(false);
      setCardArray([]);
      setCardArrayDuplicate([]);
      setCardArrayDuplicateSearch([]);
      setSelectedCardData([]);
      setFilterArray({});
      setSelectedCardIndex(0);
      setSelectedCardPath(window.location.pathname);
      setCurrentPage(0);
    }

    getHomeAll();
  }, [refreshId]);

  return (
    <>
      <div className="col-lg-4 d-none d-xxl-block h-100 overflow-scroll pe-3" >
        <div className="card w-100 border-0 rounded-4">
          <div className="card-body">
            <JobFilter />
          </div>
        </div>
      </div>

      <div className="col-12 col-xxl-8 h-100 overflow-scroll" id="professinalHomeAllScroll">
        <div className="d-flex flex-wrap justify-content-between p-2 align-items-center">
          <div className="col-12 col-sm-6" >
            {gettingResponse === false ? (
              <label className=" w-100">
                <span className="placeholder w-75 rounded py-2 pt-3"></span>
              </label>
            ) : (
              <label className="filter-results">
                Showing : {cardArrayDuplicate.length} results
              </label>
            )}
          </div>
          <Sorting
            sortBy={sortBy}
            setSortBy={setSortBy}
            filter={filter}
            setFilter={setFilter}
          />
        </div>

        {/* job card skeleton  */}
        {gettingResponse === false || applyFilterResponse
          ? jobCards.map((value, index) => {
              return (
                <div className="card w-100 mt-2 rounded-4 border-0" key={index}>
                  <div className="card-body ">
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
                        <span className="placeholder rounded py-2 pt-3 w-100"></span>
                      </label>
                      <label className="fs-7 card-inner-details col-2">
                        <span className="placeholder rounded py-2 pt-3 w-100"></span>
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
          : cardArrayDuplicateSearch.length > 0
          ? cardArrayDuplicateSearch.map((value, index) => {
              return (
                <div className="card w-100 mt-2 rounded-4 border-0" key={index}>
                  <div className="card-body" id={`professionalAllJob${index}Card`}>
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
                    />
                  </div>
                </div>
              );
            })
          : null}

        {gettingResponse && cardArrayDuplicateSearch.length === 0 ? (
          <div className="row align-items-center justify-content-center noRecordsFound-image-height">
            <div className="text-center">
              <img src={Image.noRecordsFound} className="w-50 h-50" />
            </div>
          </div>
        ) : null}

      {
        paginationpageCount > 1 && cardArrayDuplicateSearch.length > 0 ?
          <div className="w-100 mt-3">
            <HomePagination/>
          </div>
          :
          null
      } 
      </div>
    </>
  );
};

export default HomeAll;
