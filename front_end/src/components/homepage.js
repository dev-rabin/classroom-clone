import NavbarPage from "./widgets/navbar";
import "../index.css"
import Cards from "./widgets/card";
import "react-bootstrap";

function Homepage() {
    return (
        <>
            <NavbarPage />
            <h1 className="text-center my-2">Classes</h1>
            <div className="container column-gap-1 p-3 d-flex justify-content-between flex-wrap">
            <div className="col-lg-3 col-md-3 col-sm-5 col-12 my-2"><Cards/></div>
            <div className="col-lg-3 col-md-3 col-sm-5 col-12 my-2"><Cards/></div>
            <div className="col-lg-3 col-md-3 col-sm-5 col-12 my-2"><Cards/></div>
            <div className="col-lg-3 col-md-3 col-sm-5 col-12 my-2"><Cards/></div>
            <div className="col-lg-3 col-md-3 col-sm-5 col-12 my-2"><Cards/></div>
            <div className="col-lg-3 col-md-3 col-sm-5 col-12 my-2"><Cards/></div>
            </div>
        </>
    )
}

export default Homepage;