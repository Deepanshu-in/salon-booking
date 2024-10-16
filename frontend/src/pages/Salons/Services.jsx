/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const Services = ({ services }) => {
  const [cartPrice, setCartPrice] = useState(0);
  const [servicesWithAdded, setServicesWithAdded] = useState([]);

  useEffect(() => {
    if (services && services.length > 0) {
      const updatedServices = services.map((service) => ({
        ...service,
        isAdded: false,
      }));
      setServicesWithAdded(updatedServices);
    }
  }, [services]);
  const handleCart = (item) => {
    const serviceIndex = servicesWithAdded.findIndex(
      (service) => service.item === item.item
    );

    if (serviceIndex !== -1) {
      const updatedServices = [...servicesWithAdded];

      const service = updatedServices[serviceIndex];

      if (!service.isAdded) {
        setCartPrice((prev) => prev + Number(service.discountedPrice));
      } else {
        setCartPrice((prev) => prev - Number(service.discountedPrice));
      }
      updatedServices[serviceIndex] = { ...service, isAdded: !service.isAdded };
      setServicesWithAdded(updatedServices);
    }
  };
  return (
    <div>
      <h1 className="text_para leading-7 font-semibold">
        Select your service:
      </h1>
      <div className="w-full max-h-[400px] border border-primaryColor rounded-md overflow-auto">
        <div className="flex flex-col gap-2 mt-2">
          {servicesWithAdded.map((service, index) => (
            <div
              className="grid grid-cols-3 border-b rounded-md p-3"
              key={index}
            >
              <div className="flex justify-evenly">
                <h3 className="text-[16px] text-text-color leading-6">
                  {service.item}
                </h3>
              </div>
              <div className="flex justify-evenly">
                <h3 className="line-through text-textColor">
                  ₹{service.actualPrice}
                </h3>
                <h4 className=" text-green-500">
                  {(
                    (100 / service.actualPrice) *
                    (service.actualPrice - service.discountedPrice)
                  ).toFixed(0)}
                  %
                </h4>
                <h3 className="text-textColor">₹{service.discountedPrice}</h3>
              </div>
              <div className="flex justify-center">
                {service.isAdded ? (
                  <button
                    className="btnCart"
                    onClick={() => handleCart(service)}
                  >
                    Added
                  </button>
                ) : (
                  <button
                    className="btnCart"
                    onClick={() => handleCart(service)}
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
