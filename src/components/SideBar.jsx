
import { DashBottomMenu, DashMiddleMenu } from "@dummy/adminMenu";
import { ExapLogo } from "./Logo";
import { Link, useLocation } from "react-router-dom";
import { paths } from "@routes/paths";



 const SideBar = () => {
   const {pathname} = useLocation();
   

  return (
    <div className="hidden lg:flex flex-col bg-neutral-900 min-w-56  text-white " >

       {/* Top Part */}
       <Link to={paths.Index} >
       <div className="px-3  mt-5 mb-10 cursor-pointer">
         <ExapLogo imgClass="w-[40px] " TitleClass="text-[16px] text-yellow-500 " spanClass=" !text-[10px] text-white  " />
       </div>
       </Link>

       {/* Middle Part */}
       <div className="flex-1 ">
           {DashMiddleMenu.map((item, index)=>{
            return (
              <SideBarLink key={index} item={item} pathname={pathname} />
            )
           })}

       </div>
       {/*  bottom Part */}
       <div className="border-t border-yellow-900 pt-3">
         {DashBottomMenu.map((item, index)=>(
            <SideBarLink key={index} item={item} pathname={pathname} />
         )) }
       </div>
    </div>
  )
}

function SideBarLink({ item, pathname }) {
  const Icon = item.icon;
  const isActive = pathname === item.link || pathname.includes(item.link);
  return (
    <Link to={item.link} className={` ${isActive ? 'bg-amber-600' : ''} flex items-center px-3 gap-x-3 mb-2 rounded-sm py-2 group hover:bg-amber-600 transition-all duration-300 ease-in-out `}>
        <span className="text-xl">
          <Icon className="text-yellow-500 group-hover:text-black " /> 
        </span>
        <span className="">{item.title}</span>
      </Link>
  );
}


export default SideBar