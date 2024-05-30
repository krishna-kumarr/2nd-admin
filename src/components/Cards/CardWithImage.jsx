import React, { useState } from "react";
import Button from "../Button/Button";
import DoubleButton from "../Button/DoubleButton";
// import { FaSave } from "react-icons/fa";
// import { FaShare } from "react-icons/fa6";
// import { Outlet } from "react-router-dom";
// import { FaLinkedin, FaTelegram, FaFacebook } from "react-icons/fa6";
// import { IoMailOpen, IoLogoWhatsapp } from "react-icons/io5";
import toast from "react-hot-toast";
import Image from "../Image/Image";

const CardWithImage = ({
  cardImage,
  cardTitle,
  cardText,
  cardTextClassName,
  cardParaTestId,
  cardButtonTestId,
  cardButtonId,
  buttonName,
  role,
  firstButton_Name,
  secondButton_Name,
  icon,
  firstCardColor,
  secondCardColor,
  pageRenderPath,
  width,
  height,
  imageClassName,
  cardTitleStyle,
  modalContent,
  cardKey,
  leftLearnUrl,
  leftCommUrl,
  rightLearnUrl,
  rightCommUrl,
  getModalData,
  modalId,
}) => {
  const handleOnClick = () => {
    toast.success("Link copied");
    navigator.clipboard.writeText(rightCommUrl);
  };

  

  return (
    <div
      className="card h-100 shadow bg-body rounded-4 border-0 overflow-hidden"
      key={cardKey}
    >
      {role === "learningAndCommunity" ? (
        <img
          src={`${process.env.REACT_APP_SECOND_CAREERS_CDN}${cardImage}`}
          className={imageClassName}
          alt="Image"
          data-testid="imgTesting"
          width={width}
          height={height}
        />
      ) : (
        <img
          src={cardImage}
          className={imageClassName}
          alt="Image"
          data-testid="imgTesting"
          width={width}
          height={height}
        />
      )}
      <div className="card-body">
        <h5
          className={`card-title ${cardTitleStyle}`}
          data-testid="cardHeadingTestId"
        >
          {cardTitle}
        </h5>
        <span
          className={`card-text ${cardTextClassName}`}
          data-testid={cardParaTestId}
        >
          {cardText.slice(0, 150)}
          {cardTitleStyle === "learningTitle" ||
          cardTitleStyle === "communityTitle" ? (
            <span
              className="btn btn-link p-0 ms-2"
              data-bs-toggle="modal"
              data-bs-target="#learnMore"
              onClick={() => getModalData(modalId)}
            >
              Read More
            </span>
          ) : null}
        </span>
      </div>

      <div
        className="modal fade col-md-4"
        id="learnMore"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                {cardTitle}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body h-100 mb-4 mx-2 card-text">
              {modalContent}
            </div>
          </div>
        </div>
      </div>

      <div className="card-footer bg-transparent border-0">
        {role === "learningAndCommunity" ? (
          <DoubleButton
            firstButtonName={firstButton_Name}
            secondButtonName={secondButton_Name}
            cardIcon={icon}
            firstCardColorclassName={firstCardColor}
            secondCardColorclassName={secondCardColor}
            leftLearnUrl={leftLearnUrl}
            leftCommUrl={leftCommUrl}
            rightLearnUrl={rightLearnUrl}
            rightCommUrl={rightCommUrl}
          />
        ) : (
          <Button
            className="rounded w-100 mb-2 sign-up-buttons"
            title={buttonName}
            buttonType="button"
            functionOnchange={pageRenderPath}
            testId={cardButtonTestId}
            id={cardButtonId}
          />
        )}
      </div>

      {/* Share Modal */}
      <div
        className="modal fade"
        id="shareModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Share
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body pb-0">
              {/* <div className="social-media">
                <p className="share-text ">Share the link via</p>
                <ul className="row list-unstyled ms-auto">
                  <li className="col"> <a href=""><IoLogoWhatsapp className="fs-2 whastapp-color" /></a></li>
                  <li className="col"> <a href=""><FaFacebook className="fs-2 facebook-color" /></a></li>
                  <li className="col"><a href=""><FaLinkedin className="fs-2 linkedin-color" /></a></li>
                  <li className="col"> <a href=""><FaTelegram className="fs-2 telegram-color" /></a></li>
                  <li className="col"> <a href=""><IoMailOpen className="fs-2 mail-color" /></a></li>
                </ul>
              </div> */}
            </div>
            <div className="modal-body pt-0">
              <div className="mb-2 position-relative">
                {/* <label htmlFor="message-text" className="col-form-label mb-2 fs-5">
                  Copy link
                </label> */}
               
                <input
                  className="form-control  mx-auto mt-0 linkFieldSize"
                  id="message-text"
                  value={`${rightCommUrl}`}
                  readOnly
                />
                <button
                  type="button"
                  className="btn btn-brand-color button-position"
                  onClick={handleOnClick}
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardWithImage;
