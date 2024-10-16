import starIcon from "../../assets/images/Star.png";
import { useState } from "react";
import SalonAbout from "./SalonAbout";
import Feedback from "./Feedback";
import SidePanel from "./SidePanel";
import { BASE_URL } from "../../../config";
import Loader from "../../Loader/Loader";
import Error from "../../Error/Error";
import useFetchData from "../../hooks/useFetchData";
import { useParams } from "react-router-dom";
import Services from "./Services";
const SalonsDetails = () => {
  const [tab, setTab] = useState("services");
  const { id } = useParams();
  const {
    data: salon,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/salons/${id}`);
  const {
    name,
    averageRating,
    totalRating,
    photo,
    address,
    services,
    speciality,
    timeSlots,
    reviews,
  } = salon;
  return (
    <section>
      <div className="px-4">
        {loading && <Loader />}
        {error && <Error />}
        {!loading && !error && (
          <div className="flex justify-center  gap-[10px]">
            <div className="w-[900px]">
              <div className="flex flex-col md:flex-row items-center gap-5">
                <figure className="max-w-[200px] max-h-[200px]">
                  <img src={photo} className="w-full rounded-md h-[180px]" />
                </figure>

                <div>
                  <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                    {speciality?.toUpperCase()}
                  </span>
                  <h3 className=" text-headingColor text-[22px] leading-9 mt-3 font-bold">
                    {name}
                  </h3>
                  <div className="flex items-center gap-[6px ]">
                    <span className="flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                      <img src={starIcon} />
                      {averageRating}
                    </span>
                    <span className="text-[14px] leading-6 lg:text-[16px] lg:leading-7  text-headingColor">
                      ({totalRating})
                    </span>
                  </div>
                  <p className="text__para text-[14px] leading-6 md:texxt-[15px] lg:max-w-[390px]">
                    {address}
                  </p>
                </div>
              </div>

              <div className="mt-[50px] flex flex-col sm:flex-row  gap-1">
                <button
                  onClick={() => setTab("services")}
                  className={`${
                    tab === "services" &&
                    "border-b-2 border-solid border-primaryColor"
                  } border border-solid rounded-md border-[#0066ff34] py-2 px-5 text-[16px] leading-7 text-headingColor font-semibold`}
                >
                  Services
                </button>
                <button
                  onClick={() => setTab("about")}
                  className={`${
                    tab === "about" &&
                    "border-b-2 border-solid border-primaryColor"
                  } border border-solid rounded-md border-[#0066ff34] py-2 px-5 text-[16px] leading-7 text-headingColor font-semibold`}
                >
                  About
                </button>
                <button
                  onClick={() => setTab("feedback")}
                  className={`${
                    tab === "feedback" &&
                    "border-solid border-b-2 border-primaryColor"
                  } border border-solid rounded-md border-[#0066ff34] py-2 px-5 text-[16px] leading-7 text-headingColor font-semibold`}
                >
                  Feedback
                </button>
              </div>

              <div className="mt-[20px]">
                {tab === "about" && (
                  <SalonAbout
                    name={name}
                    address={address}
                    services={services}
                  />
                )}
                {tab === "feedback" && (
                  <Feedback reviews={reviews} totalRating={totalRating} />
                )}
                {tab === "services" && (
                  <SidePanel
                    salonId={id}
                    services={services}
                    timeSlots={timeSlots}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SalonsDetails;
