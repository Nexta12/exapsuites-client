
import AdultsDropdown from "@components/AdultsDropdown"
import KidsDropdown from "@components/KidsDropdown"
import CheckIn from "@components/CheckIn"
import CheckOut from "@components/CheckOut"

import ScrollToTop from "@components/ScrollToTop"

// context

import { RoomContext  } from "@context/RoomContext"
import { useParams } from "react-router-dom"
import { useContext } from "react"
import { FaCheck } from "react-icons/fa"

const RoomDetails = () => {
 const { rooms } = useContext(RoomContext);
 const {id} = useParams();

 const room = rooms.find(room => room.id === Number(id) )
   const { name, description, facilities, imageLg, price} = room;
 
  return (
    <section className="" >
      <ScrollToTop/>
        {/* banner */}
        <div className="bg-room bg-cover bg-center h-[560px] relative flex justify-center items-center  ">

            {/* Overlay */}
            <div className="absolute w-full h-full bg-black/50"></div>
            {/* Title */}
            <h1 className="text-6xl text-white z-20 font-primary text-center " >{name} Details </h1>
        </div>

        <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row h-full py-24 ">
                {/* left */}
                <div className=" w-full h-full lg:w-[60%] px-6 ">
                    <h2 className="h2" >{name}</h2>
                    <p className="mb-8" >{description}</p>
                    <img className="mb-8" src={imageLg} alt="profile" />
                    {/* facilities */}
                    <div className="mt-12">
                        <h3 className="h3 mb-3" >Room Facilities</h3>
                        <p className="mb-12" >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, excepturi. Labore, pariatur sunt! Quas perspiciatis possimus eius iusto accusantium iste. Quis, reiciendis explicabo quo odit dolorum porro aliquam doloremque alias.</p>
                        {/* grid */}
                        <div className="grid grid-cols-3 gap-6 mb-12 ">
                            {facilities.map((item, index)=>{
                              const { name, icon, } = item;
                                return <div key={index} className="flex items-center gap-x-3 flex-1 ">
                                    <div className="text-3xl text-accent">{icon}</div>
                                    <div className="text-base">{name}</div>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
                {/* right */}
                <div className=" w-full h-full lg:w-[40%] ">
                   {/* Reservation */}
                   <div className="py-8 px-6 bg-accent/20 mb-12 ">
                    <div className="flex flex-col space-y-4 mb-4">
                        <h3>Your Reservation</h3>
                        <div className="h-[60px]">
                            <CheckIn/>
                        </div>
                        <div className="h-[60px]">
                            <CheckOut/>
                        </div>
                        <div className="h-[60px]">
                            <AdultsDropdown/>
                        </div>
                        <div className="h-[60px]">
                            <KidsDropdown/>
                        </div>
                    </div>
                    <button className="btn btn-lg btn-primary w-full " >book now for ${price} </button>
                   </div>
                   {/* Rules */}
                   <div className="">
                     <h3 className="h3" >Hotel Rules</h3>
                     <p className="mb-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus nam corporis reprehenderit sapiente repellendus minima voluptatem, perferendis itaque doloribus! Corporis at asperiores, doloremque laboriosam quae reiciendis totam vitae repudiandae quis!</p>
                     <ul className="flex flex-col gap-y-4" >
                        <li className="flex items-center gap-x-4 " >
                            <FaCheck className="text-accent" />
                            Check-in: 3:00 PM - 9:00 PM
                        </li>
                        <li className="flex items-center gap-x-4 " >
                            <FaCheck className="text-accent" />
                            Check-out: 10:00 AM
                        </li>
                        <li className="flex items-center gap-x-4 " >
                            <FaCheck className="text-accent" />
                            No Pets
                        </li>
                        <li className="flex items-center gap-x-4 " >
                            <FaCheck className="text-accent" />
                            No Smoking
                        </li>
                      
                     </ul>
                   </div>
                </div>
            </div>
        </div>

    </section>
  )


}

export default RoomDetails