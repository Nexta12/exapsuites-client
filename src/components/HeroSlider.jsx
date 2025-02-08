import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

import Img1 from "@assets/img/heroSlider/1.jpg";
import Img2 from "@assets/img/heroSlider/2.jpg";
import Img3 from "@assets/img/heroSlider/3.jpg";
import { Link } from "react-router-dom";
import { paths } from "@routes/paths";

const slides = [
  {
    title: "Your Luxury Apartments",
    bg: Img1,
    btnText: "See our rooms",
  },
  {
    title: "Your Luxury Apartments",
    bg: Img2,
    btnText: "See our rooms",
  },
  {
    title: "Your Luxury Apartments",
    bg: Img3,
    btnText: "See our rooms",
  },
];

const HeroSlider = () => {
  return (
    <Swiper
      modules={[EffectFade, Autoplay]}
      effect="fade"
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      className="heroSlider h-[600px]"
    >
      {slides.map((slide, index) => {
        const { title, bg, btnText } = slide;
        return (
          <SwiperSlide
            className="h-full  flex justify-center items-center relative"
            key={index}
          >
            {/* Text Content */}
            <div className="absolute flex  z-20 w-full h-full">
            <div className=" text-white text-center m-auto ">
              <div className="uppercase font-tertiary tracking-[6px] mb-5">
                Just Enjoy and Relax
              </div>
              <h1 className="text-[32px] font-primary uppercase tracking-[2px] max-w-[920px] mx-auto lg:text-[68px] leading-tight mb-6">
                {title}
              </h1>
               <Link to={paths.Apartment} >
              <button className="btn btn-lg btn-primary mx-auto">
                {btnText}
              </button>
              </Link>
            </div>
            </div>

            {/* Background Image */}
            <div className=" absolute top-0 w-full h-full">
              <img
                className="object-cover h-full w-full"
                src={bg}
                alt="slide"
              />
            </div>

            <div className="absolute top-0 w-full h-full bg-black/50"></div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default HeroSlider;
