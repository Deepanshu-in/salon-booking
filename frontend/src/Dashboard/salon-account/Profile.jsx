/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BASE_URL, token } from "../../../config";
import { toast } from "react-toastify";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";

const Profile = ({ salonData }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    mapLink: "",
    barber: "",
    // photo: "",
    timeSlots: [{ startTime: "10:00", endTime: "10:30" }],
    services: [{ item: "", actualPrice: "", discountedPrice: "" }],
  });

  useEffect(() => {
    setFormData({
      name: salonData?.name,
      email: salonData?.email,
      phone: salonData?.phone,
      address: salonData?.address,
      mapLink: salonData?.mapLink,
      barber: salonData?.barber,
      timeSlots: salonData?.timeSlots,
      services: salonData?.services,
    });
  }, [salonData]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setSelectedPhoto(data);
    setFormData({ ...formData, photo: data.url });
  };
  const updateProfileHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/salons/${salonData._id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw Error(result.message);
      }
      toast.success(result.message);
    } catch (error) {
      toast.warning(error.message);
    }
  };

  //reusable add item function
  const addItem = (key, item) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: [...prevFormData[key], item],
    }));
  };

  //reusable input change function
  const handleReusableInputChangeFunc = (key, index, event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      const updateItems = [...prevFormData[key]];
      updateItems[index][name] = value;
      return {
        ...prevFormData,
        [key]: updateItems,
      };
    });
  };

  //reusable function for deletion
  const deleteItems = (key, index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: prevFormData[key].filter((_, i) => i !== index),
    }));
  };
  const handleAddPriceData = (e) => {
    e.preventDefault();
    addItem("services", {
      item: "",
      actualPrice: "",
      discountedPrice: "",
    });
  };

  const handlePriceChange = (event, index) => {
    handleReusableInputChangeFunc("services", index, event);
  };

  const deletePriceData = (e, index) => {
    e.preventDefault();
    deleteItems("services", index);
  };

  //time slots
  const handleAddTimeSlots = (e) => {
    e.preventDefault();
    addItem("timeSlots", {
      startTime: "",
      endTime: "",
    });
  };

  const handleTimeChange = (event, index) => {
    handleReusableInputChangeFunc("timeSlots", index, event);
  };

  const deleteTimeData = (e, index) => {
    e.preventDefault();
    deleteItems("timeSlots", index);
  };
  return (
    <div>
      <h2 className=" text-headingColor font-bold text-[24px] leading-9 mb-10">
        Profile Information
      </h2>
      <form className="h-[500px] overflow-scroll">
        <div className="mb-5">
          <p className=" text-headingColor font-bold text-[16px] leading-7 ml-1">
            Name of Salon*
          </p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter Salon Name"
            className="w-full pr-4 py-3 px-2 mt-2 rounded-md border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
          ></input>
        </div>
        <div className="mb-5 ">
          <p className=" text-headingColor font-bold text-[16px] leading-7 ml-1">
            Email
          </p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter Email"
            readOnly
            aria-readonly
            disabled={true}
            className="w-full pr-4 py-3 px-2 mt-2 rounded-md border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-not-allowed"
          ></input>
        </div>
        <div className="mb-5">
          <p className=" text-headingColor font-bold text-[16px] leading-7 ml-1">
            Business Phone Number*
          </p>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter Active Phone Number"
            className="w-full pr-4 py-3 px-2 mt-2 rounded-md border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
          ></input>
        </div>
        <div className="mb-5">
          <p className=" text-headingColor font-bold text-[16px] leading-7 ml-1">
            Address*
          </p>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Write proper address"
            maxLength={100}
            className="w-full pr-4 py-3 px-2 mt-2 rounded-md border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
          ></input>
        </div>

        <div className="mb-5">
          <p className=" text-headingColor font-bold text-[16px] leading-7 ml-1">
            Google Map Link*
          </p>
          <input
            type="text"
            name="mapLink"
            value={formData.mapLink}
            onChange={handleInputChange}
            placeholder="Google map link"
            className="w-full pr-4 py-3 px-2 mt-2 rounded-md border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
          ></input>
        </div>
        <div className="mb-5">
          <p className=" text-headingColor font-bold text-[16px] leading-7 ml-1">
            Number of Barber available*
          </p>
          <input
            type="number"
            name="barber"
            value={formData.barber}
            onChange={handleInputChange}
            placeholder="Number of Barber available"
            className="w-full pr-4 py-3 px-2 mt-2 rounded-md border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
          ></input>
        </div>

        <div className="mb-5">
          <p className=" text-headingColor font-bold text-[16px] leading-7 ml-1">
            What service you offer*
          </p>
          {formData.services?.map((item, index) => (
            <div key={index}>
              <div className="grid md:grid-cols-4 grid-cols-2  gap-2 md:gap-5 justify-center items-center">
                <div>
                  <p className=" text-green-400 font-bold text-[16px] leading-7 ml-1">
                    Services
                  </p>
                  <input
                    type="text"
                    value={item.item}
                    name="item"
                    placeholder="eg:Haircut"
                    onChange={(e) => handlePriceChange(e, index)}
                    className="w-full pr-4 py-3 px-2 mt-2 rounded-md border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                  ></input>
                </div>
                <div>
                  <p className=" text-green-400 font-bold text-[16px] leading-7 ml-1">
                    Actual Price
                  </p>
                  <input
                    type="number"
                    value={item.actualPrice}
                    placeholder="eg:₹100"
                    name="actualPrice"
                    onChange={(e) => handlePriceChange(e, index)}
                    className="w-full pr-4 py-3 px-2 mt-2 rounded-md border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                  ></input>
                </div>
                <div>
                  <p className=" text-green-400 font-bold text-[16px] leading-7 ml-1">
                    Discounted Price
                  </p>
                  <input
                    type="number"
                    value={item.discountedPrice}
                    placeholder="eg:₹80"
                    name="discountedPrice"
                    onChange={(e) => handlePriceChange(e, index)}
                    className="w-full pr-4 py-3 px-2 mt-2 rounded-md border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                  ></input>
                </div>
                <button
                  onClick={(e) => deletePriceData(e, index)}
                  className="bg-red-600 md:mt-[26px] flex justify-center w-8 h-8 items-center rounded-full text-white text-[18px] cursor-pointer "
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={handleAddPriceData}
            className=" bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer mt-5"
          >
            Add More
          </button>
        </div>

        <div className="mb-5">
          <p className=" text-headingColor font-bold text-[16px] leading-7 ml-1">
            Time Slots*
          </p>
          {formData.timeSlots?.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 md:grid-cols-4 mb-[25px] gap-5 items-center">
                <div>
                  <p className=" text-green-400 font-bold text-[16px] leading-7 ml-1">
                    Starting Time
                  </p>
                  <input
                    type="time"
                    value={item.startTime}
                    onChange={(e) => handleTimeChange(e, index)}
                    name="startTime"
                    className="w-full pr-4 py-3 px-2 mt-2 rounded-md border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                  ></input>
                </div>
                <div>
                  <p className=" text-green-400 font-bold text-[16px] leading-7 ml-1">
                    End Time
                  </p>
                  <input
                    type="time"
                    value={item.endTime}
                    onChange={(e) => handleTimeChange(e, index)}
                    name="endTime"
                    className="w-full pr-4 py-3 px-2 mt-2 rounded-md border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                  ></input>
                </div>
                <button
                  onClick={(e) => deleteTimeData(e, index)}
                  className="bg-red-600 md:mt-[26px] flex justify-center w-8 h-8 items-center rounded-full text-white text-[18px] cursor-pointer "
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={handleAddTimeSlots}
            className=" bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
          >
            Add More
          </button>
        </div>
        <div className="mb-5 flex items-center gap-3">
          <div className="mb-5 flex items-center gap-3">
            {formData.photo && (
              <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                <img src={formData.photo} className="w-full rounded-full"></img>
              </figure>
            )}
            <div className="relative w-[130px] h-[50px]">
              <input
                type="file"
                name="photo"
                id="customFile"
                onChange={handleFileInputChange}
                accept=".jpg, .png"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
              <label
                htmlFor="customFile"
                className="absolute top-0 left-0 w-full h-full flex items-center justify-center ppx-[0.75rem] py-[0.375rem]  text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
              >
                {selectedPhoto ? "Uploaded" : "Upload Photo"}
              </label>
            </div>
          </div>
        </div>
        <div>
          <button className="btn w-full" onClick={updateProfileHandler}>
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
