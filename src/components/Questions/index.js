import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import { withFirebase } from "../Firebase";

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = { questions: [] };

    this.props.firebase.firestore
      .collection("Questions")
      .get()
      .then((querySnapshot) => {
        var Qs = [];
        querySnapshot.forEach((doc) => {
          Qs.push(doc.data());
        });
        this.setState({ questions: Qs });
      });
  }

  render() {
    return this.state.questions.map((question) => (
      <Table.Row key={question.title}>
        <Table.Cell style={{ width: "30vh" }}>{question.title}</Table.Cell>

        <Table.Cell style={{ width: "70vh" }}>{question.content}</Table.Cell>
      </Table.Row>
    ));
  }
}

export default withFirebase(Questions);
