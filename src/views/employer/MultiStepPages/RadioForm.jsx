import React from 'react'

const RadioForm = ({
    className,
    radioTextId,
    radioText,
    firstRadioValue,
    firstRadioTitle,
    secondRadioValue,
    secondRadioTitle,
    handleRadioButton,
    firstRadioId,
    secondRadioId,
    radiocommonName,
    defaultCheckFirst,
    defaultCheckSecond,
    responseYorN,
    handleRadioYesClick,
    handleRadioNoClick,
    pageFourRadio
}) => {
    return (
        <>
            <div className=" d-flex align-items-center justify-content-between  w-100">
                <div className={`textWithRadio ${className} col-9`} id={radioTextId}><label htmlFor={radioTextId} className="col-form-label col"
                >{radioText}</label></div>

                <div className="yesOrNo col-3">
                    <div className="d-flex align-items-center w-100">
                        {/* {defaultCheckFirst===firstRadioValue || defaultCheckSecond===secondRadioValue ? 
                            <React.Fragment>
                            <div className=" col mx-auto flex-fill me-2">
                                <input className="form-check-input yesOrNoRadioButtonColor me-1" type="radio" value={firstRadioValue}  name={"radiocommonName"} id={firstRadioId}
                                    onChange={handleRadioButton} />
                                <label htmlFor={firstRadioId}>{firstRadioTitle}</label>
                            </div>
                                
                            <div className=" col mx-auto flex-fill">
                                <input className="form-check-input yesOrNoRadioButtonColor me-1" type="radio" value={secondRadioValue}  name={"radiocommonName"} id={secondRadioId}
                                    onChange={handleRadioButton}/>
                                <label htmlFor={secondRadioId}>{secondRadioTitle} </label>
                            </div>
                            </React.Fragment>
                            :
                            null
                        }    */}
                        
                        {pageFourRadio ?
                        <React.Fragment>
                            <div className=" col mx-auto flex-fill me-2">
                            <input className="form-check-input yesOrNoRadioButtonColor me-1" type="radio" value={firstRadioValue} checked={responseYorN==="Y" ? true : false}   name={radiocommonName} id={firstRadioId}
                                onChange={handleRadioButton} />
                            <label htmlFor={firstRadioId}>{firstRadioTitle}</label>
                        </div>
                            
                        <div className=" col mx-auto flex-fill">
                            <input className="form-check-input yesOrNoRadioButtonColor me-1" type="radio" value={secondRadioValue} checked={responseYorN==="N" ? true : false}   name={radiocommonName} id={secondRadioId}
                                onChange={handleRadioButton} />
                            <label htmlFor={secondRadioId}>{secondRadioTitle}</label>
                        </div>

                        </React.Fragment>
                        :
                        null
                        }
                    
                    </div>
                </div>


            </div>
        </>
    )
}

export default RadioForm