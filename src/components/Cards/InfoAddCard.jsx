import React from 'react'
import { IoCalendarOutline, IoLocationOutline } from 'react-icons/io5'

const InfoAddCard = ({
    pageContentLoaded,
    cardHeadingIcon,
    cardHeading,
    placeholder,
    arrayContent,
    currentPage
}) => {


    const handleDateConvert = (value) => {
        var Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        var splitDate = value.split("-")   // 2024-01
        var l = [splitDate[0]]

        var monthConverted = Months[parseInt(splitDate[1]) - 1]

        l.unshift(monthConverted)

        return l.join(" ")
    }




    return (
        <>

            {
                currentPage === "candidateProfile" ?
                    <div className="card mt-3 border-0 shadow-sm rounded-4 placeholder-glow">
                        <div className="card-body">
                            <div className="d-flex justify-content-between ms-1">
                                <label className="profile-side-headers d-flex align-items-center">
                                    {cardHeadingIcon}
                                    <span className={pageContentLoaded ? "" : "placeholder px-3 w-100 py-1  rounded-1"}>{cardHeading}</span>
                                </label>
                            </div>
                            {
                                arrayContent !== undefined && arrayContent.length === 0 ?
                                    <>
                                        {cardHeading === "Experience" ?
                                            <div className='ms-5'>
                                                <p className={pageContentLoaded ? "text-grey ms-1  mt-3 " : "placeholder px-3 w-50 py-1 ms-1 mt-3 rounded-1"}>{placeholder}</p>
                                            </div>
                                            : ""}
                                        {cardHeading === "Education" ?
                                            <div className="ms-5">
                                                <p className={pageContentLoaded ? "text-grey ms-1 mt-3" : "placeholder px-3 w-50 py-1 ms-1  mt-3 rounded-1"}>{placeholder}</p>
                                            </div>
                                            : ""}
                                    </>
                                    :


                                    <div className="ms-5">
                                        {
                                            arrayContent.map((arrayContent) => {
                                                return (
                                                    <React.Fragment key={arrayContent.id}>
                                                        <div className="d-flex justify-content-between mt-3 ">
                                                            <label className={pageContentLoaded ? "profile-inner-headers d-inline-block w-75" : "profile-inner-headers d-inline-block w-75 placeholder rounded-1"}>
                                                                {cardHeading === "Experience" ? <span >{arrayContent.job_title} | {arrayContent.company_name}</span> : null}
                                                                {cardHeading === "Education" ? <span className="text-break">{arrayContent.degree_level} {arrayContent.specialisation} |  {arrayContent.institute_name} </span> : null}
                                                            </label>
                                                        </div>



                                                        <label className={pageContentLoaded ? "profile-descriptions mt-1" : "profile-descriptions mt-1 placeholder rounded-2"}>
                                                            <IoCalendarOutline />&nbsp; <span> {handleDateConvert(arrayContent.start_date)}</span> &nbsp;-&nbsp;<span> {handleDateConvert(arrayContent.end_date)}&nbsp; </span>
                                                            {cardHeading === "Experience" ? <span className="d-flex align-items-center gap-2">
                                                                <IoLocationOutline /> {arrayContent.job_location}
                                                            </span> : null}
                                                            {cardHeading === "Education" ? <span className="d-flex align-items-center gap-2">
                                                                <IoLocationOutline /> {arrayContent.institute_location}
                                                            </span> : null}
                                                        </label>

                                                        {cardHeading === "Experience" ? <p className={pageContentLoaded ? "mt-1 profile-descriptions text-break" : "mt-1 profile-descriptions text-break placeholder rounded-2"}>
                                                            {arrayContent.job_description.length >250 ? `${arrayContent.job_description.slice(0,250)}..` : arrayContent.job_description}
                                                        </p> : null}
                                                        <hr />
                                                    </React.Fragment>
                                                )
                                            })
                                        }
                                    </div>
                            }
                        </div>
                    </div>
                    :

                    <div className="card mt-3 border-0 shadow-sm rounded-4 placeholder-glow">
                        <div className="card-body">
                            <div className="d-flex justify-content-between ms-1">
                                <label className="profile-side-headers d-flex align-items-center">
                                    {cardHeadingIcon}
                                    <span className={pageContentLoaded ? "" : "placeholder px-3 w-100 py-1  rounded-1"}>{cardHeading}</span>
                                </label>
                            </div>
                            {
                                arrayContent !== undefined && arrayContent.length === 0 ?
                                    <>
                                        {cardHeading === "Experience" ?
                                            <div className='ms-5'>
                                                <p className={pageContentLoaded ? "text-grey ms-1  mt-3 " : "placeholder px-3 w-50 py-1 ms-1 mt-3 rounded-1"}>{placeholder}</p>
                                            </div>
                                            : ""}
                                        {cardHeading === "Education" ?
                                            <div className="ms-5">
                                                <p className={pageContentLoaded ? "text-grey ms-1 mt-3" : "placeholder px-3 w-50 py-1 ms-1  mt-3 rounded-1"}>{placeholder}</p>
                                            </div>
                                            : ""}
                                    </>
                                    :


                                    <div className="ms-5">
                                        <div className="d-flex justify-content-between mt-3 ">
                                            <label className={pageContentLoaded ? "profile-inner-headers d-inline-block w-75" : "profile-inner-headers d-inline-block w-75 placeholder rounded-1"}>
                                                {cardHeading === "Experience" ? <span >{arrayContent.job_title} | {arrayContent.company_name}</span> : null}
                                                {cardHeading === "Education" ? <span className="text-break">{arrayContent.degree_level} {arrayContent.specialisation} |  {arrayContent.institute_name} </span> : null}
                                            </label>
                                        </div>



                                        <label className={pageContentLoaded ? "profile-descriptions mt-1" : "profile-descriptions mt-1 placeholder rounded-2"}>
                                            <IoCalendarOutline />&nbsp; <span> {handleDateConvert(arrayContent.start_date)}</span> &nbsp;-&nbsp;<span> {handleDateConvert(arrayContent.end_date)}&nbsp; </span>
                                            {cardHeading === "Experience" ? <span className="d-flex align-items-center gap-2">
                                                <IoLocationOutline /> {arrayContent.job_location}
                                            </span> : null}
                                            {cardHeading === "Education" ? <span className="d-flex align-items-center gap-2">
                                                <IoLocationOutline /> {arrayContent.institute_location}
                                            </span> : null}
                                        </label>

                                        {cardHeading === "Experience" ? <p className={pageContentLoaded ? "mt-1 profile-descriptions text-break" : "mt-1 profile-descriptions text-break placeholder rounded-2"}>
                                        {arrayContent.job_description.length >250 ? `${arrayContent.job_description.slice(0,250)}..` : arrayContent.job_description}
                                        </p> : null}
                                        
                                    </div>






                                // arrayContent.map((val) => {
                                //     return (
                                //         <React.Fragment key={val.id}>

                                //             {
                                //                 <div className="ms-5">
                                //                     <div className="d-flex justify-content-between mt-3 ">
                                //                         <label className="profile-inner-headers placeholder-glow d-inline-block w-75">
                                //                             {cardHeading === "Experience" ? <span >{val.job_title} | {val.company_name}</span> : null}
                                //                             {cardHeading === "Education" ? <span className="text-break">{val.degree_level} {val.specialisation} |  {val.institute_name} </span> : null}
                                //                         </label>
                                //                     </div>



                                //                     <label className="profile-descriptions mt-1">
                                //                         <IoCalendarOutline />&nbsp; <span> {handleDateConvert(val.start_date)}</span> &nbsp;-&nbsp;<span> {handleDateConvert(val.end_date)}&nbsp; </span>
                                //                         {cardHeading === "Experience" ? <span className="d-flex align-items-center gap-2">
                                //                             <IoLocationOutline /> {val.job_location}
                                //                         </span> : null}
                                //                         {cardHeading === "Education" ? <span className="d-flex align-items-center gap-2">
                                //                             <IoLocationOutline /> {val.institute_location}
                                //                         </span> : null}
                                //                     </label>

                                //                     {cardHeading === "Experience" ? <p className="mt-1 profile-descriptions text-break">
                                //                         {val.job_description}
                                //                     </p> : null}
                                //                     <hr />
                                //                 </div>
                                //             }
                                //         </React.Fragment>
                                //     )
                                // })
                            }
                        </div>
                    </div>
            }

        </>
    )
}

export default InfoAddCard
