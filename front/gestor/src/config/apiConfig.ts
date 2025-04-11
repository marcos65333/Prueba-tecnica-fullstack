import axios from "axios";
import { toast } from "react-toastify";
import { IApiResponse } from "../interfaces/apiResponse";

type ApiContentType = "application/json" | "multipart/form-data";

// Obtiene los headers con el token
function getHeaders(contentType: ApiContentType = "application/json"): Record<string, string> {
  return {
    //Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": contentType,
  };
}

// Función genérica para manejar errores
function handleApiError<T>(error: unknown, defaultMessage: string): IApiResponse<T> {
  let message = defaultMessage;

  if (axios.isAxiosError(error)) {
    message = error.response?.data?.message || defaultMessage;
  }

  toast.error(message);
  return { success: false, message };
}



export { getHeaders, handleApiError };