import React, { useContext, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FiFilter } from "react-icons/fi";
import CandidateFilterWidget from "./employerComponents/CandidateFilterWidget";
import CandidateFilterMethods from "./employerComponents/CandidateFilterMethods";
import CandidateLeftContent from "./employerComponents/CandidateLeftContent";
import CandidateRightContent from "./employerComponents/CandidateRightContent";
import employerContext from "../../hooks/employerContext";
import { BsFillArrowUpCircleFill } from "react-icons/bs";


const EmployerCandidates = () => {

  const {
    openWidget, setOpenWidget,
    smallDevice, setSmallDevice,
    candidatesList, setCandidatesList,
    candidatesListDuplicate, setCandidatesListDuplicate,
    jobRole, setJobRole,
    keepNotes, setKeepNotes,
    rightSideContent, setRightSideContent,
    filterSkills, setFilterSkills,
    filterLocation, setFilterLocation,
    professionalId, setProfessionalId,
    jobId, setJobId,
    role, setRole,
    appStatus, setAppStatus,
    initialGlow, setInitialGlow,
    cardSelectedGlow, setCardSelectedGlow,
    categorySelectedGlow, setCategorySelectedGlow,
    jobStatus, setJobStatus,
    jobListContent, setJobListContent,
    getCandidateDatas, selectedProfessionalDetails,
    handleCategoryStatus, token,
    mellieSearchSkills, setMellieSearchSkills,
    mellieSearchLocations, setMellieSearchLocations,
    handleMellieSearch, sendingCandidate,
  } = useContext(employerContext);



  useEffect(() => {
    //finding minimum devices and updating to state at initial
    if (window.innerWidth <= 992) {
      setSmallDevice(true);
    } else {
      setSmallDevice(false)
    }


    //finding minimum devices and updating to state when screen adjustment
    const handleResize = () => {
      if (window.innerWidth <= 992) {
        setSmallDevice(true);
      } else {
        setSmallDevice(false)
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  })

  useEffect(() => {
    if (sendingCandidate===false) {
      if (jobListContent.job_title !== "" && smallDevice) {
        if (jobStatus !== "") {
          handleCategoryStatus(jobStatus)
        } else {
          getCandidateDatas(jobId, true)
        }
      } else {
        getCandidateDatas(jobId);
      }
    }
  }, [])


  const handleSearchInput = (e) => {
    const searchIp = e.target.value;
    const searchData = candidatesList.filter((v) => {
      return v.first_name.toLowerCase().includes(searchIp.toLowerCase()) || v.last_name.toLowerCase().includes(searchIp.toLowerCase())
    })
    setCandidatesListDuplicate(searchData)
  }



  // scroll to top
  const [isVisible, setIsVisible] = useState(false);

  // Function to handle scroll event
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const position = Math.ceil(
      (scrollTop / (scrollHeight - clientHeight)) * 100
    );

    if (position > 2) { // Adjust this value according to your needs
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    var scrollByContent = document.getElementById('scrollCandidateRighttoTop');

    scrollByContent.scrollTo({
      top: 0,
      behavior: 'smooth' // Optional: smooth scrolling animation
    });
  };


  return (
    <>
      <div className={smallDevice ? "homePage-backgroundColor employer-minium-device-height overflow-scroll placeholder-glow" : "homePage-backgroundColor pt-2 overflow-hidden placeholder-glow"}>
        <div className="container-fluid px-sm-2 px-md-3 px-xxl-5 h-100">
          <div className="col-12 pt-3 pb-2">
            <CandidateFilterMethods
              initialGlow={initialGlow}
              jobRole={jobRole}
              jobId={jobId}
              setCandidatesList={setCandidatesList}
              setCandidatesListDuplicate={setCandidatesListDuplicate}
              setRightSideContent={setRightSideContent}
              setCategorySelectedGlow={setCategorySelectedGlow}
              handleSearchInput={handleSearchInput}
              jobStatus={jobStatus}
              setJobStatus={setJobStatus}
              jobListContent={jobListContent}
              setJobListContent={setJobListContent}
              handleCategoryStatus={handleCategoryStatus}
              getCandidateDatas={getCandidateDatas}
            />
          </div>

          <div className={smallDevice ? "mt-1 py-1 h-100" : "mt-1 setting-employer-row-height py-1"}>
            <div className="row h-100">
              <div className={initialGlow || categorySelectedGlow ?
                smallDevice ?
                  "col-12 col-md-12 col-lg-4 col-xl-4 col-xxl-3 h-100"
                  :
                  "col-12 col-md-12 col-lg-4 col-xl-4 col-xxl-3 h-100  overflow-scroll"
                :
                smallDevice ?
                  "col-12 col-md-12 col-lg-4 col-xl-4 col-xxl-3 h-100"
                  :
                  candidatesListDuplicate.length > 0
                    ? "col-12 col-md-12 col-lg-4 col-xl-4 col-xxl-3 h-100 overflow-scroll"
                    :
                    "col-12 col-md-12 col-lg-4 col-xl-4 col-xxl-3 h-100 overflow-hidden"
              }
              >
                <CandidateLeftContent
                  initialGlow={initialGlow}
                  categorySelectedGlow={categorySelectedGlow}
                  smallDevice={smallDevice}
                  candidatesList={candidatesList}
                  candidatesListDuplicate={candidatesListDuplicate}
                  skills={filterSkills}
                  locationData={filterLocation}
                  setProfessionalId={setProfessionalId}
                  jobId={jobId}
                  setCandidatesListDuplicate={setCandidatesListDuplicate}
                  selectedProfessionalDetails={selectedProfessionalDetails}
                  mellieSearchSkills={mellieSearchSkills}
                  setMellieSearchSkills={setMellieSearchSkills}
                  mellieSearchLocations={mellieSearchLocations}
                  setMellieSearchLocations={setMellieSearchLocations}
                  handleMellieSearch={handleMellieSearch}
                  rightSideContent={rightSideContent}
                />
              </div>

              <div className="col-lg-8 col-xl-8 col-xxl-9 h-100 d-none d-lg-block">
                <div className={candidatesList.length > 0 ? "card h-100 border-0" : "card bg-transparent h-100 border-0"}>
                  <div className={candidatesList.length > 0 ? "card-body h-100 overflow-scroll p-0 row" : "card-body h-100 overflow-scroll p-0 row justify-content-center align-items-center"} onScroll={handleScroll} id="scrollCandidateRighttoTop">
                    {candidatesList.length > 0 || initialGlow || categorySelectedGlow || cardSelectedGlow ?
                      <div className="position-relative">
                        <CandidateRightContent
                          initialGlow={initialGlow}
                          cardSelectedGlow={cardSelectedGlow}
                          categorySelectedGlow={categorySelectedGlow}
                          candidatesList={candidatesList}
                          rightSideContent={rightSideContent}
                          role={role}
                          professionalId={professionalId}
                          jobId={jobId}
                          token={token}
                          keepNotes={keepNotes}
                          setKeepNotes={setKeepNotes}
                          appStatus={appStatus}
                          jobStatus={jobStatus}
                          setJobStatus={setJobStatus}
                          selectedProfessionalDetails={selectedProfessionalDetails}
                          handleCategoryStatus={handleCategoryStatus}
                          getCandidateDatas={getCandidateDatas}
                          smallDevice={smallDevice}
                        />

                        <div
                          className="candidate-scroll-to-top-icon"
                          onClick={scrollToTop}
                          title="Scroll to top"
                          style={{ display: isVisible ? 'block' : 'none' }} // Show/hide button based on visibility state
                        >
                          <BsFillArrowUpCircleFill className='fs-1 brand-color' />
                        </div>

                      </div>
                      :
                      <p className="text-center">Oops! No Data Available</p>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>





      <div className={`${openWidget ? 'responsive-filter d-lg-none ' : 'd-none'}`} id="myModal">
        <div className="responsive-filter-card filter-closet">
          <header>
            <h2 className='m-0 text-start ps-3'>Filter</h2>
            <p className=" close-icon responsive-filter-close-icon" onClick={() => setOpenWidget(!openWidget)}><IoMdClose /></p>
          </header>

          <div className="filter-body-content ">
            <CandidateFilterWidget
              initialGlow={initialGlow}
              skillData={filterSkills}
              locationData={filterLocation}
              mellieSearchSkills={mellieSearchSkills}
              setMellieSearchSkills={setMellieSearchSkills}
              mellieSearchLocations={mellieSearchLocations}
              setMellieSearchLocations={setMellieSearchLocations}
              handleMellieSearch={handleMellieSearch}
            />
          </div>
        </div>
      </div>

      <div className="responsive-filter-toggler d-lg-none">
        {openWidget ?
          <p className="material-symbols-outlined mb-0" onClick={() => setOpenWidget(!openWidget)}>< IoMdClose /></p>
          :
          <p className="material-symbols-outlined  mb-0" onClick={() => setOpenWidget(!openWidget)}><  FiFilter /></p>
        }
      </div>
    </>
  );
};

export default EmployerCandidates;
