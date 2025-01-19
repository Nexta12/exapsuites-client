import DashboardStats from "@components/DashboardStats"
import PieProfileChart from "@components/PieProfileChart"
import PopularRooms from "@components/PopularRooms"
import RecentBookings from "@components/RecentBookings"
import TransactionCharts from "@components/TransactionCharts"


const AdminDashboard = () => {
  return (
      <div className="flex flex-col gap-4">
          <DashboardStats/>
           <div className="flex flex-col lg:flex-row gap-4 w-full">
          <TransactionCharts/>
           <PieProfileChart/>
          </div>
           <div className="flex flex-col lg:flex-row gap-4 w-full mb-10">
               <RecentBookings/>
               <PopularRooms/>
           </div>
      </div>
  )
}

export default AdminDashboard