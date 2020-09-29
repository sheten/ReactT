import React, { Component } from "react";
import { withAuthorization } from "../Session";
import { connect } from "react-redux";

import styled from "styled-components";
import * as d3 from "d3";
import "./style.css";

// STYLED-COMPONENTS
const Div = styled.div`
  display: flex;
  flex-direction: column;
  // padding-bottom: 500px;
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
      svg: null,
    };
  }
  svgDiv = null;
  componentDidUpdate() {
    const width = (window.innerWidth * 0.955) / 10;
    const height = window.innerHeight / 9;
    var averages = this.props.averages;
    var svg = this.svgDiv;

    console.log(width * 9.0);
    if (svg) {
      for (var i = 0; averages.length > i; i++) {
        var selection = "div#a" + i + " > *";
        d3.selectAll(selection).remove();
      }
      console.log("removed svg");
    }
    for (i = 0; averages.length > i; i++) {
      selection = "div#a" + i;
      svg = d3
        .select(selection)
        .append("svg")
        .attr("height", height)
        .attr("width", window.innerWidth);
      svg
        .selectAll("rect")
        .data(averages[i])
        .enter()
        .append("rect")
        .attr("class", "sBar")
        .attr("x", 0)
        .attr("y", (result, i) => i * height)
        .attr("width", averages[i] * width)
        .attr("height", 43);
      svg
        .selectAll("text")
        .data(averages[i])
        .enter()
        .append("text")
        .attr("class", "titles")
        .attr("x", averages[i] * width - 35)
        .attr("y", (data, i) => i * height + 25)
        .text(averages[i]);
    }
    this.svgDiv = svg;
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
          {/* <Pas style={{ color: "red" }}>{this.props.averages[id]}</Pas> */}

          <div id={"a" + id} />
        </Div>
      );
    });
  }
}

const mapReducerStateToProps = (reducerState) => {
  return {
    averages: reducerState.averages,
    questions: reducerState.questions,
  };
};
const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(
  connect(mapReducerStateToProps)(Test)
);
