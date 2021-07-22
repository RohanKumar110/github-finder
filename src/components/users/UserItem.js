import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function UserItem(props) {
  const { login, avatar_url } = props.user;

  return (
    <div className="card text-center">
      <img
        src={avatar_url}
        alt={login}
        className="round-img"
        style={{ width: "60px" }}
      />
      <h3>{login}</h3>
      <Link to={`/user/${login}`} className="btn btn-dark btn-sm my-1">
        More
      </Link>
    </div>
  );
}

UserItem.protoTypes = {
  user: PropTypes.object.isRequired,
};

export default UserItem;
