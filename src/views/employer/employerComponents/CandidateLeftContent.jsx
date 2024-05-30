import React, { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import CandidateCard from "./CandidateCard";
import CandidateFilterWidget from "./CandidateFilterWidget";
import Image from "../../../utils/images";
import axios from "axios";


 
const CandidateLeftContent = ({jobId,skills,locationData,candidatesList,selectedProfessionalDetails,setCandidatesListDuplicate,candidatesListDuplicate,initialGlow,categorySelectedGlow,smallDevice,mellieSearchSkills,setMellieSearchSkills,mellieSearchLocations,setMellieSearchLocations,handleMellieSearch,rightSideContent}) => {

  const [open, setOpen] = useState(false);
  const dummyCardList=[1,2,3,4,5,6]
  const [sortBy,setSortBy]=useState('');


  useEffect(() => {
    // filter box closing fuction
    const handler = (e) => {
      if (!e.target.closest(".filter-closet")) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });


  const handleSortingFilter = (sortValue) => {
    if (candidatesList.length > 0) {
        switch (sortValue) {
            case "DateLatest":
                setSortBy("Date Posted")
                var sorting = candidatesList.sort(function (a, b) {
                    let d1 = new Date(a.applied_on),
                        d2 = new Date(b.applied_on)
                    if (d1 < d2) {
                        return -1;
                    }
                })
                setCandidatesListDuplicate(sorting)
                break;


            case "NameAscending":
                setSortBy("A-Z")
                var sorting = candidatesList.sort(function (a, b) {
                    if (a.first_name.toLowerCase() < b.first_name.toLowerCase()) {
                        return -1;
                    }
                })
                setCandidatesListDuplicate(sorting)

                break;

            case "NameDescending":
                setSortBy("Z-A")
                var sorting = candidatesList.sort(function (a, b) {
                    if (b.first_name.toLowerCase() < a.first_name.toLowerCase()) {
                        return -1;
                    }
                })
                setCandidatesListDuplicate(sorting)

                break;
            default:
                break;
        }
    }
  }

  return (
    <>
      <div className="position-sticky top-0 showing-results-zIndex homePage-backgroundColor">
        <div className="w-100 d-none d-lg-block">
          {initialGlow || categorySelectedGlow ?
            <div className="placeholder card rounded-3 border-0 w-100 py-3"></div>
            :
            <div className="card rounded-3 border-0">
              <div className="card-body p-0 cursorPointer">
                <div
                  className="row p-0 filter-closet py-2 px-3"
                  onClick={() => setOpen(!open)}
                >
                  <div className="col"><p className="mb-0 fw-bold candidate-filter-tab-fs">Filter</p></div>
                  <div className="col text-end">
                    <IoFilterSharp />
                  </div>
                </div>

                <div
                  className={`${
                    open
                      ? "employer-filter-box rounded-4 filter-closet shadow"
                      : "d-none"
                  }`}
                >
                  <div className="contner h-100">
                    <div className="row align-items-center sticky-top p-3 pb-2 border-bottom bg-white  start-0 end-0 top-0 bottom-0 w-100 rounded-top-4">
                      <div className="col">
                        <h6 className="m-0 fw-bold">Filter</h6>
                      </div>
                      <div className="col text-end">
                        <button className="btn btn-sm border-0">
                          <IoIosCloseCircleOutline
                            className="fs-4"
                            onClick={() => setOpen(!open)}
                          />
                        </button>
                      </div>
                    </div>

                    {/* employer-filter-box body */}
                  <CandidateFilterWidget
                      skillData={skills}
                      locationData={locationData}
                      mellieSearchSkills={mellieSearchSkills}
                      setMellieSearchSkills={setMellieSearchSkills}
                      mellieSearchLocations={mellieSearchLocations}
                      setMellieSearchLocations={setMellieSearchLocations}
                      handleMellieSearch={handleMellieSearch}
                      setOpen={setOpen}
                  />
                  </div>
                </div>
              </div>
            </div>
          }
        </div>

        <div className="container-lg">
          <div className="row py-3 px-0 px-sm-1 align-items-center">
            <div className="col-6 col-sm-6 col-lg-12 filtered-profiles-col-xxl-5 order-lg-2 pt-lg-3 pt-xxl-0">
            {initialGlow || categorySelectedGlow ?
                <div className="placeholder w-100 py-3 rounded-3"></div>
              :
                <p className="text-secondary showing-Persoon-content mb-0">
                  Showing:{candidatesListDuplicate.length} profiles
                </p>
            }
            </div>
            <div className="col-6 col-sm-6 col-lg-12 Sort-by-col-xxl-7 order-lg-1 order-xxl-1 p-0">
              <div className="card border-0 rounded-3 w-100 px-2">
                <div className="card-body showing-Persoon-content py-0">
                  <div className="row align-items-center employer-custom-dropdown">
                  {initialGlow || categorySelectedGlow ?
                      <div className="placeholder w-100 py-3 rounded-3"></div>
                    :
                        <>
                          <div className="w-25 p-0">
                            <span className="w-100 fw-bold">Sort by:</span>
                          </div>
                          <div className="w-75 px-0">
                            <button
                              className="btn btn-secondary text-secondary showing-Persoon-content dropdown-toggle border-0 outline-none w-100 py-2"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              {sortBy === "" ? "--default--" : sortBy}
                            </button>
                            <ul className="dropdown-menu w-100 border-0 shadow">
                              <li>
                                <a className="dropdown-item" onClick={() => handleSortingFilter("DateLatest")}>Date Posted</a>
                              </li>
                              <li>
                                <a className="dropdown-item" onClick={() => handleSortingFilter("NameAscending")}>A-Z</a>
                              </li>
                              <li>
                                <a className="dropdown-item" onClick={() => handleSortingFilter("NameDescending")}>Z-A</a>
                              </li>
                            </ul>
                          </div>
                        </>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row align-content-start gy-2 h-100">
        {initialGlow || categorySelectedGlow ?
          dummyCardList.map((v,i)=>{
            return <div className="col-12 col-sm-6 col-lg-12 cursorPointer" key={i}>
                      <div className="card border-0 rounded-3">
                        <div className="card-body">
                          <div className="row align-items-center pt-3">
                            {/* card image  */}
                            <div className="col-4">  
                              <img src={""} alt="..." width={83} height={83} className='pe-none placeholder rounded-circle' />
                            </div>

                            {/* card content  */}
                            <div className="col-8 px-1 pt-lg-3 pt-xl-0">
                              <div className="col-12">
                                <p className="mb-0 employer-card-candidate-name placeholder w-75 py-3 rounded-1"></p>
                                <div className="pt-2">
                                    <p className="mb-0 employer-card-candidate-name placeholder w-100 pt-2 pb-3 mb-1 rounded-1"></p>
                                    <p className="mb-0 employer-card-candidate-name placeholder w-100 pt-2 pb-3 rounded-1"></p>
                                </div>
                              </div>
                              </div>
                          </div>
                        </div>
                      </div>
                    </div>
          })
        :
          candidatesListDuplicate.length > 0 ?
            candidatesListDuplicate.map((v,i)=>{
              return <React.Fragment key={i}>
              <CandidateCard 
                smallDevice={smallDevice}
                initialGlow={initialGlow}
                jobId={jobId}
                professional_id={v.professional_id}
                experience_id={v.experience_id}
                first_name={v.first_name}
                last_name={v.last_name}
                profile_image={v.profile_image}
                job_title={v.job_title}
                city={v.city}
                applicationStatus={v.recommended_by}
                selectedProfessionalDetails={selectedProfessionalDetails}
                custom_notes={v.custom_notes}
              />
              </React.Fragment>
            })

            :
            <div className="h-75 w-100 d-inline-flex align-items-center justify-content-center">
            <img src={Image.noRecordsFound} width={200} />
            </div>
        }

      </div>
    </>
  );
};

export default CandidateLeftContent;
