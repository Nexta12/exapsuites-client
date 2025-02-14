import { apiClient } from "@api/apiClient";
import { endpoints } from "@api/endpoints";

import EnhancedInput from "@components/EnhancedInput";
import EnhancedTextArea from "@components/EnhancedTextArea";
import AlertMessage from "@pages/errorPages/AlertMessage";
import { ErrorFormatter } from "@pages/errorPages/ErrorFormatter";
import { paths } from "@routes/paths";
import { scrollUP } from "@utils/helpers";
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const AddnewExpenditure = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({
    errorMessage: "",
    successMessage: "",
  });

  const [expenseData, setExpenseData] = useState({
    amount: "",
    purpose: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseData({
      ...expenseData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const expenseDetails = {
      amount: expenseData.amount,
      purpose: expenseData.purpose,
    };

    setIsLoading(true);

    try {
      await apiClient.post(endpoints.createExpensesData, expenseDetails);
      // Reset form data
      setExpenseData({
        amount: "",
        purpose: "",
      });
      setMessage({
        errorMessage: "",
        successMessage: "Expense recorded successfully",
      });
      scrollUP();
    } catch (error) {
       setMessage({ errorMessage: ErrorFormatter(error),
        successMessage: "",})
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
    <div className="mt-5 w-full md:w-[80%] lg:w-[70%] mx-auto pb-10">
      <form className="mb-10" onSubmit={handleSubmit}>
        <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-4">
          <div className="Left w-full bg-white border border-gray-200 p-5 flex-[2]">
            <FaArrowLeftLong
              onClick={handleGoBack}
              className="cursor-pointer text-2xl text-dark lg:hidden"
            />
             <AlertMessage alert={message}/>
            <h3 className="text-center text-accent font-semibold uppercase mb-10">
              Record Expenditure
            </h3>
            <div className="flex flex-col gap-y-4">
              <EnhancedInput
                name="amount"
                type="number"
                id="amount"
                placeholder="Amount*"
                onChange={handleInputChange}
                value={expenseData.amount}
              />
              <EnhancedTextArea
                value={expenseData.purpose}
                name="purpose"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="w-full mt-5">
          <button
            type="submit"
            className="btn btn-primary bg-blue-500 py-2 rounded-sm mx-auto"
          >
            {isLoading ? "Please wait..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddnewExpenditure;
