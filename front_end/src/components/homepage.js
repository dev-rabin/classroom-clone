import NavbarPage from "./navbar";
import UserRegistration from "./user_registration";
import "../index.css"

function Homepage() {
    return (
        <>
            <NavbarPage />
            <h1>Homepage</h1>
            <UserRegistration />
        </>
    )
}

export default Homepage;