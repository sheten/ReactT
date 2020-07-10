import React, { Component } from "react";
import GlobalStyle from "../GlobalStyle";

import PasswordChangeForm from "../PasswordChange";
import { AuthUserContext, withAuthorization } from "../Session";

class AccountPage extends Component {
  constructor(props) {
    super(props);

    this.state = { Info: [] };
  }

  componentDidMount() {
    var uid = this.props.firebase.auth.currentUser.uid;
    this.props.firebase.firestore
      .collection("Users")
      .doc(uid)
      .get()
      .then((doc) => {
        var data = doc.data();
        // var fullName = data.Email;
        this.setState({ Info: "fullName" });
      });
  }

  render() {
    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div style={{ textAlign: "center" }}>
            <GlobalStyle />
            <h1 style={{ color: "grey", marginTop: "1.5vh" }}>
              {this.state.Info}
            </h1>
            <h1 style={{ color: "grey" }}>Email: {authUser.email}</h1>
            <hr />
            <div
              style={{
                justifyContent: "center",
                display: "flex",
                marginTop: "5vh",
              }}
            >
              <PasswordChangeForm />
            </div>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(AccountPage);
