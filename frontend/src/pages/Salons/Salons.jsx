import SalonCard from "../../components/Salons/SalonCard";
import { BASE_URL } from "../../../config";
import useFetchData from "../../hooks/useFetchData";
import Loader from "../../Loader/Loader";
import Error from "../../Error/Error";
import { useEffect, useState } from "react";
import cactus from "../../assets/images/cactus.svg";
const Salons = () => {
  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");

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
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input
              type="search"
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
              placeholder="Search Salons"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
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
