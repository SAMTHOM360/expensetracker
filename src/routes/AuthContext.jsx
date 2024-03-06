import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const getAuthenticateKey = () => {
  const loginData = JSON.parse(sessionStorage.getItem("loginData"));
  const token = loginData?.token || null;

  return token;
};

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(!!getAuthenticateKey());

  useEffect(() => {
    if (!getAuthenticateKey()) {
      setAuthenticated(false);
    }
  }, [authenticated]);

  const logout = () => {
    setAuthenticated(false);
    sessionStorage.removeItem("loginData");
  };

  console.log("authenticated", authenticated);

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
