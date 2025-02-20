import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdFormatListBulleted } from "react-icons/md";

const LodginBenefits = () => {
  const settings = {
    infinite: true,
    vertical: true,
    speed: 3000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  const Benefits = [
    {
      title: "Free Dedicated fast Internet",
    },
    {
      title: "Cozy Restaurant with world class dishes",
    },
    {
      title: "Uninterrupted power supply",
    },
    {
      title: "Smart TVs fully connected to the Internet",
    },
    {
      title: "Guaranteed Security within and around the premises",
    },
    {
      title: "Executive size family beds for super comfort",
    },
    {
      title: "Easy checkIn and checkOut",
    },
    {
      title: "Flexible Payment system",
    },
    {
      title: "Airport pick up and drop off",
    },
  ];

  return (
    <div className="w-full lg:w-[20rem] h-[22rem] bg-sky-600 text-white p-4 rounded-sm border border-gray-200 flex flex-col ">
      <h3 className=" text-center text-white text-secondary text-lg font-semibold mb-4 tracking-[2px]">
        What We Offer
      </h3>

      <Slider {...settings} className="w-full">
        {Benefits.map((benefit, index) => (
          <div key={index} className="">
          <div  className="flex items-center gap-x-2 text-sm mb-4">
            <MdFormatListBulleted className="text-white" />
            <span>{benefit.title}</span>
          </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default LodginBenefits;
