import React from "react";
// import { Link } from "react-router-dom";
// import * as ROUTES from "../../constants/routes";
// import { Menu } from "semantic-ui-react";
// import styled from "styled-components";

import { AuthUserContext } from "../Session";
import NavigationAuth from "./NavigationAuth";

// Style :
// const Navbaras = styled.div`
//   background: #1c6ea4;
//   border-bottom: 1px solid blue;
//   box-shadow: 0 4px 2px -2px grey;
//   display: flex;
//   height: 10vh;
//   justify-content: space-between;
// `;

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {(authUser) => (authUser ? <NavigationAuth /> : null)}
    </AuthUserContext.Consumer>
  </div>
);

export default Navigation;

// const NavigationNonAuth = () => (
//   <Navbaras>
//     <Link to={ROUTES.HOME}>
//       <Menu.Item>Start</Menu.Item>
//     </Link>
//     <Link style={{ margin: "0.5vh, 1vh" }} to={ROUTES.SIGN_IN}>
//       Login
//     </Link>
//     <br />
//     <Link to={ROUTES.SIGN_UP}>Register</Link>
//   </Navbaras>
// );
