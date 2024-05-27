/* eslint-disable react/prop-types */

import starIcon from "../../assets/images/Star.png";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
const SalonCard = ({ salon }) => {
  const { name, speciality, averageRating, totalRating, photo, address } =
    salon;
  return (
    <Link to={`/salons/${salon._id}`}>
      <div className="max-w-[350px]">
        <div className="p-3 lg:p-5 border border-primaryColor rounded-xl">
          <div className="h-[200px] w-full  flex rounded items-center overflow-hidden">
            <img src={photo} className="w-full "></img>
          </div>
          <div className="w-[30px] h-[4px] rounded-full bg-primaryColor mx-auto"></div>
          <h2 className="text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-headingColor font-[700] mt-3 lg:mt-5">
            {name}
          </h2>
          <div className="mt-2 lg:mt-4 flex items-center justify-between">
            <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 rounded font-semibold">
              {speciality.toUpperCase()}
            </span>

            <div className="flex items-center gap-[6px]">
              <span className="flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                <img src={starIcon} />
                {averageRating.toFixed(2)}
              </span>
              <span className="text-[14px] leading-6 lg:text-[16px] lg:leading-7  text-headingColor">
                ({totalRating})
              </span>
            </div>
          </div>
          <div className="mt-[18px] lg:mt-5 flex items-center gap-6">
            <div className="w-[200px]">
              <h3 className="text-[16px] leading-7 lg:text-[18px] lg:leading-[30px] font-semibold text-headingColor">
                +{totalRating} Happy Customers
              </h3>
              <p className="text-[14px] leading-6 font-[400] text-textColor">
                {address}
              </p>
            </div>
            <div className="w-[54px] h-[54px] rounded-full border border-solid border-[#181A1E] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none">
              <BsArrowRight className=" group-hover:text-white w-6 h-5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SalonCard;
