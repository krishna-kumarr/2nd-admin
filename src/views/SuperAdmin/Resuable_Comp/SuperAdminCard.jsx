import React, { useContext } from 'react'
import { GrLocation } from 'react-icons/gr'
import { HiOutlineBriefcase } from 'react-icons/hi2'
import SuperAdminContext from '../../../hooks/SuperAdminContext';
import { useNavigate } from 'react-router-dom';

const SuperAdminCard = ({profile_image,first_name,last_name,job_title,city}) => {
  const {
    smallDevice
  }=useContext(SuperAdminContext);

  const pageRender = useNavigate();


  const handleCard = () =>{
    if(smallDevice){
      pageRender("/super-admin/professional/candidates_details")
    }else{
      console.log("large device")
    }
  }

  return (
    <div className="col-12 col-sm-6 col-lg-12 cursorPointer" onClick={handleCard}>
      <div className="card border-0 rounded-3">
        <div className="card-body">
          <div className="row align-items-center pt-3">
            {/* card image  */}
            <div className="col-4">
              <img src={`${process.env.REACT_APP_SECOND_CAREERS_CDN}${profile_image}`} alt="" width={83} height={83} className="rounded-circle" />
            </div>
            
            {/* card content  */}
            <div className="col-8 px-1 pt-lg-3 pt-xl-0">
              <div className="col-12">
                <p className="mb-0 employer-card-candidate-name">
                  {first_name} {last_name}
                </p>

                <div className="pt-2">
                  <p className="mb-0 employer-card-candidate-role">
                    <span className="pe-2"><HiOutlineBriefcase /></span>
                    {job_title}
                  </p>
                  <p className="mb-0 employer-card-candidate-location">
                    <span className="pe-2"><GrLocation /></span>
                    {city}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuperAdminCard