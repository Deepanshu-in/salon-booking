import { useState } from "react";
import Loader from "../../Loader/Loader";
import Error from "../../Error/Error.jsx";
import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL } from "../../../config";
import infoIcon from "../../assets/images/info.svg";
import starIcon from "../../assets/images/Star.png";
import SalonAbout from "../../pages/Salons/SalonAbout";
import Profile from "./Profile.jsx";
import Appointments from "./Appointments.jsx";
import Tabs from "./Tabs.jsx";

const Dashboard = () => {
  const { data, loading, error } = useGetProfile(
    `${BASE_URL}/salons/profile/me`
  );
  const [tab, setTab] = useState("overview");
  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loader />}
        {error && !loading && <Error errorMessage={error} />}
        {!loading && !error && (
          <div className="grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]">
            <Tabs tab={tab} setTab={setTab} />
            <div className="lg:col-span-2">
              {data.isApproved === "pending" && (
                <div className="flex p-4 mb-4 text-yellow-800 bg-yellow-200 rounded-lg items-center">
                  <img src={infoIcon} className="h-6 w-6"></img>
                  <div className="ml-3 text-sm font-medium">
                    To get approval please complete your profile. We&apos;ll let
                    you know manually within 24 hours
                  </div>
                </div>
              )}
              <div className="">
                {tab === "overview" && (
                  <div>
                    <div className="flex flex-col gap-10 md:flex-row items-center md:gap-4 mb-10">
                      <figure className="w-[300px] md:max-w-[200px] max-h-[200px]">
                        <img src={data.photo} className="w-full" />
                      </figure>
                      <div className="w-[300px]">
                        <span className="bg-[#CCF0F3] text-irisBlueColor py-2 px-4 lg:py-2 lg:px-6 rounded-md text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold">
                          {data.speciality?.toUpperCase()}
                        </span>
                        <h3 className="text-[22px] leading-9 font-bold text-headingColor mt-3">
                          {data.name}
                        </h3>
                        <div className="flex items-center gap-[6px]">
                          <span className="flex items-center gap-[6px] text-headingColor text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold">
                            <img src={starIcon} />
                            {data.averageRating}
                          </span>
                          <span className="text-textColor text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold">
                            ({data.totalRating})
                          </span>
                        </div>
                        <p className="text_para font-[15px] lg:max-w-[390px] leading-6">
                          Salon Information
                        </p>
                      </div>
                    </div>
                    <SalonAbout
                      name={data.name}
                      about={data.about}
                      barber={data.barber}
                      address={data.address}
                      services={data.services}
                    />
                  </div>
                )}
                {tab === "appointments" && (
                  <Appointments appointments={data.appointments} />
                )}
                {tab === "settings" && <Profile salonData={data} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
