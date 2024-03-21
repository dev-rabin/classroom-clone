import Homepage from "./components/Homepage";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../src/components/App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import AboutPage from "./components/About";
import UserRegistration from "./registrations/User_registration";
import ErrorPage from "./components/Error";
import NavbarPage from "./widgets/Navbar";
import Logout from "./components/LogOut";
import JoinClass from "./components/Class/JoinClass";
import SubmissionPage from "./components/Assignment/Submissions";
import CreateClassPage from "./components/Class/CreateClass";
import Footer from "./widgets/Footer";
import ClassDetails from "./components/Class/TeachingClasses/CLassDetails";
import CreateAssignmentsPage from "./components/Assignment/CreateAssignments";
import ClassWork from "./components/Class/TeachingClasses/ClassWork";
import ClassGrades from "./components/Class/TeachingClasses/ClassGrades";
import ClassPeople from "./components/Class/TeachingClasses/ClassPeople";
import EnrolledClassDetails from "./components/Class/EnrolledClasses/EnrolledClassDetails";
import EnrollClassWork from "./components/Class/EnrolledClasses/EnrollClassWork";
import EnrollClassPeople from "./components/Class/EnrolledClasses/EnrollClassPeople";
import AssignmentDetails from "./components/Assignment/AssignmentDetails";

function App() {
  return (
    <BrowserRouter>
      <NavbarPage />
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Homepage />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        {/* Teaching Class Routes */}
        <Route path="/teachingclass/:classId" element={<ClassDetails />}>
          <Route path="classwork" element={<ClassWork />} />
          <Route path="people" element={<ClassPeople />} />
          <Route path="grades" element={<ClassGrades />} />
        </Route>
        
        {/* Enrolled Class Routes */}
        <Route path="/enrolledclass/:classId" element={<EnrolledClassDetails />}>
        <Route path="classwork" element={<EnrollClassWork />} />
        <Route path="people" element={<EnrollClassPeople />} />
        </Route>

        {/* Class Routes */}
        <Route path="/joinclass" element={<JoinClass />} />
        <Route path="/createclass" element={<CreateClassPage />} />
        <Route path="/createassignment/:classId" element={<CreateAssignmentsPage />} />
        <Route path="/enrollclass/assignmentdetails/:assignmentId" element={<AssignmentDetails/>}/>

        {/* Navigation Routes */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register" element={<UserRegistration />} />
        <Route path="/submissions" element={<SubmissionPage />} />

        {/* Error Route */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
