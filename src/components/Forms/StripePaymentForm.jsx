import React, { useState } from "react";
import Button from "../Button/Button";
import axios from "axios";
import toast from "react-hot-toast";
import axiosInstance from "../../services/api/axiosInstance";

const StripePaymentForm = ({ cardBtnName, planKey, plan, checkOutStatus }) => {
  const [loading, setLoading] = useState(false);

  const checkoutPayment = async (planKey, plan) => {
    setLoading(true);

    const token = localStorage.getItem("Token");
    const createCheckOutParameters = {
      lookup_key: planKey,
      product_plan: plan,
      payment_status: checkOutStatus.paymentStatus,
    };
    
    try {
      const response = await axiosInstance.post("/create_checkout_session",createCheckOutParameters)
      
      // await axios
      //   .post(
      //     "https://devapi.2ndcareers.com/create_checkout_session",
      //     createCheckOutParameters,
      //     {
      //       headers: {
      //         Authorization: `Bearer ${token}`,
      //       },
      //     }
      //   )
      //   .then((response) => {
          if (response.data.error_code === 0) {
            window.location.href = response.data.data.url;
          } else {
            toast.error(response.data.message);
          }
        // })
        // .catch((error) => {
        //   console.log(error);
        // }).finally;
      setLoading(false);
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <form>
      <Button
        className="btn btn-brand-color rounded-pill signUpFree px-5 py-3 fw-bold"
        title={cardBtnName}
        buttonType="button"
        disable={loading}
        functionOnchange={() => checkoutPayment(planKey, plan)}
      />
    </form>
  );
};

export default StripePaymentForm;
