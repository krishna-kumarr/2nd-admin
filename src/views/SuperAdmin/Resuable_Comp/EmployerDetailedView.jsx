import React, { useContext, useState } from 'react'
import { FaUserTie } from 'react-icons/fa';
import RecommendedJobCard from './RecommendedJobCard';
import { GoOrganization } from "react-icons/go";
import { SiAwsorganizations } from "react-icons/si";
import { IoTimeSharp } from "react-icons/io5";
import { Ri24HoursLine, RiTimeZoneFill } from "react-icons/ri";
import { MdModeEdit } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { BiCategory } from "react-icons/bi";
import { FaRegCalendarAlt, FaShoppingBag, FaWallet } from "react-icons/fa";
import { GrLocation } from 'react-icons/gr'
import { HiOutlineBriefcase } from 'react-icons/hi2'
import SuperAdminContext from '../../../hooks/SuperAdminContext';


const EmployerDetailedView = () => {
    const duplicateArrayContent=[1,2,3];
    const recommendedPlaceholderArray=[1,2,3];

    const {
        initialGlow,
        employerSkills,setEmployerSkills
        }=useContext(SuperAdminContext);

  return (
    <>
        <div className="card h-100 border-0">
            <div className="card-body h-100 overflow-scroll p-0 p-lg-3">
                <div className="container-fluid">
                    {
                        initialGlow ? 
                            <div className="row border-bottom border-secondary border-1 py-4">
                                <div className="col-2 text-center">
                                    <img
                                    src={""}
                                    alt="..."
                                    width={100}
                                    height={100}
                                    className="pe-none placeholder rounded-circle"
                                    />
                                </div>

                                <div className="col-10">
                                    <div className="row">
                                        <div className="col-lg-6 col-xxl-8">
                                            <h1 className="employer-card-candidate-name mb-0 d-inline-block pe-3 border-end border-dark placeholder w-50 py-3 rounded-1 me-2"></h1>
                                        </div>
                                        <div className="col-12 pt-4 row">
                                            <div className="col-4">
                                                <p className="employer-card-candidate-role placeholder pt-3 pb-2 w-100 rounded-1"></p>
                                            </div>
                                        </div>
                                        <div className="col-12 d-flex flex-wrap">
                                            <button type="button" className="btn col-12 col-lg-4  me-4 py-1 placeholder"></button>
                                            <button type="button" className="btn col-12 col-lg-4 py-1 placeholder"></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    :
                        <div className="row border-bottom border-secondary border-1 py-4">
                            <div className="col-12 col-sm-3 col-xl-2 text-center">
                                <img
                                src={`https://cdn.2ndcareers.com/employer/logo/Logo-05.png`}
                                alt=""
                                width={100}
                                height={100}
                                className="rounded-circle"
                                />
                            </div>

                            <div className="col-12 col-sm-9 col-xl-10 pt-4 pt-sm-0 ">
                                <div className="container">
                                    <div className="d-flex flex-wrap align-items-center h-100">
                                        <div className={ window.location.pathname ==="/employer_dashboard/candidates/full_details"
                                                ? "col-12 col-md-6 col-xxl-8 d-flex flex-wrap align-items-center text-center text-md-start"
                                                : "col-lg-12 col-xl-8 d-flex flex-wrap align-items-center"
                                            }>
                                            <h1 className="employer-card-candidate-name mb-0 d-inline-block pe-3 ">
                                                Data Quality manager
                                            </h1>
                                        </div>

                                        <div className="col-12 col-sm-8 col-md-12 row justify-content-evenly mt-3"> 
                                            <p className={window.location.pathname === "/employer_dashboard/candidates/full_details" ?
                                                    "col-12 employer-card-candidate-role text-break"
                                                :
                                                    "col-12 employer-card-candidate-role"}>
                                                    <strong className='pe-0'>Location :</strong>
                                                    Tenkasi
                                            </p>                                    
                                        </div>

                                        <div className="col-12 pt-3 d-flex flex-wrap">
                                            <button type={"button"} className="btn col-8 col-lg-5 btn-transparent border btn-brand-color mb-2 mb-lg-0 candidate-right-side-btn">
                                                Make Recommendations
                                            </button>

                                            <button type={"button"}
                                                className={"btn col-8 col-lg-4 btn-transparent border border-brand-color ms-lg-4 candidate-right-side-btn"}
                                                data-bs-toggle={"modal"}
                                                data-bs-target="#expertTakeNotesModal" >
                                                    Take Expert Notes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    


                    <div className="col-12 mt-3">
                        {
                            initialGlow ? 
                                <h1 className='employer-card-candidate-name placeholder rounded-2 col-4 py-2 pb-3'></h1>
                            :
                                <h1 className='employer-card-candidate-name'>Recommended Profiles</h1>
                        }
                        <div className="row w-100">
                            {
                                initialGlow ? 
                                    recommendedPlaceholderArray.map((v,i)=>{
                                        return <div className="col-12 col-md-6 col-xl-4 py-2" key={i}>
                                            <div className="d-flex flex-wrap border rounded-2 w-100 p-3 pe-0">
                                                <div className="col-3">
                                                    <img
                                                        src={""}
                                                        alt="..."
                                                        width={50}
                                                        height={50}
                                                        className="pe-none placeholder rounded-circle"
                                                    />
                                                </div>
                                                <div className="col-9">
                                                    <div className="container-fluid">
                                                        <p className='mb-0 pb-1 superAdmin-recommended-card-heading placeholder rounded-2 w-100 py-3 mb-1'></p>
                                                        <p className="mb-0 superAdmin-recommended-card-sub-content mb-1">
                                                            <span className="pe-2 placeholder rounded-2"><HiOutlineBriefcase /></span>
                                                            <span className="placeholder rounded-2 w-50 py-2 ms-2"></span>
                                                        </p>
                                                        <p className="mb-0 superAdmin-recommended-card-sub-content">
                                                            <span className="pe-2 placeholder rounded-2"><GrLocation /></span>
                                                            <span className="placeholder rounded-2 w-50 py-2 ms-2"></span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                :
                                <>
                                    <RecommendedJobCard/>
                                    <RecommendedJobCard/>
                                    <RecommendedJobCard/>   
                                </>
                            }                       
                        </div>
                    </div>

                    <div className="pt-4">
                        <div>
                            {initialGlow ? (
                                <>
                                <h5 className="job-title-weight placeholder rounded col-4 py-3"></h5>
                                <p className="job-description placeholder rounded skeleton-jobParagraph-medium col-12"></p>
                                </>
                            ) : (
                                <>
                                <h5 className="job-title-weight">About Company</h5>
                                <p className="job-description">{"abouCompany"}</p>
                                </>
                            )}
                            </div>
                            <div className="d-flex justify-content-around mt-4">
                            {initialGlow ? (
                                <>
                                <label className="company-details-icon placeholder rounded col-2 py-2 pt-3"></label>
                                <label className="company-details-icon placeholder rounded col-2 py-2 pt-3"></label>
                                </>
                            ) : (
                                <>
                                <label className="company-details-icon ">
                                    <GoOrganization className="me-2 text-success" />
                                    {"employer_type"}
                                </label>
                                <label className="company-details-icon">
                                    <SiAwsorganizations className="me-2 text-warning" />
                                    {"sector"}
                                </label>
                                </>
                            )}
                            </div>

                            {initialGlow ? (
                            <div className="mt-4">
                                <h1 className="job-title-weight placeholder rounded col-4 py-3"></h1>
                                <p className="job-description placeholder rounded col-12 skeleton-jobParagraph-medium"></p>
                                <p className="job-description placeholder rounded col-12 skeleton-jobParagraph-medium"></p>
                            </div>
                            ) : (
                            <>
                                <div className="mt-4">
                                <h5 className="job-title-weight">Job Summary</h5>

                                <div className="job-description" dangerouslySetInnerHTML={{ __html: "jobSummary" }}></div>
                                </div>

                                <div className="row justify-content-around mt-4 dashboard-job-post-icons">
                                <h5 className="job-title-weight">Additional Job details</h5>
                                <div className="col-6 p-2 ps-2 ps-md-5">
                                    <label className="company-details-icon">
                                    <FaLocationDot className="me-2 text-success" />
                                    {"workplace_type"}
                                    </label>
                                </div>
                                <div className="col-6 p-2 ps-2 ps-md-5">
                                    <label className="company-details-icon">
                                    <Ri24HoursLine className="me-2 text-primary" />
                                    {"time_commitment"}
                                    </label>
                                </div>
                                <div className="col-6 p-2 ps-2 ps-md-5">
                                    <label className="company-details-icon">
                                    <RiTimeZoneFill className="me-2 text-primary" />
                                    {"timezone"}
                                    </label>
                                </div>
                                <div className="col-6 p-2 ps-2 ps-md-5">
                                    <label className="company-details-icon">
                                    <IoTimeSharp className="me-2 text-warning" />
                                    {"job_type"}
                                    </label>
                                </div>
                                <div className="col-6 p-2 ps-2 ps-md-5">
                                    <label className="company-details-icon">
                                    <FaRegCalendarAlt className="me-2 text-warning" />
                                    {"duration"}
                                    </label>
                                </div>
                                
                                <div className="col-6 p-2 ps-2 ps-md-5">
                                    <label className="company-details-icon">
                                    <FaShoppingBag className="me-2 text-primary" />
                                    {"work_schedule"}
                                    </label>
                                </div>
                                <div className="col-6 p-2 ps-2 ps-md-5">
                                    <label className="company-details-icon">
                                    <FaWallet className="me-2 text-success" />
                                    {"Y" === "Y" ? "Paid" : "Volunteer"}
                                    </label>
                                </div>
                                <div className="col-6 p-2 ps-2 ps-md-5">
                                    <label className="company-details-icon">
                                    <BiCategory className="me-2 text-warning" />
                                    {"specialisation"}
                                    </label>
                                </div>
                                </div>

                                <div className="py-4">
                                <h5 className="job-title-weight">Skills / Competencies</h5>
                                <ul className="ms-5 dashboard-skills-ul">
                                    {employerSkills.map((v, i) => {
                                    return v !== '' ? <li key={i}>{v}</li> : null;
                                    })}
                                </ul>
                                </div>
                            </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

             {/* take notes modal box  */}
             <div
                className="modal fade"
                id="expertTakeNotesModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered modal-lg vh-50">
                <div className="modal-content p-2">
                    <div className="modal-header border-bottom-0">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">
                        Expert Take notes
                    </h1>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        id="closeApplyModal"
                    ></button>
                    </div>
                    <div className="modal-body border-bottom-0">
                    <div className="container">
                        <div className="row">
                        <textarea
                            className="p-3 rounded-3 mb-3 form-control outline-none"
                            minLength={25}
                            maxLength={10000}
                            rows={4}
                            placeholder=""
                            // value={keepNotes}
                            // onChange={(e) => setKeepNotes(e.target.value)}
                        />
                        </div>
                    </div>
                    </div>

                    <div className="modal-footer border-top-0">
                    <div className="container">
                        <div className="row float-end">
                        <div className="col-lg-12 ">
                            <button
                            type="submit"
                            className="btn btn-brand-color my-2 px-5"
                            // onClick={handleupdateNotes}
                            >
                            Save
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
    </>
  )
}

export default EmployerDetailedView