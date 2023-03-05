import axiosClient from "./axios.client";
import { AxiosResponse } from "axios";

// Logs in a user to the App
export const loginUser = (data: { username: string; password: string }): Promise<AxiosResponse<any, any>> =>
    axiosClient.post("/auth/login", data);
