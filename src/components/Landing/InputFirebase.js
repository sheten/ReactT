import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import InputList from "./InputList";
import styled from "styled-components";

// STYLED-COMPONENTS STYLE
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 88%;
`;
const Input = styled.input`
  background: #fffafa;
  border: 2px solid #1c6ea4;
  border-bottom: none;
  flex: 1;
  font-family: "Libre Baskerville", serif;
  height: 6.5vh;
  width: 10%;

  ::hover {
    background-color: #1c6ea4;
  }
  ::placeholder {
    color: #1c6ea4;
    font-size: 2.5vh;
    text-align: center;
  }
  ::placeholdertextcolor: "red";
`;
const FormButton = styled.button`
  background: #1c6ea4;
  border: 2px inset black;
  color: antiquewhite;
  cursor: pointer;
  font-size: 2.5vh;
  font-family: "Libre Baskerville", serif;
  height: 6.5vh;
`;

class InputFirebase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: {},
    };
  }

  onValueChange = (e) => {
    var questions = this.state.questions;
    var id = e.target.id;
    questions[id] = e.target.value;

    this.setState({
      questions: questions,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    var date = JSON.stringify(new Date());
    var today = date.substring(1, 11);
    var uid = this.props.firebase.auth.currentUser.uid;

    this.props.firebase.firestore
      .collection("Questions")
      .doc(uid)
      .collection("Atsakymai")
      .doc(today)
      .set({
        Atsakymai: this.state,
      })
      .then(() => {
        alert("Your Inputs is Saved!");
      });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <div style={{ display: "flex" }}>
          <Input
            required
            placeholder="1"
            type="text"
            id="Q1"
            onChange={this.onValueChange}
          />
          <Input
            required
            placeholder="2"
            type="text"
            id="Q2"
            onChange={this.onValueChange}
          />
          <Input
            required
            placeholder="3"
            type="text"
            id="Q3"
            onChange={this.onValueChange}
          />
          <Input
            required
            placeholder="4"
            type="text"
            id="Q4"
            onChange={this.onValueChange}
          />
          <Input
            required
            placeholder="5"
            type="text"
            id="Q5"
            onChange={this.onValueChange}
          />
          <Input
            required
            placeholder="6"
            type="text"
            id="Q6"
            onChange={this.onValueChange}
          />
          <InputList />
        </div>
        <FormButton>Submit Answers</FormButton>
      </Form>
    );
  }
}

export default withFirebase(InputFirebase);
