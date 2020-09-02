import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";

import GlobalStyle from "../GlobalStyle";

import Swal from "sweetalert2";

const INITIAL_STATE = {
  email: "",
  error: null,
};

class PasswordForgetForm extends Component {
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
        Swal.fire("Now follow instructions on the email");
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
      <div style={{ textAlign: "center", marginTop: "5vh" }}>
        <h1>Forgot Password</h1>
        <hr />
        <form onSubmit={this.onSubmit}>
          <input
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            type="text"
            placeholder="Insert Email Adresas"
            style={{
              background: "none",
              border: "2px inset #1c6ea4",
              color: "#1c6ea4",
              flex: 1,
              padding: "1vh",
            }}
          />
          <GlobalStyle />
          <button
            disabled={isInvalid}
            type="submit"
            style={{
              background: "none",
              border: "2px inset #1c6ea4",
              color: "#1c6ea4",
              cursor: "pointer",
              margin: "5px",
              padding: "1vh",
            }}
          >
            Change Password
          </button>

          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

export default withRouter(withFirebase(PasswordForgetForm));
