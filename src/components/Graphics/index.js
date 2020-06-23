import React, { Component } from "react";
import { withFirebase } from "../Firebase";

class Graphics extends Component {
  constructor(props) {
    super(props);
    this.state = { questions: [] };

    this.props.firebase.firestore
      .collection("diq4y7jHCiZHTisAIN8s53GaUjm1")
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
      <div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Divas, kuriame list outina duomenis */}

          <div style={{ display: "flex", width: "80%" }} key={question.title}>
            <p style={{ flex: 1 }}>{question.Atsakymai}</p>
          </div>
        </div>
      </div>
    ));
  }
}

export default withFirebase(Graphics);
