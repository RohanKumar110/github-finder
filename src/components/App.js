import "../styles/App.css";
import axios from "axios";
import Alert from "./layouts/Alert";
import Search from "./users/Search";
import React, { Component } from "react";
import Navbar from "./layouts/Navbar";
import UserList from "./users/UserList";

class App extends Component {
  state = {
    users: [],
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
    const { loading, alert, users } = this.state;
    return (
      <div>
        <Navbar />
        <div className="container">
          <Alert alert={alert} />
          <Search
            setAlert={this.setAlert}
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true : false}
          />
          <UserList loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
