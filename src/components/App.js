import "../styles/App.css";
import axios from "axios";
import User from "./users/User";
import About from "./pages/About";
import Search from "./users/Search";
import Alert from "./layouts/Alert";
import Navbar from "./layouts/Navbar";
import UserList from "./users/UserList";
import { Switch, Route } from "react-router-dom";
import React, { Component, Fragment } from "react";

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
  };

  // Search Github Users
  searchUsers = async (query) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${query}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: res.data.items, loading: false });
  };

  // Get single github user by username
  getUser = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ user: res.data, loading: false });
  };

  // Clear users from state
  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  // Set Alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => {
      this.setState({ alert: null });
    }, 3000);
  };

  render() {
    const { loading, alert, user, users } = this.state;
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
                    setAlert={this.setAlert}
                    searchUsers={this.searchUsers}
                    clearUsers={this.clearUsers}
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
                  getUser={this.getUser}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
