

import { apiClient } from "@api/apiClient";
import { endpoints } from "@api/endpoints";
import EnhancedInput from "@components/EnhancedInput";
import EnhancedSelect from "@components/EnhancedSelect";
import EnhancedTextArea from "@components/EnhancedTextArea";
import { RoomContext } from "@context/RoomContext";
import AlertMessage from "@pages/errorPages/AlertMessage";
import { ErrorFormatter } from "@pages/errorPages/ErrorFormatter";
import { paths } from "@routes/paths";
import {
  capacityOptions,
  totalBalcony,
  totalBathrooms,
  totalBeds,
  totalKitchen,
  totalParlour,
  totalRooms,
} from "@utils/data";
import { scrollUP } from "@utils/helpers";
import { useContext, useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";

const EditApartment = () => {
  const { id } = useParams();

  const { rooms } = useContext(RoomContext);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({
    errorMessage: "",
    successMessage: "",
  });
  const [images, setImages] = useState([]);
  const [apartmentData, setApartmentData] = useState({
    title: "",
    description: "",
    price: "",
    maxPeople: "",
    totalParlour: "",
    totalRooms: "",
    totalKitchens: "",
    totalBathrooms: "",
    totalBalcony: "",
    totalBeds: "",
  });


  // Get Apartment data from API,
  useEffect(()=>{
    if(rooms && rooms.length > 0) {
      const currentApartment = rooms.find(room => room._id === id)
      if (currentApartment) {
      setApartmentData(currentApartment);
    }
    }
  },[rooms, id])

  const handleInputChange = (e) => {
    setApartmentData({
      ...apartmentData,
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
    Object.entries(apartmentData).forEach(([key, value]) => {
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
      await apiClient.put(`${endpoints.UpdateApartmentDetails}/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage({
        errorMessage: "",
        successMessage: "Apartment Updated Successfully",
      });

     
      scrollUP()
    } catch (error) {
      setMessage({ errorMessage: ErrorFormatter(error), successMessage: "" });
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
    <div className="mt-5 w-full ">
        <FaArrowLeftLong
                    onClick={() => handleGoBack()}
                    className="cursor-pointer text-2xl text-neutral-400 mb-2 lg:hidden"
                  />
      <form action="" method="post" className="mb-10" onSubmit={handleSubmit}>
        <div className=" w-full  flex flex-col lg:flex-row items-start justify-between gap-4">
          {/* Left Side */}
          
          <div className="Left w-full bg-white border border-gray-200 p-5 flex-[2] ">
            <AlertMessage alert={message} />
          
            <h3 className=" font-semibold text-center text-accent uppercase mb-3">
              Apartment Information
            </h3>
            <EnhancedInput
              name="title"
              id="title"
              placeholder="Apartment Name"
              onChange={handleInputChange}
              value={apartmentData.title}
            />

            <EnhancedTextArea
              name="description"
              id="description"
              value={apartmentData.description}
              required
              onChange={handleInputChange}
            />

            {/* Image Handler */}
            <div className="p-4 border rounded-lg shadow-lg w-full bg-white">
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 hover:bg-gray-100 transition"
              >
                <BsPlus className="w-6 h-6 text-gray-500" />
                <span className="ml-2 text-gray-700">
                  Upload Apartment Images
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
          {/* Right Side */}
          <div className="Right w-full bg-white border border-gray-200 p-5 flex-1">
            <h3 className=" text-center text-primary/85 uppercase mb-3">
              Other Details
            </h3>
            <div className="flex flex-col lg:flex-row items-center justify-between mb-4 gap-4">
              {/* input */}
              <div className="w-full">
                <EnhancedInput
                  name="price"
                  value={apartmentData.price}
                  id="price"
                  placeholder="Price per Night (₦)"
                  required
                  onChange={handleInputChange}
                />
              </div>
              {/* select */}

              <div className="w-full">
                <EnhancedSelect
                  name="maxPeople"
                  id="maxPeople"
                  placeholder="Flat Capacity"
                  options={capacityOptions}
                  value={apartmentData.maxPeople}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-between mb-4 gap-4">
              {/* select */}

              <div className="w-full">
                <EnhancedSelect
                  name="totalParlour"
                  id="totalParlour"
                  placeholder="Total Parlour"
                  options={totalParlour}
                  value={apartmentData.totalParlour}
                  onChange={handleInputChange}
                />
              </div>
              {/* select */}

              <div className="w-full">
                <EnhancedSelect
                  name="totalRooms"
                  id="totalRooms"
                  placeholder="Total Rooms"
                  options={totalRooms}
                  value={apartmentData.totalRooms}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-between mb-4 gap-4">
              {/* select */}

              <div className="w-full">
                <EnhancedSelect
                  name="totalKitchens"
                  id="totalKitchens"
                  placeholder="Total Kitchens"
                  options={totalKitchen}
                  value={apartmentData.totalKitchens}
                  onChange={handleInputChange}
                />
              </div>
              {/* select */}

              <div className="w-full">
                <EnhancedSelect
                  name="totalBathrooms"
                  id="totalBathrooms"
                  placeholder="Total Bathrooms"
                  options={totalBathrooms}
                  value={apartmentData.totalBathrooms}
                  onChange={handleInputChange}
                />
              </div>
            </div>
       
            <div className="flex flex-col lg:flex-row items-center justify-between mb-4 gap-4">
              {/* select */}

              <div className="w-full">
                <EnhancedSelect
                  name="totalBalcony"
                  id="totalBalcony"
                  placeholder="Total Balcony"
                  options={totalBalcony}
                  value={apartmentData.totalBalcony}
                  onChange={handleInputChange}
                />
              </div>
              {/* select */}

              <div className="w-full">
                <EnhancedSelect
                  name="totalBeds"
                  id="totalBeds"
                  placeholder="Total Beds"
                  options={totalBeds}
                  value={apartmentData.totalBeds}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Button Section */}
        <div className="flex flex-col lg:flex-row">
          <div className="flex-[2]">
            <div className=" my-5 ">
              <button
                type="submit"
                className="btn btn-primary bg-blue-500 py-2 rounded-sm mx-auto "
              >
                {isLoading ? "Please wait..." : "Update Apartment"}
              </button>
            </div>
          </div>
          {/* Left empty to achieve better alignment */}
          <div className="flex-1"></div>
        </div>
      </form>
    </div>
  );
};

export default EditApartment;
