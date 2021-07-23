import Search from "../users/Search";
import React, { Fragment } from "react";
import UserList from "../users/UserList";

function Home() {
  return (
    <Fragment>
      <Search />
      <UserList />
    </Fragment>
  );
}

export default Home;
