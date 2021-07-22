import React from "react";
import RepoItem from "./RepoItem";
import PropTypes from "prop-types";

function RepoList({ repos }) {
  return repos.map((repo) => <RepoItem repo={repo} key={repo.id} />);
}

RepoList.propTypes = {
  repos: PropTypes.array.isRequired,
};

export default RepoList;
