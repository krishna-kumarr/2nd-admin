import React, { useContext, useEffect, useState } from 'react'
import DashboardNavbar from '../../components/Navbar/DashboardNavbar';
import { Outlet } from 'react-router-dom';
import CommonContext, { DataProvider } from '../../hooks/CommonContext';
import axios from 'axios';

const ProfessionalHome = () => {
    const professionalPageDashboardMenu = ["Home", "Learning", "Community"];


    const queryParams = new URLSearchParams(window.location.search);
    const authenticationToken = queryParams.get("token");
    if (authenticationToken !== null) {
        var uri = window.location.toString();
        if (uri.indexOf("?") > 0) {
            var clean_uri = uri.substring(0, uri.indexOf("?"));
            window.history.replaceState({}, document.title, clean_uri);
        }

        localStorage.setItem("Token", authenticationToken);
    }




    

    return (
        <div>
            <DataProvider>
                <DashboardNavbar
                    profileImage="https://github.com/mdo.png"
                    profileName="George Martin"
                    dashboadMenus={professionalPageDashboardMenu}
                />

                <Outlet />
            </DataProvider>
        </div>
    )
}

export default ProfessionalHome
