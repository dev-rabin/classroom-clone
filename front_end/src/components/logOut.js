import { useEffect } from "react";
import { useAuth } from "./store.js/auth";
import { Navigate } from "react-router-dom";

const Logout = () =>{
    const {logOutUser} = useAuth();
    useEffect(()=>{
        logOutUser();
    },[])
    return <Navigate to= "/login"/> 
}

export default Logout;