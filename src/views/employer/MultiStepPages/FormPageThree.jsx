import React, { useEffect, useState } from 'react'
import Select from 'react-dropdown-select'
import Button from '../../../components/Button/Button'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const FormPageThree = ({

    pageThreeJobDetails,
    setPageThreeJobDetails,
    handleJobDescription,
    handleSkills,
    handleSpecialization
}) => {


    const [editorHtml, setEditorHtml] = useState('');
    const [skillDataResponse, setSkillDataResponse] = useState([])
    const skillsData = [
        {
            "value": 1,
            "label": "Agile Methodologies"
        },
        {
            "value": 2,
            "label": "Algorithm Design"
        },
        {
            "value": 3,
            "label": "Analytics"
        },
        {
            "value": 4,
            "label": "Application Programming Interfaces (APIs)"
        },
        {
            "value": 5,
            "label": "Budgeting"
        },
        {
            "value": 6,
            "label": "Business Strategy"
        },
        {
            "value": 7,
            "label": "Change Management"
        },
        {
            "value": 8,
            "label": "Conflict Resolution"
        },
        {
            "value": 9,
            "label": "Contract Management Skills"
        },
        {
            "value": 10,
            "label": "Data Analysis"
        },
        {
            "value": 11,
            "label": "Database Design"
        },
        {
            "value": 12,
            "label": "Debugging"
        },
        {
            "value": 13,
            "label": "Direct Sales"
        },
        {
            "value": 14,
            "label": "Earned Value Management"
        },
        {
            "value": 15,
            "label": "Financial Management"
        },
        {
            "value": 16,
            "label": "Human Resource Management"
        },
        {
            "value": 17,
            "label": "Keyword Research"
        },
        {
            "value": 18,
            "label": "Leadership Skills"
        },
        {
            "value": 19,
            "label": "Market Research"
        },
        {
            "value": 20,
            "label": "Marketing Skills"
        },
        {
            "value": 21,
            "label": "Metrics and KPIs"
        },
        {
            "value": 22,
            "label": "Mobile Application Development"
        },
        {
            "value": 23,
            "label": "Negotiation"
        },
        {
            "value": 24,
            "label": "Operations Management"
        },
        {
            "value": 25,
            "label": "Organizational Development"
        },
        {
            "value": 26,
            "label": "Presentation"
        },
        {
            "value": 27,
            "label": "Process Improvement"
        },
        {
            "value": 28,
            "label": "Product Knowledge"
        },
        {
            "value": 29,
            "label": "Project Management"
        },
        {
            "value": 30,
            "label": "Quality Assurance (QA)"
        },
        {
            "value": 31,
            "label": "Recruiting"
        },
        {
            "value": 32,
            "label": "Revenue Expansion"
        },
        {
            "value": 33,
            "label": "Risk Assessment"
        },
        {
            "value": 34,
            "label": "SaaS Knowledge"
        },
        {
            "value": 35,
            "label": "Sales and Budget Forecasting"
        },
        {
            "value": 36,
            "label": "Sales Strategy and Planning"
        },
        {
            "value": 37,
            "label": "Salesforce"
        },
        {
            "value": 38,
            "label": "Strategic Planning"
        },
        {
            "value": 39,
            "label": "Supply Chain Management"
        },
        {
            "value": 40,
            "label": "Talent Management"
        },
        {
            "value": 41,
            "label": "Team Leadership"
        },
        {
            "value": 42,
            "label": "Upselling"
        }
    ];


    useEffect(() => {
        var skillsFromResponse = pageThreeJobDetails.skills.map((v, i) => {
            return { id: i + 1, label: v.trim() }
        })

        var newUpdatedSkills = []
        for (var i = 0; i < skillsFromResponse.length; i++) {
            for (var j = 0; j < skillsData.length; j++) {
                if (skillsFromResponse[i].label === skillsData[j].label) {
                    newUpdatedSkills[newUpdatedSkills.length] = skillsData[j]
                }
            }
        }
        setSkillDataResponse(newUpdatedSkills)
    }, [pageThreeJobDetails])

    const modules = {
        toolbar: [
            
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
           
        ],
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
    ];

    const handleQuillTextChange = (e, html) => {
        setEditorHtml(html);
    };


    const handleResumeButton = (e) => {


        if (e.target.value === 'Yes') {
            // setCandidateDetails(true)
            // setRadioValue('Y')
        }
        else {
            // setCandidateDetails(false)
            // // setRadioValue('N')
        }
    }





    return (
        <>
            <div className="container-fluid ">
                <div className='row row-cols-12'>
                    <div className="col-lg-7 col-md-9 col-sm-12 col-12 mx-auto">
                        <div className="card shadow-sm border-0 rounded-4 h-100 employerHomePadding py-2">
                            <div className="card-body  pb-5">


                                {/* Skills and Functional Specialization */}
                                <div className="d-flex align-items-start justify-content-center w-100 mb-3">
                                    <div className='w-50 pe-4'>
                                        <h6 className="card-title fw-semibold">Skills</h6>
                                        <div className="dropdown custom-dropdown ">
                                            <Select
                                                multi
                                                color='#ffa32d'
                                                style={{ fontSize: ".8rem" }}
                                                className='rounded-1'
                                                options={skillsData}
                                                onChange={(e, values) => handleSkills(e, values)}
                                                values={skillDataResponse}
                                                placeholder='Select'
                                            />
                                            {/* <Button
                                            className="btn btn-secondary dropdown-toggle w-100 px-2 py-2 dropDownButton"
                                            buttonType="button"
                                            databstoggle="dropdown"
                                            ariaexpanded="false"
                                            title={pageThreeJobDetails.skills === '' ? 'Select skill' : pageThreeJobDetails.skills}
                                        /> */}
                                            {/* <ul className="dropdown-menu border-0 shadow">
                                            <li><a className="dropdown-item" onClick={() => handleSkills('Java')}>Java </a></li>
                                            <hr className='m-0 mx-3 buttonLineColor' />
                                            <li><a className="dropdown-item" onClick={() => handleSkills('Python')}>Python </a></li>
                                            <hr className='m-0 mx-3 buttonLineColor' />
                                            <li><a className="dropdown-item" onClick={() => handleSkills('MangoDB')}>MangoDB </a></li>
                                        </ul> */}
                                        </div>
                                    </div>
                                    <div className='w-50'>
                                        <h6 className="fw-semibold">Functional Specialization</h6>
                                        <div className="dropdown custom-dropdown ">
                                            <button
                                                className="btn btn-secondary dropdown-toggle dropdownFontSize w-100 px-2 py-2 dropDownButton"
                                                type="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >{pageThreeJobDetails.specialization === '' ? 'Select' : pageThreeJobDetails.specialization}</button>
                                            {/* <Button
                                            className="btn btn-secondary dropdown-toggle w-100 px-2 py-2 dropDownButton"
                                            buttonType="button"
                                            databstoggle="dropdown"
                                            ariaexpanded="false"
                                            title={pageThreeJobDetails.specialization === '' ? 'Select Specialization' : pageThreeJobDetails.specialization}
                                        /> */}
                                            <ul className="dropdown-menu border-0 shadow">
                                                <li><a className="dropdown-item dropdownFontSize" onClick={() => handleSpecialization('Banking and Finance')}>Banking and Finance </a></li>
                                                <hr className='m-0 mx-3 buttonLineColor' />
                                                <li><a className="dropdown-item dropdownFontSize" onClick={() => handleSpecialization('HR')}>HR </a></li>
                                                <hr className='m-0 mx-3 buttonLineColor' />
                                                <li><a className="dropdown-item dropdownFontSize" onClick={() => handleSpecialization('Marketing')}>Marketing </a></li>
                                                <hr className='m-0 mx-3 buttonLineColor' />
                                                <li><a className="dropdown-item dropdownFontSize" onClick={() => handleSpecialization('Other')}>Other </a></li>
                                                <hr className='m-0 mx-3 buttonLineColor' />
                                                <li><a className="dropdown-item dropdownFontSize" onClick={() => handleSpecialization('Sales & Marketing')}>Sales & Marketing </a></li>
                                                <hr className='m-0 mx-3 buttonLineColor' />
                                                <li><a className="dropdown-item dropdownFontSize" onClick={() => handleSpecialization('Technology Management')}>Technology Management </a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Job Description */}
                                <div className='employer-job-description mb-3'>
                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                        <div><p className="card-title fw-semibold">Job Description</p></div>
                                        <div><span >(min 250 char - max 10,000 char)
                                        </span></div>
                                    </div>

                                    <ReactQuill
                                        style={{ height: '200px', marginBottom: '3rem', height: '20rem', borderRadius:'2rem'}}
                                        theme="snow"
                                        modules={modules}
                                        formats={formats}
                                        value={pageThreeJobDetails.jobDescription}
                                        
                                        onChange={(e) => handleJobDescription(e)}
                                        
                                    />

                                    {/* <textarea className='w-100 rounded p-2 form-control' value={pageThreeJobDetails.jobDescription} onChange={handleJobDescription} rows={14} placeholder='Enter a detailed description of the job' name="job_description" id="job_description"></textarea> */}
                                </div>




                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default FormPageThree