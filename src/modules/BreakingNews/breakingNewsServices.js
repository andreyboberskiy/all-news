import { baseAxiosInstance } from "libs/axios/newsInstants";

const apiKey = "6f67304732a74d26926d1a97cdd56e45";

const breakingNewsServices = {
  getBreakingNews(country) {
    return baseAxiosInstance.get(
      `top-headlines?country=${country}&apiKey=${apiKey}`
    );
  },

  getNews({ query = "", category = "", language = "", country = "" }) {
    return baseAxiosInstance.get(
      `everything?q=${query}&category=${category}&language=${language}&country=${country}&apiKey=${apiKey}`
    );
  },
};

export default breakingNewsServices;
