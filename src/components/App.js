import React from "react";
import "../styles/App.css";
import User from "./users/User";
import Home from "./pages/Home";
import About from "./pages/About";
import Alert from "./layouts/Alert";
import Navbar from "./layouts/Navbar";
import NotFound from "./pages/NotFound";
import { Switch, Route } from "react-router-dom";
import GithubState from "../context/github/GithubState";
import AlertState from "../context/alert/AlertState";

function App() {
  return (
    <GithubState>
      <AlertState>
        <div>
          <Navbar />
          <div className="container">
            <Alert />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={(props) => <User {...props} />}
              />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </AlertState>
    </GithubState>
  );
}

export default App;
