import { baseAxiosInstance } from "libs/axios/newsInstants";

const apiKey = "6f67304732a74d26926d1a97cdd56e45";

const breakingNewsServices = {
  getBreakingNews(country) {
    return baseAxiosInstance.get(
      `top-headlines?country=${country}&apiKey=${apiKey}`
    );
  },

  getNewsBySearchParams({
    query = "All",
    category = "",
    language = "",
    country = "",
  }) {
    const withChecking = (string, item) => {
      if (item.length > 0) {
        return `&${string}=${item}`;
      }
      return "";
    };

    return baseAxiosInstance.get(
      `top-headlines?q=${query}${withChecking(
        "category",
        category
      )}${withChecking("language", language)}${withChecking(
        "country",
        country
      )}&pageSize=20&apiKey=${apiKey}`
    );
  },

  getAllNewsByQuery({ query }) {
    return baseAxiosInstance.get(`everything?q=${query}&apiKey=${apiKey}`);
  },
};

export default breakingNewsServices;
