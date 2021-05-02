import axios from "axios";

const url = `https://bank.gov.ua/NBUStatService/v1/statdirectory/`;

export const baseAxiosInstance = axios.create({
  baseURL: url,
});

const exchangePageService = {
  getDataByDay(date) {
    return baseAxiosInstance
      .get(`exchange?date=${date}&json`)
      .then(({ data }) => data);
  },
};
export default exchangePageService;
