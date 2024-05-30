import React, { useContext, useEffect, useRef, useState } from "react";
import Images from "../../utils/images.js";
import { MdNotificationsActive } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";
import CommonContext from "../../hooks/CommonContext.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import axiosInstance from "../../services/api/axiosInstance.js";
import images from "../../utils/images.js";

const DashboardNavbar = ({ dashboadMenus }) => {
  let notifyRef = useRef();

  const { gettingResponse, profilePicture, setProfilePicture } = useContext(CommonContext);
  const [userNavbarinfo, setUserNavinfo] = useState([]);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState([]);

  const [notificationCount, setNotificationCount] = useState(0);

  const getNavbarDatas = async () => {
    const res = await axiosInstance.get("/professional_notifications")

      if (res.data.error_code === 0) {
        setMessage(res.data.data);
      }
      else {
        toast.error(res.data.message);
      }
  };

  useEffect(() => {
    getNavbarDatas();
  },[notificationCount]);



  useEffect(() => {

    const getUserDetails = async () => {
      const res = await axiosInstance.get("/user_dashboard_details")

      if (res.data.error_code === 0) {
        setProfilePicture(`${process.env.REACT_APP_SECOND_CAREERS_CDN}${res.data.data.user_details[0].profile_image}`);
        setUserNavinfo([res.data.data]);
        setNotificationCount(res.data.data.notification_count);
      }
      else {
        toast.error(res.data.message);
      }
    };
    getUserDetails();




    // notification box closing fuction
    const handler = (e) => {
      if (!e.target.closest(".notify-closet")) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);



  const doLogout = () => {
    localStorage.removeItem("pToken");
  };


  const handleDeleteSingleMessage = async (notificationId) => {
    var obj = {
      notification_id: notificationId
    }
    const res = await axiosInstance.post("/delete_notifications", obj)

    if (res.data.error_code === 0) {
      getNavbarDatas()

    } else {
      toast.error(res.data.message);
    }

  }


  const handleDeleteAllMessage = async () => {
    var obj = {
      notification_id: ""
    }
    const res = await axiosInstance.post("/delete_notifications", obj)

    if (res.data.error_code === 0) {
      getNavbarDatas()

    } else {
      toast.error(res.data.message);
    }

  }


  return (
    <div className="navbar-height placeholder-glow">
      <nav className="navbar navbar-light bg-white fixed-top navbar-expand-md shadow-sm p-2 justify-content-center ">
        <div className="container-fluid">
          <a className="navbar-brand d-flex col-3" href="#">
            <img src={Images.logo} alt="No Logo" className="img-fluid logo" />
          </a>

          <div
            className="offcanvas-lg offcanvas-start"
            tabIndex="-1"
            id="offcanvasResponsive"
            aria-labelledby="offcanvasResponsiveLabel"
          >
            <div className="offcanvas-header">
              <a className="navbar-brand d-flex col-5" href="#">
                <img src={Images.logo} alt="logo" className="img-fluid logo" />
              </a>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                data-bs-target="#offcanvasResponsive"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body d-inline d-lg-none">
              <ul className="navbar-nav text-center row">
                <li
                  className="nav-item navigation-header-link-active py-1 "
                  data-bs-dismiss="offcanvas"
                  data-bs-target="#offcanvasResponsive"
                >
                  <NavLink
                    to="/professional/home/all_jobs"
                    className="nav-link py-2 border-bottom"
                  >
                    {dashboadMenus[0]}
                  </NavLink>
                </li>
                <li
                  className="nav-item navigation-header-link-active py-1"
                  data-bs-dismiss="offcanvas"
                  data-bs-target="#offcanvasResponsive"
                >
                  <NavLink
                    to="/professional/learning"
                    className="nav-link py-2 border-bottom"
                  >
                    {dashboadMenus[1]}
                  </NavLink>
                </li>
                <li
                  className="nav-item navigation-header-link-active py-1"
                  data-bs-dismiss="offcanvas"
                  data-bs-target="#offcanvasResponsive"
                >
                  <NavLink
                    to="/professional/community"
                    className="nav-link py-2 border-bottom"
                  >
                    {dashboadMenus[2]}
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>

          <div className="row col-9">
            <ul className="navbar-nav col-lg-8 justify-content-center d-none d-lg-inline-flex">
              <li id="professionalHome" className="nav-item navigation-header-link-active">
                <NavLink
                  to="/professional/home/all_jobs"
                  className="nav-link px-4"
                  data-testid="Home"
                >
                  {dashboadMenus[0]}
                </NavLink>
              </li>
              <li
                id="professionalLearning"
                className="nav-item navigation-header-link-active"
                data-testid="Learning"
              >
                <NavLink
                  to="/professional/learning"
                  className="nav-link px-4"
                  data-testid="learning"
                >
                  {dashboadMenus[1]}
                </NavLink>
              </li>
              <li
                id="professionalCommunity"
                className="nav-item navigation-header-link-active"
                data-testid="Community"
              >
                <NavLink
                  to="/professional/community"
                  className="nav-link px-4"
                  data-testid="community"
                >
                  {dashboadMenus[2]}
                </NavLink>
              </li>
            </ul>

            <ul className="col-12 col-lg-4 d-inline-flex list-unstyled mb-0 justify-content-end align-items-center">
              <li>
                <div className="position-relative pe-4 notify-closet">
                  {gettingResponse === false && userNavbarinfo.length === 0 ? (
                    <span className="placeholder w-100 rounded py-2 pt-3 px-5"></span>
                  ) : (
                    <>
                      <span
                        id="ProfessionalBellIcon"
                        className="nav-link position-relative bell-icon notify-closet"
                        data-testid="Bell"
                        onClick={() => setOpen(!open)}
                      >
                        <MdNotificationsActive className="fs-4 notify-closet" />
                        {/* notification count */}
                        <span className="notify-closet notification-bell-count position-absolute mt-2 top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {message.length > 0 ? message.length : null}
                        </span>
                      </span>

                      <div
                        className={`${open
                            ? "notification-box rounded-4 shadow-lg notify-closet"
                            : "d-none"
                          }`}
                      >
                        <div className="container h-100">
                          {/* notification header */}
                          <div className="notification-header row align-items-center p-3 position-sticky">
                            <div className="col">
                              <h6 className="m-0 fw-bold">Notification</h6>
                            </div>
                            <div className="col text-end">

                              <button id="professionalNotificationClose" className="btn btn-sm border-0">
                                <IoIosCloseCircleOutline
                                  className="fs-4"
                                  onClick={() => setOpen(!open)}
                                />
                              </button>

                            </div>
                          </div>

                          {/* notification body */}
                          <div className="notification-body h-100 p-3">
                            <div className="text-end mb-1">
                              {
                                message.length > 0 ?
                                  <button className="btn btn-sm border-0 btn-secondary py-2" onClick={() => handleDeleteAllMessage()}>
                                    Clear All
                                  </button>
                                  :
                                  null
                              }
                            </div>
                            
                            <ul className="list-unstyled g-2 pt-2">
                              {message.length > 0 ? (
                                message.map((v, i) => {
                                  return (
                                    <div className="notification-content-box p-3 rounded-4 mb-2" key={i}>
                                      <div className="notification-content-header row align-items-center">
                                        {/* <div className="col">
                                        <h5 className="m-0">Title</h5>
                                      </div> */}
                                        <div className="col text-end">
                                          <button className="btn btn-sm btn-transparent border-0" onClick={() => handleDeleteSingleMessage(v.id)}>
                                            <IoIosCloseCircleOutline className="fs-4" />
                                          </button>
                                        </div>
                                      </div>

                                      <div className="notification-content-text pt-2">
                                        <p>
                                          {v.msg}
                                        </p>
                                      </div>

                                      {/* <div className="notification-content-footer text-end">
                                      <span className="pe-2">2 mins ago</span>
                                    </div> */}
                                    </div>



                                    // <div
                                    //   className="notification-content-box p-3 rounded-4 mb-2"
                                    //   key={i}
                                    // >
                                    //   <div className="notification-content-text py-1">
                                    //     <p className="m-0">
                                    //       {/* We are seeking talented and innovative Web developers proficient in FlutterFlow to join our team. */}
                                    //       {v.msg}
                                    //     </p>
                                    //   </div>
                                    // </div>
                                  );
                                })
                              ) : (
                                // <div className="row align-items-center h-100">
                                //   <p className="text-center">
                                //     Your inbox is empty
                                //   </p>
                                // </div>
                                <div className="row h-100 justify-content-center align-items-center">
                                <div className="text-center">
                                <img
                                  src={images.emptyImg}
                                  alt="logo"
                                  width="200"
                                  height="200"
                                  className="img-fluid logo"
                                />
                                </div>
                              </div>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </li>

              <li>
                <div className="dropdown navbar-dropdown px-2 pe-4">
                  {gettingResponse === false && userNavbarinfo.length === 0 ? (
                    <label className=" w-100">
                      <span className="placeholder w-100 rounded py-2 pt-3 px-5"></span>
                    </label>
                  ) : (
                    <>
                      <a
                        className="nav-link dropdown-toggle "
                        href="#"
                        id="navbarScrollingDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img
                          src={profilePicture}
                          alt="mdo"
                          width="32"
                          height="32"
                          className="rounded-circle me-2"
                          data-testid="Profile"
                        />
                        <span className="d-none d-sm-inline pe-2">
                          {userNavbarinfo.length > 0
                            ? userNavbarinfo[0].user_details !== undefined
                              ? userNavbarinfo[0].user_details[0].first_name
                              : null
                            : ""}
                          &nbsp;
                          {userNavbarinfo.length > 0
                            ? userNavbarinfo[0].user_details !== undefined
                              ? userNavbarinfo[0].user_details[0].last_name
                              : null
                            : ""}
                        </span>
                      </a>
                      <ul
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="navbarScrollingDropdown"
                        data-testid="ProfileCard"
                      >
                        <li id="professionalProfile">
                          <NavLink
                            to="/professional/profile"
                            className="dropdown-item header-dropdown"
                            data-testid="profile"
                          >
                            My Profile
                          </NavLink>
                        </li>

                        <li>
                          <hr className="dropdown-divider" />
                        </li>

                        <li id="professionalUpgrade">
                          <NavLink
                            to="/professional/pricing_plan"
                            className="dropdown-item header-dropdown"
                            data-testid="upgrade"
                          >
                            Upgrade
                          </NavLink>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li id="ProfessionalContact2ndCareers">
                          <a className="dropdown-item header-dropdown" href="#">
                            Contact 2nd Careers
                          </a>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        
                        <li id="professionalSignOut" onClick={doLogout}>
                          <NavLink
                            to="/"
                            className="dropdown-item header-dropdown"
                            data-testid="logout"
                          >
                            Sign out
                          </NavLink>
                        </li>
                      </ul>
                    </>
                  )}
                </div>
              </li>

              <li>
                <button
                  className="btn btn-transparent border d-lg-none"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasResponsive"
                  aria-controls="offcanvasResponsive"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default DashboardNavbar;
