import { FaCheck } from "react-icons/fa";

const LodgingGuidelines = () => {
  return (
    <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1 overflow-y-auto">
      <h3 className=" text-center text-accent text-secondary text-lg font-semibold mb-4 underline tracking-[2px]">
        Lodging Guidelines
      </h3>
      <p className="mb-6 text-[14px]">
        To ensure a safe and enjoyable experience for everyone, we kindly ask
        that you follow these house rules. These guidelines help us maintain a
        clean, secure, and relaxing environment for all guests. By staying with
        us, you agree to follow these rules. If you have any questions or need
        assistance, please don’t hesitate to reach out.
      </p>
      <ul className="flex flex-wrap gap-4 text-[14px] ">
        <li className="flex items-center gap-x-4 ">
          <FaCheck className="  text-green-600 flex items-center justify-center p-[1px] " />
          Check-in: 3:00 PM - 9:00 PM
        </li>
        <li className="flex items-center gap-x-4 ">
          <FaCheck className=" text-green-600 flex items-center justify-center p-[1px] " />
          Check-out: 10:00 AM
        </li>
        <li className="flex items-center gap-x-4 ">
          <FaCheck className=" text-green-600 flex items-center justify-center p-[1px] " />
          No Pets
        </li>
        <li className="flex items-center gap-x-4 ">
          <FaCheck className=" text-green-600 flex items-center justify-center p-[1px] " />
          No Smoking
        </li>
        <li className="flex items-center gap-x-4 ">
          <FaCheck className=" text-green-600 flex items-center justify-center p-[1px] " />
          No Parties or Loud Noise
        </li>
        <li className="flex items-center gap-x-4 ">
          <FaCheck className=" text-green-600 flex items-center justify-center p-[1px] " />
          Keep the Apartment Clean
        </li>
        <li className="flex items-center gap-x-4 ">
          <FaCheck className=" text-green-600 flex items-center justify-center p-[1px] " />
          Only the number of guests listed in the booking are allowed to stay
          overnight
        </li>
        <li className="flex items-center gap-x-4 ">
          <FaCheck className=" text-green-600 flex items-center justify-center p-[1px] " />
          Any damage to furniture, appliances, or amenities must be reported
          immediately
        </li>
      </ul>
    </div>
  );
};

export default LodgingGuidelines;
