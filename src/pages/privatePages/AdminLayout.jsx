
import AdminHeader from "@components/AdminHeader";
import SideBar from "@components/SideBar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden">
      <SideBar />
      <div className=" flex-grow overflow-x-hidden">
        <AdminHeader />
        <div className="bg-neutral-100 w-full h-[calc(100vh-82px)] p-4">
        <Outlet />
        </div>
      </div>

    </div>
  );
};

export default AdminLayout;
