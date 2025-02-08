import { apiClient } from "@api/apiClient";
import { endpoints } from "@api/endpoints";
import Spinner from "@components/Spinner";
import ErrorAlert from "@pages/errorPages/errorAlert";
import { ErrorFormatter } from "@pages/errorPages/ErrorFormatter";
import { paths } from "@routes/paths";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";

const PaymentVerification = () => {
  const [searchParams] = useSearchParams();
  const trxref = searchParams.get("trxref");
  const reference = searchParams.get("reference");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If both trxref and reference are missing, redirect to home
    if (!trxref && !reference) {
      navigate(paths.Index);
      return;
    }

    const verifyPayment = async () => {
      try {
        await apiClient.get(
          `${endpoints.ConfirmPayment}/?trxref=${trxref}&reference=${reference}`
        );
      } catch (error) {
        setError(ErrorFormatter(error));
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [trxref, reference, navigate]);

  // Prevent rendering if trxref or reference is missing
  if (!trxref && !reference) return <Spinner/>;

  // Show loading state while verifying
  if (loading) return <Spinner/>;

  return (
    <section className="">
      {/* Render ErrorAlert if there's an error */}
      {error && <ErrorAlert message={error} />}
      <div className="h-screen flex justify-center items-center bg-gradient-to-br from-black to-accent ">
        {/* Overlay */}
        <div className="absolute w-full h-full bg-black/50"></div>
        {/* Title */}

        {/* Success Card */}
        <div className="relative z-10 bg-white bg-opacity-90 backdrop-blur-lg shadow-2xl p-8 rounded-2xl text-center max-w-md w-full">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto animate-bounce" />
          <h2 className="text-2xl font-semibold text-gray-800 mt-4">
            Reservation Successful
          </h2>
          <p className="text-gray-600 mt-2">
            Your booking has been confirmed. Thank you for choosing us!
          </p>

          {/* Additional Info */}
          <div className="mt-6 border-t border-gray-300 pt-4">
            <p className="text-gray-700 text-sm">
              You will receive a confirmation email shortly.
            </p>
          </div>

          {/* Button */}
          <button className="mt-6 px-6 py-2 bg-accent text-white rounded-lg shadow-md hover:bg-accent-hover transition-all duration-300">
            Go to Dashboard
          </button>
        </div>
      </div>
    </section>
  );
};

export default PaymentVerification;
