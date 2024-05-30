import React, { useContext, useState } from 'react'
import Autocomplete from "react-google-autocomplete";
import RadioForm from './RadioForm';
import employerContext from '../../../hooks/employerContext';

const FormPageTwo = ({
    pageTwoJobDetails,
    setPageTwoJobDetails,
    handleWorkplaceType,
    handleLocation,
    handleJobTitle,
    handleJobOverview,
    handlejobType,
    handleTimeCommitment,
    handleTimeZone,
    handleDuration,
    handleSchedule,
    handleCompensation,
    jobLocation,
    setJobLocation,
    handleJobLocation,
    txtdurations,
    settxtDurations
}) => {


    // Api states



    const {
        showingJobLocation,
        setShowingJobLocation,
        editCompanyLocation,
        setEditCompanyLocation,
    } = useContext(employerContext)


    return (
        <>
            <div className="container-fluid">
                <div className='row row-cols-12'>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12 mx-auto">
                        {/* <div className="w-100 "> */}
                        <div className="card col-12 col-md-9 col-lg-8 mx-auto border-0 shadow-sm rounded-4 py-4 employerHomePadding mb-4">
                            <form className='col-12 mx-auto'>
                                <div className="mb-4">
                                    <label htmlFor="jobTitle" className="form-label fs-6 fw-semibold">Job Role</label>
                                    <input type="text" className="form-control px-3" id="jobTitle" value={pageTwoJobDetails.jobTitle.slice(0, 80)} onChange={handleJobTitle} placeholder='Enter your job role here' aria-describedby="emailjobTitleHelp" />
                                </div>

                                <div>
                                    <div className="row mb-2 ">
                                        <div className="col-lg-12 d-flex justify-content-between ">
                                            <h6 className='fw-semibold'>Job Overview</h6>
                                            <div>
                                                (min 30 char - max 300 char)
                                            </div>
                                        </div>
                                    </div>
                                    <div className="container">
                                        <div className="row">
                                            <textarea
                                                className="p-3 rounded-3 form-control"
                                                name="experienceDescription"
                                                required
                                                minLength="30"
                                                maxLength="10000"
                                                rows={5}
                                                placeholder="Enter an overview of the job"
                                                value={pageTwoJobDetails.jobOverview.slice(0, 300)}
                                                onChange={handleJobOverview}

                                            ></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-12 mx-auto'>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className='d-flex align-items-center justify-content-between'>
                                                <div className='fw-semibold'>Workplace Type</div>
                                                <div className="dropdown custom-dropdown mt-3 mb-3 w-50">
                                                    <button
                                                        className="btn btn-secondary dropdown-toggle w-100 dropdownFontSize"
                                                        type="button"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                    >
                                                        {pageTwoJobDetails.workplaceType === ""
                                                            ? "On-site"
                                                            : pageTwoJobDetails.workplaceType}
                                                    </button>
                                                    <ul className="dropdown-menu">
                                                        <li onClick={() => handleWorkplaceType("On-site")}>
                                                            <a className="dropdown-item dropdownFontSize">On-site</a>
                                                        </li>
                                                        <hr className='m-0 mx-3 buttonLineColor' />
                                                        <li onClick={() => handleWorkplaceType("Hybrid")}>
                                                            <a className="dropdown-item dropdownFontSize">Hybrid</a>
                                                        </li>
                                                        <hr className='m-0 mx-3 buttonLineColor' />
                                                        <li onClick={() => handleWorkplaceType("Remote")}>
                                                            <a className="dropdown-item dropdownFontSize">Remote</a>
                                                        </li>

                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className='d-flex align-items-center justify-content-between'>
                                                <div className='fw-semibold'>Time Commitment</div>
                                                <div className="dropdown custom-dropdown mt-3 mb-3 w-50">
                                                    <button
                                                        className="btn btn-secondary dropdown-toggle w-100 dropdownFontSize"
                                                        type="button"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                    >
                                                        {pageTwoJobDetails.timeCommitment === ""
                                                            ? "Select"
                                                            : pageTwoJobDetails.timeCommitment}
                                                    </button>
                                                    <ul className="dropdown-menu">
                                                        <li onClick={() => handleTimeCommitment("<10 hours  / week")}>
                                                            <a className="dropdown-item dropdownFontSize">{`< 10 hours / week`}</a>
                                                        </li>
                                                        <hr className='m-0 mx-3 buttonLineColor' />
                                                        <li onClick={() => handleTimeCommitment("10-20 hours / week")}>
                                                            <a className="dropdown-item dropdownFontSize">10-20 hours / week</a>
                                                        </li>
                                                        <hr className='m-0 mx-3 buttonLineColor' />
                                                        <li onClick={() => handleTimeCommitment("20-30 hours / week")}>
                                                            <a className="dropdown-item dropdownFontSize">20-30 hours / week</a>
                                                        </li>
                                                        <hr className='m-0 mx-3 buttonLineColor' />
                                                        <li onClick={() => handleTimeCommitment("30-40 hours / week")}>
                                                            <a className="dropdown-item dropdownFontSize">30-40 hours / week</a>
                                                        </li>

                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className='d-flex align-items-center justify-content-between'>

                                                <div className={(pageTwoJobDetails.workplaceType !== "Remote" || jobLocation === "") ? " fw-semibold" : "opacity-50"}>Location</div>
                                                <div className="dropdown custom-dropdown mt-3 mb-3 w-50">


                                                    <Autocomplete
                                                        className="location-input employer-location"
                                                        apiKey={process.env.REACT_APP_GOOGLE_PLACES_KEY}
                                                        onPlaceSelected={(place) => {
                                                            if (place) {
                                                                handleJobLocation(place.address_components);
                                                            }
                                                        }}
                                                        style={{ width: "100%", borderRadius: '5px', fontSize: '0.8rem', color: `${pageTwoJobDetails.workplaceType === "Remote" ? "text-secondary" : "fw-semibold"}` }}
                                                        placeholder="Enter a location"
                                                        disabled={pageTwoJobDetails.workplaceType === "Remote" ? "disabled opactiy-25 " : ""}
                                                        value={showingJobLocation}
                                                        onChange={(e) => setShowingJobLocation(e.target.value)}
                                                    />

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className='d-flex align-items-center justify-content-between'>
                                                <div className='fw-semibold'>Time Zone</div>
                                                <div className="dropdown custom-dropdown mt-3 mb-3 w-50">
                                                    <button
                                                        className="btn btn-secondary dropdown-toggle w-100 dropdownFontSize text-wrap"
                                                        type="button"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                    >
                                                        {pageTwoJobDetails.timeZone === "" || pageTwoJobDetails.timeZone === null
                                                            ? "Select"
                                                            : pageTwoJobDetails.timeZone}
                                                    </button>
                                                    <ul className="dropdown-menu">
                                                        <li onClick={() => handleTimeZone("IST - Indian Standard Time (India)")}>
                                                            <a className="dropdown-item text-wrap dropdownFontSize">IST - Indian Standard Time (India)</a>
                                                        </li>
                                                        <hr className='m-0 mx-3 buttonLineColor' />
                                                        <li onClick={() => handleTimeZone("EST/EDT - Eastern Time (US)")}>
                                                            <a className="dropdown-item text-wrap dropdownFontSize">EST/EDT - Eastern Time (US)</a>
                                                        </li>
                                                        <hr className='m-0 mx-3 buttonLineColor' />
                                                        <li onClick={() => handleTimeZone("CST/CDT - Central Time (US)")}>
                                                            <a className="dropdown-item text-wrap dropdownFontSize">CST/CDT - Central Time (US)</a>
                                                        </li>
                                                        <hr className='m-0 mx-3 buttonLineColor' />
                                                        <li onClick={() => handleTimeZone("MST/MDT - Mountain Time (US)")}>
                                                            <a className="dropdown-item text-wrap dropdownFontSize">MST/MDT - Mountain Time (US)</a>
                                                        </li>
                                                        <hr className='m-0 mx-3 buttonLineColor' />
                                                        <li onClick={() => handleTimeZone("PST/ PDT - Pacific Time (US)")}>
                                                            <a className="dropdown-item text-wrap dropdownFontSize">PST/ PDT - Pacific Time (US)</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className='d-flex align-items-center justify-content-between'>
                                                <div className='fw-semibold'>Job Type</div>
                                                <div className="dropdown custom-dropdown mt-3 mb-3 w-50">
                                                    <button
                                                        className="btn btn-secondary dropdown-toggle w-100 dropdownFontSize"
                                                        type="button"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                    >
                                                        {pageTwoJobDetails.jobType === ""
                                                            ? "Contract"
                                                            : pageTwoJobDetails.jobType}
                                                    </button>
                                                    <ul className="dropdown-menu">
                                                        <li onClick={() => handlejobType("Contract")}>
                                                            <a className="dropdown-item dropdownFontSize">Contract</a>
                                                        </li>
                                                        <hr className='m-0 mx-3 buttonLineColor' />
                                                        <li onClick={() => handlejobType("Full-time")}>
                                                            <a className="dropdown-item dropdownFontSize">Full-time</a>
                                                        </li>
                                                        <hr className='m-0 mx-3 buttonLineColor' />
                                                        <li onClick={() => handlejobType("Part-time")}>
                                                            <a className="dropdown-item dropdownFontSize">Part-time</a>
                                                        </li>
                                                        <hr className='m-0 mx-3 buttonLineColor' />
                                                        <li onClick={() => handlejobType("Volunteer")}>
                                                            <a className="dropdown-item dropdownFontSize">Volunteer</a>
                                                        </li>
                                                        <hr className='m-0 mx-3 buttonLineColor' />
                                                        <li onClick={() => handlejobType("Other")}>
                                                            <a className="dropdown-item dropdownFontSize">Other</a>
                                                        </li>

                                                    </ul>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="col-lg-6">
                                            <div className='d-flex align-items-center justify-content-center mt-3'>
                                                <div className='fw-semibold w-75'>Duration</div>
                                                <div className='input-group w-75'>
                                                    {/* <div className='w-25'> */}
                                                    <input type="number" className='form-control rounded-2 dropdownFontSize durationPadding' maxLength="3" value={txtdurations.count} onChange={(e) => settxtDurations({ ...txtdurations, count: e.target.value })} />
                                                    {/* </div> */}
                                                    <div className="dropdown custom-dropdown w-50">
                                                        <button
                                                            className="btn btn-secondary dropdown-toggle w-100 dropdownFontSize"
                                                            type="button"
                                                            data-bs-toggle="dropdown"
                                                            aria-expanded="false"
                                                        >
                                                            {txtdurations.format}
                                                        </button>
                                                        <ul className="dropdown-menu">
                                                            <li  onClick={() => settxtDurations({ ...txtdurations, format: "Weeks" })}>
                                                                <a className="dropdown-item dropdownFontSize customDropDownPadding">Weeks</a>
                                                            </li>
                                                            <hr className='m-0 mx-3 buttonLineColor' />
                                                            <li  onClick={() => settxtDurations({ ...txtdurations, format: "Months" })}>
                                                                <a className="dropdown-item dropdownFontSize customDropDownPadding">Months</a>
                                                            </li>
                                                            <hr className='m-0 mx-3 buttonLineColor' />
                                                            <li  onClick={() => settxtDurations({ ...txtdurations, format: "Years" })}>
                                                                <a className="dropdown-item dropdownFontSize customDropDownPadding">Years</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                <div className="row align-items-center" >
                                    <div className="col-lg-6">
                                        <div className='d-flex align-items-center justify-content-between'>
                                            <div className='fw-semibold'>Schedule</div>
                                            <div className="dropdown custom-dropdown mt-3 mb-3 w-50">
                                                <button
                                                    className="btn btn-secondary dropdown-toggle w-100 dropdownFontSize"
                                                    type="button"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    {pageTwoJobDetails.schedule === ""
                                                        ? "Fixed"
                                                        : pageTwoJobDetails.schedule}
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li onClick={() => handleSchedule("Fixed")}>
                                                        <a className="dropdown-item dropdownFontSize">Fixed</a>
                                                    </li>
                                                    <hr className='m-0 mx-3 buttonLineColor' />
                                                    <li onClick={() => handleSchedule("Flexible")}>
                                                        <a className="dropdown-item dropdownFontSize">Flexible</a>
                                                    </li>
                                                    <hr className='m-0 mx-3 buttonLineColor' />
                                                    <li onClick={() => handleSchedule("Weekend only")}>
                                                        <a className="dropdown-item dropdownFontSize">Weekend only</a>
                                                    </li>
                                                    <hr className='m-0 mx-3 buttonLineColor' />
                                                    <li onClick={() => handleSchedule("Monday to Friday")}>
                                                        <a className="dropdown-item dropdownFontSize">Monday to Friday</a>
                                                    </li>
                                                    <hr className='m-0 mx-3 buttonLineColor' />
                                                    <li onClick={() => handleSchedule("Other")}>
                                                        <a className="dropdown-item dropdownFontSize">Other</a>
                                                    </li>

                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">

                                        <div className='d-flex align-items-center justify-content-between flex-wrap'>
                                            <div className='fw-semibold'>Compensation</div>

                                            <div className='d-flex align-items-start justify-content-between gap-3'>
                                                <div className='d-flex align-items-center'>
                                                    <div className="form-check">
                                                        <input className="form-check-input yesOrNoRadioButtonColor" type="radio" name="compensation" value="Y" checked={pageTwoJobDetails.compensation === "Y" ? true : false} id="paid" onChange={handleCompensation} />
                                                    </div>
                                                    <label htmlFor='paid'>
                                                        Paid
                                                    </label>
                                                </div>
                                                <div className='d-flex align-items-center'>
                                                    <div className="form-check ">
                                                        <input className="form-check-input yesOrNoRadioButtonColor" type="radio" name="compensation" value="N" checked={pageTwoJobDetails.compensation === "N" ? true : false} id="volunteer" onChange={handleCompensation} />
                                                    </div>
                                                    <label htmlFor='volunteer'>
                                                        Volunteer
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </form>
                </div>

            </div>
        </div >
            </div >
        </>
    )
}

export default FormPageTwo