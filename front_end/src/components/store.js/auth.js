import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token,setToken] = useState(localStorage.getItem("token"));
  const storeToken = (serverToken) => {
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !! token;
  console.log("User Logged in",isLoggedIn);

  const logOutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  }
  return (
    <AuthContext.Provider value={{ storeToken,logOutUser,isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

//Create custom hook
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the provider");
  }
  return authContextValue;
};
