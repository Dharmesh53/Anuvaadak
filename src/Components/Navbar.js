import PropTypes from "prop-types";
import React, { Component } from "react";

export class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <div className="navcontainer">
          <a className="brand" href="#" >
            Anuvaadak
          </a>
        </div>
      </nav>
    );
  }
}

export default Navbar;
