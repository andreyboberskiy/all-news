import axios from "axios";

const url = `https://api.privatbank.ua/p24api/`;

export const baseAxiosInstance = axios.create({
    baseURL: url,
});
const exchangeRateServices = {
    getExchangeRates(coursId) {
        return baseAxiosInstance.get(
            `pubinfo?json&exchange&coursid=${coursId}`
        );
    },
};

export default exchangeRateServices;
