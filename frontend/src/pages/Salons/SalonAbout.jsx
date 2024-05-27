/* eslint-disable react/prop-types */
const SalonAbout = ({ name, about, address, services }) => {
  return (
    <div>
      <div>
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2 ">
          About
          <span className=" text-irisBlueColor font-bold text-[24px] leading-9">
            {name}
          </span>
        </h3>
        <p className="text__para">{about}</p>
      </div>
      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Best Known for:
        </h3>
        <div className="pt-4 md:p-5">
          {services?.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <h3 className=" text-irisBlueColor text-[15px] leading-6 font-semibold">
                {item.item}
              </h3>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-1">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Address:
        </h3>
        <ul className="pt-4 md:p-5">
          <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
            <div className="flex flex-col gap-2">
              <h3 className=" text-irisBlueColor text-[15px] leading-6 font-semibold">
                {address}
              </h3>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SalonAbout;
