import React, { Component } from "react";
import { withAuthorization } from "../Session";
import styled from "styled-components";

import InputFirebase from "./InputFirebase";
import GlobalStyle from "../GlobalStyle";
import Questions from "./Questions";
import SelectOptionsList from "./SelectOptionsList";

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

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = { List: [], User: "", questionsList: [] };

    this.handleChange = this.handleChange.bind(this);
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

  questionsList = () => {
    var core = [];
    this.props.firebase.firestore
      .collection("Questions")
      .doc("CoreQuestions")
      .collection("CoreQuestions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          core.push(doc.data());
        });
        var uid = this.state.User;

        this.props.firebase.firestore
          .collection("Questions")
          .doc(uid)
          .collection("Klausimai")
          // .doc()
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              core.push(doc.data());
            });
            this.setState({ questionsList: core });
          });
      });
  };

  handleChange(event) {
    this.setState({ User: event.target.value });
    this.questionsList();
  }
  render() {
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

          <Box onChange={this.handleChange}>
            <option
              value={this.props.firebase.auth.currentUser.uid}
              key="Choose a user"
            >
              Choose Another User
            </option>
            <SelectOptionsList usersList={this.state.List} />
          </Box>

          <div style={{ height: "50vh", overflow: "auto" }}>
            <Questions
              userID={this.state.User}
              questionsList={this.state.questionsList}
            />
          </div>
        </div>

        <InputFirebase
          userID={this.state.User}
          questionsList={this.state.questionsList}
        />
      </div>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Landing);
