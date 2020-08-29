import React, { Component } from "react";
import { withAuthorization } from "../Session";

import ComboQuestionsList from "./ComboQuestionsList";
import styled from "styled-components";
import Swal from "sweetalert2";

// STYLED-COMPONENTS
const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 2%;
  width: 94%;
`;
const RemoveQuestions = styled.select`
  background: none;
  border: none;
  color: #1c6ea4;
  margin-top: 24px;
  padding: 2vh 0 2vh 0;
  width: 100%;
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

class DeleteQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      QuestionContent: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    this.setState({ QuestionContent: event.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    var User = this.props.User;
    var chosenQuestion = this.state.QuestionContent;

    var test = this.props.firebase.firestore
      .collection("Questions")
      .doc(User)
      .collection("Klausimai")
      .where("Klausimas", "==", chosenQuestion);

    test.get().then((querySnapshot) => {
      querySnapshot.forEach(
        function (doc) {
          doc.ref.delete().then(() => {
            this.props.onSubmit();
            Swal.fire("Question Removed!", "", "success");
          });
        }.bind(this)
      );
    });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <RemoveQuestions onChange={this.handleChange}>
          <option
            value={this.props.firebase.auth.currentUser.uid}
            key="Choose a user"
          >
            Choose Question
          </option>
          <ComboQuestionsList questionsList={this.props.questionsList} />
        </RemoveQuestions>
        <BottomFormButton>Remove Question</BottomFormButton>
      </Form>
    );
  }
}

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(DeleteQuestion);
