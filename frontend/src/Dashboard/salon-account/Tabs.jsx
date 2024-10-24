/* eslint-disable react/prop-types */
import { useContext } from "react";
import { authContext } from "../../context/AuthContext";
import { BiMenu } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const Tabs = ({ tab, setTab }) => {
  const menuRef = useRef(null);
  const { dispatch } = useContext(authContext);
  const navigate = useNavigate();
  const toggleMenu = () => menuRef.current.classList.toggle("show__menu_left");

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
  return (
    <div>
      <span className="lg:hidden" onClick={toggleMenu}>
        <BiMenu className="w-6 h-6 cursor-pointer" />
      </span>

      <div
        className="md:hidden navigation_left"
        ref={menuRef}
        onClick={toggleMenu}
      >
        <div className="menu_left flex items-center gap-6">
          <button
            onClick={() => setTab("overview")}
            className={`${
              tab === "overview"
                ? " bg-indigo-100 text-primaryColor"
                : " bg-transparent text-headingColor"
            } w-full btn px-2 rounded-md `}
          >
            Overview
          </button>
          <button
            onClick={() => setTab("appointments")}
            className={`${
              tab === "appointments"
                ? " bg-indigo-100 text-primaryColor"
                : " bg-transparent text-headingColor"
            } w-full btn mt-0 rounded-md`}
          >
            Appointments
          </button>
          <button
            onClick={() => setTab("settings")}
            className={`${
              tab === "settings"
                ? " bg-indigo-100 text-primaryColor"
                : " bg-transparent text-headingColor"
            } w-full btn mt-0 rounded-md`}
          >
            Profile
          </button>
          <div className="mt-[50px] md:mt-[100px] flex justify-center">
            <button
              className="btn w-[180px] bg-[#181A1E]"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md">
        <button
          onClick={() => setTab("overview")}
          className={`${
            tab === "overview"
              ? " bg-indigo-100 text-primaryColor"
              : " bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          Overview
        </button>
        <button
          onClick={() => setTab("appointments")}
          className={`${
            tab === "appointments"
              ? " bg-indigo-100 text-primaryColor"
              : " bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          Appointments
        </button>
        <button
          onClick={() => setTab("settings")}
          className={`${
            tab === "settings"
              ? " bg-indigo-100 text-primaryColor"
              : " bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          Profile
        </button>
        <div className="mt-[50px] md:mt-[100px]">
          <button className="btn w-full bg-[#181A1E]" onClick={handleLogout}>
            Logout
          </button>
          <button className="btn bg-red-600 mt-4 w-full">Delete Account</button>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
