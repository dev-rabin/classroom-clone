import { createContext, useContext, useEffect, useState , } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [myClasses , setMyClasses] = useState(null);
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
        const data = await response.json();
        setUser(data.userData);
        console.log("user :", user);
        console.log(data.userData);
      } else {
        setUser(null); // Reset user data if unauthorized or other error
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null); // Reset user data on fetch error
    }
  };

  const myCreatedClasses = async() =>{
    if (!user) {
      console.log("User is null");
      return 
    }
    const userId = user.userId;
    if (userId == null || userId.length === 0) {
      logOutUser();
    }
   else {
    const bodyJson = { userId: user.userId};
    try {
      const response = await fetch("http://localhost:4000/api/myCreatedClasses" , {
        method : "POST",
       headers : {
        "Content-Type": "application/json" 
       },
       body : JSON.stringify(bodyJson)
      });
      if (response.ok) {
        const myClassesData = await response.json();
        setMyClasses(myClassesData);
      }
    } catch (error) {
      console.error(error);
    }
   }
  }

  useEffect(() => {
    if (isLoggedIn) {
      getUserData();
    } else {
      setUser(null); // Reset user data if not logged in
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (user) {
      myCreatedClasses();
      console.log("useEffect : user is calling mycreateclass");
    } else {
      console.log("useEffect : user is null");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ storeToken, logOutUser, isLoggedIn, user, myClasses }}>
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
