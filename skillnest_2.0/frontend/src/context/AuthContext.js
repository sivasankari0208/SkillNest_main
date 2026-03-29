import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = sessionStorage.getItem("skillnest_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const register = async ({ name, email, password, skill, role }) => {
    const res = await axios.post("http://localhost:5000/api/users/register", {
      name, email, password, skill, role,
    });
    const loggedIn = res.data.user;
    setUser(loggedIn);
    sessionStorage.setItem("skillnest_user", JSON.stringify(loggedIn));
    return loggedIn;
  };

  const login = async ({ email, password }) => {
    const res = await axios.post("http://localhost:5000/api/users/login", {
      email, password,
    });
    const loggedIn = res.data.user;
    setUser(loggedIn);
    sessionStorage.setItem("skillnest_user", JSON.stringify(loggedIn));
    return loggedIn;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("skillnest_user");
  };

  const isProvider = user?.role === "provider";
  const isCustomer = user?.role === "customer";

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isProvider, isCustomer }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
