import React, { useState } from "react";
import PropTypes from "prop-types";

function Search(props) {
  const [query, setQuery] = useState("");
  const { clearUsers, showClear } = props;

  const handleChange = (e) => setQuery(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query === "") {
      props.showAlert("Please enter something", "light");
      return;
    }
    props.searchUsers(query);
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
      {showClear && (
        <button className="btn btn-light btn-block my-1" onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
}

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  showAlert: PropTypes.func.isRequired,
};

export default Search;
