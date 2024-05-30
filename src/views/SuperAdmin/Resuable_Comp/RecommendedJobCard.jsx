import React from 'react'
import { GrLocation } from 'react-icons/gr'
import { HiOutlineBriefcase } from 'react-icons/hi2'

const RecommendedJobCard = () => {
  return (
    <div className="col-12 col-md-6 col-xl-4 py-2">
        <div className="d-flex flex-wrap border rounded-2 w-100 p-3 pe-0">
            <div className="col-3">
                <img
                src={`https://cdn.2ndcareers.com/employer/logo/Logo-05.png`}
                alt=""
                width={50}
                height={50}
                className="rounded-circle"
                />
            </div>
            <div className="col-9">
                <div className="container-fluid">
                    <p className='mb-0 pb-1 superAdmin-recommended-card-heading'>Data Quality manager</p>
                    <p className="mb-0 superAdmin-recommended-card-sub-content">
                        <span className="pe-2"><HiOutlineBriefcase /></span>
                        {"job_title"}
                    </p>
                    <p className="mb-0 superAdmin-recommended-card-sub-content">
                        <span className="pe-2"><GrLocation /></span>
                        {"city"}
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RecommendedJobCard