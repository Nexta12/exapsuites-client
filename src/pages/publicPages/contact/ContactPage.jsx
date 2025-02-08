import { apiClient } from "@api/apiClient";
import { endpoints } from "@api/endpoints";
import InputField from "@components/Input";
import ScrollToTop from "@components/ScrollToTop";
import Textarea from "@components/TextArea";
import AlertMessage from "@pages/errorPages/AlertMessage";
import { ErrorFormatter } from "@pages/errorPages/ErrorFormatter";
import { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const ContactPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [message, setMessage] = useState({
    errorMessage: "",
    successMessage: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const messageInfo = {
        fullName,
        email,
        message: contactMessage,
      };

       await apiClient.post(
        endpoints.SendContactMessage,
        messageInfo
      );
      
      setMessage({errorMessage: '', successMessage: 'Message Sent !'})

      setFullName('');
      setEmail('');
      setContactMessage('')

      // Send Email to sender and Admin

    } catch (error) {
      setMessage({ errorMessage: ErrorFormatter(error), successMessage: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="">
      <ScrollToTop />
      {/* banner */}
      <div className="bg-room bg-cover bg-center h-[560px] relative flex justify-center items-center  ">
        {/* Overlay */}
        <div className="absolute w-full h-full bg-black/50"></div>
        {/* Title */}
        <h1 className="text-6xl text-white z-20 font-primary text-center ">
          Contact Us{" "}
        </h1>
      </div>

      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row h-full py-24 ">
          {/* left */}
          <div className=" w-full h-full lg:w-[50%] px-6 ">
            <h3 className="h3">For Reservation</h3>
            <p className="mb-8">
              You can easily reach out to us using any of the following for
              quick reservation
            </p>

            {/* Contact Details */}
            <div className="mt-12">
              {/* grid */}
              <div className="grid grid-cols-1 gap-6 mb-12 ">
                <div className="flex items-center gap-x-3 flex-1 ">
                  <FaMapMarkerAlt className="text-accent text-[20px]" />
                  <div className="text-base">
                    15B, Shobande Razaq Street Evergreen Estate Aboru Lagos.
                  </div>
                </div>
                <div className="flex items-center gap-x-3 flex-1 ">
                  <FaPhoneAlt className="text-accent text-[20px]" />
                  <div className="text-base">
                    {" "}
                    +234-8034246152, +234-8098751502
                  </div>
                </div>
                <div className="flex items-center gap-x-3 flex-1 ">
                  <MdEmail className="text-accent text-[20px]" />
                  <div className="text-base">Exapsuites@gmail.com</div>
                </div>
              </div>
            </div>
            {/* Contact Form */}
            <div className="my-12">
              <AlertMessage alert={message} />
              <h3 className="h3">Drop A Note </h3>
              <form action="#" onSubmit={handleSubmit}>
                <InputField
                  placeholder="Your Name"
                  value={fullName}
                  name="fullName"
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                <InputField
                  placeholder="Your Email"
                  type="email"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Textarea
                  placeholder="Your Message"
                  value={contactMessage}
                  name="contactMessage"
                  onChange={(e) => setContactMessage(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="btn btn-primary py-2 rounded-sm"
                >
                 {loading ? 'Please wait...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
          {/* right */}
          <div className=" w-full h-full lg:w-[50%] ">
            {/* Reservation */}

            {/* Rules */}
            <div className="border border-accent shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.122321078233!2d3.274547773483625!3d6.631726621899305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b909564e57a23%3A0x107619123501e5e9!2s15%20Shobande%20Razaq%20St%2C%20Oke%20Odo%2C%20Lagos%20102213%2C%20Lagos!5e0!3m2!1sen!2sng!4v1737014485670!5m2!1sen!2sng"
                width="100%"
                height="600"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
