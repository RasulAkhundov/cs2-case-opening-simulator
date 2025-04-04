import axios from "axios";

// i18n'dən istifadəçi dilini alırıq
import i18next from "i18next";

// Burada default dil təyin olunur (fallback üçün)
const getBaseURL = () => {
  const lang = i18next.language || "en"; // fallback language
  return `${process.env.NEXT_PUBLIC_API_BASE_URL}${lang}/`;
};

const axiosClient = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;