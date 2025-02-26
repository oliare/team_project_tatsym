import axios from "axios";
import { API_URL } from "../api"; 

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });

        if (response.data?.token) {
            setAuthToken(response.data.token);
            return response.data;
        }

        throw new Error("No token received");
    } catch (error) {
        console.error("Login error");
        throw error;
    }
};

export const setAuthToken = (token: string | null) => {
    if (token) {
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
    }
};
