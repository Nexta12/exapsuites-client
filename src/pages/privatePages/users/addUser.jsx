import { apiClient } from "@api/apiClient";
import { endpoints } from "@api/endpoints";
import EnhancedInput from "@components/EnhancedInput";
import EnhancedSelect from "@components/EnhancedSelect";
import AlertMessage from "@pages/errorPages/AlertMessage";
import { paths } from "@routes/paths";
import { totaluserRole } from "@utils/data";
import { scrollUP } from "@utils/helpers";
import { useState } from "react";
import { BsPlus } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({
    errorMessage: "",
    successMessage: "",
  });
  const [images, setImages] = useState([]);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    role: "",
  });

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    const validFiles = files.filter((file) => {
      const isValidType = ["image/jpeg", "image/png", "image/webp"].includes(
        file.type
      );
      const isValidSize = file.size <= 6 * 1024 * 1024; // 5MB max

      return isValidType && isValidSize;
    });

    if (validFiles.length !== files.length) {
      setMessage({
        errorMessage:
          "Some files were rejected due to type or size limitations.",
        successMessage: "",
      });
    }

    setImages((prev) => [
      ...prev,
      ...validFiles.map((file) => ({ id: URL.createObjectURL(file), file })),
    ]);
  };

  const removeImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    Object.entries(userData).forEach(([key, value]) => {
      formData.append(key, value); // Ensure value is not null/undefined
    });

    // Append images
    images.forEach(({ file }) => {
      formData.append("images", file);
    });

    try {
      await apiClient.post(endpoints.CreateUser, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage({
        errorMessage: "",
        successMessage: "Apartment Created Successfully",
      });

      //  Reset Everything all Inputs to empty including uploaded images after submission success
      setUserData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        role: "",
      });
      setImages([]);
      scrollUP();
    } catch (error) {
      setMessage({ errorMessage: error?.response?.data, successMessage: "" });
    } finally {
      setIsLoading(false);
    }
  };

  const navigate = useNavigate();
  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(paths.AdminDashboard);
    }
  };

  return (
    <div className="mt-5 w-full md:w-[80%] lg:w-[70%] mx-auto ">
      <form action="" method="post" className="mb-10" onSubmit={handleSubmit}>
        <div className=" w-full  flex flex-col lg:flex-row items-start justify-between gap-4">
          <div className="Left w-full bg-white border border-gray-200 p-5 flex-[2] ">
            <AlertMessage alert={message} />
            <FaArrowLeftLong
              onClick={() => handleGoBack()}
              className="cursor-pointer text-2xl text-dark lg:hidden"
            />
            <h3 className=" text-center text-primary/85 uppercase mb-3">
              User Information
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              <EnhancedInput
                name="firstName"
                id="firstName"
                placeholder="First Name*"
                onChange={handleInputChange}
                value={userData.firstName}
              />
            
              <EnhancedInput
                name="lastName"
                id="lastName"
                placeholder="Last Name*"
                onChange={handleInputChange}
                value={userData.lastName}
              />
        

              <div className="w-full !mt-[-15px]">
                <EnhancedSelect
                  name="role"
                  id="role"
                  placeholder="Role*"
                  options={totaluserRole}
                  value={userData.role}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 mt-3">
              <EnhancedInput
                name="phone"
                id="phone"
                placeholder="Phone *"
                onChange={handleInputChange}
                value={userData.phone}
              />
              <EnhancedInput
                name="email"
                id="email"
                placeholder="Email*"
                onChange={handleInputChange}
                value={userData.email}
              />
              <EnhancedInput
                name="password"
                id="password"
                placeholder="Password*"
                onChange={handleInputChange}
                value={userData.password}
              />
            </div>

            {/* Image Handler */}
            <div className="p-4 border rounded-lg shadow-lg w-full bg-white">
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 hover:bg-gray-100 transition"
              >
                <BsPlus className="w-6 h-6 text-gray-500" />
                <span className="ml-2 text-gray-700">
                  Upload Profile Picture
                </span>
              </label>
              <input
                id="file-upload"
                type="file"
                multiple
                className="hidden"
                name="images"
                onChange={handleFileChange}
                accept="image/*"
              />

              {images.length > 0 && (
                <div className="flex items-center justify-start gap-3 flex-wrap my-4">
                  {images.map(({ id }, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={id}
                        alt={`uploaded-${index}`}
                        className="w-20 h-20 object-cover rounded-sm"
                      />
                      <button
                        onClick={() => removeImage(id)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                      >
                        <FaTimes className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Button Section */}
        <div className="w-full mt-5">
        <button
                type="submit"
                className="btn btn-primary bg-blue-500 py-2 rounded-sm mx-auto "
              >
                {isLoading ? "Please wait..." : "Create User"}
              </button>
   
        </div>
      </form>
    </div>
  );
};

export default AddUser;
