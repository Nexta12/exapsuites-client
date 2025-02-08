import { apiClient } from "@api/apiClient";
import { endpoints } from "@api/endpoints";
import EnhancedInput from "@components/EnhancedInput";
import Spinner from "@components/Spinner";
import AlertMessage from "@pages/errorPages/AlertMessage";
import ErrorAlert from "@pages/errorPages/errorAlert";
import { ErrorFormatter } from "@pages/errorPages/ErrorFormatter";
import { DateFormatter } from "@utils/helpers";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookingConfirmation = () => {
  const { id } = useParams();
  const [bookingData, setBookingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState({
    errorMessage: "",
    successMessage: "",
  });
  const [confirmationData, setConfirmationData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await apiClient.get(
          `${endpoints.getSingleBooking}/${id}`
        );
        setBookingData(response.data);
      } catch (error) {
        setError(ErrorFormatter(error));
      }
    };

    if (id) fetchBookingDetails();
  }, [id]);

  if (!bookingData) {
    return <Spinner />;
  }


  const handleInputChange = (e) => {
    setConfirmationData({
      ...confirmationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const confirmationDetails = {
      firstName: confirmationData.firstName,
      lastName: confirmationData.lastName,
      email: confirmationData.email,
      phone: confirmationData.phone,
    };

    try {
      await apiClient.put(
        `${endpoints.BookingConfirmation}/${id}`,
        confirmationDetails
      );

  
      setConfirmationData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      });

      // Redirect to paystack payment payment.
     const response = await apiClient.post(endpoints.makePayment, {bookingId: id })
     const paystackUrl = response.data.redirect_url;
     window.location.href = paystackUrl ;

    } catch (error) {
      setMessage({ errorMessage: error?.response?.data, successMessage: "" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="">
         {/* Render ErrorAlert if there's an error */}
         {error && <ErrorAlert message={error} />}
      <div className="bg-room bg-cover bg-center h-screen  relative flex justify-center items-center  ">
        {/* Overlay */}
        <div className="absolute w-full h-full bg-black/50"></div>
        {/* Title */}

        <div className=" absolute top-1/4  z-20 w-[95%] lg:w-[70%] h-[450px] overflow-y-auto bg-white p-5 rounded-md shadow-2xl ">
          <h3 className="h3 flex items-center gap-x-2 justify-center capitalize tracking-wider text-yellow-600 mb-6 ">
            Reservation Confirmation
          </h3>

          <div className="flex flex-col lg:flex-row items-start gap-10 ">
            <div className="left flex-1 flex flex-col justify-between gap-4 w-full ">
              <div className="flex items-center justify-between gap-x-4 border-b border-neutral-100 ">
                <div className="text-md  font-semibold text-accent">
                  Apartment:
                </div>
                <div className=" text-md  font-semibold capitalize ">
                  {bookingData.apartmentId.title}
                </div>
              </div>

              <div className="flex items-center justify-between gap-x-4 border-b border-neutral-100 ">
                <div className="text-md  font-semibold text-accent">
                  Check In Date:
                </div>
                <div className=" text-md  font-semibold ">
                  {DateFormatter(bookingData.startDate)}
                </div>
              </div>

              <div className="flex items-center justify-between gap-x-4 border-b border-neutral-100 ">
                <div className="text-md  font-semibold text-accent">
                  Check Out Date:
                </div>
                <div className=" text-md  font-semibold ">
                {DateFormatter(bookingData.endDate)}
                </div>
              </div>
              <div className="flex items-center justify-between gap-x-4 border-b border-neutral-100 ">
                <div className="text-md  font-semibold text-accent">
                  Total Adults:
                </div>
                <div className=" text-md  font-semibold ">{bookingData.adult}</div>
              </div>
              <div className="flex items-center justify-between gap-x-4 border-b border-neutral-100 ">
                <div className="text-md  font-semibold text-accent">
                  Total Kids:
                </div>
                <div className=" text-md  font-semibold ">{bookingData.kids}</div>
              </div>
              <div className="flex items-center justify-between gap-x-4 border-b border-neutral-100 ">
                <div className="text-md  font-semibold text-accent">
                  Total Cost:
                </div>
                <div className=" text-md  font-semibold ">₦ {bookingData.totalPrice.toLocaleString()}</div>
              </div>

              <div className="w-full text-xs italic mt-6 text-accent">
                Your comfort is our priority! If you have any special requests
                or need assistance with your stay, feel free to reach out to us.
                We look forward to welcoming you! 🌻🎉
              </div>
            </div>

            <div className="right flex-1 border border-neutral-200 rounded-lg p-2 shadow w-full ">
              <h3 className="h3 flex items-center gap-x-2 justify-center capitalize tracking-wider text-yellow-600 mb-4">
                Your Contact Details
              </h3>
              <AlertMessage alert={message} />
              <form action="" method="post" onSubmit={handleSubmit}>
                <EnhancedInput
                  placeholder="First Name"
                  name="firstName"
                  value={confirmationData.firstName}
                  onChange={handleInputChange}
                  required
                />
                <EnhancedInput
                  placeholder="Last Name"
                  name="lastName"
                  value={confirmationData.lastName}
                  onChange={handleInputChange}
                  required
                />
                <EnhancedInput
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={confirmationData.email}
                  onChange={handleInputChange}
                  required
                />
                <EnhancedInput
                  placeholder="Phone"
                  name="phone"
                  value={confirmationData.phone}
                  onChange={handleInputChange}
                  required
                />

                <div className="flex flex-col md:flex-row items-center justify-between gap-4 my-4 ">
                  <button className=" whitespace-nowrap  btn btn-secondary flex-1 py-2 w-full ">
                    Cancel Booking
                  </button>
                  <button
                    type="submit"
                    className=" whitespace-nowrap btn-secondary bg-accent flex-1 py-2 text-white uppercase w-full "
                  >
                    {isLoading ? "Please wait..." : "Confirm & Pay"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingConfirmation;
