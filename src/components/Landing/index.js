import React, { Component } from "react";
import { withAuthorization } from "../Session";

import GlobalStyle from "../GlobalStyle";
import InputList from "./InputList";
import SelectOptionsList from "./SelectOptionsList";
import AddQuestion from "./AddQuestion";
import DeleteQuestion from "./DeleteQuestion";

import styled from "styled-components";
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

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      List: [],
      User: this.props.firebase.auth.currentUser.uid,
      questionsList: [],
      QuestionContent: null,
      Document: "1a",
    };

    this.handleMembersChange = this.handleMembersChange.bind(this);
  }

  answers = {};

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
    this.getFirebaseQuestions();
  }

  handleMembersChange(event) {
    var member = event.target.value;
    console.log(member);

    this.setState({ User: event.target.value });
    this.getFirebaseQuestions(member);

    this.refs.button.removeAttribute("disabled", "disabled");
    this.refs.button.setAttribute("style", "background-color: #1c6ea4");
  }

  getFirebaseQuestions = (member) => {
    var user = this.state.User;
    var core = [];

    if (member) {
      user = member;
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
          });

          this.getDocumentNumber();
        } else {
          this.setState({ Document: 9 });
        }
      });
  };

  getDocumentNumber() {
    var core = this.state.questionsList;
    var doc = core[core.length - 1]["KitasDokumentas"];
    this.setState({ Document: doc });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.refs.button.setAttribute("disabled", "disabled");
    this.refs.button.setAttribute("style", "background-color: grey");

    var date = JSON.stringify(new Date());
    var today = date.substring(1, 11);
    var user = this.state.User;
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
          this.sendResultsToNewDocument(user, today);
        } else {
          this.updateDocument(user, today, pastResults);
        }
      });
  };

  sendResultsToNewDocument(user, today) {
    var inputAnswers = Object.values(this.answers);
    var typeArray = [];
    for (var i = 0; i < this.state.questionsList.length; i++) {
      var getType = this.state.questionsList[i]["Tipas"];
      typeArray.push(getType);
    }

    this.props.firebase.firestore
      .collection("Questions")
      .doc(user)
      .collection("SavaiciuRezultatai")
      .doc(today)
      .set({
        Atsakymai: inputAnswers,
        Number: 1,
        Date: today,
        Tipas: typeArray,
      })
      .then(() => {
        Swal.fire("Your Answers are Saved!");
      });
  }

  updateDocument(user, today, pastResults) {
    var documentDate = pastResults[pastResults.length - 1]["Date"];
    var number = parseInt(pastResults[pastResults.length - 1]["Number"]) + 1;
    var latestPastResults = Object.values(
      pastResults[pastResults.length - 1]["Atsakymai"]
    );

    if (number === 8) {
      this.sendResultsToNewDocument(user, today);
    } else {
      this.updateResults(latestPastResults, user, number, documentDate);
    }
  }

  updateResults(latestPastResults, user, number, documentDate) {
    var typeArray = [];
    for (var i = 0; i < this.state.questionsList.length; i++) {
      var getType = this.state.questionsList[i]["Tipas"];
      typeArray.push(getType);
    }

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
        Tipas: typeArray,
      })
      .then(() => {
        Swal.fire("Your Answers are Saved!");
      });
  }

  checkChange = (id, value) => {
    this.answers[id] = value;
  };

  render() {
    //Show this Display to Admin Users
    if (
      this.props.firebase.auth.currentUser.uid ===
        "09Teh7itY9PN7Nd4SyPJtgCsiNo2" &&
      "PVnxezLAV3OnFCDYuSKbmTWS0cn2"
    ) {
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
              <option
                value={this.props.firebase.auth.currentUser.uid}
                key="My Account"
              >
                My Account
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
              <h3 style={{ marginTop: "3vh" }}>
                Add or Remove a Question from the List
              </h3>
              <div style={{ display: "flex" }}>
                <AddQuestion
                  User={this.state.User}
                  Document={this.state.Document}
                  onSubmit={this.getFirebaseQuestions}
                />
                <DeleteQuestion
                  User={this.state.User}
                  questionsList={this.state.questionsList}
                  onSubmit={this.getFirebaseQuestions}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      //Show this Display to all Casual Users
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
              <h3 style={{ marginTop: "3vh" }}>
                Add or Remove a Question from the List
              </h3>
              <div style={{ display: "flex" }}>
                <AddQuestion
                  User={this.state.User}
                  Document={this.state.Document}
                  onSubmit={this.getFirebaseQuestions}
                />
                <DeleteQuestion
                  User={this.state.User}
                  questionsList={this.state.questionsList}
                  onSubmit={this.getFirebaseQuestions}
                />
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
