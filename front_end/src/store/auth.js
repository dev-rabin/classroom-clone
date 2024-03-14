import { createContext, useContext, useEffect, useState , } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
 
  const isLoggedIn = !!token;
  console.log("User login",isLoggedIn);
  const storeToken = (serverToken) => {
    console.log("Server token:", serverToken);
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  const logOutUser = () => {
    setToken("");
    localStorage.removeItem("token");
  };
  const getUserData = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/user", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        setUser(responseData.data);
        console.log(responseData.data);
      } else {
        setUser(null); // Reset user data if unauthorized or other error
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null); // Reset user data on fetch error
    }
  };

 

  useEffect(() => {
    if (isLoggedIn) {
      getUserData();
    } else {
      setUser(null);
    }
  }, [isLoggedIn]);


  return (
    <AuthContext.Provider value={{ storeToken, logOutUser, isLoggedIn, user}}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the provider");
  }
  return authContextValue;
};