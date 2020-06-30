import React, { Component } from "react";
import styled from "styled-components";

import { withFirebase } from "../Firebase";
import GlobalStyle from "../GlobalStyle";

// STYLED_CMPONENTS STYLE
const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 10vh;
  width: 40%;

  @media only screen and (max-width: 800px) {
    width: 90%;
    display: flex;
    flex-direction: column;
  }
`;
const Div = styled.div`
  display: flex;
  flex: 1;
  margin: 0 2vh;

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
  margin: 0 0.25vh 0 0.25vh;
  padding: 1.6vh;
  width: 90%;

  @media only screen and (max-width: 800px) {
    border: 0.4vh solid #1c6ea4;
    border-bottom: 0;
    border-radius: 0;
    flex: 1;
    margin: 0;
    padding: 0.3vh;
    width: 95%;
  }
`;
const Button = styled.button`
  background: #1c6ea4;
  box-shadow: 2px 4px 10px #1c6ea4;
  color: antiquewhite;
  cursor: pointer;
  flex: 2;
  font-size: 2vh;
  margin: 1vh 2vh;
  padding: 1.6vh;

  @media only screen and (max-width: 800px) {
    border: 0.3vh solid black;
    box-shadow: 1px 2px 5px #1c6ea4;
    flex: 1;
    margin: 0;
    padding: 0.3vh;
    width: 100%;
  }
`;
const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
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
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

    return (
      <Form onSubmit={this.onSubmit}>
        <GlobalStyle />
        <h1> Atnaujinti Slaptazodi </h1>
        <br />
        <Div>
          <Input
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="Naujas Slaptazodis"
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
          Atnaujinti Slaptazodi
        </Button>

        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}

export default withFirebase(PasswordChangeForm);
