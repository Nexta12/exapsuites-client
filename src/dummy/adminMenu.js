
import { paths } from "@routes/paths";

import { IoIosLogOut  } from "react-icons/io";
import { MdDashboard, MdOutlineBedroomParent } from "react-icons/md";

import { FaRegAddressCard, FaRegEnvelope } from "react-icons/fa";
import { BsGear, BsPeople } from "react-icons/bs";


export const DashMiddleMenu = [
    {
      title: "Dashboard",
      link: paths.AdminDashboard,
      icon: MdDashboard,
    },
    {
      title: "Messages",
      link: paths.Messages,
      icon: FaRegEnvelope ,
    },
    {
      title: "Bookings",
      link: paths.Bookings,
      icon: FaRegAddressCard ,
    },
    {
      title: "Rooms",
      link: paths.RoomManager,
      icon: MdOutlineBedroomParent,
    },
    {
      title: "Users",
      link: paths.UserManager,
      icon: BsPeople ,
    },
  
  ];
  
   export const DashBottomMenu = [
  
  
    {
      title: "More",
      link: paths.services,
      icon: BsGear ,
    },
    {
      title: "Settings",
      link: paths.services,
      icon: BsGear ,
    },
    {
      title: "Logout",
      link: "#",
      icon: IoIosLogOut,
    },
  ];
  