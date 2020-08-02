import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import InputList from "./InputList";
import styled from "styled-components";
import Swal from "sweetalert2";

// STYLED-COMPONENTS STYLE
const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 2%;
  width: 88%;
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
      questions: [],
    };
  }

  answers = {};

  handleSubmit = (e) => {
    e.preventDefault();

    var uid = this.props.userID;
    var user;
    if (uid) {
      user = uid;
    } else {
      user = this.props.firebase.auth.currentUser.uid;
    }

    var date = JSON.stringify(new Date());
    var today = date.substring(1, 11);

    var pastResults = [];
    this.props.firebase.firestore
      .collection("Questions")
      .doc(user)
      .collection("SavaiciuRezultatai")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          pastResults.push(doc.data());
        });

        if (pastResults.length === 0) {
          this.sendResultsNewDocument(user, today);
        } else {
          var number =
            parseInt(pastResults[pastResults.length - 1]["Number"]) + 1;

          var latestPastResults = Object.values(
            pastResults[pastResults.length - 1]["Atsakymai"]
          );
          var documentDate = pastResults[pastResults.length - 1]["Date"];

          if (number === 8) {
            this.sendResultsNewDocument(user, today);
          } else {
            this.sendResults(latestPastResults, user, number, documentDate);
          }
        }
      });
  };
  sendResultsNewDocument(user, today) {
    var inputAnswers = Object.values(this.answers);

    this.props.firebase.firestore
      .collection("Questions")
      .doc(user)
      .collection("SavaiciuRezultatai")
      .doc(today)
      .set({
        Atsakymai: inputAnswers,
        Number: 1,
        Date: today,
      })
      .then(() => {
        Swal.fire("Your Answers are Saved!");
      });
  }
  sendResults(latestPastResults, user, number, documentDate) {
    var inputAnswers = Object.values(this.answers);
    console.log(latestPastResults);
    console.log(inputAnswers);
    var sum = latestPastResults.map(function (num, i) {
      return +inputAnswers[i] + +num;
    });
    console.log(sum);

    this.props.firebase.firestore
      .collection("Questions")
      .doc(user)
      .collection("SavaiciuRezultatai")
      .doc(documentDate)
      .set({
        Atsakymai: sum,
        Number: number,
        Date: documentDate,
      })
      .then(() => {
        Swal.fire("Your Answers are Saved!");
      });
  }
  checkChange = (id, value) => {
    this.answers[id] = value;
    console.log(this.answers);
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <div style={{ display: "inlineBlock" }}>
          <InputList
            checkChange={this.checkChange}
            questionsList={this.props.questionsList}
          />
        </div>
        <FormButton>Submit Answers</FormButton>
      </Form>
    );
  }
}

export default withFirebase(InputFirebase);
