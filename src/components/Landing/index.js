import React, { Component } from "react";
import { withAuthorization } from "../Session";
import styled from "styled-components";

import InputFirebase from "./InputFirebase";
import GlobalStyle from "../GlobalStyle";
import Questions from "./Questions";

// STYLED-COMPONENTS
const H2 = styled.h2`
  text-align: left;
  font-size: 4.3vh;
  font-weight: 600;
  width: 100%;

  @media only screen and (max-width: 800px) {
    font-size: 3vh;
  }
`;

class Landing extends Component {
  render() {
    return (
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          marginTop: "7vh",
        }}
      >
        <GlobalStyle />
        <div
          style={{
            color: "#1c6ea4",
            marginBottom: "5vh",
            width: "88%",
          }}
        >
          <H2>How Was Your Day:</H2>
          <div style={{ height: "50vh", overflow: "auto" }}>
            <Questions />
          </div>
        </div>

        <InputFirebase />
      </div>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Landing);
