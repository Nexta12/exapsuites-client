import { apiClient } from "@api/apiClient";
import { endpoints } from "@api/endpoints";
import Spinner from "@components/Spinner";
import ErrorAlert from "@pages/errorPages/errorAlert";
import { ErrorFormatter } from "@pages/errorPages/ErrorFormatter";
import { paths } from "@routes/paths";
import useAuthStore from "@store/authStore";
import { UserRole } from "@utils/constants";
import { DateFormatter } from "@utils/helpers";
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";

const BookingDetails = () => {
  const { user } = useAuthStore()
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [bookingDetails, setBookingDetails] = useState({});

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(paths.AdminDashboard);
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchBookingDetails = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(
          `${endpoints.getSingleBooking}/${id}`
        );
        setBookingDetails(response.data);
      } catch (error) {
        setError(ErrorFormatter(error));
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [id]);

  if (loading) return <Spinner />;

  return (
    <div className="pb-16">
         <FaArrowLeftLong
          onClick={() => handleGoBack()}
          className="cursor-pointer text-neutral-400 lg:hidden"
        />
      {/* Render ErrorAlert if there's an error */}
      {error && <ErrorAlert message={error} />}

      <div className="mt-5 mb-8 w-full flex items-center justify-end">
        {bookingDetails.status !== 'expired' && ( 
        <div className="">
          <Link
            to={`${user.role !== UserRole.guest ? paths.Bookings : paths.GuestBookings }/update/${bookingDetails._id}`}
            className="btn btn-primary py-2 rounded-sm whitespace-nowrap"
          >
            Extend Booking
          </Link>
        </div>
        ) }
      </div>

      <div className="bg-white w-full md:w-[80%]  mx-auto p-4 lg:p-10 border border-gray-300 ">
        <div className="">
          <div className="w-full mt-4 mb-4 border-b border-gray flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-tertiary font-semibold tracking-[1px]">
                Apartment
              </h3>
            </div>
            <div className="flex-[2] text-end ">
              <p className="text-md capitalize">
                {bookingDetails.apartmentId.title}
              </p>
            </div>
          </div>

          <div className="w-full mb-4 border-b border-gray flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-tertiary font-semibold tracking-[1px] whitespace-nowrap">
                Main Guest
              </h3>
            </div>
            <div className="flex-[2] text-end ">
              <p className="text-md capitalize whitespace-nowrap">
                {bookingDetails.contactInfo.firstName}{" "}
                {bookingDetails.contactInfo.lastName}{" "}
              </p>
            </div>
          </div>

          <div className="w-full mb-4 border-b border-gray flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-tertiary font-semibold tracking-[1px] whitespace-nowrap">
                Email:
              </h3>
            </div>
            <div className="flex-[2] text-end ">
              <p className="text-md whitespace-nowrap">
                {bookingDetails.contactInfo.email}{" "}
              </p>
            </div>
          </div>
          <div className="w-full mb-4 border-b border-gray flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-tertiary font-semibold tracking-[1px] whitespace-nowrap">
                Phone:
              </h3>
            </div>
            <div className="flex-[2] text-end ">
              <p className="text-md  whitespace-nowrap">
                {bookingDetails.contactInfo.phone}{" "}
              </p>
            </div>
          </div>
          <div className="w-full mb-4 border-b border-gray flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-tertiary font-semibold tracking-[1px] whitespace-nowrap">
                Total occupants:
              </h3>
            </div>
            <div className="flex-[2] text-end ">
              <p className="text-md whitespace-nowrap">
                {bookingDetails.adult}, {bookingDetails.kids}{" "}
              </p>
            </div>
          </div>
          <div className="w-full mb-4 border-b border-gray flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-tertiary font-semibold tracking-[1px] whitespace-nowrap">
                Check In Date:
              </h3>
            </div>
            <div className="flex-[2] text-end ">
              <p className="text-md whitespace-nowrap">
                {DateFormatter(bookingDetails.startDate)}{" "}
              </p>
            </div>
          </div>

          <div className="w-full mb-4 border-b border-gray flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-tertiary font-semibold tracking-[1px] whitespace-nowrap">
                Check Out Date:
              </h3>
            </div>
            <div className="flex-[2] text-end ">
              <p className="text-md whitespace-nowrap">
                {DateFormatter(bookingDetails.endDate)}{" "}
              </p>
            </div>
          </div>
          <div className="w-full mb-4 border-b border-gray flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-tertiary font-semibold tracking-[1px] whitespace-nowrap">
                Amount Paid:
              </h3>
            </div>
            <div className="flex-[2] text-end ">
              <p className="text-md whitespace-nowrap">
                ₦ {bookingDetails.totalPrice.toLocaleString()}{" "}
              </p>
            </div>
          </div>
          <div className="w-full mb-4 border-b border-gray flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-tertiary font-semibold tracking-[1px] whitespace-nowrap">
                Payment Reference:
              </h3>
            </div>
            <div className="flex-[2] text-end ">
              <p className="text-md whitespace-nowrap">
                {bookingDetails.reference}
              </p>
            </div>
          </div>
          <div className="w-full mb-4 border-b border-gray flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-tertiary font-semibold tracking-[1px] whitespace-nowrap">
                Status:
              </h3>
            </div>
            <div className="flex-[2] text-end flex justify-end">
              <p
                className={`text-md whitespace-nowrap text-white p-2 ${
                  bookingDetails.status === "pending"
                    ? "bg-yellow-500"
                    : bookingDetails.status === "confirmed"
                    ? "bg-green-500"
                    : bookingDetails.status === "canceled"
                    ? "bg-red-500"
                    : bookingDetails.status === "completed"
                    ? "bg-blue-500"
                    : "bg-gray-500" // Fallback for unknown statuses
                }`}
              >
                {bookingDetails.status === "completed"
                  ? "Active"
                  : bookingDetails.status}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
