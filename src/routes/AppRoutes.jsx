import { Route, Routes } from "react-router-dom";
import { paths } from "./paths";
import PublicLayout from "@pages/publicPages/PublicLayout";
import Homepage from "@pages/publicPages/homepage/Homepage";
import RoomDetails from "@pages/publicPages/singleRoomDetails/RoomDetails";
import ContactPage from "@pages/publicPages/contact/ContactPage";
import Login from "@pages/publicPages/login/Login";
import AllRooms from "@pages/publicPages/rooms/AllRooms";
import ForgotPassword from "@pages/publicPages/forgotPassword/ForgotPassword";
import AdminLayout from "@pages/privatePages/AdminLayout";
import AdminDashboard from "@pages/privatePages/dashboard/AdminDashboard";
import Bookings from "@pages/privatePages/bookings/Bookings";
import Messages from "@pages/privatePages/messages/Messages";
import RoomManager from "@pages/privatePages/roomsManager/RoomManager";
import Usermanager from "@pages/privatePages/users/Usermanager";


const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path={paths.Index} element={<PublicLayout />}>
      <Route path={paths.Index} element={<Homepage />} />
      <Route path={paths.Rooms} element={<AllRooms/>} />
      <Route path={`${paths.Rooms}/:id`} element={<RoomDetails />} />
      <Route path={paths.Contact} element={<ContactPage />} />
      <Route path={paths.Login} element={<Login />} />
      <Route path={paths.ForgotPassword} element={<ForgotPassword />} />
    </Route>
    {/* Private Rputes */}
    <Route path={paths.Admin} element={<AdminLayout />}>

      <Route path={paths.AdminDashboard} element={<AdminDashboard />} />
      <Route path={paths.Bookings} element={<Bookings />} />
      <Route path={paths.Messages} element={<Messages />} />
      <Route path={paths.RoomManager} element={<RoomManager />} />
      <Route path={paths.UserManager} element={<Usermanager />} />
      
    </Route>
  </Routes>
);

export default AppRoutes;
