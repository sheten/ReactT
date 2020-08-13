import React, { Component } from "react";
import { withAuthorization } from "../Session";

class ComboQuestionsList extends Component {
  render() {
    return this.props.questionsList.map((question) => (
      <option key={question.Klausimas} value={question.Klausimas}>
        {question.Klausimas}
      </option>
    ));
  }
}

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(ComboQuestionsList);
