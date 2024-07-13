"use client";

import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/services/apiClient";
import { User } from "@/types/datatypes";
import { parseCookies, setCookie, destroyCookie } from 'nookies';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'sid';

interface AuthContextType {
    isAuthenticated: boolean;
    currentUser: User | null;
    login: (email: string, password: string) => Promise<void>;
    isLoading: boolean;
    logout: () => Promise<void>;
    getToken: () => string | null;
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const cookies = parseCookies();
        const token = cookies[TOKEN_KEY];
        if (token) {
            fetchProfile(token);
        } else {
            setIsLoading(false);
            router.push('/login');
        }
    }, []);

    const fetchProfile = async (token: string) => {
        try {
          const response = await apiClient.get('/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setCurrentUser(response.data);
          setIsAuthenticated(true);
          if (response.data.role !== 'ORGANIZER') {
            router.push('https://www.eventeuphoria.fun');
          }
        } catch (error) {
          setIsAuthenticated(false);
          removeToken();
          router.push('https://www.eventeuphoria.fun');
        } finally {
          setIsLoading(false);
        }
      }

    const login = async (email: string, password: string) => {
        try {
            const response = await apiClient.post('/login', { email, password });
            const { token } = response.data;
            setToken(token);
            await fetchProfile(token);
            router.push('dashboard/')
        } catch (error) {
            throw new Error('Failed to login');
        }
    }

    const logout = async () => {
        const cookies = parseCookies();
        const token = cookies[TOKEN_KEY];
        if (token) {
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

    const getToken = () => parseCookies()[TOKEN_KEY];

    const setToken = (token: string) => setCookie(null, TOKEN_KEY, token, { path: '/', domain: '.eventeuphoria.fun', secure: true, sameSite: 'none' });

    const removeToken = () => destroyCookie(null, TOKEN_KEY, { path: '/', domain: '.eventeuphoria.fun' });

    return (
        <AuthContext.Provider value={{ isAuthenticated, currentUser, login, logout, getToken, isLoading }}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
