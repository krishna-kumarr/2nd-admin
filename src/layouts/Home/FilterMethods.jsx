import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import InputGroup from "../../components/Input/InputGroup";
import { IoIosSearch } from "react-icons/io";
import CommonContext from "../../hooks/CommonContext";
import { IoChevronBackCircle } from "react-icons/io5";


const FilterMethods = () => {
  const { setSortBy,setCurrentPage,setRecall,setAnswer,setSelectedCardData,setRefreshAction,selectedCardPath,isSmallDevice,setIsSmallDevice, setSelectedCardIndex, setCardArrayDuplicate, setCardArrayDuplicateSearch, cardArray, gettingResponse, searchInput, setSearchInput } = useContext(CommonContext);
  const RecordsPerPage = 10;
  const pageRender = useNavigate();

  const handleSearchInput = (e) => {

    var searchIp = e.target.value;

    setSearchInput(searchIp)
    setCurrentPage(1)
    const firstIndex = RecordsPerPage * 0;
    const LastIndex = RecordsPerPage * 0 + RecordsPerPage;

    if (cardArray.length > 0) {
      setAnswer([])

      const searchJobs = cardArray.filter((v, i) => {
        return v.job_title.toLowerCase().includes(searchIp.toLowerCase()) || v.job_overview.toLowerCase().includes(searchIp.toLowerCase()) || v.country.toLowerCase().includes(searchIp.toLowerCase()) || v.city.toLowerCase().includes(searchIp.toLowerCase())
      })
      setCardArrayDuplicate(searchJobs)
      var jobCards = searchJobs.slice(firstIndex, LastIndex)
      setCardArrayDuplicateSearch(jobCards)
      if(jobCards.length>0){
        setSelectedCardData([jobCards[0]])
        
        if (window.location.pathname === "/professional/home/all_jobs" || window.location.pathname === "/professional/home/recommended_jobs" || window.location.pathname === "/professional/home/saved_jobs" || window.location.pathname==="/professional/home/job_Details"){      
          var findJobIndex = cardArray.findIndex((v) => {
            return v.id === jobCards[0].id
          })
          setSelectedCardIndex(findJobIndex)
        }
        
        if(jobCards[0].questions!==undefined){
          jobCards[0].questions.map((v) => {
            setAnswer((prevState) => [
              ...prevState,
              { question_id: v.id, answer: "" },
            ]);
          });
        }
      }else{
        setSelectedCardData([])
      }
    }

    if (searchIp === '') {
      setAnswer([])

      setCardArrayDuplicate(cardArray)
      var jobCards = cardArray.slice(firstIndex, LastIndex)
      setCardArrayDuplicateSearch(jobCards)
      if(jobCards.length>0){
        setSelectedCardData([jobCards[0]])

        if (window.location.pathname === "/professional/home/all_jobs" || window.location.pathname === "/professional/home/recommended_jobs" || window.location.pathname === "/professional/home/saved_jobs" || window.location.pathname==="/professional/home/job_Details"){      
          var findJobIndex = cardArray.findIndex((v) => {
            return v.id === jobCards[0].id
          })
          setSelectedCardIndex(findJobIndex)
        }

        if(jobCards[0].questions!==undefined){
          jobCards[0].questions.map((v) => {
            setAnswer((prevState) => [
              ...prevState,
              { question_id: v.id, answer: "" },
            ]);
          });
        }
      }else{
        setSelectedCardData([])
      }
    }

  }


  return (
    <div className="container-fluid dashboard-menus-container">
      {
        isSmallDevice ? <div className="backbutton-height d-flex align-items-end">
          <button className="btn btn-outline-secondary d-flex align-items-center gap-2 ms-1" onClick={()=>{
            pageRender(selectedCardPath)
            setIsSmallDevice(false)
            }}>
            <IoChevronBackCircle className="fs-5"/> Back
          </button>
        </div>
        
        :

          <div className="row px-0 px-sm-2 pt-4 ">
            <div className="col-lg-6 px-0">
              <ul className="nav justify-content-around bg-white m-1 rounded-3 select-category filter-side-butons">
                <li
                  className="nav-item navigation-link-active"
                  data-testid="All"
                >
                  {
                    gettingResponse === false ? <label className="py-1"><span className="placeholder rounded px-4 px-md-5 py-3"></span></label>
                      :
                      <NavLink to='/professional/home/all_jobs' className="nav-link px-1" onClick={() => {
                        setSearchInput("")
                        setSortBy("")
                        setSelectedCardIndex(0)
                        setRefreshAction(false)
                      }}>
                        All
                      </NavLink>
                  }
                </li>
                <li className="nav-item navigation-link-active" data-testid="Recommended">
                  {
                    gettingResponse === false ? <label className="py-1"><span className="placeholder rounded px-4 px-md-5 py-3"></span></label>
                      :
                      <NavLink to="/professional/home/recommended_jobs" className="nav-link px-1" onClick={() => {
                        setSearchInput("")
                        setSortBy("")
                        setSelectedCardIndex(0)
                        setRefreshAction(false)
                      }}>
                        Recommended
                      </NavLink>
                  }
                </li>
                <li className="nav-item navigation-link-active" data-testid="Applied">
                  {
                    gettingResponse === false ? <label className="py-1"><span className="placeholder rounded px-4 px-md-5 py-3"></span></label>
                      :
                      <NavLink to="/professional/home/applied_jobs" className="nav-link px-1" onClick={() => {
                        setSearchInput("")
                        setSortBy("")
                        setSelectedCardIndex(0)
                        setRefreshAction(false)
                      }}>
                        Applied
                      </NavLink>
                  }
                </li>
                <li className="nav-item navigation-link-active" data-testid="Saved">
                  {
                    gettingResponse === false ? <label className="py-1"><span className="placeholder rounded px-4 px-md-5 py-3"></span></label>
                      :
                      <NavLink to="/professional/home/saved_jobs" className="nav-link px-1" onClick={() => {
                        setSearchInput("")
                        setSortBy("")
                        setSelectedCardIndex(0)
                        setRefreshAction(false)
                        setRecall(false)
                      }}>
                        Saved
                      </NavLink>
                  }
                </li>
              </ul>
            </div>

            <div className="col-lg-6">
              {
                gettingResponse === false ? <label className="py-2 col-12 mt-1"><span className="placeholder rounded w-100 py-3"></span></label>
                  :
                  <div className="d-flex m-1 position-relative">
                    <InputGroup
                      className="home-search-icon fs-5"
                      reIcons={<IoIosSearch />}
                    />

                    <Input
                      type="text"
                      className="form-control form-control-lg searchInput border-0 px-5"
                      placeHolder="Search by job title, description, location"
                      ariaLabel="default input example"
                      testId="searchResult"
                      functionOnchange={handleSearchInput}
                    />

                  </div>
              }
            </div>
          </div>
      }
    </div>
  );
};

export default FilterMethods;
