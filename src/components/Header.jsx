import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "@routes/paths";
import { ExapLogo } from "./Logo";
import useAuthStore from "@store/authStore";

const Header = () => {
  const [header, setHeader] = useState(false);
  const { isAuthenticated, validateAuth, logout } = useAuthStore();
  const [userMenuDropdown, setUserMenuDropdown] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      await validateAuth(); // Ensure validateAuth works properly
    };
    verifyAuth();
  }, [validateAuth]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 0 ? setHeader(true) : setHeader(false);
    });
  }, []);

  const handleUserMenuToggle = (e) => {
    e.stopPropagation();
    setUserMenuDropdown(!userMenuDropdown);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className={`${
        header ? "bg-white py-6 shadow-lg" : "bg-transparent py-8"
      } fixed z-50 w-full transition-all duration-500 `}
    >
      <div className="container mx-auto flex flex-col items-center gap-y-6 lg:flex-row lg:justify-between lg:gap-y-0">
        {/* Logo */}
        <Link to="/">
          {header ? (
            <ExapLogo />
          ) : (
            <ExapLogo spanClass="text-white " TitleClass="text-yellow-500" />
          )}
        </Link>
        {/* nav */}
        <nav
          className={`${
            header ? "text-primary" : "text-white"
          } flex gap-x-4 font-tertiary tracking-[3px] text-[15px] items-center uppercase lg:gap-x-8`}
        >
          <Link to={paths.Index} className="hover:text-accent transition">
            Home
          </Link>
          <Link to={paths.Apartment} className="hover:text-accent transition">
            Apartments
          </Link>
          <Link to={paths.Contact} className="hover:text-accent transition">
            Contacts
          </Link>
          {isAuthenticated ? (
            <div ref={userMenuRef} className="relative  ">
              <div
                className="relative cursor-pointer"
                onClick={handleUserMenuToggle}
              >
                {/* <img
                            src={currentUser.profilPic || Avater}
                            alt="user"
                            className="w-[35px] h-[35px] rounded-full object-cover border border-neutral-100 p-[3px] "
                          /> */}
                Account
              </div>

              <div
                role="menu"
                aria-hidden={!userMenuDropdown}
                aria-labelledby="userMenuDropdown-menu-button"
                className={`${
                  !userMenuDropdown ? "hidden" : "block"
                } absolute w-40 p-4 rounded-sm bg-white top-10 z-10 right-0 shadow-2xl`}
              >
                <div className=" p-2 flex flex-col gap-y-4 text-left">
                  <Link
                    to={paths.AdminDashboard}
                    className="whitespace-nowrap text-accent hover:underline"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to={"#"}
                    onClick={() => logout(navigate)}
                    className=" text-accent hover:underline"
                  >
                    Logout
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <Link to={paths.Login} className="hover:text-accent transition">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
