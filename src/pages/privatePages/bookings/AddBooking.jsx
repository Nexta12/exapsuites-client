import { apiClient } from "@api/apiClient";
import { endpoints } from "@api/endpoints";
import AdultsDropdown from "@components/AdultsDropdown";
import CheckIn from "@components/CheckIn";
import CheckOut from "@components/CheckOut";
import EnhancedInput from "@components/EnhancedInput";
import EnhancedSelect from "@components/EnhancedSelect";
import KidsDropdown from "@components/KidsDropdown";
import { RoomContext } from "@context/RoomContext";
import ErrorAlert from "@pages/errorPages/errorAlert";
import { ErrorFormatter } from "@pages/errorPages/ErrorFormatter";
import { paths } from "@routes/paths";
import { calculateTotalPrice, scrollUP } from "@utils/helpers";
import { useContext, useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const AddBooking = () => {
  const { rooms, adults, kids } = useContext(RoomContext);
  const [isLoading, setIsLoading] = useState(false);
  const [availableFlats, setAvailableFlats] = useState([]);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [message, setMessage] = useState({
    errorMessage: "",
    successMessage: "",
  });
  const [totalCost, setTotalCost] = useState(0);
  const [totalNight, setTotalNight] = useState(0);

  const [bookingData, setBookingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    apartmentId: "",
    startDate: "",
    endDate: "",
    adult: "",
    kids: "",
  });

  // Update availableFlats whenever rooms change
  useEffect(() => {
    const flats = rooms
      .filter((room) => room.bookingStatus === "free")
      .map((room) => ({
        label: room.title.toUpperCase(),
        value: room._id,
      }));
    setAvailableFlats(flats);
  }, [rooms]);

  // Update bookingData.startDate when checkIn changes
  useEffect(() => {
    setBookingData((prevData) => ({
      ...prevData,
      startDate: checkIn,
    }));
  }, [checkIn]);

  // Update bookingData.endDate when checkOut changes
  useEffect(() => {
    setBookingData((prevData) => ({
      ...prevData,
      endDate: checkOut,
    }));
  }, [checkOut]);

  // Calculate totalCost and totalNight whenever bookingData.startDate, bookingData.endDate, or bookingData.apartmentId changes
  useEffect(() => {
    const selectedApartment = rooms.find((room) => room._id === bookingData.apartmentId);
    if (selectedApartment && bookingData.startDate && bookingData.endDate) {
      try {
        // Calculate total cost
        const cost = calculateTotalPrice(
          bookingData.startDate,
          bookingData.endDate,
          selectedApartment.price
        );
        setTotalCost(cost);

        // Calculate total nights
        const start = new Date(bookingData.startDate);
        const end = new Date(bookingData.endDate);
        const millisecondsPerDay = 1000 * 60 * 60 * 24; // Number of milliseconds in a day
        const nights = Math.ceil((end - start) / millisecondsPerDay); // Round up to the nearest whole number
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
  }, [bookingData.startDate, bookingData.endDate, bookingData.apartmentId, rooms]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData({
      ...bookingData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checkIn) {
      setMessage({
        errorMessage: "Provide Check In Date",
        successMessage: "",
      });
      return;
    }

    if (!checkOut) {
      setMessage({
        errorMessage: "Provide Check Out Date",
        successMessage: "",
      });
      return;
    }

    const bookingDetails = {
      firstName: bookingData.firstName,
      lastName: bookingData.lastName,
      email: bookingData.email,
      phone: bookingData.phone,
      apartmentId: bookingData.apartmentId,
      startDate: checkIn,
      endDate: checkOut,
      adult: adults,
      kids,
    };

    setIsLoading(true);

    try {
      const response = await apiClient.post(
        `${endpoints.bookApartment}/admin/${bookingData.apartmentId}`,
        bookingDetails
      );
      // Reset form data
      setBookingData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        apartmentId: "",
        startDate: "",
        endDate: "",
        adult: "",
        kids: "",
      });
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
              Create Reservation
            </h3>
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="flex-1 border border-neutral-200 min-h-10 w-full py-2">
                  <AdultsDropdown />
                </div>
                <div className="flex-1 border border-neutral-200 min-h-10 w-full py-2">
                  <KidsDropdown />
                </div>
                <div className="flex-1 w-full !text-md">
                  <EnhancedSelect
                    name="apartmentId"
                    id="apartmentId"
                    placeholder="Available Flats*"
                    options={availableFlats}
                    value={bookingData.apartmentId}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="flex-1 border border-neutral-200 min-h-10 w-full py-2">
                  <CheckIn onDateChange={setCheckIn} />
                </div>
                <div className="flex-1 border border-neutral-200 min-h-10 w-full py-2">
                  <CheckOut onDateChange={setCheckOut} />
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                <EnhancedInput
                  name="firstName"
                  id="firstName"
                  placeholder="First Name *"
                  onChange={handleInputChange}
                  value={bookingData.firstName}
                />
                <EnhancedInput
                  name="lastName"
                  id="lastName"
                  placeholder="Last Name *"
                  onChange={handleInputChange}
                  value={bookingData.lastName}
                />
                <EnhancedInput
                  name="phone"
                  id="phone"
                  placeholder="Phone*"
                  onChange={handleInputChange}
                  value={bookingData.phone}
                />
              </div>
              <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                <EnhancedInput
                  name="email"
                  id="email"
                  placeholder="Email*"
                  onChange={handleInputChange}
                  value={bookingData.email}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-5">
          <button
            type="submit"
            className="btn btn-primary bg-blue-500 py-2 rounded-sm mx-auto"
          >
            {isLoading ? "Please wait..." : "Create Booking"}
          </button>
        </div>
        {/* Display total cost and total nights */}
        {totalCost !== 0 && (
            <div className="my-5 flex items-center justify-between gap-4 flex-wrap">
            <h3 className="text-lg font-semibold">Duration: {totalNight} days</h3>
            <h3 className="text-lg font-semibold">Total Cost: ₦ {totalCost.toLocaleString()}</h3>
          </div>
        )}
      
      </form>
    </div>
  );
};

export default AddBooking;