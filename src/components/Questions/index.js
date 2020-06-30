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
    this.state = { questions: [] };
  }

  componentDidMount() {
    this.lolikas();
  }

  lolikas = () => {
    var uid = this.props.firebase.auth.currentUser.uid;
    this.props.firebase.firestore
      .collection("Questions")
      .doc(uid)
      .collection("Klausimai")
      // .doc()
      .get()
      .then((querySnapshot) => {
        var Qs = [];
        querySnapshot.forEach((doc) => {
          Qs.push(doc.data());
          console.log(doc.data());
        });
        this.setState({ questions: Qs });
      });
  };

  render() {
    return this.state.questions.map((question) => (
      <Pas key={question.Klausimas}>{question.Klausimas}</Pas>
    ));
  }
}

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(Questions);
