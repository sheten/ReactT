import React, { Component } from "react";
import { withAuthorization } from "../Session";
import GlobalStyle from "../GlobalStyle";
import styled from "styled-components";

//Styled-Components Style
const Div = styled.div`
  border-bottom: 1px solid grey;
  display; flex;
  flex-direction:
  flex-direction: column-reverse;
  height: 25vh;
  margin: 1vh 0 1vh 0;

  &:last-child {
    border: none;
    margin-bottom: 0;
  }
  

  @media only screen and (max-width: 800px) {
    height: 20vh;
  }
`;
const Divas = styled.div`
  display: flex;
  height: 8vh;
  margin-bottom: 2vh;
`;
const Span = styled.span`
  flex: 1;
  font-size: 3.5vh;
  font-weight: 400;
  padding: 1vh;
  text-align: left;

  @media only screen and (max-width: 800px) {
    font-size: 2.3vh;
    font-weight: 400;
    padding-left: 1vh;
  }
`;
const V = styled.div`
  padding-bottom: 1.7vh;

  @media only screen and (max-width: 800px) {
    padding-bottom: 0.01vh;
  }
`;

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = { Info: [] };
  }

  componentDidMount() {
    var vip = [];
    var uid = this.props.firebase.auth.currentUser.uid;
    this.props.firebase.firestore
      .collection("Users")
      .get()
      .then((doc) => {
        doc.forEach((docs) => {
          vip.push(docs.data());
        });
        this.setState({ Info: vip });
      });
  }

  render() {
    return this.state.Info.map((user) => (
      <Div>
        <GlobalStyle />
        <Divas>
          <Span key={user.FullName}>
            <V>
              <strong>Full Name:</strong>
            </V>
            {user.FullName}
          </Span>

          <Span key={user.Password}>
            <V>
              <strong>Password:</strong>
            </V>
            {user.Password}
          </Span>
        </Divas>
        <Divas>
          <Span key={user.Email}>
            <V>
              <strong>Email:</strong>
            </V>
            {user.Email}
          </Span>

          <Span key={user.RegistrationDate}>
            <V>
              <strong>Registration Date:</strong>
            </V>
            {user.RegistrationDate}
          </Span>
        </Divas>
      </Div>
    ));
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(AdminPage);
