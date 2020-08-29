import React from "react";

import SignUpForm from "./SignUpForm";

const SignUpPage = () => (
  <div style={{ textAlign: "center", paddingTop: "5vh", height: "20vh" }}>
    <h1 style={{ color: "#1c6ea4", fontSize: "6vh" }}>Registration</h1>
    <hr style={{ background: "#1c6ea4" }} />
    <SignUpForm />
  </div>
);

export default SignUpPage;
