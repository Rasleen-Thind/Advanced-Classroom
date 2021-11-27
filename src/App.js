import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./screens/Home";
import Dashboard from "./screens/Dashboard";
import Navbar from "./components/Navbar";
import Class from "./screens/Class";
import ClassNavbar from "./components/ClassNavbar";
import Classmates from "./screens/Classmates";
import ClassmatesNavbar from "./components/ClassmatesNavbar";
import Chat from './components/Chat';
import AssignmentPage from "./screens/AssignmentPage";

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/dashboard">
            <Navbar />
            <Dashboard />
          </Route>
          <Route exact path="/class/:id">
            <ClassNavbar />
            <Class />
          </Route>
          <Route exact path="/classmates">
            <ClassmatesNavbar />
            <Classmates />
          </Route>
          <Route exact path="/chat/:uid">
            <Chat />
          </Route>
          <Route exact path="/assignment/:id">
            <Navbar />
            <AssignmentPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
