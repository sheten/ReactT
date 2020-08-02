import React, { Component } from "react";
import { withAuthorization } from "../Session";
import styled from "styled-components";

// STYLED-COMPONENTS
const Pas = styled.p`
  font-family: "Libre Baskerville", serif;
  font-size: 3.5vh;
  font-weight: 400;

  @media only screen and (max-width: 800px) {
    font-size: 2.2vh;
    font-weight: 400;
  }
`;

class Questions extends Component {
  render() {
    return this.props.questionsList.map((question) => (
      <Pas key={question.Klausimas}>
        {question.Number} {question.Klausimas}
      </Pas>
    ));
  }
}

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(Questions);
