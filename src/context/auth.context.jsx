import { createContext, useContext } from "react";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import userService from "../service/userService";

const TOKEN_KEY = "token";
export const authContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem(TOKEN_KEY));
  const refreshUser = () => {
    const decodeUser = getUser();
    setUser(decodeUser)
    return user
  };

  const login = async (credentials) => {
    const res = await userService.login(credentials);
    refreshUser();
    setTimeout(() => {
      window.open("/projeto-final-curso", "_self")

    }, 3000);
    return res;
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    refreshUser();
  };

  function getJWT() {
    return localStorage.getItem(TOKEN_KEY);
  }
  function getUser() {
    try {
      const token = getJWT();
      return jwtDecode(token);
    } catch {
      return null;
    }
  }

  return (
    <authContext.Provider
      value={{
        user,
        login,
        logout,
        getUser,
        refreshUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
export const useAuth = () => useContext(authContext);
