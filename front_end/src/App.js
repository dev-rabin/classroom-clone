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
import ErrorPage from "./components/Error";
import Logout from "./components/logOut";
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
      <Route path ="/logout" element = {<Logout/>} />
      <Route path ="*" element = {<ErrorPage/>} />
    </Routes>
   </BrowserRouter>
  );
}
export default App;
