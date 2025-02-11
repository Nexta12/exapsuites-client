export const endpoints = {
    login: "api/secure/login",
    logout: "api/secure/logout",
    validateAuth: "/api/secure/validate",
    createApartment: '/api/apartment/create',
    getAllApartments: '/api/apartment/getAll',
    deleteApartment: '/api/apartment/delete',
    bookApartment: '/api/booking/book',
    getAllBookings: '/api/booking/getAll',
    getSingleBooking: '/api/booking/getOne',
    BookingConfirmation: 'api/booking/confirmation',
    makePayment: '/api/booking/bookingPayment',
    ConfirmPayment: '/api/booking/callback',
    UpdateBookingDetails: '/api/booking/update',
    SendContactMessage: '/api/contact/create',
    getAllMessages: '/api/contact/getAll',
    getSingleMessage: '/api/contact/getOne',
    deleteMessage: '/api/contact/delete',
    getAllUsers: '/api/user/getAll',
    CreateUser: '/api/user/create',
    deleteUser: '/api/user/delete'
  };
  