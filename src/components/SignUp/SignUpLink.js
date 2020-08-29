import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

const SignUpLink = () => (
  <p style={{ color: "black" }}>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Register</Link>
  </p>
);

export default SignUpLink;
