import { useEffect, useRef, useState } from "react";
import { FaRegEnvelope, FaSearch } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import Avater from "@assets/img/avater.png";
import { MdClose, MdOutlineMenu } from "react-icons/md";
import { DashBottomMenu, DashMiddleMenu } from "@dummy/adminMenu";
import { Link, useLocation } from "react-router-dom";


const AdminHeader = () => {
  const [messageDropdown, setMessagesDropdown] = useState(false);
  const [notificationDropdown, setNotificationDropdown] = useState(false);
  const [userMenuDropdown, setUserMenuDropdown] = useState(false);
  const [sideBarToggle, setSideBarToggle] = useState(false);
  const { pathname } = useLocation();

  const pathSegments = pathname.split("/").filter(Boolean); // Remove empty segments
  let title = pathSegments.pop(); // Get last segment

  // Check if the last segment is an ID (typically a long alphanumeric string)
  if (title && /^[a-fA-F0-9]{24}$/.test(title)) {
    title = pathSegments.pop() || "Dashboard"; // Fallback to previous segment or default title
  }

  const messageRef = useRef(null);
  const notificationRef = useRef(null);
  const userMenuRef = useRef(null);
  const sidebarRef = useRef(null);

  const handleMessageToggle = (e) => {
    e.stopPropagation();
    setMessagesDropdown(!messageDropdown);
  };

  const handleNotificationToggle = (e) => {
    e.stopPropagation();
    setNotificationDropdown(!notificationDropdown);
  };

  const handleUserMenuToggle = (e) => {
    e.stopPropagation();
    setUserMenuDropdown(!userMenuDropdown);
  };

  const handleSidebarToggle = () => {
    setSideBarToggle(!sideBarToggle);
  };

  // Close Message dropdown when Outside the box is clicked.
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (messageRef.current && !messageRef.current.contains(e.target)) {
        setMessagesDropdown(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setNotificationDropdown(false);
      }

      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuDropdown(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setSideBarToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const SidebarToggleIcon = sideBarToggle ? MdClose : MdOutlineMenu;

  return (
    <div className="relative bg-white w-ful py-5 shadow-sm flex items-center justify-between gap-x-4">
      {/* Left */}
      <div className="flex-1 flex items-center gap-x-3 pl-3 ">
        <SidebarToggleIcon
          onClick={handleSidebarToggle}
          className="text-accent text-2xl lg:hidden"
        />
        <h3 className="h3 font-tertiary tracking-[2px] font-light capitalize">
          {/* Extract the Title of the page from the Pathname */}
          {title}
        </h3>
      </div>

      {/* Middle */}
      <div className="flex-1 h-[36px] hidden lg:block ">
        <div className=" ring-1 ring-accent flex items-center gap-x-2 h-full rounded-sm">
          <FaSearch className="text-accent ml-1" />
          <input
            type="search"
            name=""
            className="h-full flex-grow border-none ring-0 focus:outline-none mr-1"
            placeholder="Search..."
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex-1 ">
        <div className=" flex items-center justify-end  gap-x-4 pr-3 ">
          {/* Messages Notifcation */}
          <div ref={messageRef} className="relative  ">
            <div
              className="relative cursor-pointer"
              onClick={handleMessageToggle}
            >
              <FaRegEnvelope className="text-accent" />
              <span className=" absolute top-[-15px] right-[-5px] bg-red-500 w-[20px] h-[20px] flex items-center justify-center rounded-full text-white text-[13px]">
                23
              </span>
            </div>

            <div
              role="menu"
              aria-hidden={!messageDropdown}
              aria-labelledby="messageDropdown-menu-button"
              className={`${
                !messageDropdown ? "hidden" : "block"
              } absolute w-64 p-4 rounded-sm bg-white top-16 z-10 right-[-25px]`}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam,
              quae.
            </div>
          </div>

          {/* General Notification */}
          <div ref={notificationRef} className="relative  ">
            <div
              className="relative cursor-pointer"
              onClick={handleNotificationToggle}
            >
              <IoMdNotificationsOutline className="text-accent text-[23px]" />
              <span className=" absolute top-[-15px] right-[-5px] bg-red-500 w-[20px] h-[20px] flex items-center justify-center rounded-full text-white text-[13px]">
                6
              </span>
            </div>

            <div
              role="menu"
              aria-hidden={!notificationDropdown}
              aria-labelledby="notificationDropdown-menu-button"
              className={`${
                !notificationDropdown ? "hidden" : "block"
              } absolute w-64 p-4 rounded-sm bg-white top-16 z-10 right-[-25px]`}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam,
              quae.
            </div>
          </div>

          {/* User Icon */}
          <div ref={userMenuRef} className="relative  ">
            <div
              className="relative cursor-pointer"
              onClick={handleUserMenuToggle}
            >
              <img
                src={Avater}
                alt="user"
                className="w-[35px] h-[35px] rounded-full object-cover bg-yellow-400"
              />
            </div>

            <div
              role="menu"
              aria-hidden={!userMenuDropdown}
              aria-labelledby="userMenuDropdown-menu-button"
              className={`${
                !userMenuDropdown ? "hidden" : "block"
              } absolute w-40 p-4 rounded-sm bg-white top-16 z-10 right-0`}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam,
              quae.
            </div>
          </div>
        </div>
      </div>

      {/* Admin Menu Sidebar Mobile */}
      <div
        ref={sidebarRef}
        className={`${
          !sideBarToggle && "-translate-x-full xl:translate-x-0"
        } absolute transition-all duration-300  lg:hidden w-screen overflow-hidden top-[82px] z-30 h-[calc(100vh-82px)] bg-white `}
      >
        <div className="w-full flex flex-col justify-between h-full">
          {/* Middle Part */}
          <div className="flex-2 ">
            {DashMiddleMenu.map((item, index) => {
              return (
                <SideBarLink
                  key={index}
                  item={item}
                  handleSidebarToggle={handleSidebarToggle}
                  pathname={pathname}
                />
              );
            })}
          </div>
          {/*  bottom Part */}

          <div className="border-t border-yellow-900 pt-3">
            {DashBottomMenu.map((item, index) => (
              <SideBarLink
                key={index}
                item={item}
                handleSidebarToggle={handleSidebarToggle}
                pathname={pathname}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function SideBarLink({ item, handleSidebarToggle, pathname }) {
  const Icon = item.icon;
  const isActive = pathname === item.link || pathname.includes(item.link);
  return (
    <Link
      onClick={() => handleSidebarToggle()}
      to={item.link}
      className={`${
        isActive ? "bg-amber-600 text-white" : ""
      } flex items-center px-3 gap-x-3 mb-2 rounded-sm py-2 group hover:bg-amber-600 transition-all duration-300 ease-in-out `}
    >
      <span className="text-xl">
        <Icon className="text-yellow-500 group-hover:text-black " />
      </span>
      <span className="">{item.title}</span>
    </Link>
  );
}

export default AdminHeader;
