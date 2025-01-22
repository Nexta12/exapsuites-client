import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { BsCalendar } from "react-icons/bs";
import 'react-datepicker/dist/react-datepicker.css'
import '../utils/datepicker.css'


const CheckOut = () => {
    const [endDate, setEndDate] = useState(false);
    const datePickerRef = useRef(null);
    const today = new Date();

    return (
      <div className="relative flex items-center justify-end h-full ">
        <div onClick={() => datePickerRef.current.setFocus()} className="absolute z-10 pr-8">
          <div className=" text-accent text-base">
            <BsCalendar/>
          </div>
        </div>
        <DatePicker ref={datePickerRef} className="w-full h-full" selected={endDate} placeholderText="Check out" onChange={(date) => setEndDate(date)} minDate={today} />
      </div>
    )
};

export default CheckOut;
