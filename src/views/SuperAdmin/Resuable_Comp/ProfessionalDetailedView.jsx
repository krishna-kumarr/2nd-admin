import React, { useState } from 'react'
import RecommendedJobCard from './RecommendedJobCard'
import Pdf from '../../employer/employerComponents/Pdf'
import { FaGraduationCap, FaUserTie } from 'react-icons/fa'
import { PiBagFill } from 'react-icons/pi'
import { IoCalendarOutline, IoLanguage, IoLocationOutline } from 'react-icons/io5'
import { HiLightBulb } from 'react-icons/hi2'
import { RiVideoFill } from 'react-icons/ri'
import VideoPlayer from '../../../components/VideoJS/VideoPlayer'
import { MdAddToPhotos } from 'react-icons/md'
import { GrLocation } from 'react-icons/gr'
import { HiOutlineBriefcase } from 'react-icons/hi2'
import { useContext } from 'react'
import SuperAdminContext from '../../../hooks/SuperAdminContext'


const ProfessionalDetailedView = () => {
    const duplicateArrayContent=[1,2,3];
    const recommendedPlaceholderArray=[1,2,3];
    const {
        initialGlow,setInitialglow,
        experience,setExperience,
        education,setEducation,
        skills,setSkills,
        video,setVideo,
        language,setLanguage,
        additionalInfo,setAdditionalInfo
    }=useContext(SuperAdminContext);


    const handleDateConvert = (value) =>{
        var Months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
        var splitDate = value.split("-")   // 2024-01
        var l=[splitDate[0]]

        var monthConverted=Months[parseInt(splitDate[1])-1]
        
        l.unshift(monthConverted)
        
        return l.join(" ")
    }


    return (
        <>
            {initialGlow ? (
                <div className="card h-100 border-0">
                    <div className="card-body h-100 overflow-scroll p-lg-4 px-lg-2 row  p-0 p-lg-3">
                        <div className="col-12">
                            <div className="container-fluid">
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
                                                <h1 className="employer-card-candidate-role mb-0 d-inline-block ps-3 placeholder w-25 py-3 rounded-1"></h1>
                                            </div>
                                            <div className="col-12 pt-4 row">
                                                <div className="col-3">
                                                    <p className="employer-card-candidate-role placeholder pt-3 pb-2 w-100 rounded-1"></p>
                                                </div>
                                                <div className="col-3">
                                                    <p className="employer-card-candidate-role placeholder pt-3 pb-2 w-100 rounded-1"></p>
                                                </div>
                                                <div className="col-3">
                                                    <p className="employer-card-candidate-role placeholder pt-3 pb-2 w-100 rounded-1"></p>
                                                </div>
                                                <div className="col-3">
                                                    <p className="employer-card-candidate-role placeholder pt-3 pb-2 w-100 rounded-1"></p>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <button type="button" className="btn col-4 me-4 py-1 placeholder"></button>

                                                <button type="button" className="btn col-4 py-1 placeholder"></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-12 border-bottom border-secondary border-1 py-4">

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
                                                null
                                        }
                                    </div>

                                    <div className="card border-0 ">
                                        <div className="card-body ">
                                            <div className="d-flex justify-content-between ms-1">
                                                <label className="profile-side-headers d-flex align-items-center">
                                                    <FaUserTie className="me-3 fs-4 placeholder rounded-2 p-3"  />
                                                    <span className="placeholder px-3 w-100 py-1 rounded-1"></span>
                                                </label>

                                            </div>
                                            <div className="ms-5 mt-3 profile-descriptions">
                                                <p className={'text-break placeholder rounded-2 w-100 py-5'}></p>                                           
                                            </div>
                                        </div>
                                    </div>

                                    {duplicateArrayContent.map((val) => {
                                        return <div className="ms-5" key={val}>
                                                    <div className="d-flex justify-content-between mt-3">
                                                        <label className=" d-inline-block w-75 employer-card-Content-short-heading">
                                                            <span className='placeholder rounded-2 w-50 py-3'>{val}</span> 
                                                        </label>
                                                    </div>

                                                    <label className="profile-descriptions mt-1">
                                                        <span className='placeholder p-2 rounded-1'></span> &nbsp;-&nbsp;<span className='placeholder px-5 rounded-1'>&nbsp; </span>
                                                    </label>

                                                    <p className={"mt-1 text-break employer-card-Content placeholder rounded-2 py-5 w-100"}>
                                                    </p>
                                                    <hr />
                                                </div> 
                                        })
                                    }


                                    <div className="card border-0">
                                        <div className="card-body ">
                                            <div className="d-flex justify-content-between ms-1">
                                                <label className="profile-side-headers d-flex align-items-center">
                                                    <FaUserTie className= "me-3 fs-4 placeholder rounded-2 p-3"/>
                                                    <span className="placeholder px-3 w-100 py-1 rounded-1"></span>
                                                </label>

                                            </div>
                                            <div className="ms-5 mt-3 profile-descriptions"> 
                                                <p className={'text-break placeholder rounded-2 w-100 py-5'}></p>                                               
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="col-12 border-bottom border-secondary border-1 py-4">
                                    <div className="card border-0 ">
                                        <div className="card-body ">
                                            <div className="d-flex justify-content-between ms-1">
                                                <label className="profile-side-headers d-flex align-items-center">
                                                    <FaUserTie className="me-3 fs-4 placeholder rounded-2 p-3"  />
                                                    <span className="placeholder px-3 w-100 py-1 rounded-1"></span>
                                                </label>

                                            </div>
                                            <div className="ms-5 mt-3 profile-descriptions">
                                                <p className={'text-break placeholder rounded-2 w-100 py-5'}></p>                                           
                                            </div>
                                        </div>
                                    </div>

                                    {duplicateArrayContent.map((val) => {
                                        return <div className="ms-5" key={val}>
                                                    <div className="d-flex justify-content-between mt-3">
                                                        <label className=" d-inline-block w-75 employer-card-Content-short-heading">
                                                            <span className='placeholder rounded-2 w-50 py-3'>{val}</span> 
                                                        </label>
                                                    </div>

                                                    <label className="profile-descriptions mt-1">
                                                        <span className='placeholder p-2 rounded-1'></span> &nbsp;-&nbsp;<span className='placeholder px-5 rounded-1'>&nbsp; </span>
                                                    </label>

                                                    <p className={"mt-1 text-break employer-card-Content placeholder rounded-2 py-5 w-100"}>
                                                    </p>
                                                    <hr />
                                                </div> 
                                        })
                                    }

                                    <div className="card border-0">
                                        <div className="card-body ">
                                            <div className="d-flex justify-content-between ms-1">
                                                <label className="profile-side-headers d-flex align-items-center">
                                                    <FaUserTie className= "me-3 fs-4 placeholder rounded-2 p-3"/>
                                                    <span className="placeholder px-3 w-100 py-1 rounded-1"></span>
                                                </label>

                                            </div>
                                            <div className="ms-5 mt-3 profile-descriptions"> 
                                                <p className={'text-break placeholder rounded-2 w-100 py-5'}></p>                                               
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="card h-100 border-0">
                    <div className="card-body h-100 overflow-scroll">
                        <div className="container-fluid">
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
                                                    <span className="border-end border-dark pe-3">
                                                        {"krishna"}{" "}
                                                        {"kumar"}
                                                    </span>

                                                    <span className="employer-card-candidate-role mb-0 d-inline-block ps-3 ">
                                                        {"front end dev"}
                                                    </span>
                                                </h1>
                                            </div>

                                            <div className="col-12 col-sm-8 col-md-12 row justify-content-evenly mt-3">
                                                <p className={window.location.pathname === "/employer_dashboard/candidates/full_details" ?
                                                        "col-12 col-md-8 col-lg-5 employer-card-candidate-role text-break"
                                                    :
                                                        "col-12 col-md-6 employer-card-candidate-role"}>
                                                        <strong className='col pe-0'>Email :</strong>
                                                        kumarkrishna11231@gmail.com
                                                </p>

                                                <p className={window.location.pathname === "/employer_dashboard/candidates/full_details" ?
                                                        "col-12 col-md-8 col-lg-5 employer-card-candidate-role text-break"
                                                    :
                                                        "col-12 col-md-6 employer-card-candidate-role"}>
                                                        <strong className='pe-0'>Location :</strong>
                                                        Tenkasi
                                                </p>

                                                <p className={window.location.pathname === "/employer_dashboard/candidates/full_details" ?
                                                        "col-12 col-md-8 col-lg-5 employer-card-candidate-role text-break"
                                                    :
                                                        "col-12 col-md-6 employer-card-candidate-role"}>
                                                        <strong className='pe-0'>Phone :</strong>
                                                        9787533778
                                                </p>

                                                <p className={window.location.pathname === "/employer_dashboard/candidates/full_details" ?
                                                        "col-12 col-md-8 col-lg-5 employer-card-candidate-role text-break"
                                                    :
                                                        "col-12 col-md-6 employer-card-candidate-role"}>
                                                        <strong className='pe-0'>Date of birth :</strong>
                                                        18-03-2000
                                                </p>
                                            
                                            </div>

                                            <div className="col-12 pt-3">
                                                <button type={"button"} className="btn btn-transparent border btn-brand-color candidate-right-side-btn">
                                                    Make Recommendations
                                                </button>

                                                <button type={"button"}
                                                    className={"btn btn-transparent border border-brand-color ms-4 candidate-right-side-btn"}
                                                    data-bs-toggle={"modal"}
                                                    data-bs-target="#expertTakeNotesModal" >
                                                        Take Expert Notes
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
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
                        </div>

                        

                        <div className="col-12 border-bottom border-secondary border-1 py-4">
                            {/* About card  */}
                            <div className="card border-0 ">
                                <div className="card-body ">
                                    <div className="d-flex justify-content-between ms-1">
                                        <label className="profile-side-headers d-flex align-items-center">
                                            <FaUserTie className="me-4 brand-color fs-4" />
                                            <span>About</span>
                                        </label>

                                    </div>
                                    <div className="ms-5 mt-3 profile-descriptions">
                                        <p className={'text-break ms-1'}>about</p>                                         
                                    </div>
                                </div>
                            </div> 
                            
                            {/* experience card  */}
                            {
                                // experience.length > 0 ?
                                    <div className="card border-0">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between ms-1">
                                                <label className="profile-side-headers d-flex align-items-center">
                                                    <PiBagFill className="me-4 brand-color fs-4" />
                                                    <span>Experience</span>
                                                </label>
                                            </div>

                                            {                                  
                                                experience.map((val) => {
                                                    return (
                                                        <React.Fragment key={val.id}>

                                                            {
                                                                <div className="ms-5">
                                                                    <div className="d-flex justify-content-between mt-3 ">
                                                                        <label className={window.location.pathname==="/employer_dashboard/candidates" ? " d-inline-block w-100 employer-card-Content-short-heading" : "profile-inner-headers  d-inline-block w-75"}>
                                                                            <span >{val.job_title} | {val.company_name}</span>
                                                                        </label>
                                                                    </div>



                                                                    <label className="profile-descriptions mt-2">
                                                                        <IoCalendarOutline />&nbsp; <span> {handleDateConvert(val.start_date)}</span> &nbsp;-&nbsp;<span> {handleDateConvert(val.end_date)}&nbsp; </span>
                                                                        <span className={window.location.pathname==="/employer_dashboard/candidates" ? "employer-card-Content" : "d-flex align-items-center gap-2"}>
                                                                            <IoLocationOutline /> {val.job_location}
                                                                        </span>                                                                    
                                                                    </label>

                                                                    <p className={window.location.pathname==="/employer_dashboard/candidates" ?"mt-1 text-break employer-card-Content" : "mt-1 profile-descriptions text-break"}>
                                                                        {val.job_description}
                                                                    </p>
                                                                    <hr />
                                                                </div>
                                                            }
                                                        </React.Fragment>
                                                    )
                                                    })
                                            }
                                        </div>
                                    </div>
                                // :
                                //   null
                            }

                            {/* education card  */}
                            {
                                // education.length > 0 ?
                                    <div className="card border-0">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between ms-1">
                                                <label className="profile-side-headers d-flex align-items-center">
                                                    <PiBagFill className="me-4 brand-color fs-4" />
                                                    <span>Education</span>
                                                </label>
                                            </div>
                        
                                            {
                                                education.map((val) => {
                                                return (
                                                    <React.Fragment key={val.id}>
                
                                                        {
                                                            <div className="ms-5">
                                                                <div className="d-flex justify-content-between mt-3 ">
                                                                    <label className={window.location.pathname==="/employer_dashboard/candidates" ? "placeholder-glow d-inline-block w-100 employer-card-Content-short-heading" : "profile-inner-headers placeholder-glow d-inline-block w-75"}>
                                                                        <span className="text-break">{val.degree_level} {val.specialisation} |  {val.institute_name} </span>
                                                                    </label>
                                                                </div>
                
                
                
                                                                <label className="profile-descriptions mt-2">
                                                                    <IoCalendarOutline />&nbsp; <span> {handleDateConvert(val.start_date)}</span> &nbsp;-&nbsp;<span> {handleDateConvert(val.end_date)}&nbsp; </span>
                                                                    <span className={window.location.pathname==="/employer_dashboard/candidates" ?"employer-card-Content" : "d-flex align-items-center gap-2"}>
                                                                        <IoLocationOutline /> {val.institute_location}
                                                                    </span>
                                                                </label>
                                                                <hr />
                                                            </div>
                                                        }
                                                    </React.Fragment>
                                                )
                                                })
                                            }
                                        </div>
                                    </div>
                                // :
                                //     null
                            }

                            {/* skills card  */}
                            <div className="card border-0">
                                <div className="card-body">
                                <div className="d-flex justify-content-between ms-1">
                                    <label className="profile-side-headers d-flex align-items-center placeholder-glow">
                                        <HiLightBulb className="me-4 brand-color fs-4"/>
                                        <span>Skills</span>
                                    </label>

                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="row row-cols-auto ms-5 g-3 profile-descriptions mt-3">
                                        {
                                            skills.map((skill, index) => {
                                                return (
                                                <React.Fragment key={skill.id}>
                                                    <div className="col mt-0">
                                                    <div className="employer-card-skills border rounded-2 p-2 fw-bold mb-4">
                                                        {skill.skill_name} -{" "}
                                                        <span className="fw-normal">
                                                        {skill.skill_level}
                                                        </span>
                                                    </div>
                                                    </div>
                                                </React.Fragment>
                                                );
                                            })                                         
                                        }
                                    </div>
                                </div>

                                </div>
                            </div>
      
                            {/* preference card  */}
                            <div className="card border-0">
                                <div className="card-body ">
                                    <div className="d-flex justify-content-between ms-1">
                                        <label className="profile-side-headers d-flex align-items-center">
                                            <FaUserTie className="me-4 brand-color fs-4"/>
                                            <span>Preference</span>
                                        </label>

                                    </div>
                                    <div className="ms-5 mt-3 profile-descriptions">
                                        <p className={'text-break ms-1'}>Preference</p> 
                                    </div>
                                </div>
                            </div> 

                            {/* video  && language*/}
                            <div className="row mt-2 g-3 ">
                                <div className="col-12 col-md-6 mb-3 mb-sm-0">
                                    <div className="card border-0">
                                        <div className="card-body">
                                            <div className={`d-flex justify-content-between ms-1 ${video.includes('.mp4') ? "mb-2" : ""}`}>
                                                <label className="profile-side-headers d-flex align-items-center">
                                                    <RiVideoFill  className="me-4 brand-color fs-3" />
                                                    <span>
                                                        Video
                                                    </span>
                                                </label>
                                            </div>

                                        {
                                            video.includes('.mp4') ?
                                            <div className="d-flex justify-content-center mb-4">
                                                <VideoPlayer
                                                uploadedVideoFile={video}
                                                // isVideoUploaded={isVideoUploaded}
                                                />
                                            </div>
                                            :
                                            null
                                        }
                                            
                                        </div>
                                    </div>
                                </div>

                                <div className="col col-md-6">
                                    <div className="card border-0">
                                        <div className="card-body">
                                        <div className="d-flex justify-content-between ms-1">
                                            <label className="profile-side-headers d-flex align-items-center">
                                                <IoLanguage className= "me-4 brand-color fs-4"/>
                                                <span> Languages </span>
                                            </label>
                                        </div>
                                        <div className="ms-5 mt-3 ">
                                            { 
                                                language.map((language,index) => {
                                                    return (
                                                        <React.Fragment key={index}>
                                                            <div className="d-flex justify-content-between" key={language.id}>
                                                                <label className="profile-inner-headers">
                                                                {language.language_known}
                                                                </label>
                                                            </div>
                                                            <p className="mt-1 profile-descriptions">
                                                                {language.language_level}
                                                            </p>
                                                            <hr />
                                                        </React.Fragment>
                                                    )
                                                })
                                            }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>  
                            
                            {/* additional info */}
                            <div className="card border-0 mt-2">
                                <div className="card-body ">
                                    <div className="d-flex justify-content-between ms-1">
                                        <label className="profile-side-headers d-flex align-items-center">
                                            <MdAddToPhotos className="me-4 brand-color fs-4" />
                                            <span>
                                                Additional Information
                                            </span>
                                        </label>
                                    </div>

                                    <div className="ms-5 mt-3">
                                        { 
                                            additionalInfo.map((info, index) => {
                                                return (
                                                <React.Fragment key={index}>
                                                    <div className="additional-information">
                                                    <div className="d-flex justify-content-between ">
                                                        <label className="profile-inner-headers ">
                                                        {info.title}
                                                        </label>
                                                    </div>
                                                    <ul className="mt-1 profile-descriptions">
                                                        <li>
                                                        <p className='text-break'>{info.description}</p>
                                                        </li>
                                                    </ul>
                                                    </div>
                                                </React.Fragment>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            </div>                
                        </div>

                        {/* pdf  */}
                        <div className="col-12 pt-5">
                            <div className="container-fluid">
                                <div className="row align-items-center">
                                    <div className="col-6">
                                        <h1 className="employer-card-Content-heading">Resume</h1>
                                    </div>
                                    <div className="col-6 text-end">
                                        <button type="button" className="btn btn-transparent border btn-brand-color candidate-right-side-btn">
                                        <a href={`${process.env.REACT_APP_SECOND_CAREERS_CDN}`} className="text-light text-decoration-none" download>Download</a>
                                        </button>
                                    </div>
                                </div>
                                <Pdf pdfUrl={`${process.env.REACT_APP_SECOND_CAREERS_CDN}`} />
                            </div>
                        </div> 
                    </div>
                </div>
            )
            }

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

export default ProfessionalDetailedView