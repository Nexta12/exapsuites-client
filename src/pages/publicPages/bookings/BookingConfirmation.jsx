import { apiClient } from "@api/apiClient";
import { endpoints } from "@api/endpoints";
import EnhancedInput from "@components/EnhancedInput";
import EnhancedSelect from "@components/EnhancedSelect";
import Spinner from "@components/Spinner";
import AlertMessage from "@pages/errorPages/AlertMessage";
import ErrorAlert from "@pages/errorPages/errorAlert";
import { ErrorFormatter } from "@pages/errorPages/ErrorFormatter";
import { paths } from "@routes/paths";
import { genderData } from "@utils/data";
import { DateFormatter } from "@utils/helpers";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BookingConfirmation = () => {
  const { id } = useParams();
  const [bookingData, setBookingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()
  const [isCancelling, setIsCancelling] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState({
    errorMessage: "",
    successMessage: "",
  });
  const [confirmationData, setConfirmationData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
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
      gender: confirmationData.gender,
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
        gender: "",
        email: "",
        phone: "",
      });

      // Redirect to paystack payment payment.
      const response = await apiClient.post(endpoints.makePayment, {
        bookingId: id,
      });
      const paystackUrl = response.data.redirect_url;
      window.location.href = paystackUrl;
    } catch (error) {
      setMessage({ errorMessage: error?.response?.data, successMessage: "" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookingCancellation = async (e) => {
    e.preventDefault();
    try {
      setIsCancelling(true);
     await apiClient.delete(`${endpoints.BookingCancellation}/${bookingData._id}`);
     setMessage({ errorMessage: "", successMessage: "We are sorry you had to cancel your reservation, please check us out next time" });

     setTimeout(()=>{
        
      navigate(paths.Index)

     }, 4000)
    } catch (error) {
      setError(ErrorFormatter(error))
    } finally {
      setIsCancelling(false);
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

        <div className=" absolute top-1/4  z-20 w-[95%] lg:w-[70%] h-[470px] overflow-y-auto bg-white py-4 px-5 rounded-md shadow-2xl ">
          <h3 className="h3 flex items-center gap-x-2 justify-center capitalize tracking-wider text-yellow-600 mb-4 ">
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
                <div className=" text-md  font-semibold ">
                  {bookingData.adult}
                </div>
              </div>
              <div className="flex items-center justify-between gap-x-4 border-b border-neutral-100 ">
                <div className="text-md  font-semibold text-accent">
                  Total Kids:
                </div>
                <div className=" text-md  font-semibold ">
                  {bookingData.kids}
                </div>
              </div>
              <div className="flex items-center justify-between gap-x-4 border-b border-neutral-100 ">
                <div className="text-md  font-semibold text-accent">
                  Total Cost:
                </div>
                <div className=" text-md  font-semibold ">
                  ₦ {bookingData.totalPrice.toLocaleString()}
                </div>
              </div>

              <div className="w-full text-xs italic mt-6 text-accent">
                Your comfort is our priority! If you have any special requests
                or need assistance with your stay, feel free to reach out to us.
                We look forward to welcoming you! 🌻🎉
              </div>
            </div>

            <div className="right flex-1 border border-neutral-200 rounded-lg p-2 shadow w-full ">
              <h3 className="h3 flex items-center gap-x-2 justify-center capitalize tracking-wider text-yellow-600 mb-2">
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
                <div className="flex-1 w-full mb-3">
                  <EnhancedSelect
                    name="gender"
                    id="gender"
                    placeholder="Gender Info*"
                    options={genderData}
                    value={confirmationData.gender}
                    onChange={handleInputChange}
                  />
                </div>
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

                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  {/* Cancel Booking Button */}
                  <button
                    onClick={handleBookingCancellation}
                    disabled={isLoading}
                    aria-disabled={isLoading}
                    className="whitespace-nowrap btn btn-secondary flex-1 py-2 w-full"
                  >
                  
                    {isCancelling ? (
                      <>
                        <span>Please wait...</span>
                        <span className="animate-spin">🌀</span>{" "}
                        {/* Replace with your spinner */}
                      </>
                    ) : (
                      "Cancel Booking"
                    )}
                  </button>

                  {/* Confirm & Pay Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    aria-disabled={isLoading}
                    className="whitespace-nowrap btn-secondary bg-accent flex-1 py-2 text-white uppercase w-full flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <span>Please wait...</span>
                        <span className="animate-spin">🌀</span>{" "}
                        {/* Replace with your spinner */}
                      </>
                    ) : (
                      "Confirm & Pay"
                    )}
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
