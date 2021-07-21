import "../styles/App.css";
import React, { Component } from "react";
import Navbar from "./layouts/Navbar";
import UserList from "./users/UserList";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <UserList />
        </div>
      </div>
    );
  }
}

export default App;
