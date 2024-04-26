import { useState } from "react";
import contact from "../assets/images/contact-us.jpg";
import { toast } from "react-toastify";
const Contact = () => {
  const [btnText, setBtnText] = useState("Request a Call");
  const onSubmitHandler = (e) => {
    e.preventDefault();
    toast.success("We will contact you soon !");
    setBtnText("Submitted");
  };
  return (
    // <div>
    //   <div className="flex-col mt-28  px-40 m-10 md:visible">
    //     <div className="flex flex-col justify-center">
    //       <div className=" font-extrabold text-4xl">CONTACT US</div>
    //       <div className="mt-5 text-wrap  mr-96 text-justify">
    //         LET’S CONNECT: WE’RE HERE TO HELP, AND WE’D LOVE TO HEAR FROM YOU!
    //         WHETHER YOU HAVE A QUESTION, COMMENT, OR JUST WANT TO CHAT , YOU CAN
    //         REACH OUT TO US THROUGH THE CONTACT FORM OF THIS PAGE, OR BY PHONE,
    //         EMAIL, OR SOCIAL MEDIA.{" "}
    //       </div>
    //     </div>
    //   </div>
    //   <div className="flex flex-col md:px-40 justify-between">
    //     <div className="flex flex-row gap-5 mt-2 justify-between">
    //       <div className="flex flex-col m-16">
    //         {/* <div className="flex flex-row gap-6 justify-between">
    //           <button className=" bg-black text-white py-2 px-3 rounded-md">
    //             VIA SUPPORT CHAT
    //           </button>
    //           <button className=" bg-black text-white py-2 px-3 rounded-md">
    //             VIA CALL
    //           </button>
    //         </div>
    //         <button className="border border-black py-2 px-5 rounded-md mt-5">
    //           VIA EMAIL FORM
    //         </button> */}

    //         <div className="mt-5">
    //           <form>
    //             <div className=" flex flex-col">
    //               <label
    //                 htmlFor="name"
    //                 className="relative top-3 bg-white left-2 text-wrap mr-[270px] ml-1 pl-1"
    //               >
    //                 Enter name
    //               </label>
    //               <input
    //                 type="text"
    //                 name="name"
    //                 className="border border-black px-3 py-4 rounded-sm"
    //               ></input>
    //             </div>

    //             <div className=" flex flex-col">
    //               <label
    //                 htmlFor="email"
    //                 className="relative top-3 bg-white left-2 text-wrap mr-[270px] ml-1 pl-1"
    //               >
    //                 Enter Email
    //               </label>
    //               <input
    //                 type="email"
    //                 name="email"
    //                 className="border border-black px-3 py-4  rounded-sm"
    //               ></input>
    //             </div>

    //             <div className=" flex flex-col">
    //               <label
    //                 htmlFor="phone"
    //                 className="relative top-3 bg-white left-2 text-wrap mr-[254px] ml-1 px-1"
    //               >
    //                 Enter Number
    //               </label>
    //               <input
    //                 type="number"
    //                 name="phone"
    //                 className="border border-black px-3 py-4 rounded-sm"
    //               ></input>
    //             </div>
    //             <button onClick={(e) => onSubmitHandler(e)} className="btn">
    //               {btnText}
    //             </button>
    //           </form>
    //         </div>
    //       </div>
    //       <div className="w-[580px] hidden md:visible">
    //         <img src={contact}></img>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="flex flex-row mt-2 justify-evenly">
      <div className="w-[350px] md:w-[500px] md:m-7 p-4 border border-primaryColor rounded-md">
        <h1 className=" text-primaryColor font-extrabold leading-7 text-[18px] md:text-[26px] mb-4">
          LET’S CONNECT :
        </h1>
        <p1 className="text_para">
          WE’RE HERE TO HELP, AND WE’D LOVE TO HEAR FROM YOU! WHETHER YOU HAVE A
          QUESTION, COMMENT, OR JUST WANT TO CHAT , YOU CAN REACH OUT TO US
          THROUGH THE CONTACT FORM OF THIS PAGE, OR BY PHONE, EMAIL, OR SOCIAL
          MEDIA.
        </p1>
        <div className="mt-5">
          <form>
            <div className=" flex flex-col">
              <label
                htmlFor="name"
                className="relative top-3 bg-white left-2 text-wrap mr-[210px] md:mr-[360px] ml-1 pl-1"
              >
                Enter name
              </label>
              <input
                type="text"
                name="name"
                className="border border-black px-3 py-4 rounded-sm"
              ></input>
            </div>

            <div className=" flex flex-col">
              <label
                htmlFor="email"
                className="relative top-3 bg-white left-2 text-wrap mr-[210px] md:mr-[360px] ml-1 pl-1"
              >
                Enter Email
              </label>
              <input
                type="email"
                name="email"
                className="border border-black px-3 py-4  rounded-sm"
              ></input>
            </div>

            <div className=" flex flex-col">
              <label
                htmlFor="phone"
                className="relative top-3 bg-white left-2 text-wrap mr-[200px] md:mr-[350px] ml-1 px-1"
              >
                Enter Number
              </label>
              <input
                type="number"
                name="phone"
                className="border border-black px-3 py-4 rounded-sm"
              ></input>
            </div>
            <button onClick={(e) => onSubmitHandler(e)} className="btn">
              {btnText}
            </button>
          </form>
        </div>
      </div>
      <img className="hidden md:block w-[500px] h-[600px]" src={contact} />
    </div>
  );
};

export default Contact;
