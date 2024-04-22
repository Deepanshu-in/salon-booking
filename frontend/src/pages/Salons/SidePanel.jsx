/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import convertTime from "../../utils/convertTime";
import Datepicker from "tailwind-datepicker-react";
import { useState } from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { BsArrowRight, BsPlusCircle } from "react-icons/bs";

const SidePanel = ({ services, timeSlots }) => {
  const currentDate = new Date(); // Get the current date
  const previousDay = new Date(currentDate); // Create a new Date object based on the current date
  const maxDate = new Date(currentDate); // Create a new Date object based on the current date
  maxDate.setDate(currentDate.getDate() + 6);
  previousDay.setDate(currentDate.getDate() - 1);

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
          {services?.map((item, index) => (
            <div className="grid grid-cols-2 justify-evenly" key={index}>
              <h3 className="text-text-color leading-6">{item.item}</h3>
              <div className="grid grid-cols-2 gap-[110px]">
                <div className="flex flex-row gap-2">
                  <h3 className="line-through text-textColor">
                    ₹{item.actualPrice}
                  </h3>
                  <h4 className=" text-green-500">
                    {(
                      (100 / item.actualPrice) *
                      (item.actualPrice - item.discountedPrice)
                    ).toFixed(0)}
                    %
                  </h4>
                  <h3 className="text-textColor">₹{item.discountedPrice}</h3>
                </div>
                <BsPlusCircle className="w-6 h-6 rounded-full border border-solid border-[#181A1E] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:text-white hover:border-none" />
              </div>
            </div>
          ))}
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
          <div className="flex flex-col items-center border border-primaryColor rounded-lg p-2 bg-[#374151] text-white">
            <button
              className="flex flex-row items-center gap-2"
              onClick={() => setdropShow((prev) => !prev)}
            >
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

        <button className="btn px-2 rounded-md flex flex-row gap-2 items-center justify-center">
          Go to payments{" "}
          <span>
            <BsArrowRight />
          </span>
        </button>
      </div>
    </div>
  );
};

export default SidePanel;
