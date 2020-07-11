import React, { Component } from "react";
import { withAuthorization } from "../Session";
import * as d3 from "d3";
// import styled from "styled-components";
import "./style.css";

// STYLED-COMPONENTS

class Graphs extends Component {
  constructor(props) {
    super(props);
    this.state = { questions: [] };
    this.myRef = React.createRef();
  }
  componentDidMount() {
    this.lolikas();
    console.log(this.state.questions.length);
  }
  lolikas = () => {
    var uid = this.props.firebase.auth.currentUser.uid;
    var Qs = [];
    this.props.firebase.firestore
      .collection("Questions")
      .doc(uid)
      .collection("Atsakymai")
      // .doc()
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          Qs.push(doc.data());
        });
        this.setState({ questions: Qs });
        this.graphs(Qs);
      });
  };
  graphs = (Qs) => {
    const questions = Qs[0].Atsakymai.questions;
    const datas = Object.values(questions);

    Object.values(datas).forEach((entry) => {
      console.log(entry);
    });
    const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];
    const h = 300;

    console.log(this.state.questions.length);
    const svg = d3
      .select(this.refs.barChart)
      .append("svg")
      .attr("class", "bar");
    //Prisidek klase bar ir joje style darykis
    svg
      .selectAll("rect")
      .data(datas)
      .enter()
      .append("rect")
      .attr("class", "sBar")
      .attr("x", (data, i) => i * 80)
      .attr("y", (data, i) => {
        return h - 7 * data;
        //Kodel cia 7, o kiti skiaciia netinka?
      })
      .attr("width", 50)
      .attr("height", (data, i) => 8 * data)
      //Kodel cia 7, o kiti skiaciia netinka?
      .append("title")
      .text((data) => data);
    //Kam tai reikalinga, istrynus still veikia
    svg
      .selectAll("text")
      .data(datas)
      .enter()
      .append("text")
      .attr("class", "titles")
      .attr("x", (data, i) => i * 80 + 15)
      .attr("y", (data, i) => h - 7 * data + 25)
      .text((data) => data);
  };

  render() {
    if (this.state.questions.lenght) {
      return (
        <div style={{ padding: "7vh", width: "100%" }}>
          <h1 style={{ color: "#1c6ea4", textAlign: "center" }}>
            Graphs will be displayed after 7 days
          </h1>
        </div>
      );
    } else {
      return (
        <div ref="barChart" className="barDiv">
          <h1 style={{ textAlign: "center" }}>
            Current submitted data visualisation
          </h1>
        </div>
      );
    }
  }
}

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(Graphs);
