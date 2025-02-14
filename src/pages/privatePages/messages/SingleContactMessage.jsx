import { apiClient } from "@api/apiClient";
import { endpoints } from "@api/endpoints";
import Spinner from "@components/Spinner";
import ErrorAlert from "@pages/errorPages/errorAlert";
import { ErrorFormatter } from "@pages/errorPages/ErrorFormatter";
import { paths } from "@routes/paths";
import { DateFormatter } from "@utils/helpers";
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";

const SingleContactMessage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [singlemessage, setSingleMessage] = useState({});

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(paths.AdminDashboard);
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchMessage = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(
          `${endpoints.getSingleMessage}/${id}`
        );
        setSingleMessage(response.data);
      } catch (error) {
        setError(ErrorFormatter(error));
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, [id]);

  if (loading) return <Spinner />;

  return (
    <div className="flex">
      {/* Render ErrorAlert if there's an error */}
      {error && <ErrorAlert message={error} />}
      <div className="bg-white/80 w-full p-4 lg:p-10  rounded-lg">
        <FaArrowLeftLong
          onClick={() => handleGoBack()}
          className="cursor-pointer text-2xl text-dark"
        />
        <div className="w-full flex items-center justify-between my-10">
          <div className="letf flex flex-col gap-y-3">
            <div className="!mb-0  ">
              <span className="font-semibold mr-4">Sender:</span>{" "}
              {singlemessage?.fullName}
            </div>

            <span className="text-sm">
              {" "}
              <span className="font-semibold mr-4">Sender Email:</span>{" "}
              {singlemessage?.email}
            </span>

            <span className="text-sm">
              {" "}
              <span className="font-semibold mr-4">Sender Phone:</span>{" "}
              {singlemessage?.phone}
            </span>
          </div>

          <p className="text-sm">{DateFormatter(singlemessage?.createdAt)}</p>
        </div>
        <div className="text">{singlemessage?.message}</div>
      </div>
    </div>
  );
};

export default SingleContactMessage;
