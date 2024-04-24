import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../../config";
import SalonCard from "../../components/Salons/SalonCard";
import Loader from "../../Loader/Loader";
import Error from "../../Error/Error";
import cactus from "../../assets/images/cactus.svg";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
const MyBookings = () => {
  const {
    data: appointments,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/appointmets/my-appointments`);
  return (
    <div className="mt-10">
      {loading && !error && <Loader />}
      {error && !loading && <Error errorMessage={error} />}

      {!loading && !error && (
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5">
          {appointments.map((salon) => (
            <SalonCard salon={salon} key={salon._id} />
          ))}
        </div>
      )}
      {!loading && !error && appointments.length === 0 && (
        <div className="flex flex-col items-center mt-10 gap-4">
          <img src={cactus} className="w-[100px] h-[100px]"></img>
          <h2 className=" text-center leading-7 text-[20px] font-semibold text-primaryColor">
            Ohhoo! You have not booked any appointments yet :(
          </h2>
          <Link to="/salons">
            <button className="btn flex items-center gap-1">
              Book an Appointment
              <span>
                <AiOutlineArrowRight />
              </span>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
