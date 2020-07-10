import React, { Component } from "react";
import { withAuthorization } from "../Session";

import Graphs from "./Graphs";

class Graphics extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Graphs />;
  }
}

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(Graphics);
