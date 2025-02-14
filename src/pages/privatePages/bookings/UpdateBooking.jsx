import { apiClient } from "@api/apiClient";
import { endpoints } from "@api/endpoints";
import CheckOut from "@components/CheckOut";
import ErrorAlert from "@pages/errorPages/errorAlert";
import { ErrorFormatter } from "@pages/errorPages/ErrorFormatter";
import { paths } from "@routes/paths";
import { calculateTotalPrice, scrollUP } from "@utils/helpers";
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBooking = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [checkOut, setCheckOut] = useState(null);
  const [originalEndDate, setOriginalEndDate] = useState(null); // Store the original checkout date
  const [message, setMessage] = useState({
    errorMessage: "",
    successMessage: "",
  });
  const [totalCost, setTotalCost] = useState(0);
  const [totalNight, setTotalNight] = useState(0); // Total No of Days the guest will stay
  const [bookingData, setBookingData] = useState({
    startDate: "",
    endDate: "",
    apartmentId: { price: 0 },
    totalPayment: 0,
  });

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await apiClient.get(
          `${endpoints.getSingleBooking}/${id}`
        );
        setBookingData(response.data);
        setOriginalEndDate(response.data.endDate); // Store the original checkout date
      } catch (error) {
        setMessage({
          errorMessage: ErrorFormatter(error),
          successMessage: "",
        });
      }
    };

    fetchBookingData();
  }, [id]);

  // Calculate totalCost and totalNight whenever bookingData.startDate, checkOut, or bookingData.apartmentId changes
  useEffect(() => {
    if (bookingData.startDate && checkOut && originalEndDate) {
      try {
        // Calculate total cost
        const cost = calculateTotalPrice(
          bookingData.startDate,
          checkOut,
          bookingData.apartmentId.price
        );
        const deductedCost = cost - bookingData.totalPayment;

        setTotalCost(deductedCost);

        const oldEndDate = new Date(originalEndDate); // Use the original checkout date
        const newEndDate = new Date(checkOut);
        const millisecondsPerDay = 1000 * 60 * 60 * 24; // Number of milliseconds in a day
        const nights = Math.ceil((newEndDate - oldEndDate) / millisecondsPerDay); // Round up to the nearest whole number

        setTotalNight(nights);
      } catch (error) {
        setMessage({
          errorMessage: error.message,
          successMessage: "",
        });
      }
    } else {
      setTotalCost(0);
      setTotalNight(0); // Reset total nights if inputs are invalid
    }
  }, [bookingData.totalPayment, bookingData.apartmentId.price, bookingData.startDate, checkOut, originalEndDate]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checkOut) {
      setMessage({
        errorMessage: "Provide New Check Out Date",
        successMessage: "",
      });
      return;
    }

    if (checkOut < new Date(originalEndDate) ) {
      setMessage({
        errorMessage: "No Refund, Checkout must be in future date",
        successMessage: "",
      });
      return;
    }

    const bookingDetails = {
      endDate: checkOut,
      totalCost
    };

    setIsLoading(true);

    try {

      const response = await apiClient.put(
        `${endpoints.ExtendBookingDuration}/${id}`,
        bookingDetails
      );
      // Reset form data
      setCheckOut(null);
      scrollUP();

      // Booking is Confirmed, redirect to Payment page.
      navigate(`${paths.Bookings}/confirmation/${response.data._id}`);
    } catch (error) {
      setMessage({
        errorMessage: ErrorFormatter(error),
        successMessage: "",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const navigate = useNavigate();
  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(paths.AdminDashboard);
    }
  };

  return (
    <div className="mt-5 w-full md:w-[80%] lg:w-[70%] mx-auto pb-10">
      {message.errorMessage && <ErrorAlert message={message.errorMessage} />}
      <form className="mb-10" onSubmit={handleSubmit}>
        <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-4">
          <div className="Left w-full bg-white border border-gray-200 p-5 flex-[2]">
            <FaArrowLeftLong
              onClick={handleGoBack}
              className="cursor-pointer text-2xl text-dark lg:hidden"
            />
            <h3 className="text-center text-accent font-semibold uppercase mb-10">
              Extend Reservation
            </h3>
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className=" ">Old Checkout Date</div>
              <div className="flex-1 border border-neutral-200 min-h-10 w-full py-2 pl-10 ">
                {originalEndDate ? new Date(originalEndDate).toLocaleDateString() : "N/A"}
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 items-center mt-4">
              <div className=" ">New Checkout Date</div>
              <div className="flex-1 border border-neutral-200 min-h-10 w-full py-2">
                <CheckOut onDateChange={setCheckOut} />
              </div>
            </div>
          </div>
        </div>
        {/* Display total cost and total nights */}
        {totalCost !== 0 && (
          <div className="my-5 flex items-center justify-between gap-4 flex-wrap">
            <h3 className="text-lg font-semibold">
              Extended Duration: {totalNight} days
            </h3>
            <h3 className="text-lg font-semibold">
              Additional Cost: ₦ {totalCost.toLocaleString()}
            </h3>
          </div>
        )}
        <div className="w-full mt-5">
          <button
            type="submit"
            className="btn btn-primary bg-blue-500 py-2 rounded-sm mx-auto"
          >
            {isLoading ? "Please wait..." : "Extend Reservation"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBooking;