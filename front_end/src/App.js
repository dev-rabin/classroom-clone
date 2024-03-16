import Homepage from "./components/Homepage";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../src/components/App.css';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./components/Login";
import AboutPage from "./components/About";
import AssignmentPage from "./components/Assignment/Assignments";
import UserRegistration from "./registrations/User_registration";
import ErrorPage from "./components/Error";
import NavbarPage from "./widgets/Navbar";
import Logout from "./components/LogOut";
import JoinClass from "./components/Class/JoinClass";
import SubmissionPage from "./components/Assignment/Submissions";
import CreateClassPage from "./components/Class/CreateClass";
import EnrolledClassesPage from "./components/Class/EnrolledClasses";
import Footer from "./widgets/Footer";

function App() {
  return (
   <BrowserRouter>
   <NavbarPage/>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="/classes" element={<EnrolledClassesPage/>}/>
      <Route path="/about" element={<AboutPage/>}/>
      <Route path="/assignments" element={<AssignmentPage/>}/>
      <Route path="/register" element = {<UserRegistration/>}/>
      <Route path="/logout" element = {<Logout/>}/>
      <Route path="/joinclass" element={<JoinClass/>}/>
      <Route path="/createclass" element={<CreateClassPage/>}/>
      <Route path="/submissions" element={<SubmissionPage/>}/>
      <Route path ="*" element = {<ErrorPage/>} />
    </Routes>
    <Footer/>
   </BrowserRouter>
  );
}
export default App;
