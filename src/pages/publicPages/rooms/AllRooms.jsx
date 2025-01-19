import BookForm from "@components/BookForm"
import Rooms from "@components/Rooms"
import ScrollToTop from "@components/ScrollToTop"

const AllRooms = () => {
  return (
    <section className="" >
    <ScrollToTop/>
      {/* banner */}
      <div className="bg-room bg-cover bg-center h-[560px] relative flex justify-center items-center  ">

          {/* Overlay */}
          <div className="absolute w-full h-full bg-black/50"></div>
          {/* Title */}
          <h1 className="text-6xl text-white z-20 font-primary text-center " >Our Exclusive Apartments & Suites </h1>
      </div>
      <div className="container mx-auto relative">
      <div className="bg-accent/20 mt-4 p-4 lg:shadow-xl lg:absolute lg:left-0 lg:right-0 lg:p-0 lg:z-30 lg:-top-12">
       <BookForm/>

      </div>

     </div>
     <Rooms smallTitle='All Our VIP' bigTitle='Rooms & Suites' />

   
  </section>
  )
}

export default AllRooms