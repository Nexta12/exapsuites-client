import { apiClient } from "@api/apiClient";
import { endpoints } from "@api/endpoints";
import DeleteModal from "@components/DeleteModal";
import FormModal from "@components/FormModal";
import ReadMoreModal from "@components/ReadMoreModal";
import Table from "@components/Table";
import ErrorAlert from "@pages/errorPages/errorAlert";
import { ErrorFormatter } from "@pages/errorPages/ErrorFormatter";
import { paths } from "@routes/paths";
import useAuthStore from "@store/authStore";
import { UserRole } from "@utils/constants";
import { DateFormatter, getNestedValue } from "@utils/helpers";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeftLong, FaEllipsisVertical } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const AllExpenses = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [visiblePopup, setVisiblePopup] = useState(null);
  const popupRef = useRef(null);
  const { user } = useAuthStore();

  const [openModal, setOpenModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [expensToUpdate, setExpenseToUpdate] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [openReadMore, setOpenReadMore] = useState(false);
  const [readMoreValue, setReadMoreValue] = useState(false);
  const [actionTitle, setActionTitle] = useState("");
  const [message, setMessage] = useState({
    errorMessage: "",
    successMessage: "",
  });

  const handleDelete = (value) => {
    setOpenModal(true);
    setItemToDelete(value);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      try {
        // Make an API call to delete the item
        await apiClient.delete(`${endpoints.deleteExpense}/${itemToDelete}`);

        // Remove the item from the list
        setData((prev) => prev.filter((user) => user._id !== itemToDelete));

        setOpenModal(false); // Close the modal
        setItemToDelete(null); // Reset the item to delete
      } catch (error) {
        setError(ErrorFormatter(error));
        setOpenModal(false); // Close the modal
        setItemToDelete(null); // Reset the item to delete
      }
    }
  };

  const togglePopup = (_id) => {
    setVisiblePopup((prev) => (prev === _id ? null : _id));
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setVisiblePopup(null); // Dismiss popup
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const keyExtractor = (row) => row._id;

  const takeAction = (title, id) => {
    setActionTitle(title);
    setExpenseToUpdate(id);
    setIsFormModalOpen(true);
  };

  const handleReadMore = (value) => {
    setOpenReadMore(true);
    setReadMoreValue(value);
  };

  const columns = [
    {
      key: "amount",
      header: "Amount (₦)",
      render: (value) => {
        return new Intl.NumberFormat("en-US").format(value);
      },
    },
    {
      key: "purpose",
      header: "Purpose",
    },
    {
      key: "contactInfo.fullName",
      header: "Recorded By",
      className: 'whitespace-nowrap',
      render: (_, row) =>
        `${getNestedValue(row, "staff.firstName")} ${getNestedValue(
          row,
          "staff.lastName"
        )}`,
    },
    { key: "createdAt", header: "Record Date" },
    {
      key: "status",
      header: "Status",
      render: (value, row) => {
        if (typeof value === "string") {
          // Determine the styles based on the value
          let bgClass = "";
          let textClass = "";
          switch (value) {
            case "approved":
              bgClass = "bg-green-100";
              textClass = "text-green-800 capitalize text-[12px] ";
              break;
            case "pending":
              bgClass = "bg-yellow-100";
              textClass = "text-yellow-800 capitalize text-[12px] ";
              break;
            case "declined":
              bgClass = "bg-red-100";
              textClass = "text-red-800 capitalize text-[12px] ";
              break;
            default:
              // Fallback for unexpected values
              bgClass = "bg-gray-100";
              textClass = "text-gray-800";
          }

          return (
            <div className="flex items-center space-x-3">
              <span
                className={`px-2 py-1 rounded text-sm font-medium ${bgClass} ${textClass}`}
              >
                {value}
              </span>
              {user.role === UserRole.manager && value === "pending" && (
                <>
                  <button
                    onClick={() => takeAction("Approving", row._id)}
                    className="text-blue-500 hover:text-blue-700 text-sm underline focus:outline-none shadow-2xl "
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => takeAction("Declining", row._id)}
                    className="text-blue-500 hover:text-blue-700 text-sm underline focus:outline-none shadow-2xl "
                  >
                    Decline
                  </button>
                </>
              )}
            </div>
          );
        }

        // Fallback for unexpected types
        return null;
      },
    },
    {
      key: "verifiedBy.fullName",
      header: "Verified By",
      className: 'capitalize whitespace-nowrap',
      render: (_, row) =>
        `${getNestedValue(row, "verifiedBy.firstName")} ${
          getNestedValue(row, "verifiedBy.lastName") || "Pending..."
        }`,
    },
    { key: "updatedAt", header: "Verified Date", render : (_, row)=>{
      const createdDate = row.createdAt
      const updatedDate = row.updatedAt
      if (createdDate === updatedDate ) {
        return 'Pending...';
      } else {
        return DateFormatter(updatedDate) ; // Return the updatedAt value if they are different
      }
    } },
    {
      key: "comment",
      header: "Remark",
      render: (value, row) => (
        <button
          id={row._id}
          onClick={() => handleReadMore(value)}
          className="text-blue-500 hover:underline capitalize"
        >
          {value?.slice(0, 20) || "Pending..." } 
        </button>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: `${user.role !== UserRole.superAdmin ? "hidden" : ""}`,
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
              <Link to={`${paths.Expenses}/update/${row._id}`}>Update</Link>
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

  // Pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const totalPages = Math.ceil(data.length / pageSize);

  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(endpoints.getAllExpenses);
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

  const handleFormSubmit = async (formData) => {
    const data = {
      ...formData,
      status: actionTitle === "Approving" ? "approved" : "declined",
    };

    try {
      await apiClient.put(
        `${endpoints.updateExpenses}/${expensToUpdate}`,
        data
      );
      setMessage({
        errorMessage: "",
        successMessage: `Expense ${
          actionTitle === "Approving" ? "Approved" : "Declined"
        } Successfully`,
      });
      setTimeout(() => {
        setIsFormModalOpen(false); // Close the modal first
        setTimeout(() => {
          window.location.reload(); // Reload only after modal has disappeared
        }, 500); // Add a slight delay to ensure UI updates before reloading
      }, 3000);
    } catch (error) {
      setMessage({ errorMessage: ErrorFormatter(error), successMessage: "" });
    }
  };

  const fields = [{ name: "comment", type: "textarea", required: true }];

  return (
    <div>
      <DeleteModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={confirmDelete}
        message={"Are you Sure You want to this item ?"}
      />
      <ReadMoreModal
        isOpen={openReadMore}
        onClose={() => setOpenReadMore(false)}
        message={readMoreValue}
      />

      <FormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        title={`Remark for ${actionTitle} Expense`}
        fields={fields}
        alertMsg={message}
      />

      {/* Render ErrorAlert if there's an error */}
      {error && <ErrorAlert message={error} />}

      <div className="my-4 w-full flex items-center justify-between">
        <FaArrowLeftLong
          onClick={() => handleGoBack()}
          className="cursor-pointer text-2xl text-neutral-400 mb-2 lg:hidden "
        />
        <h1 className="text-primary tracking-[1px]">All Expenses</h1>
        <div className="">
          <Link
            to={`${paths.Expenses}/add`}
            className="btn btn-primary py-2 rounded-sm"
          >
            Add New
          </Link>
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

export default AllExpenses;
