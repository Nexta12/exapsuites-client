

import { apiClient } from "@api/apiClient";
import { endpoints } from "@api/endpoints";
import Table from "@components/Table";
import ErrorAlert from "@pages/errorPages/errorAlert";
import { paths } from "@routes/paths";
import useAuthStore from "@store/authStore";
import { getNestedValue } from "@utils/helpers";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeftLong, FaEllipsisVertical } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const GuestBookings = () => {
  const [data, setData] = useState([]);
  const { user } = useAuthStore()
  const [error, setError] = useState(null);
  const [visiblePopup, setVisiblePopup] = useState(null);
  const popupRef = useRef(null);

  const togglePopup = (_id) => {
    setVisiblePopup((prev) => (prev === _id ? null : _id));
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setVisiblePopup(null); // Dismiss popup
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const keyExtractor = (row) => row._id;

  const columns = [
    // { key: "reference", header: "Reference" },
    {
      key: "reference",
      header: "Reference",
      render: (value, row) => (
        <Link
        to={`${paths.GuestBookings}/${row._id}`}
          className="hover:underline block max-w-[200px] truncate text-blue-600"
          title={value} // Shows full text on hover
        >
          {value}
        </Link>
      ),
    },

    {
      key: "apartmentId.title",
      header: "Apartment",
      render: (_, row) => getNestedValue(row, "apartmentId.title"),
      className: 'capitalize'
    },
    {
      key: "startDate",
      header: "Check In",
    },
    {
      key: "endDate",
      header: "Check Out",
    },
    {
      key: "totalPrice",
      header: "Total Cost (₦)",
      render: (value) => {
        return new Intl.NumberFormat("en-US").format(value);
      },
    },
    {
      key: "totalPayment",
      header: "Amount Paid (₦)",
      render: (value) => {
        return new Intl.NumberFormat("en-US").format(value);
      },
    },
 
    {
      key: "status",
      header: "Booking Status",
      render: (value) => {
        if (typeof value === "string") {
          // Determine the styles based on the value
          let bgClass = "";
          let textClass = "";
          switch (value) {
            case "completed":
              value = "Active";
              bgClass = "bg-green-100";
              textClass = "text-green-800 capitalize text-[12px] ";
              break;
            case "pending":
              bgClass = "bg-yellow-100";
              textClass = "text-yellow-800 capitalize text-[12px] ";
              break;
            case "canceled":
              bgClass = "bg-red-100";
              textClass = "text-red-800 capitalize text-[12px] ";
              break;
            case "confirmed":
              bgClass = "bg-blue-100";
              textClass = "text-blue-800 capitalize text-[12px] ";
              break;
            default:
              // Fallback for unexpected values
              bgClass = "bg-gray-100";
              textClass = "text-gray-800";
          }

          return (
            <span
              className={`px-2 py-1 rounded text-sm font-medium ${bgClass} ${textClass}`}
            >
              {value}
            </span>
          );
        }

        // Fallback for unexpected types
        return null;
      },
    },
    {
      key: "actions",
      header: "Actions",
      render: (_, row) => (
        <div className="relative flex items-center justify-center">
          <FaEllipsisVertical
            className="cursor-pointer"
            onClick={() => togglePopup(row._id)}
          />

          {visiblePopup === row._id && (
            <div
              ref={popupRef}
              className="absolute bg-white border rounded shadow p-2 top-[-4px] right-0 z-10 flex items-center gap-3"
            >
              <Link to={`${paths.GuestBookings}/${row._id}`}>View</Link>
              {row.status !== 'expired' && (
              <Link to={`${paths.GuestBookings}/update/${row._id}`}>Update</Link>
            )}
             
            </div>
          )}
        </div>
      ),
    },
  ];

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  // Pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(7);
  const totalPages = Math.ceil(data.length / pageSize);

  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`${endpoints.getAllBookings}/${user.id}`);
        setData(response.data);
        setError(null);
      } catch {
        setError("An error occurred");
      }
    };
    fetchData();
  }, [user.id]);

  const navigate = useNavigate();
  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(paths.AdminDashboard);
    }
  };

  return (
    <div className="pb-24">
        <FaArrowLeftLong
          onClick={() => handleGoBack()}
          className="cursor-pointer text-2xl text-neutral-400 lg:hidden"
        />
      {/* Render ErrorAlert if there's an error */}
      {error && <ErrorAlert message={error} />}

      <div className="my-4 w-full flex items-center justify-between">
      
        <h1 className="text-primary tracking-[1px]">My Bookings</h1>
        <div className="">
        
        </div>
        {/* Table */}
      </div>
      {/* Table */}
      <Table
        data={paginatedData}
        columns={columns}
        keyExtractor={keyExtractor}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default GuestBookings;
