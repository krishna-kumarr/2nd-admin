import React, { useContext, useEffect, useState } from 'react'
import SuperAdminSideBar from './Resuable_Comp/SuperAdminSideBar'
import { GrMenu } from "react-icons/gr";
import Input from '../../components/Input/Input';
import InputGroup from '../../components/Input/InputGroup';
import { IoIosCloseCircleOutline, IoIosSearch } from 'react-icons/io';
import { IoFilterSharp } from 'react-icons/io5';
import SuperAdminCard from './Resuable_Comp/SuperAdminCard';
import SuperAdminDetailedView from './Resuable_Comp/ProfessionalDetailedView';
import ProfessionalDetailedView from './Resuable_Comp/ProfessionalDetailedView';
import SuperAdminContext from '../../hooks/SuperAdminContext';

const SuperAdminProfessional = () => {

  const [open, setOpen] = useState(false);
  const [sortBy,setSortBy]=useState('');
  const a=[1,2,3,4,5,6,7]

  const {
    setMinimumDeviceCards,
    initialGlow
    }=useContext(SuperAdminContext);

    useEffect(()=>{
        setMinimumDeviceCards(false)
    },[])


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
    // if (candidatesList.length > 0) {
    //     switch (sortValue) {
    //         case "Date Posted":
    //             setSortBy("Date Posted")
    //             var sorting = candidatesList.sort(function (a, b) {
    //                 let d1 = new Date(a.applied_on),
    //                     d2 = new Date(b.applied_on)
    //                 if (d1 < d2) {
    //                     return -1;
    //                 }
    //             })
    //             setCandidatesListDuplicate(sorting)
    //             break;


    //         case "A-Z":
    //             setSortBy("A-Z")
    //             var sorting = candidatesList.sort(function (a, b) {
    //                 if (a.first_name.toLowerCase() < b.first_name.toLowerCase()) {
    //                     return -1;
    //                 }
    //             })
    //             setCandidatesListDuplicate(sorting)

    //             break;

    //         case "Z-A":
    //             setSortBy("Z-A")
    //             var sorting = candidatesList.sort(function (a, b) {
    //                 if (b.first_name.toLowerCase() < a.first_name.toLowerCase()) {
    //                     return -1;
    //                 }
    //             })
    //             setCandidatesListDuplicate(sorting)

    //             break;
    //         default:
    //             break;
    //     }
    // }
  }



  return (
    <>
        <div className="col-12 col-xl-10 superAdmin-rightSide-total-height overflow-hidden">
            <div className="col-12 superAdmin-rightSide-Component-name-height ">
                <div className="container-fluid px-lg-4 h-100">
                    <div className="row align-items-center h-100 ">
                        <div className="col-6">
                            <h5>Professional</h5>
                        </div>
                        
                        <div className="col-6 text-end d-xl-none">
                            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#superAdminSidebar" aria-controls="superAdminSidebar">
                                <GrMenu className='fs-4'/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            

            <div className="col-12 superAdmin-rightSide-Component-content-height placeholder-glow">
                <div className="container-fluid px-lg-4 h-100">
                    <div className="row h-100">
                        <div className="col-12 col-lg-4 h-100 py-3">
                            <div className="row gy-3 superAdmin-professional-functions">
                                {/* search bar  */}
                                <div className="col-12 col-md-12 col-lg-12"> 
                                    {
                                        initialGlow ?
                                            <div className='placeholder w-100 rounded-2 py-3'></div>
                                        :
                                            <div className="d-flex position-relative">
                                                <InputGroup
                                                    className="home-search-icon fs-5"
                                                    reIcons={<IoIosSearch />}
                                                />

                                                <Input
                                                    type="text"
                                                    className="form-control form-control-lg searchInput candidate-searchInput border-0 px-5 py-0 searchInput-border"
                                                    placeHolder="Search"
                                                    ariaLabel="default input example"
                                                    testId="searchResult"
                                                    // functionOnchange={handleSearchInput}
                                                /> 
                                            </div>
                                        }    
                                </div>

                                {/* filter modal  */}
                                <div className="col-12 col-sm-6 col-lg-12">
                                    {
                                        initialGlow ?
                                            <div className='placeholder w-100 rounded-2 py-3'></div>
                                        :
                                            <div className="card rounded-3 border-0 w-100">
                                                <div className="card-body p-0 cursorPointer">
                                                    <div className="d-flex flex-wrap align-items-center filter-closet py-2 w-100 " onClick={() => setOpen(!open)}>
                                                        <div className="col-2 text-center p-0">
                                                            <IoFilterSharp className='fs-4 '/>
                                                        </div>
                                                        <div className="col-10">
                                                            <p className="mb-0 superAdmin-filter-tab-fs">
                                                                Search by name,skills,experience or education
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className={`${open ? "employer-filter-box rounded-4 filter-closet shadow" : "d-none"}`}>
                                                        <div className="h-100">
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
                                                        {/* <CandidateFilterWidget
                                                            skillData={skills}
                                                            locationData={locationData}
                                                            mellieSearchSkills={mellieSearchSkills}
                                                            setMellieSearchSkills={setMellieSearchSkills}
                                                            mellieSearchLocations={mellieSearchLocations}
                                                            setMellieSearchLocations={setMellieSearchLocations}
                                                            handleMellieSearch={handleMellieSearch}
                                                            setOpen={setOpen}
                                                        /> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    }
                                </div>
                                
                                {/* sorting  */}
                                <div className="col-12 col-sm-6 col-lg-12">  
                                {
                                    initialGlow ?
                                        <div className='placeholder w-100 rounded-2 py-3'></div>
                                    :
                                        <div className="dropdown employer-custom-dropdown">
                                            <button
                                                className="btn dropdown-toggle w-100 filter-section d-flex flex-wrap align-items-center choose-dropdown"
                                                type="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                <span className="fw-bold">Sort by:</span>
                                                <span className="text-secondary ps-3">
                                                    {sortBy === "" ? "--default--" : sortBy}
                                                </span>
                                            </button>
                                            <ul  className="dropdown-menu w-100 border-0 shadow">
                                                <li>
                                                    <a className="dropdown-item" onClick={() => handleSortingFilter("Date Posted")}>Date Posted</a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" onClick={() => handleSortingFilter("A-Z")}>A-Z</a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" onClick={() => handleSortingFilter("Z-A")}>Z-A</a>
                                                </li>
                                            </ul>
                                        </div>  
                                }
                                </div>
                            </div>
                            
                            {/* candidates cards  */}
                            <div className="row gy-3 overflow-scroll superAdmin-professional-cards mt-4 my-3">
                                {
                                    initialGlow ? 
                                        a.map((value, index) => {
                                            return (
                                            <div className="card w-100 mt-2 rounded-2 border-0" key={index}>
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
                                    :
                                        a.map((v,i)=>{
                                            return (
                                                <SuperAdminCard
                                                    profile_image="default-profile.png"
                                                    first_name="krishna"
                                                    last_name="kumar"
                                                    job_title="front end dev"
                                                    city="tenkasi"
                                                /> 
                                            )
                                        })
                                }
                            </div>
                        </div>

                        {/* candidates detail view  */}
                        <div className="col-7 col-lg-8 py-3 h-100">
                            <ProfessionalDetailedView/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default SuperAdminProfessional