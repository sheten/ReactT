import React, { Component } from "react";
import { withAuthorization } from "../Session";
import styled from "styled-components";

// STYLED-COMPONENTS
const Div = styled.div`
  color: #1c6ea4;
  font-family: "Libre Baskerville", serif;
  font-size: 2.6vh;
`;
const Windows = styled.div`
  background: #fffafa;
  border: 2px solid #1c6ea4;
  color: #1c6ea4;
  display: inline-block;
  font-size: 3.5vh;
  height: 6.5vh;
  margin: 0 0.1vh 0.15vh 0.1vh;
  text-align: center;
  width: 100%;
`;

class GraphicsList extends Component {
  render() {
    var i = 0;

    return this.props.questions.map((question) => {
      var array = this.props.array[i];
      i++;
      var id = i;
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
          <Div style={{ width: "88%" }}>{question.Klausimas}</Div>
          <div style={{ width: "12%" }}>
            <Windows id={"Q" + id}>
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                {array}
              </div>
            </Windows>
          </div>
        </div>
      );
    });
  }
}

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(GraphicsList);
