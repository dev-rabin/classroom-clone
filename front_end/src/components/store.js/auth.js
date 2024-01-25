import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [student, setStudent] = useState("");
  const storeToken = (serverToken) => {
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token;
  console.log("User Logged in", isLoggedIn);

  const logOutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  const getStudentData = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/student", {
        method: "GET",
        headers: {
          authorization: token,
        },
      });
      if (response.ok) {
        const data = await response.json(); // Await the response.json() promise
        console.log("Response data :", data);
        setStudent(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getStudentData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ storeToken, logOutUser, isLoggedIn, student }}
    >
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
