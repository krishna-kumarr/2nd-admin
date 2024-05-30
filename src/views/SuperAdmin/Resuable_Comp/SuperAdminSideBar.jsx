import React, { useContext, useEffect } from "react";
import Images from "../../../utils/images.js";
import { Link, NavLink } from "react-router-dom";
import { MdOutlinePersonOutline } from "react-icons/md";
import { IoStatsChartOutline } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import SuperAdminContext from "../../../hooks/SuperAdminContext.jsx";

const SuperAdminSideBar = () => {

  return (
    <>
      {
        window.location.pathname!=="/super-admin/professional/candidates_details" ? 
          <div className="col-2 d-none d-xl-block superAdmin-sideBar-total-height shadow">
            <div className="container px-3 h-100">
              <div className="d-flex flex-wrap flex-column align-items-center justify-content-center w-100 py-4 h-100">
                {/* image  */}
                <div className="col-11 superAdmin-sideBar-img-height">
                  <Link to="/SuperAdmin">
                    <img src={Images.logo} alt="No Logo" className="img-fluid" />
                  </Link>
                </div>


                {/* main content  */}
                <div className="col-10 superAdmin-sideBar-options-height">
                  <div className="pb-3">
                      <NavLink to="/super-admin/professional" className="d-flex flex-wrap text-center superAdmin-sidebar-options py-2 rounded">
                          <span className="w-25"><MdOutlinePersonOutline /></span>
                          <span className="w-75 text-start">Professional</span>                
                      </NavLink>
                  </div>
                  <div className="pb-3">
                      <NavLink to="/super-admin/employer" className="d-flex flex-wrap text-center superAdmin-sidebar-options py-2 rounded">
                          <span className="w-25"><GoPerson /></span>
                          <span className="w-75 text-start">Employer</span>                
                      </NavLink>
                  </div>
                  <div className="pb-3">
                      <NavLink to="/super-admin/analysis" className="d-flex flex-wrap text-center superAdmin-sidebar-options py-2 rounded">
                          <span className="w-25"><IoStatsChartOutline /></span>
                          <span className="w-75 text-start">Analysis</span>                
                      </NavLink>
                  </div>
                </div>


                {/* footer content  */}
                <div className="col-10 superAdmin-sideBar-footer-height d-inline-flex align-items-end">
                  <div className="col-12">
                    <button type="button" className="btn btn-transparent border border-brand-color candidate-right-side-btn brand-text-color w-100 d-flex flex-wrap">
                      <span className="w-25">
                      <IoStatsChartOutline />
                      </span>
                      <span className="w-75">
                          Sign Out
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
         :
        null
      }
     

      <div class="offcanvas offcanvas-start d-xl-none" tabindex="-1" id="superAdminSidebar" aria-labelledby="offcanvasRightLabel">
        <div class="offcanvas-header">
          <div className="container d-inline-flex align-items-center">
              <div className="col-7">
                <Link to="/SuperAdmin" className="w-100">
                  <img src={Images.logo} alt="No Logo" className="img-fluid" />
                </Link>
              </div>
              <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" id="closeSideBar"></button>
            </div>
        </div>
        <div class="offcanvas-body">
          <div className="container px-3">
            <div className="d-flex flex-wrap flex-column align-items-center justify-content-center w-100 py-4 h-100">
              {/* main content  */}
              <div className="col-12 superAdmin-sideBar-options-height">
                <div className="pb-3">
                    <NavLink to="/super-admin/professional" onClick={()=>document.getElementById("closeSideBar").click()} className="d-flex flex-wrap text-center superAdmin-sidebar-options py-2 rounded">
                        <span className="w-25"><MdOutlinePersonOutline /></span>
                        <span className="w-75 text-start">Professional</span>                
                    </NavLink>
                </div>
                <div className="pb-3">
                    <NavLink to="/super-admin/employer" onClick={()=>document.getElementById("closeSideBar").click()} className="d-flex flex-wrap text-center superAdmin-sidebar-options py-2 rounded">
                        <span className="w-25"><GoPerson /></span>
                        <span className="w-75 text-start">Employer</span>                
                    </NavLink>
                </div>
                <div className="pb-3">
                    <NavLink to="/super-admin/analysis" onClick={()=>document.getElementById("closeSideBar").click()} className="d-flex flex-wrap text-center superAdmin-sidebar-options py-2 rounded">
                        <span className="w-25"><IoStatsChartOutline /></span>
                        <span className="w-75 text-start">Analysis</span>                
                    </NavLink>
                </div>
              </div>


              {/* footer content  */}
              <div className="col-12 superAdmin-sideBar-footer-height d-inline-flex align-items-end">
                <div className="col-12">
                  <button type="button" className="btn btn-transparent border border-brand-color candidate-right-side-btn brand-text-color w-100 d-flex flex-wrap">
                    <span className="w-25">
                    <IoStatsChartOutline />
                    </span>
                    <span className="w-75">
                        Sign Out
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuperAdminSideBar;
