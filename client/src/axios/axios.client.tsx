import axios from "axios";

// Create axios client
const axiosClient = axios.create({
    baseURL: `http://localhost:3001`,
    withCredentials: true,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

// Interceptor for API calls
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        let res = error.response;

        if (res.status == 401) {
            console.log(res);
        } else if (res.status === 400) {
            console.log(res);
        } else if (res.status === 500) {
            console.log(res);
        }

        return Promise.reject(error);
    }
);

export default axiosClient;
