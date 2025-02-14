import AdultsDropdown from "@components/AdultsDropdown";
import KidsDropdown from "@components/KidsDropdown";
import CheckIn from "@components/CheckIn";
import CheckOut from "@components/CheckOut";
import ScrollToTop from "@components/ScrollToTop";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// context

import { RoomContext } from "@context/RoomContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import Spinner from "@components/Spinner";
import { facilities } from "@dummy/data";
import { apiClient } from "@api/apiClient";
import { endpoints } from "@api/endpoints";
import AlertMessage from "@pages/errorPages/AlertMessage";
import { ErrorFormatter } from "@pages/errorPages/ErrorFormatter";
import { paths } from "@routes/paths";

const RoomDetails = () => {
  const { rooms, adults, kids } = useContext(RoomContext);
  const { id } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [message, setMessage] = useState({
    errorMessage: "",
    successMessage: "",
  });
  // Form state
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (rooms && rooms.length > 0) {
      const room = rooms.find((room) => room._id === id);
      setRoomDetails(room || null);
    }
  }, [rooms, id]);

  if (!roomDetails) {
    return <Spinner />;
  }

  const settings = {
    // dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    cssEase: "linear",
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

    const bookingData = {
      startDate: checkIn,
      endDate: checkOut,
      adult: adults,
      kids,
    };

    setLoading(true);

    try {
      const response = await apiClient.post(
        `${endpoints.bookApartment}/${id}`,
        bookingData
      );

      // redirect to Booking Confrimation Page.
      navigate(`${paths.BookingConfirmation}/${response.data._id}`);
    } catch (error) {
      setMessage({
        errorMessage: ErrorFormatter(error),
        successMessage: "",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="">
      <ScrollToTop />
      {/* banner */}

      <div className="bg-room bg-cover bg-center h-[560px] relative flex justify-center items-center  ">
        {/* Overlay */}
        <div className="absolute w-full h-full bg-black/50"></div>
        {/* Title */}
        <h1 className="text-6xl text-white z-20 font-primary text-center capitalize ">
          {roomDetails.title}
        </h1>
      </div>

      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row h-full py-24 ">
          {/* left */}
          <div className=" w-full h-full lg:w-[60%] px-6 ">
            <h2 className="h2 capitalize  ">{roomDetails.title}</h2>
            <p className="mb-4">{roomDetails.description.slice(0, 356)}</p>
            <div className=" h-[250px] lg:h-[400px] place-content-centers ">
              <Slider {...settings}>
                {roomDetails.images.map((image, index) => (
                  <img
                    key={index}
                    className="mb-8 w-full h-[250px] lg:h-[400px] object-contain"
                    src={image.url}
                    alt="profile"
                  />
                ))}
              </Slider>
            </div>
            {/* facilities */}
            <div className="mt-12">
              <h3 className="h3 mb-3">Apartment Details</h3>
              <p className="mb-8">{roomDetails.description.slice(356)}</p>
              {/* grid */}
              <div className="grid grid-cols-3 gap-6 mb-12 ">
                {facilities.map((item, index) => {
                  const { name, icon } = item;
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-x-3 flex-1 "
                    >
                      <div className="text-3xl text-accent">{icon}</div>
                      <div className="text-base">{name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* right */}
          <div className=" w-full h-full lg:w-[40%] ">
            {/* Reservation */}
            <form
              action="#"
              method="post"
              className="w-full"
              onSubmit={handleSubmit}
            >
              <div className="py-8 px-6 bg-accent/20 mb-12 ">
                <div className="flex flex-col space-y-4 mb-4">
                  <AlertMessage alert={message} />
                  <h3>Your Reservation</h3>
                  <div className="h-[60px]">
                    <CheckIn onDateChange={setCheckIn} />
                  </div>
                  <div className="h-[60px]">
                    <CheckOut onDateChange={setCheckOut} />
                  </div>
                  <div className="h-[60px]">
                    <AdultsDropdown />
                  </div>
                  <div className="h-[60px]">
                    <KidsDropdown />
                  </div>
                </div>

                {roomDetails.bookingStatus !== "free" ? (
                  <Link
                    to={`#`}
                    className="btn btn-lg btn-primary w-full "
                    aria-disabled
                  >
                    Unavailable
                  </Link>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary w-full "
                  >
                    {loading
                      ? "Please Wait..."
                      : `Book Now for ₦${roomDetails.price.toLocaleString()}`}
                  </button>
                )}
              </div>
            </form>
            {/* Rules */}
            <div className="">
              <h3 className="h3">Apartment Rules</h3>
              <p className="mb-6">
                To ensure a safe and enjoyable experience for everyone, we
                kindly ask that you follow these house rules. These guidelines
                help us maintain a clean, secure, and relaxing environment for
                all guests. By staying with us, you agree to follow these rules.
                If you have any questions or need assistance, please don’t
                hesitate to reach out.
              </p>
              <ul className="flex flex-col gap-y-4">
                <li className="flex items-center gap-x-4 ">
                  <FaCheck className="text-accent" />
                  Check-in: 3:00 PM - 9:00 PM
                </li>
                <li className="flex items-center gap-x-4 ">
                  <FaCheck className="text-accent" />
                  Check-out: 10:00 AM
                </li>
                <li className="flex items-center gap-x-4 ">
                  <FaCheck className="text-accent" />
                  No Pets
                </li>
                <li className="flex items-center gap-x-4 ">
                  <FaCheck className="text-accent" />
                  No Smoking
                </li>
                <li className="flex items-center gap-x-4 ">
                  <FaCheck className="text-accent" />
                  No Parties or Loud Noise
                </li>
                <li className="flex items-center gap-x-4 ">
                  <FaCheck className="text-accent" />
                  Keep the Apartment Clean
                </li>
                <li className="flex items-center gap-x-4 ">
                  <FaCheck className="text-accent" />
                  Only the number of guests listed in the booking are allowed to
                  stay overnight
                </li>
                <li className="flex items-center gap-x-4 ">
                  <FaCheck className="text-accent" />
                  Any damage to furniture, appliances, or amenities must be
                  reported immediately
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomDetails;
