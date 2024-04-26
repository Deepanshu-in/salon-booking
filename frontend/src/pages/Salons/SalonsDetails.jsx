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
const SalonsDetails = () => {
  const [tab, setTab] = useState("about");
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
    timeSlots,
    reviews,
  } = salon;
  return (
    <section>
      <div className="max-w-[1170px] px-4 mx-auto">
        {loading && <Loader />}
        {error && <Error />}
        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-[50px]">
            <div className="md:col-span-2">
              <div className="flex flex-col md:flex-row items-center gap-5">
                <figure className="max-w-[200px] max-h-[200px]">
                  <img src={photo} className="w-full rounded-md h-[180px]" />
                </figure>

                <div>
                  <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                    Hair Salon
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

              <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
                <button
                  onClick={() => setTab("about")}
                  className={`${
                    tab === "about" &&
                    "border-b-2 border-solid border-primaryColor"
                  } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
                >
                  About
                </button>
                <button
                  onClick={() => setTab("feedback")}
                  className={`${
                    tab === "feedback" &&
                    "border-solid border-b-2 border-primaryColor"
                  } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
                >
                  Feedback
                </button>
              </div>

              <div className="mt-[50px]">
                {tab === "about" && (
                  <SalonAbout name={name} address={address} />
                )}
                {tab === "feedback" && (
                  <Feedback reviews={reviews} totalRating={totalRating} />
                )}
              </div>
            </div>
            <div>
              <SidePanel
                salonId={id}
                services={services}
                timeSlots={timeSlots}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SalonsDetails;
