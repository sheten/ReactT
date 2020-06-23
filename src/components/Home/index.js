import React from "react";

import { withAuthorization } from "../Session";
import Content from "../Content";

const HomePage = () => (
  <div style={{ textAlign: "center", marginTop: "3vh" }}>
    {/* QUESTION LIST */}
    <Content />
    <div className="container" style={{ marginTop: "40px" }}>
      <ul
        className="collapsible z-depth-0 questions"
        style={{ border: "none" }}
      ></ul>
    </div>
  </div>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(HomePage);
