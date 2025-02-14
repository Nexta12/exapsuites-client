import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ErrorAlert from "@pages/errorPages/errorAlert";
import { apiClient } from "@api/apiClient";
import { endpoints } from "@api/endpoints";
import img3 from "@assets/img/rooms/2.png";
import { paths } from "@routes/paths";
import { scrollUP } from "@utils/helpers";

const PopularRooms = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(endpoints.getAllApartments);
        setData(response.data);
        setError(null);
      } catch {
        setError("An error occurred");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 w-full lg:w-[20rem]">
      {/* Render ErrorAlert if there's an error */}
      {error && <ErrorAlert message={error} />}
      <div className="flex items-center justify-between gap-2">
      <strong className="text-gray-700 font-medium">Rooms Status</strong>
        <Link to={paths.ApartmentManager} className="text-gray-700 font-medium" >View All</Link>
        </div>
      <div className="mt-4 flex flex-col gap-3">
        {data.slice(0, 6).map((cust, index) => (
          <Link
            key={index}
            to={`${paths.ApartmentManager}/${cust._id}`}
            onClick={() => scrollUP}
            className="flex hover:no-underline"
          >
            <div className="w-10 h-10 min-w-10 bg-gray-200 rounded-sm overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={cust.images[0]?.url || img3}
                alt={cust.title}
              />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm text-gray-800 capitalize ">{cust.title}</p>
              <span
                className={`text-sm font-medium ${
                  cust.bookingStatus === "Booking Initiated"
                    ? "text-blue-500"
                    : cust.bookingStatus === "confirmed"
                    ? "text-gray-500"
                    : cust.bookingStatus === "occupied"
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {cust.bookingStatus === 'free' ? 'vacant' : cust.bookingStatus}
              </span>
            </div>
            <div className="text-xs text-gray-400 pl-2">
              ₦ {cust.price.toLocaleString()}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularRooms;
