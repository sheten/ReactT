import React, { Component } from "react";
import { withAuthorization } from "../Session";
import GlobalStyle from "../GlobalStyle";
import UsersList from "./UsersList";
import styled from "styled-components";

//Styled-Components Style
const Div = styled.div`
  border: 2px groove #1c6ea4;
  height: 67vh;
  margin: 0 auto;
  margin-top: 5vh;
  overflow-y: auto;
  width: 80%;

  @media only screen and (max-width: 800px) {
    width: 90%;
  }
`;

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = { Info: [] };
  }

  render() {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "3%",
        }}
      >
        <GlobalStyle />
        <p style={{ fontSize: "5vh", fontWeight: "500", margin: 0 }}>
          Admin Page
        </p>
        <hr />
        <Div>
          <UsersList />
        </Div>
      </div>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(AdminPage);
