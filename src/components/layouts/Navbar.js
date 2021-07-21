import React from "react";
import PropTypes from "prop-types";

function Navbar(props) {
  const { icon, title } = props;
  return (
    <nav className="navbar bg-primary">
      <h1>
        {title} <i className={icon} />
      </h1>
    </nav>
  );
}

Navbar.defaultProps = {
  title: "Github Finder",
  icon: "fab fa-github",
};

Navbar.protoTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Navbar;
