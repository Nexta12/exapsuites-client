import { apiClient } from "@api/apiClient";
import { endpoints } from "@api/endpoints";
import EnhancedInput from "@components/EnhancedInput";
import EnhancedSelect from "@components/EnhancedSelect";
import EnhancedTextArea from "@components/EnhancedTextArea";
import AlertMessage from "@pages/errorPages/AlertMessage";
import ErrorAlert from "@pages/errorPages/errorAlert";
import { ErrorFormatter } from "@pages/errorPages/ErrorFormatter";
import { paths } from "@routes/paths";
import useAuthStore from "@store/authStore";
import { UserRole } from "@utils/constants";
import { totaluserRole } from "@utils/data";
import { scrollUP } from "@utils/helpers";
import { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";

const EditProfile = () => {
  const { id } = useParams();
  const { user } = useAuthStore();
  const [error, setError] = useState(null);
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
    description: "",
    password: "",
    phone: "",
    role: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiClient.get(
          `${endpoints.getUserDetails}/${id}`
        );

        setUserData(response.data.user);
      } catch (error) {
        setError(ErrorFormatter(error));
      }
    };

    fetchUserData();
  }, [id]);

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
    if(images.length > 0){
      images.forEach(({ file }) => {
        formData.append("images", file);
      });
    }else{
      formData.append("keepExistingImages", 'true');
    }

    try {
      await apiClient.put(`${endpoints.UpdateUser}/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage({
        errorMessage: "",
        successMessage: "User Updated Successfully",
      });

      //  Reset Everything all Inputs to empty including uploaded images after submission success

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
      {/* Render ErrorAlert if there's an error */}
      {error && <ErrorAlert message={error} />}
      <form action="" method="post" className="mb-10" onSubmit={handleSubmit}>
        <div className=" w-full  flex flex-col lg:flex-row items-start justify-between gap-4">
          <div className="Left w-full bg-white border border-gray-200 p-5 flex-[2] ">
            <AlertMessage alert={message} />
            <FaArrowLeftLong
              onClick={() => handleGoBack()}
              className="cursor-pointer text-2xl text-dark lg:hidden"
            />
            <h3 className=" text-center text-accent uppercase mb-3">
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
              {user.role !== UserRole.guest && (
                <div className="w-full !mt-[-15px]">
                  <EnhancedSelect
                    name="role"
                    id="role"
                    placeholder="Select Role*"
                    options={totaluserRole}
                    value={userData.role}
                    onChange={handleInputChange}
                  />
                </div>
              )}
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
            </div>
            <EnhancedTextArea
              name="description"
              id="description"
              onChange={handleInputChange}
              value={userData.description}
            />

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
            {isLoading ? "Please wait..." : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
