import React, { useState } from 'react'
import RadioForm from './RadioForm'
import Button from '../../../components/Button/Button'
import { MdModeEditOutline } from "react-icons/md";
import { MdSave, MdDelete } from "react-icons/md";

const FormPageFour = ({
    handleResume,
    handleCoverLetter,
    handleBgCheck,
    handleHiring,
    pageFourJobDetails,
    setPageFourJobDetails,
    singleQuestion,
    setSingleQuestion,
    handleSingleQuestion,
    multipleQuestionsArray,
    setmultipleQuestionsArray,
    addSingleQuestionToArray,
    uiDisplayquestion,
    setUiDisplayQuestion
}) => {


    // const [editQuestion, setEditQuestion] = useState(false)
    // const [fieldId, setFieldId] = useState('')
    // const handleAdditionalQuestionsEdit = (e, value, index) => {
    //     value === value ?
    //         setEditQuestion(true) : setEditQuestion(false);
    //     setSingleQuestion(e.target.value)
    // }

    // const handleAdditionalQuestionSave = (e, index) => {
    //     setEditQuestion(false)
    // }

    // const handleChangeEdit = (e) => {
    //     setUiDisplayQuestion(e.target.value)
    //     setSingleQuestion(e.target.value)
    // }

    const handleAdditionalQuestionDelete = (e, index) => {
        const result = multipleQuestionsArray.filter((v, i) => {
            return i !== index

        })
        setmultipleQuestionsArray(result)


        const resultArray = result.map((v) => {
            return v.singleQuestion
        })
        setUiDisplayQuestion(resultArray)
    }


    return (
        <>
            <div className="container-fluid ">
                <div className='row row-cols-12'>
                    <div className="col-lg-7 col-md-9 col-sm-12 col-12 mx-auto">
                        <div className="card shadow-sm border-0 rounded-4 h-100 employerHomePadding py-2">
                            <div className="card-body">

                                <h6 className='fw-semibold'>Questions</h6>

                                <RadioForm
                                    radioText="Do you want the professional to upload the resume ?"
                                    radioTextId={"resume"}
                                    firstRadioTitle="Yes"
                                    secondRadioTitle="No"
                                    firstRadioId="resume1"
                                    secondRadioId="resume2"
                                    firstRadioValue="Y"
                                    secondRadioValue="N"
                                    radiocommonName="resume"
                                    handleRadioButton={handleResume}
                                    responseYorN={pageFourJobDetails.resume}
                                    pageFourRadio={true}
                                />
                                <RadioForm
                                    radioText="Do you want the professional to upload the cover letter  ?"
                                    radioTextId={"coverLetter"}
                                    firstRadioTitle="Yes"
                                    secondRadioTitle="No"
                                    firstRadioId="coverLetter1"
                                    secondRadioId="coverLetter2"
                                    firstRadioValue="Y"
                                    secondRadioValue="N"
                                    radiocommonName="coverLetter"
                                    handleRadioButton={handleCoverLetter}
                                    responseYorN={pageFourJobDetails.coverLetter}
                                    pageFourRadio={true}
                                />
                                {/* <RadioForm
                                    radioText="Do you require a background check for this job ?"
                                    radioTextId={"bgCheck"}
                                    firstRadioTitle="Yes"
                                    secondRadioTitle="No"
                                    firstRadioId="bgCheck1"
                                    secondRadioId="bgCheck2"
                                    firstRadioValue="Y"
                                    secondRadioValue="N"
                                    radiocommonName="bgCheck"
                                    handleRadioButton={handleBgCheck}
                                    responseYorN={pageFourJobDetails.bgCheck}
                                    pageFourRadio={true}
                                /> */}
                                <RadioForm
                                    radioText="Do you want to subcontract the hiring process to the 2nd Careers team ?"
                                    className=""
                                    radioTextId={"hiring"}
                                    firstRadioTitle="Yes"
                                    secondRadioTitle="No"
                                    firstRadioId="hiring1"
                                    secondRadioId="hiring2"
                                    firstRadioValue="Y"
                                    secondRadioValue="N"
                                    radiocommonName="hiring"
                                    handleRadioButton={handleHiring}
                                    responseYorN={pageFourJobDetails.hiring}
                                    pageFourRadio={true}
                                />
                                <div id='additionalQuestions'>
                                    <h6 className='fw-semibold my-3 '>Additional Questions</h6>
                                    <ol>
                                        {uiDisplayquestion.map((value, index) => {
                                            return (


                                                <React.Fragment key={index}>
                                                    <div key={index} className='d-flex align-items-center justify-content-between'>
                                                        <div className='w-100'>
                                                            <div className="d-flex justify-content-between mb-3">
                                                                <li className='mb-0 w-100'>{value}</li>
                                                                <MdDelete
                                                                    className="icon edit-icon fs-4 brand-color"
                                                                    onClick={(e) => handleAdditionalQuestionDelete(e, index)}

                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            )
                                        })}
                                    </ol>


                                </div>

                                {/* Job Questions */}
                                <div className='employer-job-questions my-1 mb-3'>
                                    
                                    <textarea className={pageFourJobDetails.questions.length > 2 ? 'd-none' :'w-100 rounded mt-3 p-2 form-control'}  rows={2} value={singleQuestion} onChange={(e) => handleSingleQuestion(e)} placeholder='Enter additional questions you would like the professionals to answer' name="job_description" id="job_description"></textarea>
                                </div>
                                <button className="btn btn-outline-dark col-12 fw-semibold" disabled={pageFourJobDetails.questions.length > 2 } type='button' onClick={addSingleQuestionToArray}>Add question</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default FormPageFour