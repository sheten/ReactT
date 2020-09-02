import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

import GlobalStyle from "../GlobalStyle";

import Hello from "./helloA.svg";

import styled from "styled-components";
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

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: "",
      email: "",
      passwordOne: "",
      passwordTwo: "",
    };
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
      var array = [
        "Ar viską padarei šiandien, nustatydamas konkrečius tikslus?",
        "Ar viską padarei šiandien, siekdamas konkrečių užsibrėžtų tikslų?",
        "Ar viską padarei šiandien, kad diena būtų prasminga?",
        "Ar viską padarei šiandien, kad būtum lamingas?",
        "Ar viską padarei šiandien, kad užaugintum pozityvius santykius su tave supančiais žmonėmis?",
        "Ar viską padarei šiandien, kad būtum pilnai įsitraukęs į savo veiklas?",
      ];

      this.props.firebase
        .doCreateUserWithEmailAndPassword(email, passwordOne)
        .then((authUser) => {
          var date = JSON.stringify(new Date());
          var today = date.substring(1, 11);
          var num = 0;
          for (var i = 10; i < 16; i++) {
            var doc = i + "a";
            var ats = array[num];
            num++;
            this.props.firebase.firestore
              .collection("Questions")
              .doc(authUser.user.uid)
              .collection("Klausimai")
              .doc(doc)
              .set({
                Data: today,
                Klausimas: ats,
                KitasDokumentas: i,
                Tipas: 1,
              });
          }

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

export default withRouter(withFirebase(SignUpForm));
