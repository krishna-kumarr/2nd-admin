import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../../layouts/Dashboard";


const Home = () => {
  const pageRender=useNavigate();
  useEffect(()=>{
    if(window.location.pathname === "/professional/home/" || window.location.pathname === "/professional/home"){
      pageRender("/professional/home/all_jobs")
    }
  },[])

  return (
      <Dashboard />
  );
};

export default Home;
