import React, { Component } from "react";
import { withAuthorization } from "../Session";

import SelectOptionsList from "../Landing/SelectOptionsList";
import BoxOfPastWeeks from "./BoxOfPastWeeks";

import * as d3 from "d3";
import Swal from "sweetalert2";
import styled from "styled-components";
import "./style.css";

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
      documentsArray: [],
      List: [],
      svg: null,
    };
    this.myRef = React.createRef();
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

        this.setState({ List: core });
        this.getFirebaseData(uid);
      });
  }

  handleUserChange = (event) => {
    this.getFirebaseData(event.target.value);
  };

  getFirebaseData = (member) => {
    var documentsArray = [];

    this.props.firebase.firestore
      .collection("Questions")
      .doc(member)
      .collection("SavaiciuRezultatai")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          documentsArray.push(doc.data());
        });

        // Send Data Further
        this.formatAnswers(documentsArray);
        this.setState({ documentsArray: documentsArray });
      });
  };

  formatAnswers = (documentsArray) => {
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
      this.setState({ svg: this.appendGraphs(averages) });
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

    console.log(averages);
    this.setState({ svg: this.appendGraphs(averages) });
  };

  appendGraphs = (averages) => {
    const width = (window.innerWidth * 0.77) / 10;
    const height = window.innerHeight / 15;

    var svg = this.state.svg;
    if (svg) {
      svg.remove();
    }

    svg = d3
      .select(this.refs.barChart)
      .append("svg")
      .attr("class", "bar")
      .attr("height", averages.length * height);
    svg
      .selectAll("rect")
      .data(averages)
      .enter()
      .append("rect")
      .attr("class", "sBar")
      .attr("x", 0)
      .attr("y", (result, i) => i * height)
      .attr("width", (result, i) => result * width)
      .attr("height", 35);
    svg
      .selectAll("text")
      .data(averages)
      .enter()
      .append("text")
      .attr("class", "titles")
      .attr("x", (result) => result * width - 20)
      .attr("y", (data, i) => i * height + 20)
      .text((result) => result);

    return svg;
  };

  render() {
    if (
      this.props.firebase.auth.currentUser.uid ===
        "09Teh7itY9PN7Nd4SyPJtgCsiNo2" &&
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

          <Box onChange={this.handleMonthChange}>
            <BoxOfPastWeeks documentsArray={this.state.documentsArray} />
          </Box>

          <div ref="barChart" className="barDiv">
            <h2 style={{ color: "#1c6ea4", textAlign: "center" }}>
              Submitted data visualisation
            </h2>
          </div>
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
              Submitted data visualisation
            </h2>
          </div>
        </div>
      );
    }
  }
}

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(WeeklyGraphs);
