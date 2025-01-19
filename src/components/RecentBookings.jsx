import { Link } from "react-router-dom"

const RecentBookingsData = [

    {
        id: '1',
        room_id: '1234',
        booking_id: 'hjsy72',
        customer_name: 'Emeka Odigbo',
        booking_date: '2025-05-17',
        booking_price: '$234',
        current_booking_status: 'Booked',
        checkout_date: '2025-05-17'
    },
    {
        id: '2',
        room_id: '234',
        booking_id: 'hjsy72',
        customer_name: 'John Odigbo',
        booking_date: '2025-05-17',
        booking_price: '$234',
        current_booking_status: 'Confirmed',
        checkout_date: '2025-05-17'
    },
    {
        id: '3',
        room_id: '2341',
        booking_id: 'hjsy72',
        customer_name: 'John Dumelo',
        booking_date: '2025-05-17',
        booking_price: '$234',
        current_booking_status: 'Confirmed',
        checkout_date: '2025-05-17'
    },
]

const RecentBookings = () => {
  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1 overflow-x-auto">
        <strong className="text-gray-700 font-medium" >Recent Bookings</strong>
        <div className="mt-3">
            <table className="w-full text-gray-700" >
                <thead>
                    <tr>
                  
                    <td>room_id</td>
                    <td>customer_name</td>
                    <td>booking_date</td>
                    <td>booking_price</td>
                    <td>status</td>
                   
                 
                    </tr>
                    
                </thead>
                <tbody>
                    {RecentBookingsData.map(booking =>(
                        <tr key={booking.id} >

                            <td> 
                              <Link to='/' className="text-blue-400" >{booking.room_id}</Link>  
                                </td>
                            <td>{booking.customer_name}</td>
                            <td>{booking.booking_date}</td>
                            <td>{booking.booking_price}</td>
                            <td>{booking.current_booking_status}</td>
                          
                        </tr>
                 
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default RecentBookings