import axios from "axios";

// Locale parametresi alan bir base URL fonksiyonu
const getBaseURL = (locale = "en") => {
  return `${process.env.NEXT_PUBLIC_API_BASE_URL}${locale}/`;
};

// axiosClient'ı dinamik olarak oluşturan fonksiyon
export function createAxiosClient(locale = "en") {
  return axios.create({
    baseURL: getBaseURL(locale),
    headers: {
      "Content-Type": "application/json",
    },
  });
}