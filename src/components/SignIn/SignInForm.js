import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { withFirebase } from "../Firebase";

import GlobalStyle from "../GlobalStyle";

import styled from "styled-components";
import Swal from "sweetalert2";

const Input = styled.input`
  background: #1c6ea4;
  border: none;
  color: antiquewhite;
  cursor: pointer;
  margin: 5px;
  padding: 0.6vh;

  ::placeholder {
    color: antiquewhite;
  }
`;

const INITIAL_STATE = {
  email: "",
  password: "",
};

class SignInForm extends Component {
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
        Swal.fire("", error.message, "error");
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <form onSubmit={this.onSubmit}>
        <GlobalStyle />
        <Input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Adress"
        />
        <br />
        <Input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <br />
        <button
          disabled={isInvalid}
          type="submit"
          style={{
            background: "#1c6ea4",
            border: "none",
            boxShadow: "1px 2px 5px #1c6ea4",
            color: "antiquewhite",
            cursor: "pointer",
            margin: "5px",
            padding: "0.6vh",
          }}
        >
          Sign In
        </button>
        <br />
        <br />

        {/* {error && <p>{error.message}</p>} */}
      </form>
    );
  }
}

export default withRouter(withFirebase(SignInForm));
