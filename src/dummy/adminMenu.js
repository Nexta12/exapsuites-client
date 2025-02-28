
import { paths } from "@routes/paths";

import { IoIosLogOut  } from "react-icons/io";
import { MdDashboard, MdOutlineBedroomParent } from "react-icons/md";

import { FaRegAddressCard, FaRegEnvelope } from "react-icons/fa";
import { BsGear, BsGraphUpArrow, BsPeople,} from "react-icons/bs";


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
      title: "Expenses",
      link: paths.Expenses,
      icon: BsGraphUpArrow ,
    },
    {
      title: "Users",
      link: paths.Users,
      icon: BsPeople ,
    },
  
  ];

export const GuestDashenu = [
    {
      title: "Dashboard",
      link: paths.GuestDashboard,
      icon: MdDashboard,
    },
    {
      title: "Bookings",
      link: paths.GuestBookings,
      icon: FaRegAddressCard ,
    },
    // {
    //   title: "Invoices",
    //   link: paths.GuestInvoice,
    //   icon: BsGraphUpArrow ,
    // },
   
  ];
  
   export const DashBottomMenu = [
  
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
  