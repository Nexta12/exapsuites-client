import InputField from "@components/Input";
import { FaLock } from "react-icons/fa";

const ForgotPassword = () => {
  return (
    <section className="">
      <div className="bg-room bg-cover bg-center h-screen lg:h-[560px] relative flex justify-center items-center  ">
        {/* Overlay */}
        <div className="absolute w-full h-full bg-black/50"></div>
        {/* Title */}
    
        <div className=" z-20 w-[80%] lg:w-[40%] bg-accent p-5 rounded-md shadow-2xl ">
              <h3 className="h3 text-white flex items-center gap-x-2 justify-center">ForgotPassword <FaLock title="Secured by Next securities" className="text-black"/> </h3>
            <form action="">
                <InputField placeholder='Email' />
                
                <button className="btn btn-secondary hover:bg-black/65 w-full py-2 rounded-sm mb-4 " >Reset Password</button>
            </form>
        </div>
     

      </div>
    </section>
  );
};

export default ForgotPassword ;
