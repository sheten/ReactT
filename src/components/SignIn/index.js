import React, { Component } from "react";

import PasswordForgetLink from "../PasswordForget/PasswordForgetLink";
import SignUpLink from "../SignUp/SignUpLink";
import SignInForm from "./SignInForm";

import styled from "styled-components";

const Div = styled.div`
  align-items: center;
  border: 5px inset #1c6ea4;
  display: flex;
  flex-direction: column;
  height: 50vh;
  justify-content: center;
  padding: 1vh;
  width: max-content;
`;

class SignInPage extends Component {
  render() {
    return (
      <div
        style={{
          alignItems: "center",
          background: "#fafafa",
          display: "flex",
          height: "100vh",
          justifyContent: "center",
        }}
      >
        <Div>
          <h1 style={{ color: "#1c6ea4", flex: 1, fontSize: "7vh" }}>
            Sign In
          </h1>
          <div style={{ flex: 2 }}>
            <SignInForm />
            <PasswordForgetLink />
            <SignUpLink />
          </div>
        </Div>
      </div>
    );
  }
}

export default SignInPage;
