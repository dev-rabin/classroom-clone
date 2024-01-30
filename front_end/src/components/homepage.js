import "../index.css"
import Cards from "./widgets/card";
import "react-bootstrap";
function Homepage() {
    return (
        <>
            <h1 className="text-center my-2">Classes</h1>
            <div className="container column-gap-1 d-flex justify-content-around flex-wrap">
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