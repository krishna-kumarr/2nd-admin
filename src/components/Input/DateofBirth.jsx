import React, { useEffect, useState } from 'react'

const DateofBirth = ({setProfessionalSignupInputValues,professionalSignupInputValues}) => {

    const [currentDate, setCurrentDate] = useState("")

    useEffect(() => {
      const currentDateFun = () => {
        const objectDate = new Date();
        let day = objectDate.getDate();
        day = day < 10 ? `0${day}` : `${day}`;
  
  
        let month = objectDate.getMonth();
        month = month < 10 ? `0${month + 1}` : `${month + 1}`;
  
        let year = objectDate.getFullYear();
  
        let format = `${year}-${month}-${day}`;

        setCurrentDate(format)
      }
  
      currentDateFun();
    })
  


    return (
        <div>
            <div className="user-form-group">
                <input type="date" className="form-control" required id="inputField" max={currentDate}  onChange={(e)=>setProfessionalSignupInputValues({ ...professionalSignupInputValues, 'dateOfBirth': e.target.value })}/>
                <label htmlFor="inputField" className="label-name">Date of Birth</label>
            </div>
        </div>
    )
}

export default DateofBirth
