import axios from "axios";

export function getCratePrice(crateName) {
   const baseUrl = "https://steamcommunity.com/market/priceoverview/";
   const params = new URLSearchParams({
      appid: 730, // CS:GO / CS2 için App ID
      currency: 1, // 1 = USD
      market_hash_name: crateName
   });

   const url = `${baseUrl}?${params.toString()}`;

   return axios
      .get(url)
      .then((res) => {
         if (res.data.success) {
            return {
               name: crateName,
               ...res.data
            };
         } else {
            throw new Error("Steam API request was not successful.");
         }
      })
      .catch((err) => {
         console.error("Error fetching crate price:", err.message);
         return null;
      });
}