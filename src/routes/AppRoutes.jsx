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
import Usermanager from "@pages/privatePages/users/Usermanager";
import ApartmentManager from "@pages/privatePages/roomsManager/ApartmentManager";
import AddApartment from "@pages/privatePages/roomsManager/AddApartment";
import EditApartment from "@pages/privatePages/roomsManager/EditApartment";
import BookingConfirmation from "@pages/publicPages/bookings/BookingConfirmation";
import PaymentVerification from "@pages/publicPages/bookings/paymentVerification";
import SingleContactMessage from "@pages/privatePages/messages/SingleContactMessage";
import BookingDetails from "@pages/privatePages/bookings/BookingDetails";
import SingleApartment from "@pages/privatePages/roomsManager/SingleApartment";

const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path={paths.Index} element={<PublicLayout />}>
      <Route path={paths.Index} element={<Homepage />} />
      <Route path={paths.Apartment} element={<AllRooms />} />
      <Route path={`${paths.Apartment}/:id`} element={<RoomDetails />} />
      <Route path={paths.Contact} element={<ContactPage />} />
      <Route path={paths.Login} element={<Login />} />
      <Route path={paths.ForgotPassword} element={<ForgotPassword />} />
      <Route
        path={`${paths.BookingConfirmation}/:id`}
        element={<BookingConfirmation />}
      />
      <Route path={paths.PaymentCallback} element={<PaymentVerification />} />
    </Route>
    {/* Private Rputes */}
    <Route path={paths.Admin} element={<AdminLayout />}>
      <Route path={paths.AdminDashboard} element={<AdminDashboard />} />
      <Route path={paths.Bookings} element={<Bookings />} />
      <Route path={`${paths.Bookings}/:id`} element={<BookingDetails />} />
      <Route path={paths.Messages} element={<Messages />} />
      <Route
        path={`${paths.Messages}/:id`}
        element={<SingleContactMessage />}
      />
      <Route path={paths.UserManager} element={<Usermanager />} />
      <Route path={paths.ApartmentManager} element={<ApartmentManager />} />
      <Route path={paths.AddApartment} element={<AddApartment />} />
      <Route path={`${paths.EditApartment}/:id`} element={<EditApartment />} />
      <Route path={`${paths.ApartmentManager}/:id`} element={<SingleApartment />} />
    </Route>
  </Routes>
);

export default AppRoutes;
