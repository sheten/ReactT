import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import { withFirebase } from "../Firebase";
import Questions from "../Questions";

class Content extends Component {
  render() {
    return (
      <Table
        celled
        style={{
          width: "90%",
          textAlign: "center",
          margin: "3vh auto",
        }}
      >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Question title</Table.HeaderCell>
            <Table.HeaderCell>Question content</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Questions />
        </Table.Body>
      </Table>
    );
  }
}

export default withFirebase(Content);
