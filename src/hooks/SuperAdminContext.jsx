import React, { createContext, useEffect, useState } from 'react'

const SuperAdminContext = createContext();

export const DataProvider = ({children})=>{
    const [minimumDeviceCards,setMinimumDeviceCards]=useState(false);
    const [initialGlow,setInitialglow]=useState(false);
    const [experience,setExperience]=useState([]);
    const [education,setEducation]=useState([]);
    const [skills,setSkills]=useState([]);
    const [video,setVideo]=useState("");
    const [language,setLanguage]=useState([]);
    const [additionalInfo,setAdditionalInfo]=useState([]);
    const [employerSkills,setEmployerSkills]=useState([]);
    const [smallDevice,setSmallDevice]=useState(false)


    useEffect(() => {
        //finding minimum devices and updating to state at initial
        if (window.innerWidth <= 992) {
          setSmallDevice(true);
        } else {
          setSmallDevice(false)
        }
    
    
        //finding minimum devices and updating to state when screen adjustment
        const handleResize = () => {
          console.log(window.innerWidth)
          if (window.innerWidth <= 992) {
            setSmallDevice(true);
          } else {
            setSmallDevice(false)
          }
        };
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      },[])


    return(
        <SuperAdminContext.Provider value={{
            minimumDeviceCards,setMinimumDeviceCards,
            initialGlow,setInitialglow,
            experience,setExperience,
            education,setEducation,
            skills,setSkills,
            video,setVideo,
            language,setLanguage,
            additionalInfo,setAdditionalInfo,
            employerSkills,setEmployerSkills,
            smallDevice
        }}>
            {children}
        </SuperAdminContext.Provider>
    )
}

export default SuperAdminContext;