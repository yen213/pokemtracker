import axiosClient from "./axios.client";
import { AxiosResponse } from "axios";

// Logs in a user to the App
export const loginUser = (data: { username: string; password: string }): Promise<AxiosResponse<any, any>> =>
    axiosClient.post("/auth/login", data);

// Logs user out of the app and invalidates session
export const logoutUser = (): Promise<AxiosResponse<any, any>> => axiosClient.post("/auth/logout");

// Checks session to see if an user is logged in
export const getLoggedInUser = (): Promise<AxiosResponse<any, any>> => axiosClient.get("/auth/user");
