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
import ApartmentManager from "@pages/privatePages/roomsManager/ApartmentManager";
import AddApartment from "@pages/privatePages/roomsManager/AddApartment";
import EditApartment from "@pages/privatePages/roomsManager/EditApartment";
import BookingConfirmation from "@pages/publicPages/bookings/BookingConfirmation";
import PaymentVerification from "@pages/publicPages/bookings/paymentVerification";
import SingleContactMessage from "@pages/privatePages/messages/SingleContactMessage";
import BookingDetails from "@pages/privatePages/bookings/BookingDetails";
import SingleApartment from "@pages/privatePages/roomsManager/SingleApartment";
import AdminStaff from "@pages/privatePages/users/AllUsers";
import AddUser from "@pages/privatePages/users/addUser";
import UpdateBooking from "@pages/privatePages/bookings/UpdateBooking";
import AddBooking from "@pages/privatePages/bookings/AddBooking";
import ConfirmInternalBooking from "@pages/privatePages/bookings/ConfirmInternalBooking";
import AllExpenses from "@pages/privatePages/expenses/AllExpenses";
import AddnewExpenditure from "@pages/privatePages/expenses/AddnewExpenditure";
import UpdateExpense from "@pages/privatePages/expenses/UpdateExpense";
import UserProfile from "@pages/privatePages/users/UserProfile";
import EditProfile from "@pages/privatePages/users/EditProfile";
import OTP from "@pages/publicPages/forgotPassword/OTP";
import NewPassword from "@pages/publicPages/forgotPassword/NewPassword";


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
      <Route path={paths.setNewPassword} element={<NewPassword/>} />
      <Route path={paths.OTPPage} element={<OTP />} />
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
      <Route path={`${paths.Bookings}/add`} element={<AddBooking/>} />
      <Route path={`${paths.Bookings}/confirmation/:id`} element={<ConfirmInternalBooking />} />
      <Route path={`${paths.Bookings}/update/:id`} element={<UpdateBooking />} />
      <Route path={paths.Messages} element={<Messages />} />
      <Route path={paths.Expenses} element={<AllExpenses />} />
      <Route path={`${paths.Expenses}/add`} element={<AddnewExpenditure/>} />
      <Route path={`${paths.Expenses}/update/:id`} element={<UpdateExpense/>} />
      <Route
        path={`${paths.Messages}/:id`}
        element={<SingleContactMessage />}
      />
      <Route path={paths.Users} element={<AdminStaff />} />
      <Route path={`${paths.Users}/add`} element={<AddUser/>} />
      <Route path={`${paths.Users}/:id`} element={<UserProfile/>} />
      <Route path={`${paths.Users}/edit/:id`} element={<EditProfile/>} />
      <Route path={paths.ApartmentManager} element={<ApartmentManager />} />
      <Route path={paths.AddApartment} element={<AddApartment />} />
      <Route path={`${paths.EditApartment}/:id`} element={<EditApartment />} />
      <Route path={`${paths.ApartmentManager}/:id`} element={<SingleApartment />} />
    </Route>
  </Routes>
);

export default AppRoutes;
