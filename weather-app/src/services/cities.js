import axios from "axios";

export const getCities = async (countryCode) => {
  const optionsRequest = {
    method: "GET",
    url: "https://spott.p.rapidapi.com/places/autocomplete",
    params: {
      limit: "30",
      country: countryCode || "US",
      type: "CITY",
    },
    headers: {
      'x-rapidapi-key': 'dae0eb4935msh077d27c74ad9109p1f0861jsnd79a1bd77419',
      'x-rapidapi-host': 'spott.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(optionsRequest);
    return response.data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
};
