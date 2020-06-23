import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import styled from "styled-components";

import { SignUpLink } from "../SignUp";
import { PasswordForgetLink } from "../PasswordForget";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const Div = styled.div`
  align-items: center;
  border: 5px inset #1c6ea4;
  display: flex;
  flex-direction: column;
  height: 50vh;
  justify-content: center;
  padding: 25px;
  width: max-content;
`;
const SignInPage = () => (
  <div
    style={{
      alignItems: "center",
      background: "#f7f1f1",
      display: "flex",
      height: "100vh",
      justifyContent: "center",
    }}
  >
    <Div>
      <h1 style={{ color: "#1c6ea4", flex: 1, fontSize: "7vh" }}>SignIn</h1>
      <div style={{ flex: 2 }}>
        <SignInForm />
        <PasswordForgetLink />
        <SignUpLink />
      </div>
    </Div>
  </div>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
          style={{
            background: "#ffffff",
            border: "none",
            borderRadius: "6%",
            margin: "5px",
          }}
        />
        <br />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
          style={{
            background: "#ffffff",
            border: "none",
            borderRadius: "6%",
            margin: "5px",
          }}
        />
        <br />
        <button
          disabled={isInvalid}
          type="submit"
          style={{
            background: "none",
            border: "2px inset #1c6ea4",
            color: "#1c6ea4",
            margin: "5px",
          }}
        >
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export default SignInPage;

export { SignInForm };
