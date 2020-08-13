import React, { Component } from "react";
import { withAuthorization } from "../Session";
import styled from "styled-components";

import GlobalStyle from "../GlobalStyle";
import InputList from "./InputList";
import SelectOptionsList from "./SelectOptionsList";
import ComboQuestionsList from "./ComboQuestionsList";
import Swal from "sweetalert2";

// STYLED-COMPONENTS
const H2 = styled.h2`
  font-size: 4.3vh;
  font-weight: 600;

  @media only screen and (max-width: 800px) {
    font-size: 3vh;
  }
`;
const Box = styled.select`
  background: none;
  border: none;
  color: #1c6ea4;
  margin-bottom: 1vh;
  padding: 1vh 0 1.5vh 0;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 2%;
  width: 94%;
`;
const FormButton = styled.button`
  background: #1c6ea4;
  border: 2px inset rgb(66, 61, 61);
  color: antiquewhite;
  cursor: pointer;
  font-size: 2.5vh;
  font-family: "Libre Baskerville", serif;
  height: 6.5vh;
  margin-top: 2vh;
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
const RemoveQuestions = styled.select`
  background: none;
  border: none;
  color: #1c6ea4;
  padding: 2vh 0 2vh 0;
  width: 100%;
`;

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      List: [],
      User: null,
      questionsList: [],
      QuestionContent: null,
      Number: "7.",
      Document: 1,
    };

    this.handleMembersChange = this.handleMembersChange.bind(this);
    this.handleRemoveQuestionChange = this.handleRemoveQuestionChange.bind(
      this
    );
  }

  componentDidMount() {
    var uid = this.props.firebase.auth.currentUser.uid;
    this.setState({ User: uid });
    var members = [];
    console.log(uid);

    this.props.firebase.firestore
      .collection("Questions")
      .doc(uid)
      .collection("Members")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          members.push(doc.data());
        });
        this.setState({ List: members });
      });
    this.questionsList();
  }

  handleMembersChange(event) {
    this.setState({ User: event.target.value });
    var member = event.target.value;
    console.log(member);
    this.questionsList(member);

    this.refs.button.removeAttribute("disabled", "disabled");
    this.refs.button.setAttribute("style", "background-color: #1c6ea4");
  }

  questionsList = (member) => {
    var core = [];
    var i = 1;
    var d = 10;

    console.log(member);
    var user;
    if (member) {
      user = member;
    } else {
      user = this.props.firebase.auth.currentUser.uid;
    }

    this.props.firebase.firestore
      .collection("Questions")
      .doc(user)
      .collection("Klausimai")
      // .doc()
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length > 0) {
          querySnapshot.forEach((doc) => {
            //General Pushing Questions
            core.push(doc.data());
            this.setState({ questionsList: core });

            // Creating Numbers for Adding Question Function
            i++;
            d++;
            var questionsNumbering = i + ". ";
            var docNumbering = d + "a";
            this.setState({ Number: questionsNumbering });
            this.setState({ Document: docNumbering });
          });
        } else {
          var questionsNumbering = "1. ";
          var docNumbering = "10a";
          this.setState({ Number: questionsNumbering });
          this.setState({ Document: docNumbering });
        }
      });
  };

  answers = {};

  handleSubmit = (e) => {
    e.preventDefault();
    this.refs.button.setAttribute("disabled", "disabled");
    this.refs.button.setAttribute("style", "background-color: grey");

    var member = this.state.User;
    if (member) {
      var user = member;
      console.log(user);
    } else {
      user = this.props.firebase.auth.currentUser.uid;
      console.log(user);
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
            console.log("new doc");
          } else {
            this.sendResults(latestPastResults, user, number, documentDate);
            console.log("update doc");
          }
        }
      });
  };

  sendResultsNewDocument(user, today) {
    console.log(user);
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
    var sum = latestPastResults.map(function (num, i) {
      return +inputAnswers[i] + +num;
    });

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
  };

  // Adding Questions Functions ***!***

  onValueChange = (e) => {
    console.log(e.target.value);
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleAddQuestionSubmit = (e) => {
    e.preventDefault();
    var today = JSON.stringify(new Date());
    var User = this.state.User;
    var kelintas = this.state.Document;

    this.props.firebase.firestore
      .collection("Questions")
      .doc(User)
      .collection("Klausimai")
      .doc(kelintas)
      .set({
        Data: today,
        Klausimas: this.state.QuestionContent,
        Number: this.state.Number,
      })
      .then(() => {
        this.questionsList();
        Swal.fire("Question Added!", "Good Luck with it :)", "success");
      });
  };

  // Removing Question Functions

  handleRemoveQuestionChange = (event) => {
    this.setState({ QuestionContent: event.target.value });
  };
  handleRemoveQuestionSubmit = (e) => {
    e.preventDefault();
    var User = this.state.User;
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
            this.questionsList();
            Swal.fire("Question Removed!", "", "success");
          });
        }.bind(this)
      );
    });
  };

  render() {
    if (
      this.props.firebase.auth.currentUser.uid ===
      "x4UU8rQmizYzCdhP61F8qtkeMSx1"
    ) {
      return <div>Tu negali nieko matyti</div>;
    } else {
      return (
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            marginTop: "3vh",
          }}
        >
          <GlobalStyle />
          <div
            style={{
              color: "#1c6ea4",
              marginBottom: "1vh",
              width: "88%",
            }}
          >
            <H2>How Was Your Day:</H2>

            <Box onChange={this.handleMembersChange}>
              <option
                value={this.props.firebase.auth.currentUser.uid}
                key="Choose a user"
              >
                Choose Another User
              </option>
              <SelectOptionsList usersList={this.state.List} />
            </Box>
            <div style={{ height: "50vh", overflow: "auto" }}>
              <Form onSubmit={this.handleSubmit}>
                <div style={{ display: "inlineBlock" }}>
                  <InputList
                    checkChange={this.checkChange}
                    questionsList={this.state.questionsList}
                  />
                </div>
                <FormButton ref="button">Submit Answers</FormButton>
              </Form>
            </div>
            <div>
              <GlobalStyle />
              <h3 style={{ marginTop: "3vh" }}>
                Add or Remove a Question from the List
              </h3>
              <div style={{ display: "flex" }}>
                <Form onSubmit={this.handleAddQuestionSubmit}>
                  <Input
                    required
                    placeholder="Insert content..."
                    type="text"
                    id="QuestionContent"
                    onChange={this.onValueChange}
                  />
                  <BottomFormButton>Add Question</BottomFormButton>
                </Form>
                <Form onSubmit={this.handleRemoveQuestionSubmit}>
                  <RemoveQuestions onChange={this.handleRemoveQuestionChange}>
                    <option
                      value={this.props.firebase.auth.currentUser.uid}
                      key="Choose a user"
                    >
                      Choose Question
                    </option>
                    <ComboQuestionsList
                      questionsList={this.state.questionsList}
                    />
                  </RemoveQuestions>
                  <BottomFormButton>Remove Question</BottomFormButton>
                </Form>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Landing);
