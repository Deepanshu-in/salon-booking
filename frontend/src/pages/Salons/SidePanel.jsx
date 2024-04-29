/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import convertTime from "../../utils/convertTime";
import Datepicker from "tailwind-datepicker-react";
import { useEffect, useState } from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import HashLoader from "react-spinners/HashLoader";
import { BsArrowRight, BsDashCircle, BsPlusCircle } from "react-icons/bs";
import axios from "axios";
import { BASE_URL, token } from "../../../config";
import { toast } from "react-toastify";
import Loader from "../../Loader/Loader";

const SidePanel = ({ salonId, services, timeSlots }) => {
  const currentDate = new Date(); // Get the current date
  const previousDay = new Date(currentDate); // Create a new Date object based on the current date
  const maxDate = new Date(currentDate); // Create a new Date object based on the current date
  maxDate.setDate(currentDate.getDate() + 6);
  previousDay.setDate(currentDate.getDate() - 1);
  const [loading, setLoading] = useState(false);
  const options = {
    maxDate: maxDate,
    minDate: previousDay,
    theme: {
      disabledText: "bg-gray-300 dark:bg-gray-500 m-[2px]",
    },
    datepickerClassNames: "md:top-[200px] md:right-[120px] top-[1100px]",
    defaultDate: null,
    inputPlaceholderProp: "Select Date",
  };

  const [time, setTime] = useState("Select Slot"); //date selection
  const [dropShow, setdropShow] = useState(false); //if slot menu is clicked or not
  const [show, setShow] = useState(false); //for date picker menu
  const [cartPrice, setCartPrice] = useState(0);
  const [servicesWithAdded, setServicesWithAdded] = useState([]);

  useEffect(() => {
    if (services && services.length > 0) {
      const updatedServices = services.map((service) => ({
        ...service,
        isAdded: false,
      }));
      setServicesWithAdded(updatedServices);
    }
  }, [services]);

  const handleCart = (item) => {
    const serviceIndex = servicesWithAdded.findIndex(
      (service) => service.item === item.item
    );

    if (serviceIndex !== -1) {
      const updatedServices = [...servicesWithAdded]; // Copy the existing array

      const service = updatedServices[serviceIndex];

      if (!service.isAdded) {
        setCartPrice((prev) => prev + Number(service.discountedPrice));
      } else {
        setCartPrice((prev) => prev - Number(service.discountedPrice));
      }

      // Toggle the isAdded property of the service
      updatedServices[serviceIndex] = { ...service, isAdded: !service.isAdded };

      // Update the state with the modified array
      setServicesWithAdded(updatedServices);
      // console.log(servicesWithAdded);
    }
  };

  const checkOutHandler = async (amount) => {
    if (amount === 0) {
      toast.error("Amount cannot be 0");
      return;
    }
    try {
      setLoading(true);
      const {
        data: { key },
      } = await axios.get(`${BASE_URL}/getkey`);
      const res = await fetch(`${BASE_URL}/payments/checkout/${salonId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount }),
      });
      const response = await res.json();
      const { order } = response;
      console.log(response);
      if (!res.ok) {
        throw new Error(response.message + " Please try again later !");
      }
      // if (response.order.id) {
      //   window.location.href = response.order.id;
      // }
      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "StylesAtEase",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id,
        callback_url: `${BASE_URL}/payments/paymentVerification`,
        prefill: {
          name: "Deepanshu Gupta",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      setLoading(false);
    }
  };

  const handleChange = (Date) => {
    console.log(Date);
  };
  const handleClose = (state) => {
    setShow(state);
  };
  return (
    <div className="shadow-panelShadow p-3 lg:p-5 md:w-[400px] w-full rounded-md items-center">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="text_para mt-0 font-semibold">Choose your Services :</p>
          <div className="flex flex-col gap-2 mt-2">
            {servicesWithAdded.map((service, index) => (
              <div
                className="grid grid-cols-3 gap-[110px] justify-evenly border border-black rounded-md p-3"
                key={index}
              >
                <h3 className="text-[16px] text-text-color leading-6">
                  {service.item}
                </h3>
                <div className="grid grid-cols-2 gap-[110px]">
                  <div className="flex flex-row gap-2">
                    <h3 className="line-through text-textColor">
                      ₹{service.actualPrice}
                    </h3>
                    <h4 className=" text-green-500">
                      {(
                        (100 / service.actualPrice) *
                        (service.actualPrice - service.discountedPrice)
                      ).toFixed(0)}
                      %
                    </h4>
                    <h3 className="text-textColor">
                      ₹{service.discountedPrice}
                    </h3>
                  </div>
                </div>
                {service.isAdded ? (
                  <BsDashCircle
                    className="w-6 h-6 rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-primaryColor hover:text-white "
                    onClick={() => handleCart(service)}
                  />
                ) : (
                  <BsPlusCircle
                    className="w-6 h-6 rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-primaryColor hover:text-white"
                    onClick={() => handleCart(service)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text_para mt-0 font-semibold">Choose your day :</p>
          <Datepicker
            classNames="flex flex-col gap-4"
            options={options}
            onChange={handleChange}
            show={show}
            setShow={handleClose}
          />
        </div>
        <div className="flex flex-col justify-between gap-2">
          <p className="text_para mt-0 font-semibold">Choose your Slot :</p>
          {/* dropdowm menu */}
          <div
            className="flex flex-col items-center border border-primaryColor rounded-lg p-2 bg-[#374151] text-white"
            onClick={() => setdropShow((prev) => !prev)}
          >
            <button className="flex flex-row items-center gap-2">
              {time}
              <span>
                {!dropShow ? <AiOutlineCaretDown /> : <AiOutlineCaretUp />}
              </span>
            </button>
            {dropShow && (
              <div className="top-6 flex flex-col gap-2 w-full mt-2 justify-center ">
                {timeSlots.map((item, index) => (
                  <div key={index}>
                    <button
                      className="bg-white w-full p-2  border-primaryColor border-2 rounded-md text-black"
                      onClick={() => {
                        setdropShow(false);
                        setTime(convertTime(item.startTime));
                      }}
                    >
                      {convertTime(item.startTime)}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end items-center">
          <h1 className="font-bold leading-7 text-[16px]">
            {`Total Price : ${cartPrice}`}
          </h1>
        </div>
        <button
          className="btn px-2 rounded-md flex flex-row gap-2 items-center justify-center"
          onClick={() => checkOutHandler(cartPrice)}
        >
          {loading ? (
            <div className="flex items-center justify-center w-full h-full">
              <HashLoader color="#ffffff" />
            </div>
          ) : (
            <>
              Go to Payments{" "}
              <span>
                <BsArrowRight />
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SidePanel;
