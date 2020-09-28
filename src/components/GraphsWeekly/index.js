import React, { Component } from "react";
import { withAuthorization } from "../Session";

import SelectOptionsList from "../Landing/SelectOptionsList";
import BoxOfPastWeeks from "./BoxOfPastWeeks";
import Test from "./Test";

// import * as d3 from "d3";
import Swal from "sweetalert2";
import styled from "styled-components";
// import "./style.css";

// STYLED-COMPONENTS
const Box = styled.select`
  background: none;
  border: none;
  color: #1c6ea4;
  font-size: 3vh;
  font-family: "Libre Baskerville", serif;
  overflow: auto;
  margin-top: 2vh;
`;

class WeeklyGraphs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsList: [],
      documentsArray: [],
      List: [],
      User: this.props.firebase.auth.currentUser.uid,
      svg: null,
      questions: [],
      averages: [],
    };
    this.myRef = React.createRef();
  }
  componentDidMount() {
    var members = [];

    //GETTING MEMBERS
    this.props.firebase.firestore
      .collection("Questions")
      .doc(this.state.User)
      .collection("Members")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          members.push(doc.data());
        });
      });

    //GETTING QUESTIONS
    var docData = [];
    var questions = [];
    var s = 0;

    this.props.firebase.firestore
      .collection("Questions")
      .doc(this.state.User)
      .collection("Klausimai")
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length > 0) {
          querySnapshot.forEach((doc) => {
            docData.push(doc.data());
          });
        }
        docData.forEach(() => {
          questions.push(docData[s]["Klausimas"]);
          s++;
        });
      });

    //GETTING AVERAGES DATA
    var documentsArray = [];
    this.props.firebase.firestore
      .collection("Questions")
      .doc(this.state.User)
      .collection("SavaiciuRezultatai")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          documentsArray.push(doc.data());
        });
        var averages = [];

        // Check if Data exist if document exist
        if (documentsArray.length === 0) {
          Swal.fire(
            "No Data",
            "Data will be displayed after you submit answers",
            "error"
          );
        } else {
          // Getting Required Data

          var number = parseInt(
            documentsArray[documentsArray.length - 1]["Number"]
          );
          var results = Object.values(
            documentsArray[documentsArray.length - 1]["Atsakymai"]
          );
          var type = Object.values(
            documentsArray[documentsArray.length - 1]["Tipas"]
          );

          var i = 0;

          // ForEach Factory making Averages
          results.forEach((num) => {
            var questionType = type[i];
            if (questionType === 1) {
              var singleAverage = num / number;
              var formated = singleAverage.toFixed(1);
              i++;
            } else {
              singleAverage = num / 0.7;
              formated = singleAverage.toFixed(1);
              i++;
            }
            averages.push(formated);
          });
          console.log(averages);
          this.setState({
            averages: averages,
            questions: questions,
            List: members,
            documentsArray: documentsArray,
          });
        }
      });

    // this.getFirebaseData(uid, members, questions);
  }

  handleUserChange = (event) => {
    var members = this.state.List;
    var docData = [];
    var questions = [];
    var s = 0;

    this.props.firebase.firestore
      .collection("Questions")
      .doc(event.target.value)
      .collection("Klausimai")
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length > 0) {
          querySnapshot.forEach((doc) => {
            docData.push(doc.data());
          });
        }
        docData.forEach(() => {
          questions.push(docData[s]["Klausimas"]);
          s++;
        });
      });
    this.setState({ User: event.target.value });
    this.getFirebaseData(event.target.value, members, questions);
  };

  getFirebaseData = (uid, members, questions) => {
    var documentsArray = [];
    this.props.firebase.firestore
      .collection("Questions")
      .doc(uid)
      .collection("SavaiciuRezultatai")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          documentsArray.push(doc.data());
        });

        // Send Data Further
        this.formatAnswers(uid, documentsArray, members, questions);
      });
  };

  formatAnswers = (uid, documentsArray, members, questions) => {
    var averages = [];

    // Check if Data exist if document exist
    if (documentsArray.length === 0) {
      Swal.fire(
        "No Data",
        "Data will be displayed after you submit answers",
        "error"
      );
    } else {
      // Getting Required Data

      var number = parseInt(
        documentsArray[documentsArray.length - 1]["Number"]
      );
      var results = Object.values(
        documentsArray[documentsArray.length - 1]["Atsakymai"]
      );
      var type = Object.values(
        documentsArray[documentsArray.length - 1]["Tipas"]
      );

      var i = 0;

      // ForEach Factory making Averages
      results.forEach((num) => {
        var questionType = type[i];
        if (questionType === 1) {
          var singleAverage = num / number;
          var formated = singleAverage.toFixed(1);
          i++;
        } else {
          singleAverage = num / 0.7;
          formated = singleAverage.toFixed(1);
          i++;
        }
        averages.push(formated);
      });

      // var docData = [];
      // questions = [];
      // var u = 0;

      // this.props.firebase.firestore
      //   .collection("Questions")
      //   .doc(uid)
      //   .collection("Klausimai")
      //   .get()
      //   .then((querySnapshot) => {
      //     if (querySnapshot.docs.length > 0) {
      //       querySnapshot.forEach((doc) => {
      //         docData.push(doc.data());
      //       });
      //     }
      //     docData.forEach(() => {
      //       questions.push(docData[u]["Klausimas"]);
      //       u++;
      //     });
      //   });
      this.setState({
        averages: averages,
        questions: questions,
        List: members,
        documentsArray: documentsArray,
      });
      // this.setState({ svg: this.appendGraphs(averages, questions) });
    }
  };

  handleMonthChange = (event) => {
    var results;
    var number;
    var type;
    this.state.documentsArray.forEach((doc) => {
      if (doc.Date === event.target.value) {
        results = doc.Atsakymai;
        number = doc.Number;
        type = doc.Tipas;
      }
    });
    this.changeGraph(results, number, type);
  };

  changeGraph = (results, number, type) => {
    var averages = [];
    var i = 0;

    results.forEach((num) => {
      var questionType = type[i];

      if (questionType === 1) {
        var singleAverage = num / number;
        var formated = singleAverage.toFixed(1);
        i++;
      } else {
        singleAverage = num / 0.7;
        formated = singleAverage.toFixed(1);
        i++;
      }
      averages.push(formated);
    });

    var docData = [];
    var questions = [];
    var s = 0;
    this.props.firebase.firestore
      .collection("Questions")
      .doc(this.state.User)
      .collection("Klausimai")
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length > 0) {
          querySnapshot.forEach((doc) => {
            docData.push(doc.data());
          });
        }
        docData.forEach(() => {
          questions.push(docData[s]["Klausimas"]);
          s++;
        });
        if (results.length !== questions.length) {
          var changedQuestions = [];
          for (var i = 0; i < results.length; i++) {
            changedQuestions.push(questions[i]);
          }

          this.setState({
            questions: changedQuestions,
            averages: averages,
            svg: this.appendGraphs(averages, changedQuestions),
          });
        } else if (results.length === questions.length) {
          this.setState({
            questions: questions,
            averages: averages,
            svg: this.appendGraphs(averages, questions),
          });
        }
      });
  };

  appendGraphs = (averages, questions) => {
    // var svgg = this.state.svg;
    // if (svg) {
    //   svg.remove();
    // }
    // const width = (window.innerWidth * 0.99) / 10;
    // const height = window.innerHeight / 9;
    // console.log(this.state.questions);
    // svg = d3
    //   .select(this.refs.barChart)
    //   .append("svg")
    //   .attr("class", "bar")
    //   .attr("height", averages.length * height);
    // svg
    //   .selectAll("rect")
    //   .data(averages)
    //   .enter()
    //   .append("rect")
    //   .attr("class", "sBar")
    //   .attr("x", 0)
    //   .attr("y", (result, i) => i * height)
    //   .attr("width", (result, i) => result * width)
    //   .attr("height", 43);
    // svg
    //   .selectAll("text")
    //   .data(this.state.questions)
    //   .enter()
    //   .append("text")
    //   .attr("class", "question")
    //   .attr("x", 0)
    //   .attr("y", (data, i) => i * height - 10)
    //   .text((result) => result);
    // svg
    //   .selectAll("circle")
    //   .data(averages)
    //   .enter()
    //   .append("text")
    //   .attr("class", "titles")
    //   .attr("x", (result) => result * width - 35)
    //   .attr("y", (data, i) => i * height + 25)
    //   .text((result) => result);
    // return svg;
  };

  render() {
    if (
      this.props.firebase.auth.currentUser.uid ===
        "09Teh7itY9PN7Nd4SyPJtgCsiNo2" ||
      "PVnxezLAV3OnFCDYuSKbmTWS0cn2"
    ) {
      return (
        <div>
          <Box onChange={this.handleUserChange}>
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
          <br />

          <Box onChange={this.handleMonthChange}>
            <BoxOfPastWeeks documentsArray={this.state.documentsArray} />
          </Box>

          <div ref="barChart" className="barDiv">
            <h2 style={{ color: "#1c6ea4", textAlign: "center" }}>
              Weekly Results
            </h2>
          </div>
          <Test
            averages={this.state.averages}
            questions={this.state.questions}
          />
        </div>
      );
    } else {
      return (
        <div>
          <Box onChange={this.handleMonthChange}>
            <BoxOfPastWeeks documentsArray={this.state.documentsArray} />
          </Box>

          <div ref="barChart" className="barDiv">
            <h2 style={{ color: "#1c6ea4", textAlign: "center" }}>
              Weekly Results
            </h2>
          </div>
        </div>
      );
    }
  }
}

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(WeeklyGraphs);
