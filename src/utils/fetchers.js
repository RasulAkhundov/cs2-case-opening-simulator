import axiosClient from "@/helpers/apiClient";
import i18next from "i18next";

// get All Skins
export function getAllSkins() {
   return axiosClient
      .get("skins.json")
      .then((res) => {
         return res.data;
      })
      .catch((err) => {
         return err.response;
      });
}

// get All Crates
export function getAllCrates() {
   return axiosClient
   .get("crates.json")
   .then((res) => {
      return res.data;
   })
   .catch((err) => {
      return err.response;
   })
}