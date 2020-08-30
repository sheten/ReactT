import React, { Component } from "react";
import { withAuthorization } from "../Session";

import styled from "styled-components";
import Swal from "sweetalert2";

// STYLED-COMPONENTS
const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 2%;
  width: 94%;
`;
const Input = styled.input`
  background: #fffafa;
  border: 2px solid #1c6ea4;
  border-bottom: none;
  padding: 2vh 0 2vh 0;
  width: 100%;

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
const RadioInput = styled.input`
  margin-left: 8px;
`;
const BottomFormButton = styled.button`
  background: #1c6ea4;
  border: 2px inset rgb(66, 61, 61);
  color: antiquewhite;
  cursor: pointer;
  font-size: 2.5vh;
  font-family: "Libre Baskerville", serif;
  height: 6.5vh;
  width: 100%;
`;

class AddQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      QuestionContent: null,
      Type: 1,
    };
  }
  onRadioChange = (e) => {
    this.setState({
      Type: e.target.value,
    });
  };
  onValueChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    var date = JSON.stringify(new Date());
    var today = date.substring(1, 11);
    var User = this.props.User;
    var docNumber = this.props.Document + 1;
    var doc = docNumber + "a";
    console.log(docNumber);

    this.props.firebase.firestore
      .collection("Questions")
      .doc(User)
      .collection("Klausimai")
      .doc(doc)
      .set({
        Data: today,
        Klausimas: this.state.QuestionContent,
        Tipas: this.state.Type,
        KitasDokumentas: docNumber,
      })
      .then(() => {
        this.props.onSubmit();
        Swal.fire("Question Added!", "Good Luck with it :)", "success");
      });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit} ref="addQuestionForm">
        <div
          style={{ display: "flex", fontSize: "2.5vh", marginBottom: "5px" }}
        >
          <div>Type:</div>
          <RadioInput
            type="radio"
            name="0-10"
            value="0"
            onChange={this.onRadioChange}
          />
          0/1
          <RadioInput
            type="radio"
            name="0-10"
            value="1"
            onChange={this.onRadioChange}
            defaultChecked
          />
          1-10
        </div>
        <Input
          required
          placeholder="Insert content..."
          type="text"
          id="QuestionContent"
          onChange={this.onValueChange}
        />
        <BottomFormButton>Add Question</BottomFormButton>
      </Form>
    );
  }
}

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(AddQuestion);
