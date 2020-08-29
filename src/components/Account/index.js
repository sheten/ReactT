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
        var ats = doc.data();
        console.log(ats);
        var fullName = ats.FullName;
        this.setState({ Info: fullName });
      });
  }

  render() {
    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div style={{ textAlign: "center" }}>
            <GlobalStyle />
            <h2 style={{ color: "grey", marginTop: "1.5vh" }}>
              {this.state.Info}
            </h2>
            <h2 style={{ color: "grey", margin: "2vh" }}>
              Email: {authUser.email}
            </h2>
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
