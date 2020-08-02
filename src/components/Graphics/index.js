import React, { Component } from "react";
import { withAuthorization } from "../Session";
import styled from "styled-components";
import SelectOptionsList from "../Landing/SelectOptionsList";
import GraphicsList from "./GraphicsList";
import Swal from "sweetalert2";
import "./style.css";

// STYLED-COMPONENTS
const Box = styled.select`
  background: none;
  border: none;
  color: #1c6ea4;
  font-size: 3vh;
  font-family: "Libre Baskerville", serif;
  margin-top: 2vh;
`;

class Graphs extends Component {
  constructor(props) {
    super(props);
    this.state = { List: [], questions: [], User: "user", array: [] };
  }

  componentDidMount() {
    var uid = this.props.firebase.auth.currentUser.uid;
    this.setState({ User: uid });
    var core = [];

    this.props.firebase.firestore
      .collection("Questions")
      .doc(uid)
      .collection("Members")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          core.push(doc.data());
        });
        this.setState({ List: core });
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
            this.setState({ questions: core });
          });
        this.averageList();
      });
  };
  averageList() {
    var pastResults = [];
    this.props.firebase.firestore
      .collection("Questions")
      .doc(this.state.User)
      .collection("SavaiciuRezultatai")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          pastResults.push(doc.data());
        });

        if (pastResults.length === 0) {
          Swal.fire(
            "No Data",
            "Data will be displayed after you submit answers",
            "error"
          );
        } else {
          var latestPastResults = Object.values(
            pastResults[pastResults.length - 1]["Atsakymai"]
          );
          var number = parseInt(pastResults[pastResults.length - 1]["Number"]);

          console.log(number);
          var results = [];
          latestPastResults.forEach((num) => {
            var average = num / number;
            var formated = average.toFixed(1);
            results.push(formated);
          });
          this.setState({ array: results });
        }
      });
  }
  handleChange = (event) => {
    this.setState({ User: event.target.value });
    this.questionsList();
  };
  render() {
    return (
      <div>
        <Box onChange={this.handleChange}>
          <option
            value={this.props.firebase.auth.currentUser.uid}
            key="Choose a user"
          >
            Choose Another User
          </option>
          <SelectOptionsList usersList={this.state.List} />
        </Box>

        <div
          style={{
            color: "#1c6ea4",
            display: "flex",
            fontSize: "2.5vh",
            fontWeight: "600",
            justifyContent: "space-between",
            margin: "auto",
            marginTop: "3.5vh",
            width: "95%",
          }}
        >
          <p>Questions</p>
          <p>Averages</p>
        </div>
        <GraphicsList
          questions={this.state.questions}
          array={this.state.array}
        />
      </div>
    );
  }
}

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(Graphs);
