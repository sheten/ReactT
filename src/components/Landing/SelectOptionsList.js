import React, { Component } from "react";
import { withAuthorization } from "../Session";
// import styled from "styled-components";

// STYLED-COMPONENTS

class SelectOptionsList extends Component {
  render() {
    return this.props.usersList.map((user) => (
      <option key={user.FullName} value={user.UserID}>
        {user.Email}
      </option>
    ));
  }
}

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(SelectOptionsList);
