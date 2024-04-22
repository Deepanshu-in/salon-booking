import logo from "../../assets/images/logo.png";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useRef, useContext } from "react";
import { BiMenu } from "react-icons/bi";
import { authContext } from "../../context/AuthContext";
import userImg from "../../assets/images/user.png";
// import { FaUser } from "react-icons/fa";

const navLinks = [
  {
    path: "/",
    display: "Home",
  },
  {
    path: "/salons",
    display: "Find Salons Nearby",
  },
  // {
  //   path: "/services",
  //   display: "Services",
  // },
  // {
  //   path: "/contact",
  //   display: "Contact",
  // },
];
const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user, role, token } = useContext(authContext);

  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky_header");
      } else {
        headerRef.current.classList.remove("sticky_header");
      }
    });
  };

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener("scroll", handleStickyHeader);
  });
  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          {/* logo */}
          <div>
            <Link to="/">
              <img src={logo} className="h-16 w-32"></img>
            </Link>
          </div>

          {/* menu */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? " text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[600] hover:text-primaryColor"
                    }
                  >
                    {item.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* nav right */}
          <div className="flex items-center gap-4">
            {token && user ? (
              <div>
                <Link
                  to={`${
                    role === "salon" ? "/salons/profile/me" : "users/profile/me"
                  }`}
                >
                  <figure className="w-[45px] h-[45px] rounded-full cursor-pointer border border-primaryColor flex items-center bg-white">
                    <img
                      className="w-full rounded-full"
                      src={user.photo ? user.photo : userImg}
                    />
                  </figure>
                </Link>
              </div>
            ) : (
              <Link to="/login">
                <button className=" bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                  Login
                </button>
              </Link>
            )}

            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="h-6 w-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
