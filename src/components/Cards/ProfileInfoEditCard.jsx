import React, { useRef } from 'react';
import { FaUserTie } from "react-icons/fa";
import { MdModeEditOutline } from 'react-icons/md';


const ProfileInfoEditCard = ({ cardHeadingIcon,
    cardHeading,
    cardEditIcon,
    cardDescription,
    cardSaveIcon,
    aboutContent,
    setAboutContent,
    handleAboutChange,
    setAboutEditIcon,
    aboutEditIcon,
    preferenceContent,
    setPreferenceContent,
    preferenceEditIcon,
    setPreferenceEditIcon,
    handlePreferenceChange,
    content,
    EditIcon,
    handleTextAreaChange,
    placeholder,
    profilePageAllContent
}) => {



    const inputAboutRef = useRef()
    const inputPreferenceRef = useRef()


    return (
        <>
            <div className="card mt-3 border-0 shadow-sm rounded-4 ">
                <div className="card-body ">
                    <div className="d-flex justify-content-between ms-1">
                        <label className="profile-side-headers d-flex align-items-center placeholder-glow">
                            {cardHeadingIcon}
                            <span className={profilePageAllContent ? "" : "placeholder px-3 w-100 py-1  rounded-1"}>{cardHeading}</span>
                        </label>

                        {
                            EditIcon ?
                                <span className={profilePageAllContent ? "" : "placeholder rounded-2"}>{cardSaveIcon}</span>
                                : <span className={profilePageAllContent ? "" : "placeholder rounded-2 "}>{cardEditIcon}</span>



                            // EditIcon ?
                            //     <span className={profilePageAllContent ? "" : "placeholder rounded-2"}>{cardEditIcon}</span>
                            //     :
                            //     <span className={profilePageAllContent ? "" : "placeholder rounded-2"}>{cardSaveIcon}</span>
                        }
                    </div>
                    <div className="ms-5 mt-3 profile-descriptions">
                        {/* {cardDescription} */}

                        {/* {
                          
                           EditIcon && cardHeading === "About" ? 
                                <textarea   className={profilePageAllContent ? "w-100 p-3 textarea mb-3" : "placeholder px-3 w-100 py-1  rounded-2"} value={content} rows={4} placeholder={profilePageAllContent ? placeholder : ""} onChange={handleTextAreaChange} maxLength="900" ></textarea>
                                :
                                EditIcon && cardHeading === "Preference" ? 
                                <textarea   className={profilePageAllContent ? "w-100 p-3 textarea mb-3" : "placeholder px-3 w-100 py-1  rounded-2"} value={content} rows={4} placeholder={profilePageAllContent ? placeholder : ""} onChange={handleTextAreaChange}></textarea> 
                                : 
                                EditIcon && cardHeading === "About" ?  
                                <p className={profilePageAllContent ? 'text-break' : 'text-break placeholder rounded-2 w-100'}>{content ? content : placeholder}</p> 
                                :
                                <p className={profilePageAllContent ? 'text-break' : 'text-break placeholder rounded-2 w-100'}>{content ? content : placeholder}</p>
                                                         

                        } */}

                         {                          
                            cardHeading === "Preference" ? 
                                EditIcon ?
                                    <textarea id='preferenceEditField'  className={profilePageAllContent ? "w-100 p-3 textarea mb-3" : "placeholder px-3 w-100 py-1  rounded-2"} value={content} rows={4} placeholder={profilePageAllContent ? placeholder : ""} onChange={handleTextAreaChange}></textarea> 
                                    : 
                                    <p id='preferenceNonEditField' className={profilePageAllContent ? 'text-break' : 'text-break placeholder rounded-2 w-100'}>{content ? content : placeholder}</p>
                            :
                                null                     

                        }


                        {                          
                            cardHeading === "About" ? 
                                EditIcon?
                                <textarea id='aboutEditField'  className={profilePageAllContent ? "w-100 p-3 textarea mb-3" : "placeholder px-3 w-100 py-1  rounded-2"} value={content} rows={4} placeholder={profilePageAllContent ? placeholder : ""} onChange={handleTextAreaChange} maxLength="900" ></textarea>
                                :                               
                                <p id='aboutNonEditField' className={profilePageAllContent ? 'text-break' : 'text-break placeholder rounded-2 w-100'}>{content ? content : placeholder}</p> 
                            :
                            null
                       }
                        




                        {/* {
                            content !== '' && EditIcon ?
                                <p className='text-break'>{content}</p>
                            :
                                <textarea autoFocus={ cardHeading === "About" ? true : ""} className={profilePageAllContent ? "w-100 p-3 textarea mb-3" : "placeholder px-3 w-100 py-1  rounded-2"} value={content} rows={4} placeholder={profilePageAllContent ? placeholder : ""} onChange={handleTextAreaChange}></textarea>
                        } */}
                        {/* <input type='text' className='w-100 pb-5' placeholder="Enter your text here.." /> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileInfoEditCard
