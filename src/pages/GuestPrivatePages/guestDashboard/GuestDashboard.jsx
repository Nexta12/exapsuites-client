import { BoxWrapper } from "@components/DashboardStats";
import LodginBenefits from "@components/LodginBenefits";
import LodgingGuidelines from "@components/LodgingGuidelines";
import { GiAbstract080, GiAbstract084 } from "react-icons/gi";
import { LuBaggageClaim } from "react-icons/lu";

const GuestDashboard = () => {
  return (
    <div className="flex flex-col gap-4 pb-12 lg:pb-0">
    <div className="flex gap-4 w-full flex-wrap" >
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <LuBaggageClaim className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">CheckIn Date</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
            34/23/2025
            </strong>
            
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
            34/23/2025
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-500">
          <GiAbstract084 className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Days Remaining</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              ₦ 2000
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
