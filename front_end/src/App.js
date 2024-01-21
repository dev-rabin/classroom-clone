import Homepage from "./components/homepage";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../src/components/App.css';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./components/login";
import ClassPage from "./components/class";
import AboutPage from "./components/about";
import AssignmentPage from "./components/assignment";
import UserRegistration from "./components/user_registration";

function App() {
  return (


   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="/class" element={<ClassPage/>}/>
      <Route path="/about" element={<AboutPage/>}/>
      <Route path="/assignments" element={<AssignmentPage/>}/>
      <Route path="/register" element = {<UserRegistration/>}/>
    </Routes>
   </BrowserRouter>
  );
}
export default App;
