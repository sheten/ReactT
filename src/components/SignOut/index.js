import React from "react";

import { withFirebase } from "../Firebase";

const SignOutButton = ({ firebase }) => (
  <button
    type="button"
    onClick={firebase.doSignOut}
    style={{
      border: "none",
      background: "none",
      color: "grey",
      fontSize: "4.5vh",
      fontWeight: 400,
      // border: "1px inset #1c6ea4",
      // borderRadius: "8%",
      // cursor: "pointer",
      // color: "#1c6ea4",
      // flex: 1,
      // fontSize: "2.5vh",
      // fontWeight: 400,
      // height: "70%",
      // justifyContent: "center",
    }}
  >
    Sign Out
  </button>
);

export default withFirebase(SignOutButton);
