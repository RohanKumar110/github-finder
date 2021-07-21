import UserItem from "./UserItem";
import React from "react";
import Spinner from "../layouts/Spinner";
import PropTypes from "prop-types";

function UserList(props) {
  const { loading, users } = props;
  if (loading) return <Spinner />;
  return (
    <div style={userStyle}>
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
}

UserList.protoTypes = {
  loading: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
};

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
  gap: "1rem",
};

export default UserList;
