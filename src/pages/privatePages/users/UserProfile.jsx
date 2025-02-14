import { apiClient } from "@api/apiClient";
import { endpoints } from "@api/endpoints";
import userAvater from "@assets/img/avater.png";
import Spinner from "@components/Spinner";
import ErrorAlert from "@pages/errorPages/errorAlert";
import { ErrorFormatter } from "@pages/errorPages/ErrorFormatter";
import { paths } from "@routes/paths";
import { DateFormatter } from "@utils/helpers";
import {useEffect, useState } from "react";
import { BsEnvelope, BsMarkerTip, BsPencil, BsTelephone } from "react-icons/bs";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
const UserProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [userDetails, setUserDetails] = useState({});
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

    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(
          `${endpoints.getUserDetails}/${id}`
        );
        setUserDetails(response.data.user);
        setBookingDetails(response.data.latestBooking);
      } catch (error) {
        setError(ErrorFormatter(error));
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (loading) return <Spinner />;
  
  const BookingStatus = ({ status }) => {
    // Function to determine styles based on status
    const getStatusStyles = (status) => {
      switch (status) {
        case 'pending':
          return 'bg-yellow-100 text-yellow-800'; 
        case 'confirmed':
          return 'bg-green-100 text-green-800'; 
        case 'canceled':
          return 'bg-red-100 text-red-800'; 
        case 'completed':
          return 'bg-blue-100 text-blue-800'; 
        case 'Active':
          return 'bg-blue-100 text-blue-800'; 
        default:
          return 'bg-gray-100 text-gray-800'; 
      }
    };
  
    return (
      <p className={`text-sm font-medium px-3 py-1 rounded-full w-fit ${getStatusStyles(status)}`}>
        {status}
      </p>
    );
  };
  


  return (
    <div className="">
        <FaArrowLeftLong
                onClick={() => handleGoBack()}
                className="cursor-pointer text-2xl text-neutral-400 mb-2"
              />
        {/* Render ErrorAlert if there's an error */}
        {error && <ErrorAlert message={error} />}
    <div className=" bg-white border border-neutral-300 p-5 flex flex-col lg:flex-row  relative">
       <Link to={`${paths.Users}/edit/${userDetails._id}`} title="Edit Profile" className="absolute top-5 right-5 text-blue-500" ><BsPencil/></Link>
      <div className="left flex-1 flex flex-col items-center lg:border-r-2 border-neutral-300 ">
        <img
          src={ userDetails.profilePic || userAvater }
          alt="profile"
          className="w-[150px] h-[150px] rounded-full object-cover mb-4 "
        />
        <h3 className="text-3xl font-tertiary text-accent capitalize ">{userDetails.firstName} {userDetails.lastName} </h3>
        <p className="text-sm text-gray-500">({userDetails.role})</p>
      </div>

      <div className="right flex-[4] ">
        <div className="top border-b-2 border-neutral-300 py-5 lg:px-10 ">

          <div className="flex items-center gap-x-3 lg:gap-x-6">
            <h3 className=" text-lg lg:text-2xl font-tertiary flex items-center ">
              {" "}
              <BsEnvelope className="text-gray-600 text-sm mr-2 " /> Email:
            </h3>
            <p className="text-gray-600 text-sm lg:text-xl">{userDetails.email}</p>
          </div>

          <div className="flex items-center gap-x-3 lg:gap-x-6">
            <h3 className=" text-lg lg:text-2xl font-tertiary flex items-center ">
              {" "}
              <BsTelephone className="text-neutral-600 text-sm mr-2 " /> Phone:
            </h3>
            <p className="text-gray-600 text-sm lg:text-xl">{userDetails.phone}</p>
          </div>
          <div className="flex items-center gap-x-3 lg:gap-x-6">
            <h3 className=" text-lg lg:text-2xl font-tertiary flex items-center ">
              {" "}
              <BsMarkerTip className="text-neutral-600 text-sm mr-2 " />Address:
            </h3>
            <p className="text-gray-600 text-sm lg:text-xl">{userDetails.address}</p>
          </div>

        </div>
        <div className="bottom py-5 lg:px-10">
          <div className="mb-8 w-full">
          {userDetails.description}
          </div>
          {userDetails.role === 'Guest' && (
              <div className="flex flex-wrap items-center gap-4 justify-between">
              <div className="flex flex-col gap-y-3">
                <h3 className="font-tertiary ">Last Apartment:</h3>
                <p className="text-gray-600 capitalize ">
                  {bookingDetails?.bookingId?.apartmentId?.title}
                </p>
              </div>
              <div className="flex flex-col gap-y-3">
                <h3 className="font-tertiary ">Checked In:</h3>
                <p className="text-gray-600">
                  {DateFormatter(bookingDetails?.bookingId?.startDate)}
                </p>
              </div>
              <div className="flex flex-col gap-y-3">
                <h3 className="font-tertiary ">Check Out:</h3>
                <p className="text-gray-600">
                {DateFormatter(bookingDetails?.bookingId?.endDate)}
                </p>
              </div>
              <div className="flex flex-col gap-y-3 capitalize ">
                <h3 className="font-tertiary ">Booking Status:</h3>
                <BookingStatus status={bookingDetails?.bookingId?.status === 'completed' ? 'Active' : bookingDetails?.bookingId?.status  } />
              </div>
            </div>
          )}
        
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserProfile;
