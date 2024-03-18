import Homepage from "./components/Homepage";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../src/components/App.css';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./components/Login";
import AboutPage from "./components/About";
import UserRegistration from "./registrations/User_registration";
import ErrorPage from "./components/Error";
import NavbarPage from "./widgets/Navbar";
import Logout from "./components/LogOut";
import JoinClass from "./components/Class/JoinClass";
import SubmissionPage from "./components/Assignment/Submissions";
import CreateClassPage from "./components/Class/CreateClass";
import EnrolledClassesPage from "./components/Class/EnrolledClasses";
import Footer from "./widgets/Footer";
import ClassDetails from "./components/Class/CLassDetails";
import ClassWork from "./components/Class/ClassWork";
import CreateAssignmentsPage from "./components/Assignment/CreateAssignments";

function App() {
  return (
   <BrowserRouter>
   <NavbarPage/>
    <Routes>
      {/* Home Route */}
      <Route path="/" element={<Homepage/>}/>

      {/* Auth Routes */}
      <Route path="login" element={<Login/>}/>
      <Route path="/logout" element = {<Logout/>}/>
      
      {/* Class Routes */}
        <Route path="/classes" element={<EnrolledClassesPage/>}/>
        <Route path="/class/:classId" element={<ClassDetails/>}/>
        <Route path="/joinclass" element={<JoinClass/>}/>
        <Route path="/createclass" element={<CreateClassPage/>}/>
        <Route path="/:classId/classwork" element={<ClassWork/>}/>

      {/* Navigation Routes */}
      <Route path="/about" element={<AboutPage/>}/>
      <Route path="/createassignment/:classId" element={<CreateAssignmentsPage/>}/>
      <Route path="/register" element = {<UserRegistration/>}/>
      <Route path="/submissions" element={<SubmissionPage/>}/>
      <Route path ="*" element = {<ErrorPage/>} />
    </Routes>
    <Footer/>
   </BrowserRouter>
  );
}
export default App;
