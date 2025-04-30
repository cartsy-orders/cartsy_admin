"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast';


type LogoutResponse = {
  logout: {
    id: string;
    userId: string;
    token: string;
    expiresAt: string | null;
    createdAt: string;
  };
  message: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<LogoutResponse>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);


  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_DEV_BASE_URL}/admin-auth/login`, {
        email,
        password,
      });

      if (response.data && response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        document.cookie = `authToken=${response.data.token}; path=/; max-age=${60 * 60 * 24 * 7}`; // 1 week
        setIsAuthenticated(true);
        toast.success('Login successful', { duration: 3000 });
      }
      return response.data;

    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.post<LogoutResponse>(`${process.env.NEXT_PUBLIC_DEV_BASE_URL}/admin-auth/logout`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      localStorage.removeItem("authToken");
      document.cookie = 'authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      setIsAuthenticated(false);

      return response.data;

    } catch (error) {
      console.error('Logout error:', error);

      localStorage.removeItem("authToken");
      document.cookie = 'authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      setIsAuthenticated(false);

      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}