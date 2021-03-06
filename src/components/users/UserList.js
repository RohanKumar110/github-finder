import UserItem from "./UserItem";
import React, { useContext } from "react";
import Spinner from "../layouts/Spinner";
import GithubContext from "../../context/github/GithubContext";

function UserList(props) {
  const githubContext = useContext(GithubContext);
  const { loading, users } = githubContext;
  if (loading) return <Spinner />;
  return (
    <div style={userStyle}>
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
}

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
  gap: "1rem",
};

export default UserList;
