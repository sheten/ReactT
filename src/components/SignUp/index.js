import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import GlobalStyle from "../GlobalStyle";
import Hello from "./helloA.svg";

import { withFirebase } from "../Firebase";
import styled from "styled-components";
import * as ROUTES from "../../constants/routes";
import Swal from "sweetalert2";

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
    padding: 1.2vh;
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
  <div style={{ textAlign: "center", paddingTop: "5vh", height: "20vh" }}>
    <h1 style={{ color: "#1c6ea4", fontSize: "6vh" }}>Registration</h1>
    <hr style={{ background: "#1c6ea4" }} />
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  fullName: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    event.preventDefault();

    if (this.state.passwordOne !== this.state.passwordTwo) {
      Swal.fire({
        title: "",
        text: "Your passwords do not match",
        icon: "error",
        confirmButtonText: "Okey",
      });
    } else if (this.state.fullName === "") {
      Swal.fire({
        title: "",
        text: "Insert Your Full Name Correctly",
        icon: "error",
        confirmButtonText: "Okey",
      });
    } else {
      const { fullName, email, passwordOne } = this.state;
      // var array = [
      //   "1. Ar viską padarei šiandien, nustatydamas konkrečius tikslus?",
      //   "2. Ar viską padarei šiandien, siekdamas konkrečių užsibrėžtų tikslų?",
      //   "3. Ar viską padarei šiandien, kad diena būtų prasminga?",
      // ];
      // for (var i = 0; i < 2; i++) {
      //   var doc = i + "a";
      //   var ats = array[i];
      //   this.props.firebase.firestore
      //     .collection("Questions")
      //     .doc("test")
      //     .collection("Klausimai")
      //     .doc(doc)
      //     .set({
      //       Klausimas: ats,
      //     });
      // }

      this.props.firebase
        .doCreateUserWithEmailAndPassword(email, passwordOne)
        .then((authUser) => {
          var date = JSON.stringify(new Date());
          var today = date.substring(1, 11);

          this.props.firebase.firestore
            .collection("Users")
            .doc(authUser.user.uid)
            .set({
              FullName: this.state.fullName,
              Email: this.state.email,
              Password: this.state.passwordOne,
              UserID: authUser.user.uid,
              RegistrationDate: today,
            });

          this.setState({ ...INITIAL_STATE });
          this.props.history.push(ROUTES.HOME);

          // Create a user in your Firebase realtime database
          return this.props.firebase.user(authUser.user.uid).set({
            fullName,
            email,
          });
        })
        .catch((error) => {
          this.setState({ error });
          console.log(error);
        });
    }
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { fullName, email, passwordOne, passwordTwo, error } = this.state;

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
                className="name"
                onChange={this.onChange}
                type="text"
                placeholder="Full Name"
              />
              <Input
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                placeholder="Email Address"
              />
            </Div>
            <Div>
              <Input
                name="passwordOne"
                value={passwordOne}
                className="wrong"
                onChange={this.onChange}
                type="password"
                placeholder="Password"
              />
              <Input
                name="passwordTwo"
                value={passwordTwo}
                className="wrong"
                onChange={this.onChange}
                type="password"
                placeholder="Confirm Password"
              />
            </Div>
            <Button type="submit">Register</Button>

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
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Register</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };
