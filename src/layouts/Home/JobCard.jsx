import React, { useContext, useEffect, useState } from 'react'
import { FaShoppingBag, FaWallet } from 'react-icons/fa'
import { FaLocationDot } from "react-icons/fa6";
import { IoTimeSharp } from "react-icons/io5";
import CommonContext from '../../hooks/CommonContext';
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import toast from 'react-hot-toast';
import images from '../../utils/images';

const JobCard = ({ handleRemoveJob, cardName, cardId, cardDes, cardType, applicationStatus, cardHeading, cardPostedOn, cardWorkplace, cardState, cardSchedule, cardJobType, cardPayment }) => {

  const { handleSelectedCardData } = useContext(CommonContext);

  return (
    <div className='cursorPointer'>
      <div className="d-flex align-items-center my-2 ">
        <div className="flex-shrink-0" onClick={() => { handleSelectedCardData(cardId) }}>
          <img src={images.companyLogo} alt="..." width={52} height={52} className='pe-none' />
        </div>
        <div className="flex-grow-1 ms-3" onClick={() => { handleSelectedCardData(cardId) }}>
          <h6 className='job-card-component-heading text-break'>{cardHeading}</h6>
          <p className='job-card-posted-time m-0'>Posted on {cardPostedOn}</p>
        </div>

        {/* Applied job cards  */}
        {
          cardType === "applied" ?
            <div className='flex-shrink-0 appliedOrSaved'>
              <div
                className={`py-1 px-3 appliedOrSaved-borderRadius
                ${applicationStatus === "Not Reviewed" ? 'job-reviewed' : null ||
                    applicationStatus === "Shortlisted" ? 'job-shortlisted' : null ||
                      applicationStatus === "Contacted" ? 'job-contacted' : null ||
                        applicationStatus === "Rejected" ? 'job-rejected' : null
                  }`
                }
              >

                <p className='m-0'>{applicationStatus === "Not Reviewed" ? 'Not Reviewed' : null ||
                  applicationStatus === "Shortlisted" ? 'Shortlisted' : null ||
                    applicationStatus === "Contacted" ? 'Contacted' : null ||
                      applicationStatus === "Rejected" ? 'Not selected by Employer' : null
                }</p>
              </div>
            </div>
            :
            null
        }


        {/* recommended job cards  */}
        {
          cardType === "recommended" ?
            <div className='flex-shrink-0 appliedOrSaved'>
              <div
                className={`py-1 px-3 appliedOrSaved-borderRadius
                ${applicationStatus === "ai" ? 'job-reviewed' : null ||
                    applicationStatus === "manual" ? 'job-shortlisted' : null
                  }`
                }
              >

                <p className='m-0'>{applicationStatus === "manual" ? 'Manual Recommendation' : null ||
                  applicationStatus === "ai" ? 'AI Recommendation' : null
                }</p>
              </div>
            </div>
            :
            null
        }

        {
          cardName === "saved" ?
            <button type="button" className="btn btn-outline-secondary d-flex align-items-center" onClick={() => handleRemoveJob(cardId)}>
              <MdDeleteOutline className='fs-5' /> Remove
            </button>
            :
            null
        }


      </div>
      <div onClick={() => { handleSelectedCardData(cardId) }}>
        <div className="row justify-content-around card-company-details-icon mt-4">
          <label className="fs-7 card-inner-details col-6 col-sm-3 px-5 px-sm-0 py-1 py-sm-0 text-start text-sm-center">
            <FaLocationDot className="me-2 text-success" />
            {cardWorkplace}-{cardState}
          </label>
          <label className="fs-7 card-inner-details col-6 col-sm-3 px-5 px-sm-0 py-1 py-sm-0 text-start text-sm-center">
            <FaShoppingBag className="me-2 text-warning" />
            {cardSchedule}
          </label>
          <label className="fs-7 card-inner-details col-6 col-sm-3 px-5 px-sm-0 py-1 py-sm-0 text-start text-sm-center">
            <IoTimeSharp className="me-2 text-primary" />
            {cardJobType}
          </label>
          <label className="fs-7 card-inner-details col-6 col-sm-3 px-5 px-sm-0 py-1 py-sm-0 text-start text-sm-center">
            <FaWallet className="me-2 text-warning" />
            {cardPayment}
          </label>
        </div>
        <p className='mt-4 job-card-description'>{cardDes}</p>
      </div>
    </div>
  )
}

export default JobCard