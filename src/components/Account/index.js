import React from "react";
import GlobalStyle from "../GlobalStyle";

import PasswordChangeForm from "../PasswordChange";
import { AuthUserContext, withAuthorization } from "../Session";

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <div style={{ textAlign: "center", marginTop: "5%" }}>
        <GlobalStyle />
        <h1>Account: {authUser.email}</h1>
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

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(AccountPage);
