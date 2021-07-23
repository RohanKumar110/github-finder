import React, { useState, useContext } from "react";
import GithubContext from "../../context/github/GithubContext";
import AlertContext from "../../context/alert/AlertContext";

function Search() {
  const [query, setQuery] = useState("");

  const githubContext = useContext(GithubContext);
  const { users, searchUsers, clearUsers } = githubContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const handleChange = (e) => setQuery(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query === "") {
      setAlert("Please enter something", "light");
      return;
    }
    searchUsers(query);
    setQuery("");
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          placeholder="Search Users"
          value={query}
          onChange={handleChange}
        />
        <button className="btn btn-dark btn-block">Search</button>
      </form>
      {users.length > 0 && (
        <button className="btn btn-light btn-block my-1" onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
}

export default Search;
