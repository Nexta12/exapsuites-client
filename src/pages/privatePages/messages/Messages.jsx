
import { apiClient } from "@api/apiClient";
import { endpoints } from "@api/endpoints";
import Table from "@components/Table";
import ErrorAlert from "@pages/errorPages/errorAlert";
import { paths } from "@routes/paths";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeftLong, FaEllipsisVertical } from "react-icons/fa6";
import { ErrorFormatter } from "@pages/errorPages/ErrorFormatter";
import DeleteModal from "@components/DeleteModal";

const Messages = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [visiblePopup, setVisiblePopup] = useState(null);
  const popupRef = useRef(null);


  const [openModal, setOpenModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleDelete = (value) => {
    setOpenModal(true);
    setItemToDelete(value);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      try {
        // Make an API call to delete the item
        await apiClient.delete(
          `${endpoints.deleteMessage}/${itemToDelete}`,
        );

        // Remove the item from the list
        setData((prev) => prev.filter((user) => user._id !== itemToDelete));

        setOpenModal(false); // Close the modal
        setItemToDelete(null); // Reset the item to delete
      } catch (error) {
        setError(ErrorFormatter(error))
        setOpenModal(false); // Close the modal
        setItemToDelete(null); // Reset the item to delete
      }
    }
  };

  const togglePopup = (_id ) => {
    setVisiblePopup((prev) => (prev === _id ? null : _id));
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target)
      ) {
        setVisiblePopup(null); // Dismiss popup
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);


  const columns = [
    { key: 'fullName', header: 'Sender', },
    { key: 'email', header: 'Email',  },
    { 
      key: "message", 
      header: "Message",
      render: (value, row) => (
        <Link 
          to={`${paths.Messages}/${row._id}`} 
          className={`hover:underline block max-w-[200px] truncate ${
            row.isRead ? "text-gray-600" : "text-blue-600"
          }`}
          title={value} // Shows full text on hover
        >
          {value.length > 50 ? `${value.slice(0, 50)}...` : value}
        </Link>
      ),
    },
    { key: 'createdAt', header: 'Created At' },
    
    {
      key: "isRead",
      header: "Status",
      render: (value) => {
        if (typeof value === "boolean") {
          // Determine the styles based on the value
          let bgClass = "";
          let textClass = "";
          switch (value) {
            case false:
              value = 'New Message'
              bgClass = "bg-blue-100";
              textClass = "text-blue-800 text-[12px] ";
              break;
            case true:
              value = 'Seen'
              bgClass = "bg-neutral-100";
              textClass = "text-neutral-800 text-[12px] ";
              break;
            default:
              // Fallback for unexpected values
              bgClass = "bg-red-100";
              textClass = "text-red-800";
          }

          return (
            <span
              className={`px-2 py-1 rounded text-sm font-medium ${bgClass} ${textClass}`}
            >
              {value}
            </span>
          );
        }

        // Fallback for unexpected types
        return null;
      },
    },
    {
      key: "actions",
      header: "Actions",
      render: (_, row) => (
        <div className="relative flex items-center justify-center">
          <FaEllipsisVertical
            className="cursor-pointer"
            onClick={() => togglePopup(row._id)}
          />

          {visiblePopup === row._id && (
            <div
              ref={popupRef}
              className="absolute bg-white border rounded shadow p-2 top-[-4px] right-0 z-10 flex items-center gap-3"
            >
              <Link     to={`${paths.Messages}/${row._id}`}  >View</Link>
              <button
                onClick={() => handleDelete(row._id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ),
    },
   
  ];


  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const keyExtractor = (row) => row._id;

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(7);
  const totalPages = Math.ceil(data.length / pageSize);
  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(endpoints.getAllMessages);
        setData(response.data);
        setError(null);
      } catch {
        setError("An error occurred");
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate();
  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(paths.AdminDashboard);
    }
  };

  return (
    <div>
        <DeleteModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={confirmDelete}
        message="Are you Sure You want to this item ?"
      />
        {/* Render ErrorAlert if there's an error */}
        {error && <ErrorAlert message={error} />}

      <div className="mt-5 mb-8 w-full flex items-center justify-between">
      <FaArrowLeftLong
          onClick={() => handleGoBack()}
          className="cursor-pointer text-2xl text-dark lg:hidden"
        />
        <h1 className="text-primary tracking-[1px]">All Messages</h1>
        <div className="">
         
        </div>
         {/* Table */}
      
      </div>
       {/* Table */}
      <Table
        data={paginatedData}
        columns={columns}
        keyExtractor={keyExtractor}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default Messages;
