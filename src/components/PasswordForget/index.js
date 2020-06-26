import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const PasswordForgetPage = () => (
  <div style={{ textAlign: "center", marginTop: "5vh" }}>
    <h1>PasswordForget</h1>
    <hr />
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: "",
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
    const { email, error } = this.state;

    const isInvalid = email === "";

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Adresas"
          style={{
            background: "none",
            border: "2px inset #1c6ea4",
            color: "#1c6ea4",
            flex: 1,
          }}
        />
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
          Atstatyti Slaptazodi
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Uzmirsai Slaptazodi?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
