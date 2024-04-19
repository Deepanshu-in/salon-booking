import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../../config";
import SalonCard from "../../components/Salons/SalonCard";
import Loader from "../../Loader/Loader";
import Error from "../../Error/Error";
const MyBookings = () => {
  const {
    data: appointments,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/appointmets/my-appointments`);
  return (
    <div>
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
        <h2 className="mt-5 text-center leading-7 text-[20px] font-semibold text-primaryColor">
          You have not booked any salon appointments yet!!
        </h2>
      )}
    </div>
  );
};

export default MyBookings;
