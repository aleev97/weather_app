import axios from "axios";

export const getCountries = async () => {
  const optionsRequest = {
    method: "GET",
    url: "https://restcountries.com/v3.1/all"
  };

  try {
    const response = await axios.request(optionsRequest);
    return response.data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};
