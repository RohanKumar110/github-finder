import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import RepoList from "../repos/RepoList";
import Spinner from "../layouts/Spinner";
import React, { Component, Fragment } from "react";

class User extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    repos: PropTypes.array.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { login } = this.props.match.params;
    this.props.getUser(login);
    this.props.getUserRepos(login);
  }

  render() {
    const { loading, user, repos } = this.props;
    const {
      name,
      login,
      company,
      avatar_url,
      location,
      bio,
      blog,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable,
    } = user;
    if (loading) return <Spinner />;
    return (
      <Fragment>
        <Link to="/" className="btn btn-light">
          Back To Search
        </Link>
        Hireable:{" "}
        {hireable ? (
          <i className="fas fa-check text-success" />
        ) : (
          <i className="fas fa-times-circle text-danger" />
        )}
        <div className="card grid-2">
          <div className="all-center">
            <img
              src={avatar_url}
              alt={name}
              className="round-img"
              style={{ width: "150px" }}
            />
            <h1>{name}</h1>
            <p>Location: {location}</p>
          </div>
          <div>
            {bio && (
              <Fragment>
                <h3>Bio</h3>
                <p>{bio}</p>
              </Fragment>
            )}
            <a
              href={html_url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-dark my-1"
            >
              Github Profile
            </a>
            <ul>
              <li>
                {login && (
                  <Fragment>
                    <strong>Username: </strong>
                    {login}
                  </Fragment>
                )}
              </li>
              <li>
                {company && (
                  <Fragment>
                    <strong>Company: </strong>
                    {company}
                  </Fragment>
                )}
              </li>
              <li>
                {blog && (
                  <Fragment>
                    <strong>Website: </strong>
                    {blog}
                  </Fragment>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className="card text-center">
          <div className="badge badge-primary">Followers: {followers}</div>
          <div className="badge badge-success">Followings: {following}</div>
          <div className="badge badge-light">Public Repos: {public_repos}</div>
          <div className="badge badge-dark">Public Gists: {public_gists}</div>
        </div>
        <RepoList repos={repos} />
      </Fragment>
    );
  }
}

export default User;
