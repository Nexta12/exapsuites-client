
import { paths } from "@routes/paths";

import { IoIosLogOut  } from "react-icons/io";
import { MdDashboard, MdOutlineBedroomParent } from "react-icons/md";

import { FaRegAddressCard, FaRegEnvelope } from "react-icons/fa";
import { BsGear, BsPeople, BsPerson } from "react-icons/bs";


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
      title: "Apartments",
      link: paths.ApartmentManager,
      icon: MdOutlineBedroomParent,
    },
    {
      title: "Users",
      link: paths.Users,
      icon: BsPeople ,
    },
  
  ];
  
   export const DashBottomMenu = [
  
  
    {
      title: "Profile",
      link: paths.services,
      icon:  BsPerson ,
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
  