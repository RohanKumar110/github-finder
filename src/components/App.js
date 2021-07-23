import "../styles/App.css";
import User from "./users/User";
import About from "./pages/About";
import Search from "./users/Search";
import Alert from "./layouts/Alert";
import Navbar from "./layouts/Navbar";
import UserList from "./users/UserList";
import { Switch, Route } from "react-router-dom";
import React, { Fragment } from "react";
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
              <Route
                exact
                path="/"
                render={(_) => (
                  <Fragment>
                    <Search />
                    <UserList />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />

              <Route
                exact
                path="/user/:login"
                render={(props) => <User {...props} />}
              />
            </Switch>
          </div>
        </div>
      </AlertState>
    </GithubState>
  );
}

export default App;
