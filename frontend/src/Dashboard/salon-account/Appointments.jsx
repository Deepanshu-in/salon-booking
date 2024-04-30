/* eslint-disable react/prop-types */
import { useState } from "react";
import formatTimestamp from "../../utils/ConvertCreatedAt";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";

const Appointments = ({ appointments }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 5;

  // Calculate the index of the first and last appointment for the current page
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = appointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  // Function to handle navigation to the next page
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Function to handle navigation to the previous page
  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div>
      <div className="w-[365px] md:w-full overflow-scroll border border-black rounded-md p-[1px] pb-2">
        <table className="text-left text-sm text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Gender
              </th>
              <th scope="col" className="px-6 py-3">
                Payment
              </th>
              <th scope="col" className="px-6 py-3">
                Services
              </th>
              <th scope="col" className="px-6 py-3">
                Booked on
              </th>
              <th scope="col" className="px-6 py-3">
                Slot
              </th>
            </tr>
          </thead>
          <tbody>
            {currentAppointments.map((item) => (
              <tr
                key={item._id}
                className="border border-b-gray-400 rounded-md items-center"
              >
                <th
                  scope="row"
                  className=" items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                >
                  <div className="text-base font-semibold">
                    {item.user.name}
                  </div>
                  <div className="text-normal text-gray-500">
                    {/* {item.user.phone} */}
                    9507256359
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
                <td className="px-6 py-2">{formatTimestamp(item.createdAt)}</td>
                {/* slot pending */}
                <td className="px-6 py-4">₹{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-row justify-between mx-4">
        <button
          className="btn flex gap-2 items-center"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <span>
            <BsArrowLeft />
          </span>
          Previous
        </button>
        <button
          className="btn flex gap-2 items-center"
          onClick={nextPage}
          disabled={indexOfLastAppointment >= appointments.length}
        >
          Next
          <span>
            <BsArrowRight />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Appointments;
