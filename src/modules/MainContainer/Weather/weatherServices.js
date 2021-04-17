import axios from "axios";

const url = `https://api.openweathermap.org/data/2.5/`;

export const baseAxiosInstance = axios.create({
    baseURL: url,
});

const key = "3552f8596edfc7ae821726bca8ebcea8";

const weatherServices = {
    getCurrentWeather(lat, lon) {
        return baseAxiosInstance
            .get(
                `weather?lat=${lat}&lon=${lon}&units=metric&lang=ua&appid=${key}`
            )
            .then(({ data }) => data);
    },
};

export default weatherServices;
