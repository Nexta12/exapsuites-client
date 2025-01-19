import { Link } from "react-router-dom";
import img1 from '@assets/img/rooms/1-lg.png'
import img2 from '@assets/img/rooms/2-lg.png'
import img3 from '@assets/img/rooms/3-lg.png'

const RecentCustmersData = [
    {
        id: '2772',
        customerName: 'Emeka Odigbo',
        roomType: 'Deluxe',
        roomImage: img1,
        roomPrice: '$2677',
        roomStock: 90
    },
    {
        id: '2772',
        customerName: 'Emeka Genius',
        roomType: 'Deluxe',
        roomImage: img2,
        roomPrice: '$2677',
        roomStock: 90
    },
    {
        id: '2772',
        customerName: 'Gaius Odigbo',
        roomType: 'Deluxe',
        roomImage: img3,
        roomPrice: '$2677',
        roomStock: 90
    },
]

const PopularRooms = () => {
  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 w-full lg:w-[20rem]">
      <strong className="text-gray-700 font-medium">Rooms Status</strong>
      <div className="mt-4 flex flex-col gap-3">
           {RecentCustmersData.map((cust, index)=>(
             <Link key={index} to={"/"} className="flex hover:no-underline" >
                 <div className="w-10 h-10 min-w-10 bg-gray-200 rounded-sm overflow-hidden">
                    <img className="w-full h-full object-cover" src={cust.roomImage} alt={cust.customerName} />
                 </div>
                 <div className="ml-4 flex-1">
                  <p className="text-sm text-gray-800" >{cust.customerName}</p>
                  <span className={`text-sm font-medium`} >{cust.roomStock}</span>
                 </div>
                 <div className="text-xs text-gray-400 pl-2">
                    {cust.roomPrice}
                 </div>
             </Link>
           ))}
      </div>
    </div>
  );
};

export default PopularRooms;
