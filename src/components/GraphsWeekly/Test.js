import React, { Component } from "react";
import { withAuthorization } from "../Session";
import styled from "styled-components";
import * as d3 from "d3";
import "./style.css";

// STYLED-COMPONENTS
const Div = styled.div`
  display: flex;
  flex-direction: column;
  // height: 200px;
`;
const Pas = styled.p`
  flex: 1;
  font-family: "Libre Baskerville", serif;
  font-size: 3.5vh;
  font-weight: 400;

  @media only screen and (max-width: 800px) {
    flex: 1;
    font-size: 2.2vh;
    font-weight: 400;
  }
`;

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: null,
      averages: null,
      svg: null,
      User: this.props.firebase.auth.currentUser.uid,
    };
  }
  // componentWillMount() {
  //   //GETTING QUESTIONS
  //   var docData = [];
  //   var questions = [];
  //   var s = 0;

  //   this.props.firebase.firestore
  //     .collection("Questions")
  //     .doc(this.state.User)
  //     .collection("Klausimai")
  //     .get()
  //     .then((querySnapshot) => {
  //       if (querySnapshot.docs.length > 0) {
  //         querySnapshot.forEach((doc) => {
  //           docData.push(doc.data());
  //         });
  //       }
  //       docData.forEach(() => {
  //         questions.push(docData[s]["Klausimas"]);
  //         s++;
  //       });
  //     });

  //   //GETTING AVERAGES DATA
  //   var documentsArray = [];
  //   this.props.firebase.firestore
  //     .collection("Questions")
  //     .doc(this.state.User)
  //     .collection("SavaiciuRezultatai")
  //     .get()
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         documentsArray.push(doc.data());
  //       });
  //       var averages = [];

  //       // Check if Data exist if document exist
  //       if (documentsArray.length === 0) {
  //         console.log("NERA DOMENU ZMOGAU");
  //       } else {
  //         // Getting Required Data

  //         var number = parseInt(
  //           documentsArray[documentsArray.length - 1]["Number"]
  //         );
  //         var results = Object.values(
  //           documentsArray[documentsArray.length - 1]["Atsakymai"]
  //         );
  //         var type = Object.values(
  //           documentsArray[documentsArray.length - 1]["Tipas"]
  //         );

  //         var i = 0;

  //         // ForEach Factory making Averages
  //         results.forEach((num) => {
  //           var questionType = type[i];
  //           if (questionType === 1) {
  //             var singleAverage = num / number;
  //             var formated = singleAverage.toFixed(1);
  //             i++;
  //           } else {
  //             singleAverage = num / 0.7;
  //             formated = singleAverage.toFixed(1);
  //             i++;
  //           }
  //           averages.push(formated);
  //         });
  //         console.log(averages);
  //         this.setState({
  //           averages: averages,
  //           questions: questions,
  //         });
  //       }
  //     });
  //     console.log("mounting")
  // }
  UNSAFE_componentWillReceiveProps({ questions, averages }) {
    console.log(this.props.averages, this.props.questions);
    this.setState({
      questions,
      averages,
      svg: this.appendGraphs(this.props.averages),
    });
  }
  appendGraphs(averages) {
    const width = (window.innerWidth * 0.99) / 10;
    const height = window.innerHeight / 9;
    var svg = this.state.svg;

    console.log(svg);
    if (svg) {
      for (var i = 0; averages.length > i; i++) {
        var selection = "div#a" + i + " > *";
        d3.selectAll(selection).remove();
      }
      console.log("removed svg");
    }

    for (i = 0; averages.length > i; i++) {
      selection = "div#a" + i;
      console.log(averages[i]);
      svg = d3.select(selection).append("svg").attr("height", height);
      svg
        .selectAll("rect")
        .data(averages[i])
        .enter()
        .append("rect")
        .attr("class", "sBar")
        .attr("x", 0)
        .attr("y", (result, i) => i * height)
        .attr("width", (result, i) => result * width)
        .attr("height", 43);
      svg
        .selectAll("text")
        .data(averages[i])
        .enter()
        .append("text")
        .attr("class", "titles")
        .attr("x", (result) => result * width - 25)
        .attr("y", (data, i) => i * height + 25)
        .text((result) => result);
    }
    return svg;
  }

  render() {
    var i = 0;
    return this.props.questions.map((question) => {
      var id = i;
      i++;

      return (
        <Div key={id}>
          <Pas>{question}</Pas>
          <br />
          <div id={"a" + id} />
        </Div>
      );
    });
  }
}

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(Test);
