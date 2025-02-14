import Rooms from "@components/Rooms"
import BookForm from "@components/BookForm"
import HeroSlider from "@components/HeroSlider"

const Homepage = () => {
  return (
    <>
     <HeroSlider/>
     <div className="container mx-auto relative">
      <div className=" mt-4 p-4 lg:shadow-xl lg:absolute lg:left-0 lg:right-0 lg:p-0 lg:z-30 lg:-top-12">
       <BookForm/>

      </div>

     </div>
     <Rooms limit={6} smallTitle='Our Amazing' bigTitle='Rooms & Suites' />
    </>
  )
}

export default Homepage