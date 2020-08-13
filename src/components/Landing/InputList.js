import React, { Component } from "react";
import { withAuthorization } from "../Session";
import styled from "styled-components";

// STYLED-COMPONENTS
const Div = styled.div`
  display: flex;
`;
const Input = styled.input`
  background: #fffafa;
  border: 2px solid #1c6ea4;
  display: inline-block;
  flex: 1;
  font-family: "Libre Baskerville", serif;
  height: 6.5vh;
  margin: 0 0.1vh 0.15vh 0.1vh;
  width: 16%;

  ::hover {
    background-color: #1c6ea4;
  }
  ::placeholder {
    color: #1c6ea4;
    font-size: 2.5vh;
    text-align: center;
  }
  ::placeholdertextcolor: "red";
`;
const Pas = styled.p`
  flex: 9;
  font-family: "Libre Baskerville", serif;
  font-size: 3.5vh;
  font-weight: 400;

  @media only screen and (max-width: 800px) {
    flex: 6;
    font-size: 2.2vh;
    font-weight: 400;
  }
`;

class InputList extends Component {
  onValueChange = (e) => {
    var value = e.target.value;
    var id = e.target.id;

    console.log(e.target.value);

    this.props.checkChange(id, value);
  };

  render() {
    var i = 0;

    return this.props.questionsList.map((question) => {
      i++;
      var id = i;

      return (
        <Div key={question.Klausimas}>
          <Pas>
            {question.Number} {question.Klausimas}
          </Pas>
          <Input
            required
            className="window"
            placeholder={id}
            type="text"
            id={"Q" + id}
            onChange={this.onValueChange}
          />
        </Div>
      );
    });
  }
}

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(InputList);
