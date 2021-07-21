import React, { Component } from "react";
import PropTypes from "prop-types";

class Navbar extends Component {
  static defaultProps = {
    title: "Github Finder",
    icon: "fab fa-github",
  };

  static protoTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  };

  render() {
    const { icon, title } = this.props;
    return (
      <nav className="navbar bg-primary">
        <h1>
          {title} <i className={icon} />
        </h1>
      </nav>
    );
  }
}

export default Navbar;
