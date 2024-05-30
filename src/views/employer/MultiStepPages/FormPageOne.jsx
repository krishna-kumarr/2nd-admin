import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";

const FormPageOne = ({
    newJobPost,
    setNewJobPost,
    handleNewJobPost,
    handleSearchByJob,
    getJobApi,
    setGetJobApi,
    pageOneLoading,
    setPageOneLoading,
    searchGetJob,
    setSearchGetJob, 
    setCreateJobId,
    handleCreateJob,
    setSelectedJobRadio,
    setExistingTemplate,
    setSelectedTemplateCard
}) => {
    const [templateArrayDuplicate,setTemplateArrayDuplicate]=useState([])

    useEffect(()=>{
        setTemplateArrayDuplicate(getJobApi)
    },[getJobApi])


    // handle page one Search
    const handleSearchGetJob = (e) => {
        var filterSearchResults = getJobApi.filter((v)=>{
            return v.job_title.toLowerCase().includes(e.target.value)
        })

        setTemplateArrayDuplicate(filterSearchResults)
    }

    const handleChangeTemplateTitle = (value) => {
        setSelectedTemplateCard(true)
        setExistingTemplate(true)
        setCreateJobId(value)
        setSelectedJobRadio(value.job_title)
    }

    return (
        <>
            <div className="container-fluid">
                <div className='row row-cols-12'>
                    <div className="col-lg-7 col-md-9 col-sm-12 col-12 mx-auto">
                        <div className="card border-0 shadow-sm rounded-4 p-4 mb-3">
                            <h6 className='fw-semibold'>How would you like to post your job?</h6>
                            <div className="card mt-3 px-3 cursorPointer" onClick={()=>document.getElementById('startNew').click()}>
                                <div className="card-body">
                                    <div className='d-flex align-items-center'>
                                        <div className="form-check me-4">
                                            <input className="form-check-input yesOrNoRadioButtonColor" type="radio" name="wayToPost" id="startNew" value="Start with a new job post" defaultChecked onChange={handleNewJobPost} />
                                        </div>
                                        <label htmlFor='startNew'>
                                            Post a New Job
                                        </label>

                                    </div>
                                </div>
                            </div>
                            <div className="card mt-3 px-3 cursorPointer" onClick={()=>document.getElementById('usingPreviousJob').click()}>
                                <div className="card-body ">
                                    <div className='d-flex align-items-center'>
                                        <div className="form-check me-4">
                                            <input className="form-check-input yesOrNoRadioButtonColor" type="radio" name="wayToPost" id="usingPreviousJob" value="Use a previous job as template" onChange={handleNewJobPost} />
                                        </div>
                                        <label htmlFor='usingPreviousJob'>
                                            Use Previous Posted Job Template
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="card mt-3 px-3 cursorPointer" onClick={()=>document.getElementById('draftJob').click()}>
                                <div className="card-body ">
                                    <div className='d-flex align-items-center'>
                                        <div className="form-check me-4">
                                            <input className="form-check-input yesOrNoRadioButtonColor" type="radio" name="wayToPost" id="draftJob" value="Use draft as template" onChange={handleNewJobPost} />
                                        </div>
                                        <label htmlFor='draftJob'>
                                            Use draft
                                        </label>
                                    </div>
                                </div>
                            </div>


                        </div>

                        {newJobPost ?
                            pageOneLoading ?
                                <div className="card border-0 shadow-sm rounded-4 p-4 mb-3">
                                    <div className="card ">
                                        <div className="card-body px-3 py-2 ">
                                            <div className="position-relative align-items-lg-center searchJobSpace">
                                                <input
                                                    type="text"
                                                    className="form-control shadow rounded px-5 search-field ms-3"
                                                    placeholder="Search by job title"
                                                    onChange={(e) => handleSearchGetJob(e)}
                                                />
                                                <span className='fs-5 search-icon'><IoSearchOutline /></span>

                                            </div>
                                        </div>
                                        
                                    </div>
                                    {
                                        templateArrayDuplicate.length > 0 ?
                                            templateArrayDuplicate.map((v, i) => {
                                                return (
                                                    <div className="card mt-3 px-3 cursorPointer" key={i} onClick={()=>document.getElementById(i).click()}>
                                                        <div className="card-body">

                                                            <div className="row row-cols-4 row-cols-lg-6 row-cols-md-5 row-cols-sm-4 text-wrap">
                                                                <div className="col-lg-5 col-md-6 col-sm-6 col-6">
                                                                    <div className='d-flex align-items-center  mx-3'>
                                                                        <div className="form-check ">
                                                                            <input className="form-check-input yesOrNoRadioButtonColor" type="radio" name="searchByJobTitle" id={i} value={v.job_title} onChange={() => handleChangeTemplateTitle(v)} />
                                                                        </div>
                                                                        <div className='text-start ms-4'>
                                                                            <label htmlFor={i} className='text-start'>
                                                                                {v.job_title ? v.job_title : null}
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-3 col-md-3 col-sm-3 col-3">
                                                                    <div className='text-center'>
                                                                        {v.created_at ? v.created_at : null}
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-4 col-md-3 col-sm-3 col-3 d-flex text-center">
                                                                    <div>
                                                                        {v.city ? v.city : null}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                )
                                            })
                                            :
                                            <div className="col-12">
                                                <h5 className='text-secondary text-center py-5 mb-0'>No template found</h5>
                                            </div>
                                    }

                                </div>
                                
                               
                                :
                                <div
                                    className="card border-0 p-0 rounded-4 overflow-hidden mb-3 placeholder-glow"
                                    aria-hidden="true"
                                >
                                    <div className="card-body p-0 mt-2">
                                        <div className="p-3 py-2">
                                            <h5 className="card-title mx-auto mb-4">
                                                <span className="placeholder col-12 py-4 rounded-3"></span>
                                            </h5>
                                            <h5 className="card-title  mx-auto mb-4">
                                                <span className="placeholder col-12 py-4 rounded-3"></span>
                                            </h5>
                                            <h5 className="card-title  mx-auto mb-4">
                                                <span className="placeholder col-12 py-4 rounded-3"></span>
                                            </h5>
                                            <h5 className="card-title  mx-auto mb-2">
                                                <span className="placeholder col-12 py-4 rounded-3"></span>
                                            </h5>
                                        </div>
                                    </div>
                                </div>

                            :
                            null
                        }









                    </div>
                </div>
            </div>
        </>
    )
}

export default FormPageOne