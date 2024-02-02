import React from "react";
import Cards from "./widgets/card";
import "../index.css";

function Homepage() {
    return (
        <>
            <h1 className="text-center my-2">My Classes</h1>
            <div className="container d-flex justify-content-around flex-wrap flex-row">
                <div className="col-lg-3 col-md-3 col-sm-6 col-12 my-2 border d-flex  flex-row">
                    <Cards />
                </div>
            </div>
        </>
    );
}

export default Homepage;
