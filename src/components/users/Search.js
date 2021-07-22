import React, { Component } from "react";
import PropTypes from "prop-types";

class Search extends Component {
  state = {
    query: "",
  };

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
  };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();
    const { query } = this.state;
    if (query === "") {
      this.props.setAlert("Please enter something", "light");
      return;
    }
    this.props.searchUsers(query);
    this.setState({ query: "" });
  };

  render() {
    const { query } = this.state;
    const { clearUsers, showClear } = this.props;
    return (
      <div>
        <form className="form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="query"
            placeholder="Search Users"
            value={query}
            onChange={this.handleChange}
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
}

export default Search;
