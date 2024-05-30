import React, { useContext, useEffect, useState } from "react";
import InputGroup from "../../../components/Input/InputGroup";
import { IoIosSearch } from "react-icons/io";
import Input from "../../../components/Input/Input";
import axios from "axios";
import employerContext from "../../../hooks/employerContext";

const CandidateFilterMethods = ({jobRole,handleSearchInput,initialGlow,jobStatus,handleCategoryStatus,jobListContent,setJobListContent,setJobStatus}) => {
  
  const {roleStatus,setRoleStatus,handleOpenClosePause,getCandidateDatas}=useContext(employerContext)
  const jobCategries= ['All','Applied','Not Reviewed','Shortlisted','Rejected','Contacted','Hired','Recommended']
  const jobStatusArray=["Opened","Closed","Paused"]
  const jobStatusArrayUI=["Open","Closed","Paused"]


  const [updateFilter,setUpdateFilter]=useState(false)

  const handleRecallGetCandidates= (v) =>{
    setRoleStatus(v)
    getCandidateDatas(0, "filterchangeRole", undefined, v)
  }


  return (
    <>
      {initialGlow ?
        <div className="row gy-2">
          <div className="col-12 col-md-6 col-lg-3">
            <div className="placeholder w-100 pt-4 pb-3 rounded-3"></div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div className="placeholder w-100 pt-4 pb-3 rounded-3"></div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div className="placeholder w-100 pt-4 pb-3 rounded-3"></div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div className="placeholder w-100 pt-4 pb-3 rounded-3"></div>
          </div>
        </div> 
        :
        <div className="row gy-2">

          <div className="col-12 col-md-6 col-lg-3">
            <div className="dropdown employer-custom-dropdown">
              <button
                className="btn dropdown-toggle w-100 filter-section d-flex flex-wrap align-items-center choose-dropdown"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="fw-bold">Status</span>
                  <span className="text-secondary ps-3">
                    {roleStatus === "Opened" ? "Open" : roleStatus}
                  </span>
              </button>

              <ul className="dropdown-menu w-100 border-0 shadow">
                {
                  jobStatusArray.map((v,i)=>{
                    return <li key={i}>
                              <a className="dropdown-item dropdown-jobSort" onClick={()=>{
                                handleRecallGetCandidates(v)
                                }}>{jobStatusArrayUI[i]}</a>
                            </li>
                  })
                }
              </ul>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <div className="dropdown employer-custom-dropdown w-100">
              <button
                className="btn dropdown-toggle filter-section px-4  w-100 d-inline-flex align-items-center choose-dropdown"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="fw-bold">Role</span>
                  <span className="text-secondary ps-3 candidateRole-span">
                    {jobListContent.job_title}
                    <span className="employer-jobList-date ps-2">
                      {jobListContent.posted_on}
                    </span>
                  </span>
              </button>
              <ul className="dropdown-menu w-100 border-0 shadow">
                {
                  jobRole.length >0 ? 
                    jobRole.map((v,i)=>{
                      return <li key={i}>
                        <a className="dropdown-item dropdown-jobList px-3" onClick={()=>{setJobStatus("All")
                          getCandidateDatas(v.id,true)
                          setJobListContent(v)}}> 
                          <span className="text-wrap">{v.job_title}</span>
                          <span className="employer-jobList-date ps-2">({v.posted_on})</span></a>
                      </li>
                    })
                  :
                    <li>
                      <a className="dropdown-item dropdown-jobList">No Data Found</a>
                    </li>
                }
              </ul>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <div className="dropdown employer-custom-dropdown">
              <button
                className="btn dropdown-toggle w-100 filter-section d-flex flex-wrap align-items-center choose-dropdown"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="fw-bold">Category</span>
                  <span className="text-secondary ps-3">
                    {jobStatus}
                  </span>
              </button>

              <ul className="dropdown-menu w-100 border-0 shadow">
                {
                  jobCategries.map((v,i)=>{
                    return <li key={i}>
                              <a className="dropdown-item dropdown-jobSort" onClick={()=>{handleCategoryStatus(v)}}>{v}</a>
                            </li>
                  })
                }
              </ul>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <div className="d-flex position-relative">
              <InputGroup
                className="home-search-icon fs-5"
                reIcons={<IoIosSearch />}
              />

              <Input
                type="text"
                className="form-control form-control-lg searchInput candidate-searchInput border-0 px-5 py-0 searchInput-border"
                placeHolder="Search by name"
                ariaLabel="default input example"
                testId="searchResult"
                functionOnchange={handleSearchInput}
              />
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default CandidateFilterMethods;
