import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import GlobalStyle from "../GlobalStyle";
import Hello from "./helloA.svg";

import { withFirebase } from "../Firebase";
import styled from "styled-components";
import * as ROUTES from "../../constants/routes";

// STYLED_CMPONENTS STYLE
const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: auto;
  width: 100%;

  @media only screen and (max-width: 800px) {
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 80%;
  }
`;
const Div = styled.div`
  display: flex;
  flex: 1;
  width: 100%;

  @media only screen and (max-width: 800px) {
    margin: 0;
  }
`;
const Input = styled.input`
  background: none;
  border: 0.6vh solid #1c6ea4;
  border-radius: 4%;
  color: #1c6ea4;
  flex: 1;
  margin: 0.5vh;
  padding: 1.6vh;
  width: 90%;

  @media only screen and (max-width: 800px) {
    border: 0.4vh solid #1c6ea4;
    border-radius: 4%;
    flex: 1;
    padding: 0.6vh;
    width: 85%;
  }
`;
const Button = styled.button`
  background: #1c6ea4;
  border-radius: 2%;
  box-shadow: 2px 4px 10px #1c6ea4;
  color: antiquewhite;
  cursor: pointer;
  flex: 1;
  font-size: 2vh;
  margin: 1vh 0;
  padding: 1.6vh;
  width: 100%;

  @media only screen and (max-width: 800px) {
    border: 0.3vh solid black;
    box-shadow: 1px 2px 5px #1c6ea4;
    flex: 1;
    margin: 0.3vh;
    margin-top: 0.7vh !important;
    padding: 0.5vh;
    width: 98%;
  }
`;
const Img = styled.img`
  height: auto;
  width: 45vh;

  @media only screen and (max-width: 800px) {
    height: 60%;
  }
`;

const SignUpPage = () => (
  <div style={{ textAlign: "center", marginTop: "5vh", height: "20vh" }}>
    <h1 style={{ color: "#1c6ea4", fontSize: "6vh" }}>Registracija</h1>
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
      .catch((error) => {
        this.setState({ error });
      })
      .then((authUser) => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
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
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          height: "80vh",
          justifyContent: "space-between",
        }}
      >
        <GlobalStyle />

        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            marginTop: "5vh",
          }}
        >
          <Form onSubmit={this.onSubmit}>
            <Div>
              <Input
                name="fullName"
                value={fullName}
                onChange={this.onChange}
                type="text"
                placeholder="Vardas Pavarde"
              />
              <Input
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                placeholder="Email Adresas"
              />
            </Div>
            <Div>
              <Input
                name="passwordOne"
                value={passwordOne}
                onChange={this.onChange}
                type="password"
                placeholder="Slaptazodis"
              />
              <Input
                name="passwordTwo"
                value={passwordTwo}
                onChange={this.onChange}
                type="password"
                placeholder="Patvirtinti Slaptazodi"
              />
            </Div>
            <Button disabled={isInvalid} type="submit">
              Registruotis
            </Button>

            {error && <p>{error.message}</p>}
          </Form>
        </div>

        <Img src={Hello} alt="Hello" />
      </div>
    );
  }
}

const SignUpLink = () => (
  <p style={{ color: "black" }}>
    Neesi uzsiregistraves? <Link to={ROUTES.SIGN_UP}>Uzsiregistruoti</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };
