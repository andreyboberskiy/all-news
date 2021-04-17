import axios from "axios";

const apiKey = "6f67304732a74d26926d1a97cdd56e45";

const url = `http://newsapi.org/v2/`;

export const baseAxiosInstance = axios.create({
    baseURL: url,
});
