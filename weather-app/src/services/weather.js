import { ajax } from "../Tools/ajax";

export const getCityWeather = async city => {
    const optionsRequest = {
        method: "GET",
        url: 'https://api.openweathermap.org/data/2.5/weather',
        params: {
            q: city,
            appid: "4488adc2e2b506afd28d2f52c9a51691",
            units: 'metric',
        },

    };
    return await ajax(optionsRequest);
}