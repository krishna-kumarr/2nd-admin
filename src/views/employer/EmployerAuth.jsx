import React from 'react'
import { Outlet } from 'react-router-dom'
import EmployerNavComponent from './EmployerNavComponent'
import { DataProvider } from '../../hooks/employerContext';

const EmployerAuth = () => {
  const employerPageDashboardMenu = ["Home", "Applicants", "Pool"];


  return (
    <>
      <DataProvider>
        <EmployerNavComponent  dashboadMenus={employerPageDashboardMenu}/>
        <Outlet/>
      </DataProvider>
    </>
  )
}

export default EmployerAuth