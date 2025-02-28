import { apiClient } from "@api/apiClient";
import { endpoints } from "@api/endpoints";
import EnhancedInput from "@components/EnhancedInput";
import EnhancedTextArea from "@components/EnhancedTextArea";
import Spinner from "@components/Spinner";
import AlertMessage from "@pages/errorPages/AlertMessage";
import ErrorAlert from "@pages/errorPages/errorAlert";
import { ErrorFormatter } from "@pages/errorPages/ErrorFormatter";
import { paths } from "@routes/paths";
import useAuthStore from "@store/authStore";
import { DateFormatter } from "@utils/helpers";
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";

const SingleContactMessage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore()
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isloading, setIsLoading] = useState(false);
  const [singlemessage, setSingleMessage] = useState({});
  const [reply, setReply] = useState("");
  const [message, setMessage] = useState({errorMessage: "", successMessage: ""})

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
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const data = {
      reply,
      email: singlemessage.email,
      repliedBy:user.id
    };

    try {
     await apiClient.put(
        `${endpoints.replyMessage}/${singlemessage._id}`,
        data
      );
      setReply("")
      setMessage({errorMessage: "", successMessage: "Reply Sent to user email"})
      setTimeout(()=>{
         window.location.reload();
      },3000)
    } catch (error) {
      setError(ErrorFormatter(error));
    }finally{
      setIsLoading(false)
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="pb-10">
      {error && <ErrorAlert message={error} />}
      <FaArrowLeftLong
        onClick={() => handleGoBack()}
        className="cursor-pointer text-2xl text-neutral-400 lg:hidden"
      />
      <div className="w-full lg:w-[70%] bg-white  mt-3 text-sm italic p-3 rounded ">
        {singlemessage?.message}
        <div className="flex flex-col gap-y-1 mt-5">
          <span>{singlemessage?.fullName}</span>
          <span>{singlemessage?.phone}</span>
          <span>{DateFormatter(singlemessage?.createdAt)}</span>
        </div>
      </div>
       {singlemessage.reply && (
      <div className="w-full lg:w-[50%] bg-sky-300 ml-auto mt-3 text-sm italic p-3 rounded ">
        <h3 className="text-center underline my-3" >Admin Reply</h3>
        {singlemessage?.reply}
        <div className="flex flex-col gap-y-1 mt-5">
          <span>{singlemessage?.repliedBy?.lastName} {singlemessage?.repliedBy?.firstName} ({singlemessage?.repliedBy?.role}) </span>
          <span>{DateFormatter(singlemessage?.replyDate)}</span>
        </div>
      </div>
       )}
       {(!singlemessage.reply || !singlemessage.reply === "") && (
      <div className="my-4 w-full lg:w-[50%] mx-auto">
        <h3 className="h3 text-primary">Reply Message</h3>
        <AlertMessage alert={message}/>
        <form action="#" onSubmit={handleSubmit}>
          <div className="bg-white">
            <EnhancedInput
              type="email"
              value={singlemessage?.email}
              name="email"
              disabled
            />
          </div>

          <EnhancedTextArea
            value={reply}
            name="reply"
            onChange={(e) => setReply(e.target.value)}
          />

          <button
            type="submit"
            className="btn bg-blue-500 btn-primary py-2 rounded-sm mx-auto"
          >
            {isloading ? "Please wait..." : "Reply Message"}
          </button>
        </form>
      </div>
      )}
    </div>
  );
};

export default SingleContactMessage;
