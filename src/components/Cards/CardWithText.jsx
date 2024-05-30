import React from "react";
import Button from "../Button/Button";
import { IoMdCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import StripePaymentForm from "../Forms/StripePaymentForm";
import Badge from "../Badge/Badge";

const CardWithText = ({
  cardTitle,
  cardPrice,
  cardContent_1,
  cardContent_2,
  cardContent_3,
  cardContent_4,
  cardContent_5,
  cardContent_6,
  cardContent_7,
  cardContent_8,
  cardBtnName,
  onClick,
  plan,
  planKey,
  checkOutStatus,
  currentPlan
}) => {
  const datas = [
    { cardContents: cardContent_1 },
    { cardContents: cardContent_2 },
    { cardContents: cardContent_3 },
    { cardContents: cardContent_4 },
    { cardContents: cardContent_5 },
    { cardContents: cardContent_6 },
    { cardContents: cardContent_7 },
    { cardContents: cardContent_8 },
  ];

  const array = [
    "Free trial",
    "Matching Priority",
    "Recommendation Strategy",
    "Personal advisor to advise, coach and plan your future",
    "Resume and linkedin Review Update",
    "Get access to our Community of 50+",
    "Psychometric assessment",
    "Mock Interviews",
  ];
// checkOutStatus.paymentStatus === "cancelled" && checkOutStatus.productPlan === "Basic" ? "Checkout":"Sign up for free" 
  return (
    <div className="card border-0 shadow-sm h-100 rounded-4 ">
      <Badge currentPlan={currentPlan}/>
      {/* <span className={`position-absolute top-0 start-50 translate-middle badge rounded-pill btn-brand-color ${checkOutStatus.paymentStatus === "cancelled" && checkOutStatus.productPlan === "Basic" ? 'd-none':''}`}>
        Current Plan
        <span className="visually-hidden">unread messages</span>
      </span> */}
      <div className="card-body  ps-0 ">
        <h2 className="card-plan fw-bold mx-5 mt-4 mb-3 brand-color">
          {cardTitle}
        </h2>
        <h2 className="card-price mx-5 fw-bold mb-4">
          {cardPrice}
          <span className="fs-6">/yr</span>
        </h2>
        <hr className="ms-5 me-4" />

        <ul className="Pricing-features mx-3 ps-0 list-group">
          {array.map((v, i) => {
            return (
              <li key={i} className="fw-medium priceHead list-unstyled row">
                <div className="pricing-icon">
                  {datas[i].cardContents === "No" ? (
                    <RxCross2 className="mx-2 fs-4 text-danger" />
                  ) : (
                    <IoMdCheckmark className="mx-2 fs-4 text-success" />
                  )}
                </div>
                <div className="col mb-2">
                  <p className="m-0">{v}</p>
                  <p className="pricesubtitle">{datas[i].cardContents}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className=" card-footer border-0 text-center bg-transparent py-4">
        <StripePaymentForm
          cardBtnName={cardBtnName}
          onClick={onClick}
          plan={plan}
          checkOutStatus={checkOutStatus}
          planKey={planKey}
        />
      </div>
    </div>
  );
};

export default CardWithText;

{
  /* <li className='fw-medium priceHead list-unstyled' >
            {cardContent_1 === 'No' ? <RxCross2 className='mx-2 fs-4 text-danger' /> : <IoMdCheckmark className='mx-2 fs-4 text-success ' />}
            Free  trial</li>
          <p className='pricesubtitle'>{cardContent_1}</p>

          <li className='fw-medium priceHead list-unstyled'>
            {cardContent_2 === 'No' ? <RxCross2 className='mx-2 fs-4 text-danger' /> : <IoMdCheckmark className='mx-2 fs-4 text-success ' />}

            Matching Priority</li>
          <p className={`pricesubtitle `}>{cardContent_2}</p>

          <li className='fw-medium priceHead list-unstyled row'>
            {cardContent_3 === 'No' ? <RxCross2 className='mx-2 fs-4 text-danger' /> : <IoMdCheckmark className='mx-2 fs-4 text-success ' />}
            Recommendation Strategy</li>
          <p className='pricesubtitle'>{cardContent_3}</p>

          <li className='fw-medium priceHead list-unstyled row'>
            <div className="pricing-icon">
              {cardContent_4 === 'No' ? <RxCross2 className='mx-2 fs-4 text-danger' /> : <IoMdCheckmark className='mx-2 fs-4 text-success ' />}
            </div>
            <div className="col">
              <p className='m-0'>Personal advisor to advise, coach and plan your future</p>
              <p className={`pricesubtitle`}>{cardContent_4}</p>
            </div>
          </li>

          <li className='fw-medium priceHead list-unstyled'>
            {cardContent_5 === 'No' ? <RxCross2 className='mx-2 fs-4 text-danger' /> : <IoMdCheckmark className='mx-2 fs-4 text-success ' />}
            Resume and linkedin Review Update</li>
          <p className='pricesubtitle'>{cardContent_5}</p>

          <li className='fw-medium priceHead list-unstyled'>
            {cardContent_6 === 'No' ? <RxCross2 className='mx-2 fs-4 text-danger' /> : <IoMdCheckmark className='mx-2 fs-4 text-success ' />}
            Get access to our Community of 50+</li>
          <p className='pricesubtitle'>{cardContent_6}</p>

          <li className='fw-medium priceHead list-unstyled'>
            {cardContent_7 === 'No' ? <RxCross2 className='mx-2 fs-4 text-danger' /> : <IoMdCheckmark className='mx-2 fs-4 text-success ' />}
            Psychometric assessment</li>
          <p className='pricesubtitle'>{cardContent_7}</p>

          <li className='fw-medium priceHead list-unstyled'>
            {cardContent_8 === 'No' ? <RxCross2 className='mx-2 fs-4 text-danger' /> : <IoMdCheckmark className='mx-2 fs-4 text-success ' />}
            Mock Interviews</li>
          <p className='pricesubtitle'>{cardContent_8}</p> */
}
