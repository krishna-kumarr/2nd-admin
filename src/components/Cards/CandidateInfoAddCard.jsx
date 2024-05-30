import React from 'react'
import { IoCalendarOutline, IoLocationOutline } from 'react-icons/io5'

const CandidateInfoAddCard = ({pageContentLoaded,cardHeadingIcon,cardHeading,placeholder,arrayContent}) => {
    const duplicateArrayContent=[1,2,3]

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

            <div className="card border-0">
                <div className="card-body">
                    <div className="d-flex justify-content-between ms-1">
                        <label className="profile-side-headers d-flex align-items-center">
                            {cardHeadingIcon}
                            <span className={pageContentLoaded ? "" : "placeholder px-3 w-100 py-1  rounded-1"}>{cardHeading}</span>
                        </label>
                    </div>

                    {   
                        pageContentLoaded===false ?
                            duplicateArrayContent.map((val) => {
                                return <div className="ms-5" key={val}>
                                            <div className="d-flex justify-content-between mt-3">
                                                <label className="placeholder-glow d-inline-block w-75 employer-card-Content-short-heading">
                                                    {cardHeading === "Experience" ? <span className='placeholder rounded-2 w-50 py-3'>{val}</span> : null}
                                                    {cardHeading === "Education" ? <span className="text-break placeholder rounded-2 w-100 py-4"></span> : null}
                                                </label>
                                            </div>

                                            <label className="profile-descriptions mt-1">
                                                <span className='placeholder p-2 rounded-1'></span> &nbsp;-&nbsp;<span className='placeholder px-5 rounded-1'>&nbsp; </span>
                                            </label>

                                            {cardHeading === "Experience" ? <p className={"mt-1 text-break employer-card-Content placeholder rounded-2 py-5 w-100"}>
                                            </p> : null}
                                            <hr />
                                        </div> 
                            })

                            :
                                arrayContent.map((val) => {
                                return (
                                    <React.Fragment key={val.id}>

                                        {
                                            <div className="ms-5">
                                                <div className="d-flex justify-content-between mt-3 ">
                                                    <label className={window.location.pathname==="/employer_dashboard/candidates" ? "placeholder-glow d-inline-block w-100 employer-card-Content-short-heading" : "profile-inner-headers placeholder-glow d-inline-block w-75"}>
                                                        {cardHeading === "Experience" ? <span >{val.job_title} | {val.company_name}</span> : null}
                                                        {cardHeading === "Education" ? <span className="text-break">{val.degree_level} {val.specialisation} |  {val.institute_name} </span> : null}
                                                    </label>
                                                </div>



                                                <label className="profile-descriptions mt-2">
                                                    <IoCalendarOutline />&nbsp; <span> {handleDateConvert(val.start_date)}</span> &nbsp;-&nbsp;<span> {handleDateConvert(val.end_date)}&nbsp; </span>
                                                    {cardHeading === "Experience" ? <span className={window.location.pathname==="/employer_dashboard/candidates" ? "employer-card-Content" : "d-flex align-items-center gap-2"}>
                                                        <IoLocationOutline /> {val.job_location}
                                                    </span> : null}
                                                    {cardHeading === "Education" ? <span className={window.location.pathname==="/employer_dashboard/candidates" ?"employer-card-Content" : "d-flex align-items-center gap-2"}>
                                                        <IoLocationOutline /> {val.institute_location}
                                                    </span> : null}
                                                </label>

                                                {cardHeading === "Experience" ? <p className={window.location.pathname==="/employer_dashboard/candidates" ?"mt-1 text-break employer-card-Content" : "mt-1 profile-descriptions text-break"}>
                                                    {val.job_description}
                                                </p> : null}
                                                <hr />
                                            </div>
                                        }
                                    </React.Fragment>
                                )
                                })
                    }
                </div>
            </div>
        </>
    )
}

export default CandidateInfoAddCard
