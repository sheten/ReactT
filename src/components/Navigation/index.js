import React from "react";

import { AuthUserContext } from "../Session";

import NavigationAuth from "./NavigationAuth";

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
