import { paths } from "@routes/paths";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useContext, useEffect, useState } from "react";
import { RoomContext } from "@context/RoomContext";
import Spinner from "@components/Spinner";
import { facilities } from "@dummy/data";

const SingleApartment = () => {
  const { rooms } = useContext(RoomContext);
  const { id } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
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
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    cssEase: "linear",
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(paths.AdminDashboard);
    }
  };

  return (
    <div className="pb-[1px]  lg:px-6">
      <div className="mt-5 mb-8 w-full flex items-center justify-between">
        <FaArrowLeftLong
          onClick={() => handleGoBack()}
          className="cursor-pointer text-2xl text-dark"
        />

        <div className="">
          <Link
            to={`${paths.EditApartment}/${roomDetails._id}`}
            className="btn btn-primary py-2 rounded-sm whitespace-nowrap"
          >
            Update Details
          </Link>
        </div>
        {/* Table */}
      </div>

      <div className="flex flex-col lg:flex-row items-center lg:items-start  gap-6 ">
        {/* Left */}
        <div className="flex-1 w-[90%] lg:!w-[300px] border border-gray-300 ">
          <div className=" h-[250px] lg:h-[400px] place-content-centers bg-white ">
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
        </div>

        {/* Right */}
        <div className="w-full flex-1 bg-white p-3">
          <h3 className="h3 text-center text-accent capitalize">Flat Details ({roomDetails.title}) </h3>
          {roomDetails.description}
        </div>
      </div>
      {/* Bottom Base */}
      <div className=" p-3 border border-accent my-10">
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-6 ">
          {facilities.map((item, index) => {
            const { name, icon } = item;
            return (
              <div key={index} className="flex items-center gap-x-3 flex-1 ">
                <div className="text-3xl text-accent">{icon}</div>
                <div className="text-base">{name}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center  gap-12 flex-wrap mb-20 bg-white p-3 border border-gray-300 ">

        <div className="flex items-center gap-x-2">
          <div className="flex-1">
            <h3 className="text-tertiary font-semibold tracking-[1px] whitespace-nowrap">
              Status:
            </h3>
          </div>
          <div className="flex-1">
            <p className="text-md capitalize whitespace-nowrap bg-accent text-white rounded-sm p-1 max-w-fit ">
              {roomDetails.bookingStatus}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <div className="flex-1">
            <h3 className="text-tertiary font-semibold tracking-[1px] whitespace-nowrap">
              Cost
            </h3>
          </div>
          <div className="flex-1">
            <p className="text-md capitalize whitespace-nowrap">
              ₦ {roomDetails.price.toLocaleString()} per Night
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <div className="flex-1">
            <h3 className="text-tertiary font-semibold tracking-[1px] whitespace-nowrap">
              Capacity:
            </h3>
          </div>
          <div className="flex-1">
            <p className="text-md capitalize whitespace-nowrap">
              {roomDetails.maxPeople} People
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <div className="flex-1">
            <h3 className="text-tertiary font-semibold tracking-[1px] whitespace-nowrap">
              Balcony
            </h3>
          </div>
          <div className="flex-1">
            <p className="text-md capitalize whitespace-nowrap">
              {roomDetails.totalBalcony}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <div className="flex-1">
            <h3 className="text-tertiary font-semibold tracking-[1px] whitespace-nowrap">
              Bathrooms:
            </h3>
          </div>
          <div className="flex-1">
            <p className="text-md capitalize whitespace-nowrap">
              {roomDetails.totalBathrooms}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <div className="flex-1">
            <h3 className="text-tertiary font-semibold tracking-[1px] whitespace-nowrap">
              Beds
            </h3>
          </div>
          <div className="flex-1">
            <p className="text-md capitalize whitespace-nowrap">
              {roomDetails.totalBeds}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <div className="flex-1">
            <h3 className="text-tertiary font-semibold tracking-[1px] whitespace-nowrap">
              Kitchens
            </h3>
          </div>
          <div className="flex-1">
            <p className="text-md capitalize whitespace-nowrap">
              {roomDetails.totalKitchens}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <div className="flex-1">
            <h3 className="text-tertiary font-semibold tracking-[1px] whitespace-nowrap">
              Parlour:
            </h3>
          </div>
          <div className="flex-1">
            <p className="text-md capitalize whitespace-nowrap">
              {roomDetails.totalParlour}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <div className="flex-1">
            <h3 className="text-tertiary font-semibold tracking-[1px] whitespace-nowrap">
              Rooms:
            </h3>
          </div>
          <div className="flex-1">
            <p className="text-md capitalize whitespace-nowrap">
              {roomDetails.totalRooms}
            </p>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default SingleApartment;
