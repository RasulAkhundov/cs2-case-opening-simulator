import { createAxiosClient } from "@/helpers/apiClient";

// get All Skins
export async function getAllSkins(locale) {
  const client = createAxiosClient(locale);
  try {
    const res = await client.get("skins.json", { 
      next: { revalidate: 3600 }
    });
    return res.data;
  } catch (err) {
    console.error("getAllSkins error:", err);
    return null;
  }
}

// get All Crates
export async function getAllCrates(locale) {
  const client = createAxiosClient(locale);
  try {
    const res = await client.get("crates.json", {
      next: { revalidate: 3600 }
    });
    return res.data;
  } catch (err) {
    console.error("getAllCrates error:", err);
    return null;
  }
}