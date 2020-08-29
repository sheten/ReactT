import React, { Component } from "react";
import { withAuthorization } from "../Session";

class BoxOfPastWeeks extends Component {
  render() {
    return this.props.documentsArray.reverse().map((month) => (
      <option key={month.Date} value={month.Date}>
        {month.Date}
      </option>
    ));
  }
}

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(BoxOfPastWeeks);
