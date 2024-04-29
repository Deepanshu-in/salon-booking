/* eslint-disable react-hooks/rules-of-hooks */
import { Link, useSearchParams } from "react-router-dom";
import Lottie from "lottie-react";
import paymentSuccess from "../assets/images/paymentsuccess.json";
import { BsArrowRight } from "react-icons/bs";

// import from "lottie-react"

const PaymentSuccess = () => {
  const searchQuery = useSearchParams()[0];
  const referenceNum = searchQuery.get("reference");
  return (
    // <Lottie animationData={paymentSuccess} loop={true} />
    <div className="mx-auto w-[325px] md:w-[500px] h-[550px] p-4 m-8 border border-primaryColor rounded-md">
      <div className="flex flex-col gap-6 p-2 items-center justify-center">
        <div className="w-[200px] h-[200px]">
          <Lottie animationData={paymentSuccess} loop={true} />
        </div>
        <h1 className="font-bold text-[24px] text-green-500">
          Payment Successfull 🎉
        </h1>
        <div>
          <h1 className=" text-textColor">{`Reference Number : ${referenceNum}`}</h1>
        </div>
        <h1 className="font-semibold text-[24px]">Thank You !!</h1>
        <Link to="/users/profile/me">
          <button className="btn flex items-center gap-2">
            Go To Bookings
            <span>
              <BsArrowRight />
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
