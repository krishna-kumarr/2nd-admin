import React, { useState, useEffect } from "react";
import { FaRegCircleXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../services/api/axiosInstance'
const FailurePayment = () => {
  const [message, setMessage] = useState("");

  const [timeLeft, setTimeLeft] = useState(null);
  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(null);
      return navigate("/professional/home/all_jobs", { replace: true });
    }

    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const navigate = useNavigate();

  const getUserPaymentStatus = async (id) => {
    const getCheckOutParameter = {
      flag: "failure",
      id: id,
    };

    try {

      const response = await axiosInstance.post("/update_checkout_status", getCheckOutParameter)
      if (response.data.error_code === 0) {
        setMessage(response.data.message);
        setTimeLeft(10);
      }     
    } catch (err) {
      console.log(err);
    }
  };

  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");
  if (id !== null) {
    var uri = window.location.toString();
    if (uri.indexOf("?") > 0) {
      var clean_uri = uri.substring(0, uri.indexOf("?"));
      window.history.replaceState({}, document.title, clean_uri);
    }
    getUserPaymentStatus(id);
  }
  return (
    <section className="container text-center">
      <section className="row align-items-center justify-content-center vh-100">
        <div className="email-verified ">
          <h1 className="text-danger symbolSize">
            <FaRegCircleXmark />
          </h1>
          <h3>Payment Failed</h3>
          <p>{message}</p>
          <p>You will be redirected into home page within {timeLeft}s</p>
          <p>
            Back to
            <a
              href="https://devapp.2ndcareers.com/professional/home/all_jobs"
              className="link brand-color fw-bold ms-2"
            >
              2nd Careers portal
            </a>
          </p>
        </div>
      </section>
    </section>
  );
};

export default FailurePayment;
