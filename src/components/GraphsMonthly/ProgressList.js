import React, { Component } from "react";
import { withAuthorization } from "../Session";
import styled from "styled-components";

// STYLED-COMPONENTS
const Div = styled.div`
  color: #1c6ea4;
  font-family: "Libre Baskerville", serif;
  font-size: 2.6vh;
`;
const Window = styled.div`
  background: #fffafa;
  border: 2px solid #1c6ea4;
  display: inline-block;
  font-size: 3.5vh;
  height: 6.5vh;
  margin: 0 0.1vh 0.15vh 0.1vh;
  text-align: center;
  width: 100%;
`;
const GreenAnswer = styled.div`
  align-items: center;
  color: #41e63b;
  display: flex;
  justify-content: center;
  height: 100%;
`;
const RedAnswer = styled.div`
  align-items: center;
  color: red;
  display: flex;
  justify-content: center;
  height: 100%;
`;

class ProgressList extends Component {
  render() {
    var i = 0;

    return this.props.questions.map((question) => {
      var array = this.props.averagesArray[i];
      var colorIndicator = this.props.colors[i];
      i++;

      return (
        <div
          style={{
            display: "flex",
            margin: "auto",
            paddingBottom: "1vh",
            width: "95%",
          }}
          key={question.Number}
        >
          <Div style={{ width: "80%" }}>{question.Klausimas}</Div>
          <div style={{ width: "20%" }}>
            <Window id={"Q" + i}>
              {colorIndicator === 0 && <RedAnswer>{array}</RedAnswer>}
              {colorIndicator === 1 && <GreenAnswer>{array}</GreenAnswer>}
            </Window>
          </div>
        </div>
      );
    });
  }
}

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(ProgressList);
