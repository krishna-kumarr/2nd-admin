import React, { useContext, useEffect, useState } from 'react';
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import CommonContext from '../../hooks/CommonContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import Select from 'react-dropdown-select';

const HomeFilterForm = () => {


    const filterHeadings = ["dummy", "dummy", "dummy", "dummy", "dummy", "dummy", "dummy", "dummy", "dummy"]
    const {
        setApplyFilterCount, applyFilterResponse,
        specialisationData, sectorData,
        locationData, skillData,
        FilterArray, gettingResponse,
        handleApplyFilter, setapplyFilterResponse,
        setGettingResponse, setFilteringObject,
        setAnswer, currentPage,
        getHomeAll, setCurrentPage,
        applyFilterCount
    } = useContext(CommonContext);

    const [skills, setSkills] = useState([]);
    const [sectors, setSectors] = useState([]);
    const [specialization, setSpecialization] = useState([]);
    const [location, setLocation] = useState([]);
    const [workplaceType, setWorkplaceType] = useState([]);
    const [jobTypee, setJobTypee] = useState([]);
    const [schedule, setSchedule] = useState([]);

    const handleWorkplaceType = (e) => {
        if (e.target.checked) {
            setWorkplaceType(prevState => [...prevState, e.target.name])
        }
        else {
            if (!e.target.checked) {
                const removeUnwantedWorkplace = workplaceType.filter((v) => {
                    return v !== e.target.name
                })
                setWorkplaceType(removeUnwantedWorkplace)
            }
        }
    }
    
    const handleJobType = (e) => {
        if (e.target.checked) {
            setJobTypee(prevState => [...prevState, e.target.name])
        }
        else {
            if (!e.target.checked) {
                const removeUnwantedJobType = jobTypee.filter((v) => {
                    return v !== e.target.name
                })
                setJobTypee(removeUnwantedJobType)
            }
        }
    }

    const handleSchedule = (e) => {
        if (e.target.checked) {
            setSchedule(prevState => [...prevState, e.target.name])
        }
        else {
            if (!e.target.checked) {
                const removeUnwantedSchedule = schedule.filter((v) => {
                    return v !== e.target.name
                })
                setSchedule(removeUnwantedSchedule)
            }
        }
    }


    const initializeReset = () => {
        setApplyFilterCount(0)

        setSkills([]);
        setSectors([]);
        setSpecialization([]);
        setLocation([]);
        setWorkplaceType([]);
        setJobTypee([]);
        setSchedule([]);

        var rmv = document.querySelectorAll('input[type=checkbox]')
        for (var i = 0; i < rmv.length; i++) {
            rmv[i].checked = false
        }

        const object = {
            skills: [],
            sector: [],
            specialisation: [],
            workplace_type: [],
            location: [],
            job_type: [],
            work_schedule: [],
            page_number: 1
        }

        setAnswer([]);
        setApplyFilterCount(0);
        setGettingResponse(false)
        setapplyFilterResponse(true)
        getHomeAll("pagination", 1)
    }

    

    useEffect(()=>{
        var getFilterLength = skills.length + sectors.length + location.length + workplaceType.length + jobTypee.length + schedule.length
        setApplyFilterCount(getFilterLength)
    },[skills,sectors,sectors,location,workplaceType,jobTypee,schedule])



    const initializeFilter = () => {
        setAnswer([])
        var getFilterLength = skills.length + sectors.length + location.length + workplaceType.length + jobTypee.length + schedule.length
        setApplyFilterCount(getFilterLength)

        if (getFilterLength > 0) {
            var a = skills.map((v) => v.label)
            var b = sectors.map((v) => v.label)
            var c = specialization.map((v) => v.label)
            var d = location.map((v) => v.label)

            const object = {
                skills: a,
                sector: b,
                specialisation: c,
                workplace_type: workplaceType,
                location: d,
                job_type: jobTypee,
                work_schedule: schedule,
                page_number: 1
            }
            setFilteringObject(object)
            setGettingResponse(false)
            setapplyFilterResponse(true)
            handleApplyFilter({ object })
        } else {
            toast.error('fields are empty');
        }
    }

    return (
        <form>

            {
                gettingResponse === false && applyFilterResponse === false ?
                    filterHeadings.map((value, index) => {
                        return <div className="mb-5 placeholder-glow" key={index}>
                            <p className="card-title placeholder col-6 rounded py-3"></p>
                            <h6 className="card-text placeholder col-12 rounded py-2 pt-3"></h6>
                        </div>
                    })
                    :
                    null
            }
            {
                applyFilterCount > 0 ?
                    <div className='mb-3'>
                        <Button id="professionalHomeClearDataButton" buttonType={"button"} className={"btn btn-transparent border border-brand-color w-100"} functionOnchange={initializeReset} title={"Clear Filter"} />
                    </div>
                    :
                    null
            }



            {
                FilterArray.schedule !== undefined ?
                    <div className="mb-4">
                        <h5 className="job-filter-sub-headings">Schedule</h5>
                        {
                            FilterArray.schedule.length !== 0 ? <>
                                {FilterArray.schedule.map((value, index) => {
                                    return <div className="form-check ms-3" key={index}>
                                        <Input name={value} functionOnchange={handleSchedule} className={"form-check-input"} type={"checkbox"} testId={value} id={`workplace_${value}`} formFieldName={value} formLableFor={`workplace_${value}`} formLableClass={"form-check-label"} />
                                    </div>
                                })}
                            </>
                                :
                                null
                        }
                    </div>
                    :
                    null
            }

            {
                FilterArray.skill !== undefined ?
                    <div className='mb-4'>
                        <h6 className='fw-bold'>Skills</h6>
                        <Select
                            multi
                            color='#ffa32d'
                            style={{ fontSize: ".9rem" }}
                            className='rounded-1'
                            options={skills.length < 5 ? skillData : []}
                            addPlaceholder="Only 5 Skills Can be selected"
                            onChange={(values) => setSkills(values)}
                            values={skills}
                        />
                    </div>
                    :
                    null
            }

            {
                FilterArray.sector !== undefined ?
                    <div className='mb-4'>
                        <h6 className='fw-bold'>Sector</h6>
                        <Select
                            multi
                            color='#ffa32d'
                            style={{ fontSize: ".9rem" }}
                            className='rounded-1'
                            options={sectors.length < 5 ? sectorData : []}
                            addPlaceholder="Only 5 sectors Can be selected"
                            onChange={(values) => setSectors(values)}
                            values={sectors}
                        />
                    </div>
                    :
                    null
            }

            {
                FilterArray.specialisation !== undefined ?
                    <div className='mb-4'>
                        <h6 className='fw-bold'>Functional Specialization</h6>
                        <Select
                            multi
                            color='#ffa32d'
                            style={{ fontSize: ".9rem" }}
                            className='rounded-1'
                            options={specialization.length < 5 ? specialisationData : []}
                            addPlaceholder="Only 5 specialization Can be selected"
                            onChange={(values) => setSpecialization(values)}
                            values={specialization}
                        />
                    </div>
                    :
                    null
            }

            {
                FilterArray.workplace_type !== undefined ?
                    <div className="mb-4">
                        <h5 className="job-filter-sub-headings">Workplace Type</h5>
                        {
                            FilterArray.workplace_type.length !== 0 ? <>
                                {FilterArray.workplace_type.map((value, index) => {
                                    return <div className="form-check ms-3" key={index}>
                                        <Input name={value} functionOnchange={handleWorkplaceType} className="form-check-input" type="checkbox" testId={value} id={`workplace_${value}`} formFieldName={value} formLableFor={`workplace_${value}`} formLableClass={"form-check-label"} />
                                    </div>
                                })}
                            </>
                                :
                                null
                        }
                    </div>
                    :
                    null
            }


            {
                FilterArray.location !== undefined ?
                    <div className='mb-4'>
                        <h6 className='fw-bold'>Location</h6>
                        <Select
                            multi
                            color='#ffa32d'
                            style={{ fontSize: ".9rem" }}
                            className='rounded-1'
                            options={locationData}
                            onChange={(values) => setLocation(values)}
                            values={location}
                        />
                    </div>
                    :
                    null
            }


            {
                FilterArray.job_type !== undefined ?
                    <div className="mb-4">
                        <h5 className="job-filter-sub-headings">Job Type</h5>
                        {
                            FilterArray.job_type.length !== 0 ? <>
                                {FilterArray.job_type.map((value, index) => {
                                    return <div className="form-check ms-3" key={index}>
                                        <Input name={value} functionOnchange={handleJobType} className={"form-check-input reset-jobType"} type={"checkbox"} testId={value} id={`workplace_${value}`} formFieldName={value} formLableFor={`workplace_${value}`} formLableClass={"form-check-label"} />
                                    </div>
                                })}
                            </>
                                :
                                null
                        }
                    </div>
                    :
                    null
            }



            <div >
                {
                    gettingResponse === false ?
                        <Button buttonType={"button"} className={"btn btn-brand-color w-100 placeholder pointer"} title={"Apply Filter"} />
                        :
                        <Button id="professionalHomeApplyFilterButton" buttonType={"button"} className={"btn btn-brand-color w-100"} title={"Apply Filter"} functionOnchange={() => {
                            initializeFilter()
                        }} />
                }
            </div>
        </form>
    )
}

export default HomeFilterForm