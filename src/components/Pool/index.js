import React, { Component } from "react";
import { withAuthorization } from "../Session";
import GlobalStyle from "../GlobalStyle";
import styled from "styled-components";

//Styled-Components Style
const Div = styled.div`
  border-bottom: 1px solid grey;
  display; flex;
  flex-direction: column-reverse;
  height: 10vh;
  margin: 1vh 0 1vh 0;

  &:last-child {
    border: none;
    margin-bottom: 0;
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

class Pool extends Component {
  constructor(props) {
    super(props);

    this.state = { Info: [] };
  }

  componentDidMount() {
    var vip = [];
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
  onClick(email, name, userid) {
    var uid = this.props.firebase.auth.currentUser.uid;
    var date = JSON.stringify(new Date());
    var today = date.substring(1, 11);

    this.props.firebase.firestore
      .collection("Questions")
      .doc(uid)
      .collection("Members")
      .doc(email)
      .set({
        Email: email,
        FullName: name,
        UserID: userid,
        Date: today,
      });
  }

  render() {
    return this.state.Info.map((user) => (
      <Div key={user.FullName}>
        <GlobalStyle />
        <Divas>
          <Span>
            <V>
              <strong>Full Name:</strong>
            </V>
            {user.FullName}
          </Span>

          <Span>
            <V>
              <strong>Email:</strong>
            </V>
            {user.Email}
          </Span>
          <input
            onClick={() => this.onClick(user.Email, user.FullName, user.UserID)}
            type="checkbox"
            style={{
              marginRight: "2vh",
            }}
          />
        </Divas>
      </Div>
    ));
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Pool);
