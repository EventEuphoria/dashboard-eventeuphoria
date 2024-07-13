import { register } from "module";
import apiClient from "./apiClient";

export const login = async (email: string, password: string) => {
    const response = await apiClient.post("/login", { email, password });
    return response.data;
};

export const getProfile = async (token: string) => {
        const response = await apiClient.get("/profile", { headers: { 
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const logout = async (token: string) => {
    const response = await apiClient.post("/logout", {}, 
        { 
            headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

const api = [
    register,
    login,
    getProfile,
    logout,
];

export default api;