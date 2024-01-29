import Homepage from "./components/homepage";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../src/components/App.css';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./components/login";
import ClassPage from "./components/class";
import AboutPage from "./components/about";
import AssignmentPage from "./components/assignment";
import StudentRegistration from "./components/registrations/student_registration";
import ErrorPage from "./components/Error";
import NavbarPage from "./components/widgets/navbar";
import TeacherRegistation from "./components/registrations/teacher_registration";
import TeacherLogin from "./components/teacher_login";
function App() {
  return (
   <BrowserRouter>
   <NavbarPage/>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="/class" element={<ClassPage/>}/>
      <Route path="/about" element={<AboutPage/>}/>
      <Route path="/assignments" element={<AssignmentPage/>}/>
      <Route path="/studentregister" element = {<StudentRegistration/>}/>
      <Route path ="/registerteacher" element = {<TeacherRegistation/>} />
      <Route path ="/loginteacher" element = {<TeacherLogin/>} />
      <Route path ="*" element = {<ErrorPage/>} />
    </Routes>
   </BrowserRouter>
  );
}
export default App;
