import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL } from "../../../config";
import formatTimestamp from "../../utils/ConvertCreatedAt";
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
  } = useGetProfile(`${BASE_URL}/users/profile/me`);
  console.log(appointments);
  return (
    <div className="mt-10">
      {loading && !error && <Loader />}
      {error && !loading && <Error errorMessage={error} />}

      {!loading && !error && (
        <table className="w-full text-left text-sm text-gray-500">
          <thead className=" text-xs text-gray-700 uppercase bg-gray-50">
            <tr className=" ">
              <th scope="col" className=" px-6 py-3">
                Name
              </th>
              <th scope="col" className=" px-6 py-3">
                Gender
              </th>
              <th scope="col" className=" px-6 py-3">
                Payment
              </th>
              <th scope="col" className=" px-6 py-3">
                Services
              </th>
              <th scope="col" className=" px-6 py-3">
                Booked on
              </th>
              <th scope="col" className=" px-6 py-3">
                Slot
              </th>
            </tr>
          </thead>
          <tbody>
            {appointments.appointments?.map((item) => (
              <tr key={item._id}>
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                >
                  {/* <img
                src={item.user.photo}
                className="w-10 h-10 rounded-full"
              ></img> */}
                  <div className=" text-base font-semibold">
                    {item.user.name}
                  </div>
                  <div className=" text-normal text-gray-500">
                    {item.user.phone}
                  </div>
                </th>
                <td className="px-6 py-4">{item.user.gender.toUpperCase()}</td>
                <td className="px-6 py-4">
                  {item.isPaid && (
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                      Paid
                    </div>
                  )}
                  {!item.isPaid && (
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                      UnPaid
                    </div>
                  )}
                </td>
                {/* services opted  pending*/}
                <td className="px-6 py-4">{item.user.gender}</td>
                <td className="px-6 py-4">{formatTimestamp(item.createdAt)}</td>
                {/* slot pending */}
                <td className="px-6 py-4">₹{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
