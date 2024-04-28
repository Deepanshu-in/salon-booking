import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { RiLinkedinFill } from "react-icons/ri";
import { AiFillGithub, AiOutlineInstagram } from "react-icons/ai";

const socialLinks = [
  {
    path: "https://www.linkedin.com/in/deepanshu-gupta-cse",
    icon: <RiLinkedinFill className=" group-hover:text-white w-4 h-5" />,
  },
  {
    path: "https://github.com/Deepanshu-in",
    icon: <AiFillGithub className=" group-hover:text-white w-4 h-5" />,
  },
  {
    path: "https://www.instagram.com/deepanshu_gupta.pvt/",
    icon: <AiOutlineInstagram className=" group-hover:text-white w-4 h-5" />,
  },
];

const quickLinks = [
  { path: "/", display: "Home" },
  // { path: "/services", display: "Services" },
  { path: "/contact", display: "Contact us" },
];
const quickLinks02 = [
  { path: "/salons", display: "Find a Salon" },
  { path: "/", display: "Book an Appointment" },
  // { path: "/", display: "Get an opinion" },
  // { path: "/", display: "Find a location" },
];

const quickLinks03 = [
  // { path: "/", display: "Donate" },
  { path: "/contact", display: "Contact Us" },
  { path: "/terms-and-condition", display: "Terms and Conditions" },
  { path: "/privacy-policy", display: "Privacy Policy" },
];

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="pb-16 pt-10">
      <div className="container">
        <div className="flex flex-col justify-between md:flex-row flex-wrap gap-[30px]">
          <div>
            <img src={logo} className="w-[100px] h-[70px]"></img>
            <p className=" text-[16px] leading-7 font-[400] text-textColor mt-4">
              Copyright &copy;{year} Developed by Deepanshu Gupta All rights
              reserved.
            </p>
            <p className=" text-[16px] leading-7 font-[400] text-textColor mt-1">
              Address: NCT 1 ,Kharar ,Punjab ,140413
            </p>
            <p className=" text-[16px] leading-7 font-[400] text-textColor mt-1">
              Support:dipanshugupta921@gmail.com
            </p>

            <div className="flex items-center gap-3 mt-4">
              {socialLinks.map((item, index) => (
                <Link
                  to={item.path}
                  key={index}
                  className="w-9 h-9 border border-solid border-[#181A1E] rounded-full flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className=" text-[20px] leading-[30px] font-[700] mb-4">
              Quick Links
            </h2>
            <ul>
              {quickLinks.map((item, index) => (
                <li key={index} className="mb-4">
                  <Link
                    to={item.path}
                    className="text-[16px] leading-7 font-[400] text-textColor"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className=" text-[20px] leading-[30px] font-[700]  mb-4">
              I want to :
            </h2>
            <ul>
              {quickLinks02.map((item, index) => (
                <li key={index} className="mb-4">
                  <Link
                    to={item.path}
                    className="text-[16px] leading-7 font-[400] text-textColor"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className=" text-[20px] leading-[30px] font-[700]  mb-4">
              Support
            </h2>
            <ul>
              {quickLinks03.map((item, index) => (
                <li key={index} className="mb-4">
                  <Link
                    to={item.path}
                    className="text-[16px] leading-7 font-[400] text-textColor"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
