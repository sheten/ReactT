import React from "react";
import { Link } from "react-router-dom";

import { withAuthorization } from "../Session";
import * as ROUTES from "../../constants/routes";

const HomePage = () => (
  <div className="wrapper">
    <div className="mainDiv">
      <p id="title">Su Tevo Diena, Tevai</p>

      <p id="content">
        ( Sugalvojau si prikolinga dovana pati, tikiuosi atsimeni matematika ir
        fiziologija su anatomija )
      </p>
    </div>
    <Link to={ROUTES.INTRODUCTION} style={{ padding: "auto 2vh" }}>
      account
    </Link>
  </div>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(HomePage);
