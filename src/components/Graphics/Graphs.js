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
          console.log(doc);
          Qs.push(doc.data());
        });
        this.setState({ questions: Qs });
        this.graphs(Qs);
      });
  };
  graphs = (Qs) => {
    console.log(Qs);
    const As = [23, 72, 42, 15, 41, 23, 56];
    // var datas = [];
    const questions = Qs[0].Atsakymai.questions;
    const datas = Object.values(questions);
    console.log(datas);

    Object.values(datas).forEach((entry) => {
      console.log(entry);
    });
    // Qs.forEach((doc) => {
    //   datas.push(doc.Atsakymai.questions);
    //   console.log(datas);
    // });

    // console.log(myArray);

    // const min_data = 0,
    //   max_data = 100;
    // const margin = { top: 50, right: 10, bottom: 20, left: 10 };
    // const width = 500 - margin.left - margin.right,
    //   height = 300 - margin.top - margin.bottom;
    // const g = d3
    //   .select("body")
    //   .append("svg")
    //   .attr("width", width + margin.left + margin.right)
    //   .attr("height", height + margin.top + margin.bottom)
    //   .append("g")
    //   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // var scale = d3.scaleLinear().domain([min_data, max_data]).range([0, width]);
    // var xAxis = d3.axisBottom(scale).ticks(3);
    // xAxis.tickValues([0, 50, 100]);
    // var tickLabels = [
    //   "1. Ar viska padarei, kad diena butu prasminga",
    //   "2. Ar viska padarei kad butum laimingas",
    //   "3. Ar viska padarei kad isiskeltum dienos tikslus",
    // ];
    // xAxis.tickFormat((d, i) => tickLabels[i]);

    // Append SVG
    // var svg = d3.select("body").append("svg");

    //Append group and insert axis
    // svg.append("g").call(xAxis);
    const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];
    const h = 300;

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
      .attr("height", (data, i) => 7 * data)
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
    return (
      <div ref="barChart" className="barDiv">
        <h1 style={{ textAlign: "center" }}>Hi, I'm the bar chart</h1>
      </div>
    );
  }
}

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(Graphs);
