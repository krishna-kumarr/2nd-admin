import React, { useContext } from 'react'
import { FaShoppingBag, FaWallet } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { IoTimeSharp } from 'react-icons/io5'
import { MdDeleteOutline } from 'react-icons/md'
import SuperAdminContext from '../../../hooks/SuperAdminContext'
import { useNavigate } from 'react-router-dom'

const EmployerCard = ({profile_image,jobHeading,postedOn,workplace,state,schedule,jobType,payment,cardDesc}) => {
  const {
    smallDevice
  }=useContext(SuperAdminContext);

  const pageRender = useNavigate();


  const handleCard = () =>{
    if(smallDevice){
      pageRender("/super_admin/employer/job_details")
    }else{
      console.log("large device")
    }
  }

  return (
    <div className='cursorPointer' onClick={handleCard}>
      <div className="d-flex align-items-center my-2">
        <div className="flex-shrink-0">
          <img src={"https://cdn.2ndcareers.com/employer/logo/Logo-05.png"} alt="..." width={52} height={52} className='pe-none' />
        </div>
        <div className="flex-grow-1 ms-3">
          <h6 className='job-card-component-heading text-break'>Data Quality Manager</h6>
          <p className='job-card-posted-time m-0'>Posted on 18-03-2000</p>
        </div>

      </div>
      <div>
        <div className="row justify-content-around  card-company-details-icon mt-4">
          <label className="fs-7 card-inner-details col-6 col-sm-3 col-lg-6  px-5 px-sm-0 py-1 py-sm-0 text-start text-sm-center text-lg-start ps-lg-3">
            <FaLocationDot className="me-2 text-success" />
            {"cardWorkplace"}-{"cardState"}
          </label>
          <label className="fs-7 card-inner-details col-6 col-sm-3 col-lg-6  px-5 px-sm-0 py-1 py-sm-0 text-start text-sm-center text-lg-start ps-lg-3">
            <FaShoppingBag className="me-2 text-warning" />
            {"cardSchedule"}
          </label>
          <label className="fs-7 card-inner-details col-6 col-sm-3 col-lg-6  px-5 px-sm-0 py-1 py-sm-0 text-start text-sm-center text-lg-start ps-lg-3">
            <IoTimeSharp className="me-2 text-primary" />
            {"cardJobType"}
          </label>
          <label className="fs-7 card-inner-details col-6 col-sm-3 col-lg-6  px-5 px-sm-0 py-1 py-sm-0 text-start text-sm-center text-lg-start ps-lg-3">
            <FaWallet className="me-2 text-warning" />
            {"cardPayment"}
          </label>
        </div>
        <p className='mt-4 job-card-description'>{"cardDes"}</p>
      </div>
    </div>
  )
}

export default EmployerCard