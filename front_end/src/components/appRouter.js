import { BrowserRouter as Router, Route} from "react-router-dom";
import Home from './homepage';
import Login from './login'; 

const AppRouter = () => {
  return (
    <Router>
      <Route path="/login" exact component={Login} />
      <Route path="/home" exact component={Home} />
    </Router>
  );
};

export default AppRouter;