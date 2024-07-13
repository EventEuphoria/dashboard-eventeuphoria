"use client";

import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/services/apiClient";
import { User } from "@/types/datatypes";
const TOKEN_KEY = 'jwtToken';

interface AuthContextType {
    isAuthenticated: boolean;
    currentUser: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    getToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();
    
    useEffect(() => {
        const token = getToken();
        if(token){
            fetchProfile(token);
        } else {
            setIsLoading(false);
            router.push('/login');
        }
    }, []);

    const fetchProfile = async(token: string) => {
        try{
            const response = await apiClient.get('/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCurrentUser(response.data);
            setIsAuthenticated(true);
            if (response.data.role !== 'ORGANIZER') {
                router.push('/login');
            } else{
                router.push("/")
            }
        } catch( error){
            setIsAuthenticated(false);
            removeToken();
            router.push('http://localhost:3000');
        } finally {
            setIsLoading(false);
        }
    }

    const login = async (email: string, password: string) => {
        try{
            const response = await apiClient.post('/login', {email, password});
            const { token } = response.data;
            setToken(token);
            await fetchProfile(token);
            if (response.data.role === 'ORGANIZER') {
                router.push('/');
            } else {
                router.push('/login');
            }
        } catch (error) {
            throw new Error('Failed to login');
        }
    }

    const logout = async () => {
        const token = getToken();
        if(token){
            await apiClient.post('/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            removeToken();
            setIsAuthenticated(false);
            setCurrentUser(null);
            router.push('/login');
        }
    }

    const getToken = () => {
        return localStorage.getItem(TOKEN_KEY);
    }

    const setToken = (token: string) => {
        localStorage.setItem(TOKEN_KEY, token);
    }

    const removeToken = () => {
        localStorage.removeItem(TOKEN_KEY);
    }

    return(
        <AuthContext.Provider value={{ isAuthenticated, currentUser, login, logout, getToken}}>
            {!isLoading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
