import React from 'react'
import { IoChevronBackCircle } from 'react-icons/io5';
import EmployerDetailedView from './EmployerDetailedView';
import { GrMenu } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

const EmployerMinDevice = () => {

    const pageRender=useNavigate();

  return (
    <div className="col-12 superAdmin-rightSide-total-height overflow-hidden">
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
        <div className="col-12 superAdmin-rightSide-Component-min-content-height placeholder-glow py-2">
            <div className="container-fluid px-lg-4 h-100">
                <div className="py-2">
                    <button
                    className="btn btn-outline-secondary d-flex align-items-center gap-2"
                    onClick={() => {
                        pageRender("/super_admin/employer");
                    }}
                    >
                    <IoChevronBackCircle className="fs-5" /> Back
                    </button>
                </div>

                <EmployerDetailedView/>
            </div>
        </div>
</div>
  )
}

export default EmployerMinDevice