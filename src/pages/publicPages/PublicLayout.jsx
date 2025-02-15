import Footer from "@components/Footer";
import Header from "@components/Header";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="overflow-x-hidden" >
      <Header />
       <Outlet />
      <Footer />
    </div>
  );
};

export default PublicLayout;
