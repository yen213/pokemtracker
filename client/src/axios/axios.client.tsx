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

// Intercepts all API calls made with Axios
axiosClient.interceptors.response.use(
    (response) => {
        if (response.data) {
            if (response.status >= 200 && response.status < 300) {
                return response;
            }
        }

        // Reject non-200 responses
        return Promise.reject(response);
    },
    (error) => Promise.reject(error)
);

export default axiosClient;
