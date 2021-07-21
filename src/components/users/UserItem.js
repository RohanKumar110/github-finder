import React, { Component } from "react";
import PropTypes from "prop-types";

class UserItem extends Component {
  static protoTypes = {
    user: PropTypes.object.isRequired,
  };

  render() {
    const { login, avatar_url, html_url } = this.props.user;
    return (
      <div className="card text-center">
        <img
          src={avatar_url}
          alt={login}
          className="round-img"
          style={{ width: "60px" }}
        />
        <h3>{login}</h3>
        <a
          href={html_url}
          className="btn btn-dark btn-sm my-1"
          target="_blank"
          rel="noreferrer"
        >
          More
        </a>
      </div>
    );
  }
}

export default UserItem;
