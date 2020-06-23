import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const SignUpPage = () => (
  <div style={{ textAlign: "center", marginTop: "5vh" }}>
    <h1 style={{ color: "#1c6ea4", fontSize: "6vh" }}>SignUp</h1>
    <hr style={{ background: "#1c6ea4" }} />
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  fullName: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { fullName, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set({
          fullName,
          email,
        });
      })
      .then((authUser) => {
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
    const { fullName, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      fullName === "";

    return (
      <form
        onSubmit={this.onSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "5vh",
            width: "100%",
          }}
        >
          <input
            name="fullName"
            value={fullName}
            onChange={this.onChange}
            type="text"
            placeholder="Full Name"
            style={{
              background: "none",
              border: "2px inset #1c6ea4",
              color: "#1c6ea4",
              flex: 1,
              margin: "4px 8px 8px 8px",
            }}
          />
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
            style={{
              background: "none",
              border: "2px inset #1c6ea4",
              color: "#1c6ea4",
              flex: 1,
              margin: "4px 8px 8px 8px",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "1vh",
            width: "100%",
          }}
        >
          <input
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
            style={{
              background: "none",
              border: "2px inset #1c6ea4",
              color: "#1c6ea4",
              flex: 1,
              margin: "0px 8px 8px 8px",
            }}
          />
          <input
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm Password"
            style={{
              background: "none",
              border: "2px inset #1c6ea4",
              color: "#1c6ea4",
              flex: 1,
              margin: "0px 8px 8px 8px",
            }}
          />
        </div>
        <button
          disabled={isInvalid}
          type="submit"
          style={{
            background: "none",
            border: "2px inset #1c6ea4",
            color: "#1c6ea4",
            margin: "4px 8px 8px 8px",
          }}
        >
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p style={{ color: "black" }}>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };
