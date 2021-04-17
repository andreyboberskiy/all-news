import axios from "axios";

const apiKey = "Xi50-0YrQy5tzVqvKXF1pHAJ93yL35brpKd6NCtHgKk";

const baseAxiosInstance = axios.create({
    baseURL: `https://api.unsplash.com/`,
});

const dayPhotoSevices = {
    getDayPhoto() {
        return baseAxiosInstance.get(`photos/random?client_id=${apiKey}`);
    },
};

export default dayPhotoSevices;
