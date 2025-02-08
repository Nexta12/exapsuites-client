import { AxiosError } from "axios";

export const ErrorFormatter = (error) => {
  const axiosError = error instanceof AxiosError ? error : null;

  const errorMessage =
    axiosError && typeof axiosError.response?.data === "string"
      ? axiosError.response.data
      : "Internal Server Error";

  return errorMessage;
};
