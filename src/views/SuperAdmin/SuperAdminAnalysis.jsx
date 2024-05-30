import React from 'react'
import { GrMenu } from 'react-icons/gr'

const SuperAdminAnalysis = () => {
  return (
    <div className="col-12 col-xl-10 superAdmin-rightSide-total-height overflow-hidden">
    <div className="col-12 superAdmin-rightSide-Component-name-height ">
        <div className="container-fluid px-lg-4 h-100">
            <div className="row align-items-center h-100 ">
                <div className="col-6">
                    <h5>Employer</h5>
                </div>
                
                <div className="col-6 text-end d-xl-none">
                    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#superAdminSidebar" aria-controls="superAdminSidebar">
                        <GrMenu className='fs-4'/>
                    </button>
                </div>
            </div>
        </div>
    </div>
    

    <div className="col-12 superAdmin-rightSide-Component-content-height placeholder-glow">
        <div className="container-fluid px-lg-4 h-100">

        </div>
      </div>
    </div>
  )
}

export default SuperAdminAnalysis