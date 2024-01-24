import "react-bootstrap" ;
import { NavLink } from 'react-router-dom';

function ErrorPage () {
return (
    <>
       <div className="container text-center">
       <h1 className=' fs-5'>Page Not Found</h1>
        <NavLink to= "/">Go to back</NavLink>
       </div>
    </>
)
}

export default ErrorPage;