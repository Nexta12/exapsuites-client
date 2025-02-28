import { apiClient } from "@api/apiClient";
import { endpoints } from "@api/endpoints";
import { BoxWrapper } from "@components/DashboardStats";
import LodginBenefits from "@components/LodginBenefits";
import LodgingGuidelines from "@components/LodgingGuidelines";
import ErrorAlert from "@pages/errorPages/errorAlert";
import useAuthStore from "@store/authStore";
import { DateFormatter } from "@utils/helpers";
import { useEffect, useState } from "react";
import { GiAbstract080, GiAbstract084 } from "react-icons/gi";
import { LuBaggageClaim } from "react-icons/lu";

const GuestDashboard = () => {
  const { user } = useAuthStore();
  const [activeBooking, setActiveBooking] = useState({})
  const [error, setError] = useState(null);

  const [daysleft, setDaysLeft] = useState(0);


    useEffect(() => {
      const fetchData = async () => {
        try {
         // Fetch only active bookings
      const response = await apiClient.get(`${endpoints.getAllBookings}/${user.id}`, {
        params: { status: 'completed' } // Pass status as a query parameter
      });
          setActiveBooking(response.data[0]);
          setError(null);
        } catch {
          setError("An error occurred");
        }
      };
      fetchData();
    }, [user.id]);

    useEffect(()=>{
      const today = new Date();
      const millisecondsPerDay = 1000 * 60 * 60 * 24; // Number of milliseconds in a day

      if(activeBooking){
        const endDate = new Date(activeBooking.endDate);
        const daysTotal = Math.ceil(
          ((endDate - today) )  / millisecondsPerDay
         ); // Round up to the nearest whole number
         setDaysLeft(daysTotal)
      }

    },[activeBooking])


  return (
    <div className="flex flex-col gap-4 pb-12 lg:pb-0">
          {/* Render ErrorAlert if there's an error */}
          {error && <ErrorAlert message={error} />}
    <div className="flex gap-4 w-full flex-wrap" >
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <LuBaggageClaim className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">CheckIn Date</span>
          <div className="flex items-center">
           {DateFormatter(activeBooking?.startDate)}
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-red-500">
          <GiAbstract080 className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">CheckOut Date</span>
          <div className="flex items-center">
          {DateFormatter(activeBooking?.endDate) }
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-500">
          <GiAbstract084 className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Days Left</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
             {daysleft || 0 }
            </strong>
           
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-500">
          <LuBaggageClaim className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">New Messages</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              0
            </strong>
           
          </div>
        </div>
      </BoxWrapper>
    </div>

    <div className="flex flex-col lg:flex-row gap-4 w-full h-[42rem] lg:h-auto ">
            <LodgingGuidelines />
           <LodginBenefits/>
          </div>


    </div>
  );
};

export default GuestDashboard;
