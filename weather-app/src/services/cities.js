import { ajax } from "../Tools/ajax";

export const getCities = async countryCode => {
    const optionsRequest = {
        method: "GET",
        url: 'https://spott.p.rapidapi.com/places/autocomplete',
        params: {
            limit: '30',
            country: countryCode ?? 'US',
            type: 'CITY',
          },

          headers: {
            'X-RapidAPI-Key': 'dae0eb4935msh077d27c74ad9109p1f0861jsnd79a1bd77419',
            'X-RapidAPI-Host': 'spott.p.rapidapi.com'
          }

    };
    return await ajax(optionsRequest);
}