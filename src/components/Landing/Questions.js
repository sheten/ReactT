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
  constructor(props) {
    super(props);
    this.state = { addedKlausimai: [] };
  }

  componentDidMount() {
    this.addedKlausimai();
  }

  addedKlausimai = () => {
    var core = [];
    this.props.firebase.firestore
      .collection("Questions")
      .doc("CoreQuestions")
      .collection("CoreQuestions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          core.push(doc.data());
        });
        console.log(core);

        var uid = this.props.firebase.auth.currentUser.uid;
        this.props.firebase.firestore
          .collection("Questions")
          .doc(uid)
          .collection("Klausimai")
          // .doc()
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              core.push(doc.data());
            });
            this.setState({ addedKlausimai: core });
            console.log(core);
          });
      });
  };

  render() {
    return this.state.addedKlausimai.map((question) => (
      <Pas key={question.Klausimas}>
        {question.Number} {question.Klausimas}
      </Pas>
    ));
  }
}

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(Questions);
