import { BsEnvelope, BsPeople } from "react-icons/bs";
import { LuBaggageClaim } from "react-icons/lu";
import { GiAbstract080 } from "react-icons/gi";
import { useEffect, useState } from "react";
import { apiClient } from "@api/apiClient";
import { endpoints } from "@api/endpoints";
import { ErrorFormatter } from "@pages/errorPages/ErrorFormatter";
import ErrorAlert from "@pages/errorPages/errorAlert";
import Spinner from "./Spinner";
import { FaArrowUp } from "react-icons/fa";
const DashboardStats = () => {
  const [stats, setStarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiClient.get(endpoints.GetDashboardStats);
        setStarts(response.data);
      } catch (error) {
        setError(ErrorFormatter(error));
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="flex gap-4 w-full flex-wrap">
      {error && <ErrorAlert message={error} />}
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <LuBaggageClaim className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Total Sales</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold ">
              ₦ {stats.currentMonthTotal.toLocaleString()}
            </strong>
            <span
              className="text-sm text-green-500 pl-2 flex items-center gap-1"
              title="% Increase compared with last month"
            >
              {stats.percentageChange} <FaArrowUp />{" "}
            </span>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-500">
          <BsPeople className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Active Guests
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold ">
              {stats.activeGuests}
            </strong>
            <span className="text-sm text-green-500 pl-2">current</span>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-red-500">
          <GiAbstract080 className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Vacant Flats</span>
          <div className="text-center">
            <strong className="text-xl text-gray-700 font-semibold ">
              {stats.vacantFlat}
            </strong>
            {/* <span className="text-sm text-green-500 pl-2">free</span> */}
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-500">
          <BsEnvelope className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">New Messages</span>
          <div className="text-center">
            <strong className="text-xl text-gray-700 font-semibold ">{stats.newMessages}</strong>
            {/* <span className="text-sm text-green-500 pl-2">+23</span> */}
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
};

function BoxWrapper({ children }) {
  return (
    <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center ">
      {children}
    </div>
  );
}

export default DashboardStats;
