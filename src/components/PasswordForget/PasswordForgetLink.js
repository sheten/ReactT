import React, { Component } from "react";
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";

class PasswordForgetLink extends Component {
  render() {
    return (
      <p>
        <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
      </p>
    );
  }
}

export default PasswordForgetLink;
