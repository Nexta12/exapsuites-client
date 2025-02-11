import { apiClient } from "@api/apiClient";
import { endpoints } from "@api/endpoints";
import EnhancedInput from "@components/EnhancedInput";
import EnhancedTextArea from "@components/EnhancedTextArea";
import Spinner from "@components/Spinner";
import AlertMessage from "@pages/errorPages/AlertMessage";
import ErrorAlert from "@pages/errorPages/errorAlert";
import { paths } from "@routes/paths";
import { DateFormatter } from "@utils/helpers";
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";

const ConfirmInternalBooking = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [message, setMessage] = useState({
    errorMessage: "",
    successMessage: "",
  });
  const [loading, setLoading] = useState(true);
  const [isloading, setIsLoading] = useState(false);
  const [currentPayment, setCurrentPayment] = useState("");
  const [comment, setComment] = useState("");
  const [balance, setBalance] = useState(0);

  const [bookingDetails, setBookingDetails] = useState({});

  // Calculate Remaining Balance

  useEffect(() => {
    if (currentPayment) {
      setBalance(Math.ceil(bookingDetails.totalBalance - currentPayment));
    }
  }, [currentPayment, bookingDetails.totalBalance]);

  //  Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);


    if (!currentPayment) {
      setMessage({
        errorMessage: "Enter the amount client paid",
        successMessage: "",
      });
      setIsLoading(false)
      return;
    }
    if (currentPayment > bookingDetails.totalBalance) {
      setMessage({
        errorMessage: "You have entered more money than required",
        successMessage: "",
      });
      setIsLoading(false)
      return;
    }

    try {
      const paymentDetails = {
        currentPayment,
        totalBalance: balance,
        comment,
      };

      await apiClient.put(
        `${endpoints.UpdateBookingDetails}/${id}`,
        paymentDetails
      );

      setMessage({ errorMessage: "", successMessage: "Payment Confirmed!" });

      setCurrentPayment("");
      setComment("");
      setBalance("")
       
      setTimeout(()=>{
        window.location.reload();
      },1000)

      // Send Email to sender and Admin
    } catch (error) {
      setMessage({
        errorMessage: error.message,
        successMessage: "",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
        setMessage({
          errorMessage: error.message,
          successMessage: "",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [id]);

  if (loading) return <Spinner />;

  return (
    <div className="pb-16">
      {/* Render ErrorAlert if there's an error */}
      {message.errorMessage && <ErrorAlert message={message.errorMessage} />}
      <div className="mt-5 mb-8 w-full flex items-center justify-between">
        <FaArrowLeftLong
          onClick={() => handleGoBack()}
          className="cursor-pointer text-2xl text-dark"
        />
        {/* Table */}
      </div>

      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 justify-between">
        <div className="bg-white flex-1  w-full p-4 lg:p-10 border border-gray-300 ">
          <h2 className="h3 text-center text-accent">Booking Details</h2>
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
                  Amount to Pay:
                </h3>
              </div>
              <div className="flex-[2] text-end flex justify-end ">
                <p className="text-md whitespace-nowrap bg-red-500 text-white p-2">
                  ₦ {bookingDetails.totalBalance.toLocaleString()}{" "}
                </p>
              </div>
            </div>

            <div className="w-full mb-4 border-b border-gray flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-tertiary font-semibold tracking-[1px] whitespace-nowrap">
                  Payment Status:
                </h3>
              </div>
              <div className="flex-[2] text-end flex justify-end ">
                <p className="text-md whitespace-nowrap bg-yellow-100 text-yellow-800 p-2 capitalize">
                  {bookingDetails.paymentStatus}{" "}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className=" bg-white flex-1 p-4 lg:p-10 border border-gray-300 w-full  ">
          {message.successMessage && <AlertMessage alert={message} />}

          <h2 className="h3 text-center text-accent">Confirm Payment</h2>
          <form action="#" onSubmit={handleSubmit}>
            <EnhancedInput
              placeholder="Paying Amount (₦) *"
              type="number"
              value={currentPayment}
              name="currentPayment"
              onChange={(e) => setCurrentPayment(e.target.value)}
               required
            />
            {currentPayment && (
              <div className="my-4 font-semibold">
                Balance: <span className="text-red-500">₦ {balance} </span>{" "}
              </div>
            )}

            <EnhancedTextArea
              value={comment}
              name="comment"
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="submit"
              className="btn bg-blue-500 btn-primary py-2 rounded-sm mx-auto"
            >
              {isloading ? "Please wait..." : "Confirm Payment"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmInternalBooking;
