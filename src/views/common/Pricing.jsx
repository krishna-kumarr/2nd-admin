import React, { useEffect, useState } from "react";
import DashboardNavbar from "../../components/Navbar/DashboardNavbar";
import CardWithText from "../../components/Cards/CardWithText";
import images from "../../utils/images";
import { DataProvider } from "../../hooks/CommonContext";
import axios from "axios";
import toast from "react-hot-toast";


const Pricing = () => {
  const professionalPageDashboardMenu = ["Home", "Learning", "Community"];

  const [checkOutStatus, setCheckOutStatus] = useState({
    paymentStatus:'',
    productPlan:''
  }) 

  useEffect(()=>{

    const updateCheckoutStatus = () => {
      try {
        axios
         .get(
           "https://devapi.2ndcareers.com/get_checkout_status",
           {headers:{
            Authorization: `Bearer ${localStorage.getItem('Token')}`
           }}
         )
         .then((response) => {
           if (response.data.error_code === 0) {
            setCheckOutStatus({
              paymentStatus:response.data.data.payment_status,
              productPlan:response.data.data.product_plan
            })
           }else{
            toast.error(response.data.message)
           }
         })
         .catch((err) => {
           console.log(err);
         });
     } catch (err) {
       console.log(err);
     }
    }
  
    updateCheckoutStatus();
    
  },[])
  
  

  return (

      <div className="pricing-plan">
        <section className="pt-5">
          <div className="row row-cols-1 row-cols-md-1 row-cols-lg-3 g-4 w-75 mx-auto pt-3">
            <div className="w-100 text-center mt-4">
              <span className="fs-3 fw-bold">Pricing plan</span>
              <span className="ms-4 d-block">
                <img
                  src={images.underline}
                  alt="underline"
                  className="img-responsive logo"
                />
              </span>
            </div>

            <div className="col">
              <CardWithText
                cardTitle="Basic"
                cardPrice="₹100"
                cardContent_1="Yes"
                cardContent_2="No"
                cardContent_3="No"
                cardContent_4="No"
                cardContent_5="No"
                cardContent_6="No"
                cardContent_7="No"
                cardContent_8="No"
                cardBtnName={checkOutStatus.paymentStatus === "trialing" && checkOutStatus.productPlan === "Basic" ? "Checkout":"Sign up for free" }
                plan="Basic"
                planKey={process.env.REACT_APP_PLAN_BASIC}
                currentPlan={checkOutStatus.paymentStatus === "trialing" && checkOutStatus.productPlan === "Basic"}
                checkOutStatus={checkOutStatus}
              />
            </div>

            <div className="col">
              <CardWithText
                cardTitle="Premium"
                cardPrice="₹6,000"
                cardContent_1="No"
                cardContent_2="2nd Career team will personally recommend your profile to
                             employers"
                cardContent_3="Peronalized job recommendation from 2nd Careers team"
                cardContent_4="10 hours per year - 2nd Career coaches with over 15+ years
                             of experience"
                cardContent_5="Yes"
                cardContent_6="Yes"
                cardContent_7="No"
                cardContent_8="No"
                cardBtnName="Checkout"
                plan="Premium"
                planKey={process.env.REACT_APP_PLAN_PREMIUM}
                currentPlan={false}
                checkOutStatus={checkOutStatus}
              />
            </div>

            <div className="col">
              <CardWithText
                cardTitle="Elite"
                cardPrice="₹10,000"
                cardContent_1="No"
                cardContent_2="2nd Career team will personally recommend your profile to
                             employers"
                cardContent_3="Peronalized job recommendation from 2nd Careers team"
                cardContent_4="20 hours per year - 2nd Career coaches with over 20+ years
                             of experience"
                cardContent_5="Yes"
                cardContent_6="Yes"
                cardContent_7="Yes"
                cardContent_8="Yes"
                cardBtnName="Checkout"
                plan="Elite"
                planKey={process.env.REACT_APP_PLAN_ELITE}
                currentPlan={false}
                checkOutStatus={checkOutStatus}
              />
            </div>

            <div className="text-center w-100 fw-medium cardCopyRight mt-5">
              <span className="d-block mb-1">
                Copyright &copy; 2024 | Powered by 2nd Careers
              </span>
              <span className="d-block mb-3">Terms and conditions</span>
            </div>
          </div>
        </section>
      </div>
  );
};

export default Pricing;
