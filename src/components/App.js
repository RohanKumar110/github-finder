import "../styles/App.css";
import axios from "axios";
import User from "./users/User";
import About from "./pages/About";
import Search from "./users/Search";
import Alert from "./layouts/Alert";
import Navbar from "./layouts/Navbar";
import UserList from "./users/UserList";
import { Switch, Route } from "react-router-dom";
import React, { useState, Fragment } from "react";

function App() {
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [repos, setRepos] = useState([]);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  // Search Github Users
  const searchUsers = async (query) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/search/users?q=${query}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setLoading(false);
    setUsers(res.data.items);
  };

  // Get single github user by username
  const getUser = async (username) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setLoading(false);
    setUser(res.data);
  };

  // Get users repos
  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc  &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setLoading(false);
    setRepos(res.data);
  };

  // Clear users from state
  const clearUsers = () => {
    setLoading(false);
    setUsers([]);
  };

  // Set Alert
  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <Alert alert={alert} />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Fragment>
                <Search
                  showAlert={showAlert}
                  searchUsers={searchUsers}
                  clearUsers={clearUsers}
                  showClear={users.length > 0 ? true : false}
                />
                <UserList loading={loading} users={users} />
              </Fragment>
            )}
          />
          <Route exact path="/about" component={About} />

          <Route
            exact
            path="/user/:login"
            render={(props) => (
              <User
                {...props}
                loading={loading}
                user={user}
                repos={repos}
                getUser={getUser}
                getUserRepos={getUserRepos}
              />
            )}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;
