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
      fontFamily: "Libre Baskerville, serif",
      fontSize: "4.5vh",
      fontWeight: 400,
    }}
  >
    Sign Out
  </button>
);

export default withFirebase(SignOutButton);
