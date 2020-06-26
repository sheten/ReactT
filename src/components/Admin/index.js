import React, { Component } from "react";

import { withFirebase } from "../Firebase";

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on("value", (snapshot) => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map((key) => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div style={{ textAlign: "center", marginTop: "5%" }}>
        <p style={{ fontSize: "5vh", fontWeight: "500", margin: 0 }}>Admin</p>
        <hr />

        {loading && (
          <div style={{ marginTop: "5vh" }}>
            Loading Users...
            <br />
            Ideja
          </div>
        )}

        <UserList users={users} />
      </div>
    );
  }
}

const UserList = ({ users }) => (
  <ul>
    {users.map((user) => (
      <li key={user.uid}>
        <span>
          <strong>ID:</strong> {user.uid}
        </span>
        <span>
          <strong>E-Mail:</strong> {user.email}
        </span>
        <span>
          <strong>Username:</strong> {user.username}
        </span>
      </li>
    ))}
  </ul>
);

export default withFirebase(AdminPage);
