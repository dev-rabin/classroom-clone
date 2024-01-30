import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setuser] = useState("");
  const storeToken = (serverToken) => {
    return localStorage.setItem("token", serverToken);
  };
  
  let isLoggedIn = !!token;
  console.log("User Logged in", isLoggedIn);

  const logOutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  const getUserData = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/user", {
        method: "GET",
        headers: {
          authorization: token,
        },
      });
      if (response.ok) {
        const data = await response.json(); // Await the response.json() promise
        console.log("Response data :", data);
        setuser(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ storeToken, logOutUser, isLoggedIn, user}}>
      {children}
    </AuthContext.Provider>
  );
};

// Create custom hook
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the provider");
  }
  return authContextValue;
};
