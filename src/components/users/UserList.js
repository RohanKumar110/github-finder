import React, { useContext } from "react";
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner";
import GithubContext from "../../context/github/GithubContext";

function UserList() {
  const { users, isLoading } = useContext(GithubContext);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
      {users !== null &&
        users.map((user) => <UserItem key={user.id} user={user} />)}
    </div>
  );
}

export default UserList;
