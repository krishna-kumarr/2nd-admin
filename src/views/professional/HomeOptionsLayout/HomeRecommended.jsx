import React, { useContext, useEffect, useState } from 'react'
import JobCard from '../../../layouts/Home/JobCard'
import CommonContext from '../../../hooks/CommonContext';
import axios from "axios";
import HomePagination from './HomePagination';
import toast from 'react-hot-toast';
import Image from "../../../utils/images";



const HomeRecommended = () => {
    const jobCards = ["dummy", "dummy", "dummy"];
    const { setApplyFilterCount,getRecommendedData,setSelectedCardPath, setAnswer, setSelectedCardIndex, cardArrayDuplicateSearch, setCardArrayDuplicateSearch, setapplyFilterResponse, refreshId, refreshAction, setRefreshAction, cardArray, setCardArray, cardArrayDuplicate, setCardArrayDuplicate, setSelectedCardData, gettingResponse, setGettingResponse } = useContext(CommonContext);

    useEffect(() => {
        if (refreshAction === false) {
            setapplyFilterResponse(false)
            setGettingResponse(false)
            setCardArray([])
            setCardArrayDuplicate([])
            setSelectedCardData([])
            setCardArrayDuplicateSearch([])
            setSelectedCardPath(window.location.pathname)
            setSelectedCardIndex(0)
        }
        setApplyFilterCount(0)
        setAnswer([])

        getRecommendedData()
    }, [refreshId])

    return (
        <div className="col-12 h-100 overflow-scroll" id="professionalHomeRecommendedScroll">
            <div className="d-flex justify-content-between p-2 align-items-center">
                <div className="col">
                    {
                        gettingResponse === false ? <label className="filter-results placeholder rounded py-3 w-50"></label>
                            :
                            <label className="filter-results">Showing : {cardArrayDuplicate.length} Recommeded results</label>
                    }

                </div>
            </div>


            {/* job card skeleton  */}
            {gettingResponse === false ?
                jobCards.map((value, index) => {
                    return <div className="card w-100 mt-2 rounded-4 border-0" key={index}>
                        <div className="card-body ">
                            <div className="d-flex align-items-center my-2">
                                <div className="flex-shrink-0 placeholder rounded-circle pe-none">
                                    <img src={''} width={52} height={52} className='opacity-0' />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <p className='job-card-posted-time placeholder col-5 rounded py-3'></p>
                                    <h6 className='job-card-component-heading placeholder col-8 rounded py-2 pt-3'></h6>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between card-company-details-icon mt-4">
                                <label className="fs-7 card-inner-details col-3">
                                    <span className='placeholder rounded py-2 pt-3 w-100'>

                                    </span>
                                </label>
                                <label className="fs-7 card-inner-details col-2">
                                    <span className='placeholder rounded py-2 pt-3 w-100'>

                                    </span>
                                </label>
                                <label className="fs-7 card-inner-details col-2">
                                    <span className='placeholder rounded py-2 pt-3 w-100'>

                                    </span>
                                </label>
                                <label className="fs-7 card-inner-details col-2">
                                    <span className='placeholder rounded py-2 pt-3 w-100'>

                                    </span>
                                </label>
                            </div>
                            <p className='mt-4 job-card-description placeholder rounded skeleton-jobParagraph col-12'> </p>
                        </div>
                    </div>
                })
                :
                null
            }

            {
                cardArrayDuplicateSearch.length > 0 && gettingResponse ?
                    cardArrayDuplicateSearch.map((value, index) => {
                        return <div className="card w-100 mt-2 rounded-4 border-0" key={index}>
                            <div className="card-body position-relative pt-4" id={`professionalRecommendedJob${index}Card`}>
                                <JobCard
                                    cardHeading={value.job_title}
                                    cardPostedOn={value.created_at}
                                    cardWorkplace={value.workplace_type}
                                    cardState={value.country}
                                    cardSchedule={value.work_schedule}
                                    cardJobType={value.job_type}
                                    cardPayment={value.is_paid === "Y" ? "Paid" : "Volunteer"}
                                    applicationStatus="ai"
                                    cardType="recommended"
                                    cardId={value.id}
                                    cardDes={value.job_overview}
                                />
                            </div>
                        </div>

                    })

                    :
                    null
            }

            {
                cardArrayDuplicateSearch.length === 0 && gettingResponse ?
                    <div className="row align-items-center justify-content-center noRecordsFound-image-height">
                        <div className='text-center'>
                            <img src={Image.noRecordsFound} className='w-50 h-50' />
                        </div>
                    </div>
                    :
                    null
            }

        </div>
    )
}

export default HomeRecommended
