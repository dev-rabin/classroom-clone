import React from "react";
import MyClassesPage from "./EnrolledClasses";
import "../index.css";
import TeachingClassesPage from "./TeachingClasses";

function Homepage() {
    return (
        <>
          
                    <MyClassesPage />
                    <TeachingClassesPage />
          
        </>
    );
}

export default Homepage;
