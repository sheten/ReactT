import React, { Component } from "react";
import { withAuthorization } from "../Session";

import SelectOptionsList from "../Landing/SelectOptionsList";
import ProgressList from "./ProgressList";

import styled from "styled-components";
import Swal from "sweetalert2";

// STYLED-COMPONENTS
const Box = styled.select`
  background: none;
  border: none;
  color: #1c6ea4;
  font-size: 3vh;
  font-family: "Libre Baskerville", serif;
  margin-top: 2vh;
`;

class MonthlyGraphs extends Component {
  constructor(props) {
    super(props);
    this.state = { Members: [], Questions: [], Colors: [], AveragesArray: [] };
  }

  componentDidMount() {
    var uid = this.props.firebase.auth.currentUser.uid;
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
        this.setState({ Members: core });
      });
    this.questionsList(uid);
  }

  handleChange = (event) => {
    this.questionsList(event.target.value);
  };

  questionsList = (member) => {
    var core = [];

    this.props.firebase.firestore
      .collection("Questions")
      .doc(member)
      .collection("Klausimai")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          core.push(doc.data());
        });
        this.setState({ Questions: core });
        this.getFirebaseData(member);
      });
  };

  getFirebaseData(member) {
    var docArray = [];

    this.props.firebase.firestore
      .collection("Questions")
      .doc(member)
      .collection("SavaiciuRezultatai")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          docArray.push(doc.data());
        });
        if (docArray.length < 4) {
          Swal.fire(
            "No Data",
            "Data will be displayed after you submit answers for 4 weeks",
            "error"
          );
        } else if (docArray.length % 4) {
          var FDremainder = (docArray.length % 4) + 1;
          var LDremainder = (docArray.length % 4) + 4;

          var FDAnswers = Object.values(
            docArray[docArray.length - FDremainder]["Atsakymai"]
          );
          var LDAnswers = Object.values(
            docArray[docArray.length - LDremainder]["Atsakymai"]
          );
          var FDType = Object.values(
            docArray[docArray.length - FDremainder]["Tipas"]
          );
          var LDType = Object.values(
            docArray[docArray.length - LDremainder]["Tipas"]
          );
          var FDNumber = parseInt(
            docArray[docArray.length - FDremainder]["Number"]
          );
          var LDNumber = parseInt(
            docArray[docArray.length - LDremainder]["Number"]
          );
          this.calculateData(
            FDAnswers,
            LDAnswers,
            FDType,
            LDType,
            FDNumber,
            LDNumber
          );
        } else {
          var FDAnswers = Object.values(
            docArray[docArray.length - 1]["Atsakymai"]
          );
          var LDAnswers = Object.values(
            docArray[docArray.length - 4]["Atsakymai"]
          );
          var FDType = Object.values(docArray[docArray.length - 1]["Tipas"]);
          var LDType = Object.values(docArray[docArray.length - 4]["Tipas"]);
          var FDNumber = parseInt(docArray[docArray.length - 1]["Number"]);
          var LDNumber = parseInt(docArray[docArray.length - 4]["Number"]);
          this.calculateData(
            FDAnswers,
            LDAnswers,
            FDType,
            LDType,
            FDNumber,
            LDNumber
          );
        }
      });
  }
  calculateData = (
    FDAnswers,
    LDAnswers,
    FDType,
    LDType,
    FDNumber,
    LDNumber
  ) => {
    var FDi = 0;
    var FDAverages = [];
    FDAnswers.forEach((ats) => {
      if (FDType[FDi] == 1) {
        var singleAverage = ats / FDNumber;
        var formated = singleAverage.toFixed(1);
        FDi++;
      } else {
        var singleAverage = ats / 0.7;
        var formated = singleAverage.toFixed(1);
        FDi++;
      }
      FDAverages.push(formated);
    });

    // ForEach making Last Doc Averages
    var LDi = 0;
    var LDAverages = [];
    LDAnswers.forEach((ats) => {
      if (LDType[LDi] == 1) {
        var singleAverage = ats / LDNumber;
        var formated = singleAverage.toFixed(1);
        LDi++;
      } else {
        var singleAverage = ats / 0.7;
        var formated = singleAverage.toFixed(1);
        LDi++;
      }
      LDAverages.push(formated);
    });

    var colorIndicator = [];
    var results = [];
    for (var i = 0; i < LDAnswers.length; i++) {
      var avg = FDAverages[i] - LDAverages[i];
      var formated = avg.toFixed(2);
      var colorCheck = 1;
      if (formated < 0) {
        formated = formated * -1;
        colorCheck = 0;
      }

      colorIndicator.push(colorCheck);

      var answer = formated * 10;
      var formatedAnswer = answer.toFixed(0);
      formatedAnswer = formatedAnswer + "%";

      results.push(formatedAnswer);
    }

    this.setState({ Colors: colorIndicator });
    this.setState({ AveragesArray: results });
  };
  render() {
    if (
      this.props.firebase.auth.currentUser.uid ===
        "09Teh7itY9PN7Nd4SyPJtgCsiNo2" &&
      "PVnxezLAV3OnFCDYuSKbmTWS0cn2"
    ) {
      return (
        <div>
          <Box onChange={this.handleChange}>
            <option
              value={this.props.firebase.auth.currentUser.uid}
              key="Choose a user"
            >
              Choose Another User
            </option>
            <SelectOptionsList usersList={this.state.Members} />
          </Box>

          <h3 style={{ color: "#1c6ea4", textAlign: "center" }}>
            Progress from First and Last Month Weeks
          </h3>
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
            <p>Progress</p>
          </div>
          <ProgressList
            questions={this.state.Questions}
            averagesArray={this.state.AveragesArray}
            colors={this.state.Colors}
          />
        </div>
      );
    } else {
      return (
        <div>
          <h3
            style={{ color: "#1c6ea4", textAlign: "center", marginTop: "2vh" }}
          >
            Progress from First and Last Month Weeks
          </h3>
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
            <p>Progress</p>
          </div>
          <ProgressList
            questions={this.state.Questions}
            averagesArray={this.state.AveragesArray}
            colors={this.state.Colors}
          />
        </div>
      );
    }
  }
}

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(MonthlyGraphs);
