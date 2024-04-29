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
    <div className="mx-auto w-[340px] md:w-[500px] h-full p-2 my-4 border border-primaryColor rounded-md">
      <div className="flex flex-col gap-4 p-1 items-center justify-center">
        <div className="w-[200px] h-[200px]">
          <Lottie animationData={paymentSuccess} loop={true} />
        </div>
        <h1 className="font-bold text-[24px] text-green-500">
          Payment Successfull 🎉
        </h1>
        <div>
          <h1 className=" text-textColor">{`Ref Number : ${referenceNum}`}</h1>
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
