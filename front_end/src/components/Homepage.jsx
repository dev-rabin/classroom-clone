import React from "react";
import "../index.css";
import MyClassesPage from "../components/Class/EnrolledClasses";
import TeachingClassesPage from "../components/Class/TeachingClasses";

function Homepage() {
    return (
        <>
          
                    <MyClassesPage />
                   <TeachingClassesPage/>
          
        </>
    );
}

export default Homepage;
