import SalonCard from "../../components/Salons/SalonCard";
import { BASE_URL } from "../../../config";
import useFetchData from "../../hooks/useFetchData";
import Loader from "../../Loader/Loader";
import Error from "../../Error/Error";
import { useEffect, useState } from "react";
import cactus from "../../assets/images/cactus.svg";
import { CiGps } from "react-icons/ci";
import { Tooltip } from "@mui/material";

const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRadians = (angle) => angle * (Math.PI / 180);

  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const lat1Rad = toRadians(lat1);
  const lat2Rad = toRadians(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in kilometers
};
const Salons = () => {
  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const destinationLat = 30.702355395789304;
          const destinationLng = 76.74696593273809;
          const distance = haversineDistance(
            latitude,
            longitude,
            destinationLat,
            destinationLng
          );
          console.log(`Distance to destination: ${distance.toFixed(2)} km`);
        },
        (error) => {
          console.error("Error fetching geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSearch = () => {
    setQuery(query.trim());
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebounceQuery(query);
    }, 500);

    return () => clearTimeout(timeOut);
  }, [query]);

  const {
    data: salons,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/salons?query=${debounceQuery}`);

  return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h1 className="heading">Salons Nearby</h1>
          <div className="flex justify-center mt-[10px]">
            <div className="max-w-[370px]  bg-[#0066ff2c] rounded-l-md flex items-center justify-between">
              <input
                type="search"
                className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
                placeholder="Search Salons"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <Tooltip title="Click to get salons nearby" arrow>
                <button className="py-4 pl-4 pr-2" onClick={handleGetLocation}>
                  <CiGps size={30} />
                </button>
              </Tooltip>
            </div>
            <button
              className="btn mt-0 rounded-[0px] rounded-r-md"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </section>

      <section>
        {loading && <Loader />}
        {error && <Error />}
        {!loading && !error && (
          <div className="container">
            {salons.length !== 0 ? (
              salons.map((salon) => (
                <div
                  key={salon._id}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-5 "
                >
                  <SalonCard salon={salon} />
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center">
                <img src={cactus} className="h-[150px] " />
                <h1 className="font-bold text-red-400 text-[20px]">
                  Ohhoo!! No results found :(
                </h1>
                <h1 className="font-bold text-green-400 text-[20px]">
                  We are continuously working to get more salons onboard. Stay
                  with us!!
                </h1>
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default Salons;
